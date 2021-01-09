export function safeDisplay(num) {
  if (Number.isNaN(num)) {
    return '';
  }
  return num;
}
export function roundFixed(num, places = 1) {
  if (!Number.isNaN(num)) {
    return Number.parseFloat(num).toFixed(places);
  }
}
export function roundPrecision(num, places = 3) {
  if (!Number.isNaN(num)) {
    return Number.parseFloat(num).toPrecision(places);
  }
}