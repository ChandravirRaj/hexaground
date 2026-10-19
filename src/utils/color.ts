import chroma from "chroma-js";

import type { ColorFormat, ColorState } from "@/types/color";

export function colorStateToChroma(state: ColorState) {
  return chroma
    .hsl(state.hue, state.saturation / 100, state.lightness / 100)
    .alpha(state.opacity);
}

export function colorStateToHex(state: ColorState): string {
  return colorStateToChroma(state).hex().toUpperCase();
}

export function colorStateToRgb(state: ColorState): string {
  const [r, g, b] = colorStateToChroma(state).rgb();
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export function colorStateToRgba(state: ColorState): string {
  const [r, g, b, a] = colorStateToChroma(state).rgba();
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${parseFloat(a.toFixed(2))})`;
}

export function colorStateToHsl(state: ColorState): string {
  const [h, s, l] = colorStateToChroma(state).hsl();
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function chromaToColorState(color: chroma.Color, opacity?: number): ColorState {
  const [h, s, l] = color.hsl();
  return {
    hue: Number.isNaN(h) ? 0 : Math.round(h),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100),
    opacity: opacity ?? color.alpha(),
  };
}

export function parseColorInput(
  format: ColorFormat,
  value: string
): ColorState | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    switch (format) {
      case "hex": {
        const normalized = normalizeHex(trimmed);
        if (!normalized) return null;
        return chromaToColorState(chroma(normalized));
      }
      case "rgb":
      case "rgba":
        return chromaToColorState(chroma(trimmed));
      case "hsl": {
        const match = trimmed.match(
          /hsl\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*\)/i
        );
        if (!match) return chromaToColorState(chroma(trimmed));
        return {
          hue: Math.round(parseFloat(match[1])),
          saturation: Math.round(parseFloat(match[2])),
          lightness: Math.round(parseFloat(match[3])),
          opacity: 1,
        };
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
}

export function parseAnyColorInput(value: string): ColorState | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^#?[0-9A-Fa-f]{3,8}$/.test(trimmed)) {
    const parsed = parseColorInput("hex", trimmed);
    if (parsed) return parsed;
  }

  if (/^rgba?\(/i.test(trimmed)) {
    const parsed = parseColorInput("rgb", trimmed);
    if (parsed) {
      try {
        const alpha = chroma(trimmed).alpha();
        return { ...parsed, opacity: alpha };
      } catch {
        return parsed;
      }
    }
  }

  if (/^hsla?\(/i.test(trimmed)) {
    const parsed = parseColorInput("hsl", trimmed);
    if (parsed) return parsed;
  }

  try {
    const candidate = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    if (isValidHex(candidate)) {
      return chromaToColorState(chroma(candidate));
    }
    if (chroma.valid(trimmed)) {
      return chromaToColorState(chroma(trimmed));
    }
  } catch {
    return null;
  }

  return null;
}

export function normalizeHex(value: string): string | null {
  let hex = value.trim().replace(/^#/, "");
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return null;
  return `#${hex.toUpperCase()}`;
}

export function isValidHex(value: string): boolean {
  return normalizeHex(value) !== null;
}

export function getBackgroundGradient(hex: string, dark = false): string {
  const base = chroma(hex);
  const lighter = (dark ? base.darken(1) : base.brighten(0.6)).alpha(dark ? 0.3 : 0.35).css();
  const darker = (dark ? base.darken(2.5) : base.darken(0.4)).alpha(dark ? 0.4 : 0.25).css();
  return `linear-gradient(135deg, ${lighter} 0%, ${darker} 100%)`;
}

/** Fixed (theme-independent) text colors, so they stay readable on the swatch in dark mode. */
export function getContrastText(hex: string): "text-[#ffffff]" | "text-[#171717]" {
  return chroma.contrast(hex, "white") >= 4.5 ? "text-[#ffffff]" : "text-[#171717]";
}

export function getColorKey(hex: string, opacity: number): string {
  return `${hex.toUpperCase()}-${opacity.toFixed(2)}`;
}

export function formatOpacity(opacity: number): string {
  return `${Math.round(opacity * 100)}%`;
}
