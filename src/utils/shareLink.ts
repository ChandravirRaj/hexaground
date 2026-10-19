import type { PaletteColor } from "@/types/color";

const HEX6 = /^[0-9a-f]{6}$/i;
const MAX_SHARED_COLORS = 30;
const MAX_NAME = 60;

export type SharedItem =
  | { type: "color"; hex: string; opacity: number }
  | { type: "palette"; name: string; colors: PaletteColor[] };

const bare = (hex: string) => hex.replace("#", "").toLowerCase();

function link(params: URLSearchParams): string {
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

/** `?c=287d8a&o=0.5` */
export function buildColorLink(hex: string, opacity = 1): string {
  const params = new URLSearchParams({ c: bare(hex) });
  if (opacity < 1) params.set("o", String(Math.round(opacity * 100) / 100));
  return link(params);
}

/** `?p=287d8a-ff0000&n=Name` (full opacity only; shared palettes are about the hues). */
export function buildPaletteLink(name: string, colors: PaletteColor[]): string {
  const params = new URLSearchParams({
    p: colors.slice(0, MAX_SHARED_COLORS).map((c) => bare(c.hex)).join("-"),
  });
  if (name.trim()) params.set("n", name.trim().slice(0, MAX_NAME));
  return link(params);
}

/** Reads a shared color or palette from a query string, ignoring anything malformed. */
export function parseShareParams(search: string): SharedItem | null {
  const params = new URLSearchParams(search);

  const p = params.get("p");
  if (p) {
    const hexes = p.split("-").filter((h) => HEX6.test(h)).slice(0, MAX_SHARED_COLORS);
    if (hexes.length > 0) {
      return {
        type: "palette",
        name: (params.get("n") ?? "").slice(0, MAX_NAME) || "Shared palette",
        colors: hexes.map((h) => ({ hex: `#${h.toLowerCase()}`, opacity: 1 })),
      };
    }
  }

  const c = params.get("c");
  if (c && HEX6.test(c)) {
    const o = Number(params.get("o") ?? 1);
    return {
      type: "color",
      hex: `#${c.toLowerCase()}`,
      opacity: Number.isFinite(o) ? Math.min(1, Math.max(0, o)) : 1,
    };
  }

  return null;
}
