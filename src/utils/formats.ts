import chroma from "chroma-js";

export type FormatId =
  | "hex"
  | "rgb"
  | "rgba"
  | "hsl"
  | "hsv"
  | "cmyk"
  | "lab"
  | "lch"
  | "oklch"
  | "flutter"
  | "android";

export const FORMAT_LABELS: Record<FormatId, string> = {
  hex: "HEX",
  rgb: "RGB",
  rgba: "RGBA",
  hsl: "HSL",
  hsv: "HSV",
  cmyk: "CMYK",
  lab: "LAB",
  lch: "LCH",
  oklch: "OKLCH",
  flutter: "Flutter",
  android: "Android",
};

export const FORMAT_IDS = Object.keys(FORMAT_LABELS) as FormatId[];

/** Formats shown as editable inputs in the preview. */
export const EDITABLE_FORMATS: FormatId[] = ["hex", "rgb", "rgba", "hsl"];
/** Read-only formats shown under "More formats". */
export const EXTRA_FORMATS: FormatId[] = ["hsv", "cmyk", "lab", "lch", "oklch", "flutter", "android"];

export function isFormatId(value: unknown): value is FormatId {
  return typeof value === "string" && (FORMAT_IDS as string[]).includes(value);
}

const n = (value: number) => (Number.isNaN(value) ? 0 : value);
const r1 = (value: number) => parseFloat(n(value).toFixed(1));
const pct = (value: number) => `${Math.round(n(value) * 100)}%`;
const byte = (value: number) => Math.round(value).toString(16).padStart(2, "0").toUpperCase();

export function formatColor(hex: string, opacity: number, format: FormatId): string {
  const color = chroma(hex).alpha(opacity);
  const [r, g, b] = color.rgb();

  switch (format) {
    case "hex":
      return color.hex().toUpperCase();
    case "rgb":
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    case "rgba":
      return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${parseFloat(opacity.toFixed(2))})`;
    case "hsl": {
      const [h, s, l] = color.hsl();
      return `hsl(${Math.round(n(h))}, ${pct(s)}, ${pct(l)})`;
    }
    case "hsv": {
      const [h, s, v] = color.hsv();
      return `hsv(${Math.round(n(h))}, ${pct(s)}, ${pct(v)})`;
    }
    case "cmyk": {
      const [c, m, y, k] = color.cmyk();
      return `cmyk(${pct(c)}, ${pct(m)}, ${pct(y)}, ${pct(k)})`;
    }
    case "lab": {
      const [l, a, bb] = color.lab();
      return `lab(${r1(l)} ${r1(a)} ${r1(bb)})`;
    }
    case "lch": {
      const [l, c, h] = color.lch();
      return `lch(${r1(l)} ${r1(c)} ${r1(h)})`;
    }
    case "oklch": {
      const [l, c, h] = color.oklch();
      return `oklch(${r1(l * 100)}% ${parseFloat(n(c).toFixed(3))} ${r1(h)})`;
    }
    case "flutter":
      return `Color(0x${byte(opacity * 255)}${byte(r)}${byte(g)}${byte(b)})`;
    case "android":
      return `#${byte(opacity * 255)}${byte(r)}${byte(g)}${byte(b)}`;
  }
}
