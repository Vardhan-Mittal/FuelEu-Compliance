export function percentDiff(comparison: number, baseline: number): number {
  return ((comparison / baseline) - 1) * 100;
}
export function isCompliant(actual: number, target: number): boolean {
  return actual <= target;
}
