export function clamp (num, min, max) {
  const result = Math.min(Math.max(num, min), max)
  const clamped = num != result
  return [result, clamped]
}