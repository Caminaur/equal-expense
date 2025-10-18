import { useEffect, useRef, useState, useMemo } from "react";
import cloud from "d3-cloud";
import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { easeCubicOut } from "d3-ease";
import { max, min } from "d3";

type Expense = { expense: string; amount: number };
type WordDatum = cloud.Word & { amount?: number };

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

  // Memo para evitar recalcular en cada render
  const words: WordDatum[] = useMemo(() => {
    const base = data.length ? data : [];
    const MIN_SIZE = Math.round(size / 18);
    const MAX_SIZE = Math.round(size / 7);
    const amounts = base.map((d) => Number(d.amount) || 0);
    const minA = min(amounts) ?? 0;
    const maxA = max(amounts) ?? 1;

    const sizeScale = scaleLinear()
      .domain([minA, maxA])
      .range([MIN_SIZE, MAX_SIZE])
      .clamp(true);

    const mapped = base.map((t) => ({
      text: t.expense,
      size: sizeScale(Number(t.amount) || 0),
      amount: t.amount,
    })) as WordDatum[];
    return mapped;
  }, [data, size]);

  // Tooltip D3 "fuera de React"
  useEffect(() => {
    let tooltip: HTMLDivElement | null = null;
    const container = ref.current;
    if (!container || !words.length) return;

    const width = size;
    const height = size;

    // Crea el tooltip si no existe
    tooltip = document.createElement("div");
    tooltip.className = "wordcloud-tooltip";
    Object.assign(tooltip.style, {
      opacity: "0",
      position: "fixed",
      pointerEvents: "none",
      background: "#fff",
      color: "#111",
      border: "1px solid #999",
      fontSize: "16px",
      borderRadius: "10px",
      padding: "9px 18px",
      boxShadow: "0 3px px #0002",
      zIndex: "9999",
      fontWeight: "500",
      transition: "opacity 0.16s",
      whiteSpace: "nowrap",
    });
    document.body.appendChild(tooltip);

    // Dibuja la nube
    const draw = (layoutWords: WordDatum[]) => {
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

      // Animación
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

      // Tooltips estilo D3
      texts
        .on("mouseover", function (_, d) {
          select(this).raise().style("stroke", "#00000070").style("opacity", 1);
          tooltip!.style.opacity = "1";
          tooltip!.innerHTML = `<b>${d.text}</b><br/>€ ${Number(
            d.amount ?? d.size ?? 0
          ).toLocaleString()}`;
        })
        .on("mousemove", function (event) {
          tooltip!.style.left = `${event.clientX + 10}px`;
          tooltip!.style.top = `${event.clientY + 10}px`;
        })
        .on("mouseleave", function () {
          select(this).style("stroke", "none").style("opacity", 1);
          tooltip!.style.opacity = "0";
        });
    };

    const layout = cloud<WordDatum>()
      .size([width, height])
      .words(words)
      .padding(PADDING)
      .rotate(() => 0)
      .font("Impact")
      .fontSize((d) => (d.size as number) || 12)
      .on("end", (w) => draw(w as WordDatum[]));

    layout.start();

    // Limpia el tooltip al desmontar
    return () => {
      if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    };
  }, [words, size]);

  // Solo el contenedor
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
