import chroma from "chroma-js";

export const HARMONIES = [
  { id: "complementary", label: "Complementary", angles: [180] },
  { id: "analogous", label: "Analogous", angles: [-30, 30] },
  { id: "triadic", label: "Triadic", angles: [120, 240] },
  { id: "split", label: "Split-complementary", angles: [150, 210] },
  { id: "tetradic", label: "Tetradic", angles: [90, 180, 270] },
] as const;

/** The base color first, followed by its hue-rotated partners. */
export function generateHarmony(hex: string, angles: readonly number[]): string[] {
  const base = chroma(hex);
  const [h, s, l] = base.hsl();
  const hue = Number.isNaN(h) ? 0 : h;
  return [
    base.hex("rgb"),
    ...angles.map((a) => chroma.hsl((hue + a + 360) % 360, s, l).hex()),
  ];
}
