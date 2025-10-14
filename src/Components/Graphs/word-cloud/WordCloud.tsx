import { useEffect, useRef, useState } from "react";
import cloud from "d3-cloud";
import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { easeCubicOut } from "d3-ease";
import { color } from "d3-color";
import { max, min } from "d3";

type Expense = { expense: string; amount: number };
type WordDatum = cloud.Word;

export default function WordCloud() {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Expense[]>([]);
  const [size, setSize] = useState(500);
  const PADDING = size < 400 ? 2 : 5;

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 480) setSize(280);
      else if (w < 768) setSize(340);
      else setSize(400);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem("expenses") : null;
      const parsed = raw ? (JSON.parse(raw) as Expense[]) : [];
      setData(parsed);
    } catch {
      setData([]);
    }
  }, []);

  // Calcular tamaños, para evitar calculos innecesarios
  const words: WordDatum[] = (() => {
    const base = data.length ? data : [];

    // Rango de letra
    const MIN_SIZE = Math.round(size / 18);
    const MAX_SIZE = Math.round(size / 7);

    const amounts = base.map((d) => Number(d.amount) || 0);
    const minA = min(amounts) ?? 0;
    const maxA = max(amounts) ?? 1;

    // Escala lineal
    const sizeScale = scaleLinear()
      .domain([minA, maxA])
      .range([MIN_SIZE, MAX_SIZE])
      .clamp(true);

    const mapped = base.map((t) => ({
      text: t.expense,
      size: sizeScale(Number(t.amount) || 0),
    })) as WordDatum[];
    return mapped;
  })();

  // Dibujamos la WordCloud
  useEffect(() => {
    const container = ref.current;
    if (!container || !words.length) return;

    const width = size;
    const height = size;

    const draw = (layoutWords: WordDatum[]) => {
      // Lo vaciamos en caso de contener algo
      select(container).select("svg").remove();

      const svg = select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("overflow", "visible")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const texts = svg
        .selectAll<SVGTextElement, WordDatum>("text")
        .data(layoutWords)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .style(
          "font-family",
          "Impact, Haettenschweiler, 'Arial Black', sans-serif"
        )
        .style("font-size", (d) => `${d.size}px`)
        .each(function (this: SVGTextElement, _d, i) {
          const c = schemeCategory10[i % 10];
          select(this).style("fill", c).attr("data-original-color", c);
        })
        .attr(
          "data-base-transform",
          (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`
        )
        .attr("opacity", 0)
        .attr(
          "transform",
          (d) => `translate(${d.x},${d.y}) rotate(${d.rotate}) scale(0.1)`
        )
        .text((d) => String(d.text));

      // Animación de aparición
      texts
        .transition()
        .ease(easeCubicOut)
        .duration(800)
        .delay((_d, i) => i * 40)
        .attr("opacity", 1)
        .attr("cursor", "pointer")
        .attr(
          "transform",
          (d) => `translate(${d.x},${d.y}) rotate(${d.rotate}) scale(1)`
        );

      // Efectos hover
      texts
        .on("mouseenter", function (this: SVGTextElement) {
          const base = select(this).attr("data-base-transform");
          const orig = select(this).attr("data-original-color") || "#000";
          const brighter = color(orig)?.brighter(0.8)?.formatHex() ?? orig;
          select(this)
            .raise()
            .transition()
            .duration(150)
            .attr("transform", `${base} scale(1.15)`)
            .style("fill", brighter);
        })
        .on("mouseleave", function (this: SVGTextElement) {
          const base = select(this).attr("data-base-transform");
          const orig = select(this).attr("data-original-color") || "#000";
          select(this)
            .transition()
            .duration(150)
            .attr("transform", `${base} scale(1)`)
            .style("fill", orig);
        });
    };

    const layout = cloud<WordDatum>()
      .size([width, height])
      .words(words)
      .padding(PADDING)
      // .rotate(() => (Math.random() > 0.5 ? 90 : 0))
      .rotate(() => 0)
      .font("Impact")
      .fontSize((d) => (d.size as number) || 12)
      .on("end", (w) => draw(w as WordDatum[]));

    layout.start();
  }, [words]);

  // Container
  return (
    <div
      ref={ref}
      style={{
        width: size,
        height: size,
        border: "1px solid #CCCCCC45",
        margin: "0 auto",
        overflow: "visible",
      }}
    />
  );
}
