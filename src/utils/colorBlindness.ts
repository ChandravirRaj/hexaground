import chroma from "chroma-js";

export type VisionMode =
  | "normal"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

export const VISION_MODES: { id: VisionMode; label: string; hint: string }[] = [
  { id: "normal", label: "Normal", hint: "Typical color vision" },
  { id: "protanopia", label: "Protanopia", hint: "No red cones" },
  { id: "deuteranopia", label: "Deuteranopia", hint: "No green cones" },
  { id: "tritanopia", label: "Tritanopia", hint: "No blue cones" },
  { id: "achromatopsia", label: "Achromatopsia", hint: "No color, grays only" },
];

export function isVisionMode(value: unknown): value is VisionMode {
  return VISION_MODES.some((m) => m.id === value);
}

type Matrix = readonly [number, number, number, number, number, number, number, number, number];

/** Machado et al. (2009) at full severity, applied to linear RGB. */
const MATRICES: Record<Exclude<VisionMode, "normal">, Matrix> = {
  protanopia: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
  deuteranopia: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
  tritanopia: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.3039],
  achromatopsia: [0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722],
};

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** How a color appears to someone with the given type of color blindness. */
export function simulateHex(hex: string, mode: VisionMode): string {
  if (mode === "normal") return chroma(hex).hex("rgb");
  const m = MATRICES[mode];
  const [r, g, b] = chroma(hex).rgb().map((v) => toLinear(v / 255));
  const out = [
    m[0] * r + m[1] * g + m[2] * b,
    m[3] * r + m[4] * g + m[5] * b,
    m[6] * r + m[7] * g + m[8] * b,
  ].map((v) => Math.round(toSrgb(clamp01(v)) * 255));
  return chroma(out[0], out[1], out[2]).hex();
}

/** feColorMatrix values (4x5) for an SVG filter that runs in linearRGB. */
export function filterMatrix(mode: Exclude<VisionMode, "normal">): string {
  const m = MATRICES[mode];
  return [
    `${m[0]} ${m[1]} ${m[2]} 0 0`,
    `${m[3]} ${m[4]} ${m[5]} 0 0`,
    `${m[6]} ${m[7]} ${m[8]} 0 0`,
    "0 0 0 1 0",
  ].join(" ");
}

export function visionFilter(mode: VisionMode): string | undefined {
  return mode === "normal" ? undefined : `url(#vision-${mode})`;
}
