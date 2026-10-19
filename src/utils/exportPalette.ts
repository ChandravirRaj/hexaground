import chroma from "chroma-js";

import type { Palette, PaletteColor } from "@/types/color";

export type ExportFormat = "css" | "tailwind" | "scss" | "json";

export const EXPORT_FORMATS: {
  id: ExportFormat;
  label: string;
  extension: string;
  mime: string;
}[] = [
  { id: "css", label: "CSS", extension: "css", mime: "text/css" },
  { id: "tailwind", label: "Tailwind", extension: "js", mime: "text/javascript" },
  { id: "scss", label: "SCSS", extension: "scss", mime: "text/x-scss" },
  { id: "json", label: "JSON", extension: "json", mime: "application/json" },
];

export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "palette";
}

function cssValue({ hex, opacity }: PaletteColor): string {
  if (opacity >= 1) return hex.toLowerCase();
  const [r, g, b] = chroma(hex).rgb();
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${parseFloat(opacity.toFixed(2))})`;
}

export function exportPalette(palette: Palette, format: ExportFormat): string {
  const slug = slugify(palette.name);
  const colors = palette.colors.map((c, i) => ({ step: i + 1, value: cssValue(c) }));

  switch (format) {
    case "css":
      return [
        ":root {",
        ...colors.map((c) => `  --${slug}-${c.step}: ${c.value};`),
        "}",
        "",
      ].join("\n");

    case "scss":
      return colors.map((c) => `$${slug}-${c.step}: ${c.value};`).join("\n") + "\n";

    case "tailwind":
      return [
        "/** @type {import('tailwindcss').Config} */",
        "module.exports = {",
        "  theme: {",
        "    extend: {",
        "      colors: {",
        `        "${slug}": {`,
        ...colors.map((c) => `          ${c.step}: "${c.value}",`),
        "        },",
        "      },",
        "    },",
        "  },",
        "};",
        "",
      ].join("\n");

    case "json":
      return (
        JSON.stringify(
          {
            [slug]: Object.fromEntries(
              colors.map((c) => [String(c.step), { value: c.value, type: "color" }])
            ),
          },
          null,
          2
        ) + "\n"
      );
  }
}

export function downloadText(filename: string, text: string, mime: string) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
