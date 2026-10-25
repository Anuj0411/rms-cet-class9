export function langOf(text: string): "hi" | undefined {
  return /[\u0900-\u097F]/.test(text) ? "hi" : undefined;
}
