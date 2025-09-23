export function formatNumber(price: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    compactDisplay: "short",
  }).format(price);
}
