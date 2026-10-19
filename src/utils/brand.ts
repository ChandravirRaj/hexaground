import chroma from "chroma-js";
import type { CSSProperties } from "react";

/** The selected color, nudged until it is readable as an accent on the app surface. */
export function getBrandStyle(hex: string, dark: boolean): CSSProperties {
  const surface = dark ? "#1c1c1c" : "#ffffff";
  let color = chroma(hex).alpha(1);
  for (let i = 0; i < 12 && chroma.contrast(color, surface) < 3; i++) {
    color = dark ? color.brighten(0.4) : color.darken(0.4);
  }
  const brand = color.hex();
  const onBrand =
    chroma.contrast(brand, "#ffffff") >= chroma.contrast(brand, "#111111")
      ? "#ffffff"
      : "#111111";
  return { "--brand": brand, "--on-brand": onBrand } as CSSProperties;
}
