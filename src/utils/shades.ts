import chroma from "chroma-js";

export const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export interface Shade {
  step: (typeof SHADE_STEPS)[number];
  hex: string;
  /** True for the step that holds the selected color itself. */
  isBase: boolean;
}

/**
 * Builds a 50–950 scale (white → color → black, interpolated in Lab) where the
 * selected color sits at the step closest to its natural lightness.
 */
export function generateShades(hex: string): Shade[] {
  const base = chroma(hex);
  const count = SHADE_STEPS.length;
  const lightness = Math.min(0.95, Math.max(0.05, base.lab()[0] / 100));
  const position = 1 - lightness;

  const scale = chroma
    .scale(["#ffffff", base.hex("rgb"), "#000000"])
    .domain([0, position, 1])
    .mode("lab");

  // Sample strictly between white and black so the ends aren't pure #fff / #000.
  const samples = SHADE_STEPS.map((_, i) => (i + 0.6) / (count + 0.2));
  const baseIndex = samples.reduce(
    (best, t, i) =>
      Math.abs(t - position) < Math.abs(samples[best] - position) ? i : best,
    0
  );

  return SHADE_STEPS.map((step, i) => ({
    step,
    hex: i === baseIndex ? base.hex("rgb") : scale(samples[i]).hex(),
    isBase: i === baseIndex,
  }));
}
