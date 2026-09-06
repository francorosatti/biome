export function randRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** Box-Muller gaussian jitter, relative to `value`. */
export function gaussianJitter(value: number, relStdDev = 0.05): number {
  const u1 = Math.random() || Number.EPSILON;
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return value + value * z * relStdDev;
}
