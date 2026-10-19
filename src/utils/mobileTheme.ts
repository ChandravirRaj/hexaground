import chroma from "chroma-js";
import type { CSSProperties } from "react";

export type ThemeMode = "light" | "dark";
export type ThemeScheme = "monochrome" | "analogous" | "complementary";

export interface MobileTheme {
  primary: string;
  onPrimary: string;
  /** Primary adjusted so it stays readable as text/icons on the surface. */
  ink: string;
  container: string;
  onContainer: string;
  accent: string;
  onAccent: string;
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  success: string;
  warning: string;
  danger: string;
}

const HUE_SHIFT: Record<ThemeScheme, number> = {
  monochrome: 0,
  analogous: 30,
  complementary: 180,
};

function onColor(background: string): string {
  return chroma.contrast(background, "#ffffff") >= chroma.contrast(background, "#111111")
    ? "#ffffff"
    : "#111111";
}

/** Nudge `color` until it reaches `minContrast` against `against`. */
function ensureContrast(color: string, against: string, minContrast: number, dark: boolean) {
  let current = chroma(color);
  for (let i = 0; i < 12 && chroma.contrast(current, against) < minContrast; i++) {
    current = dark ? current.brighten(0.4) : current.darken(0.4);
  }
  return current.hex();
}

export function generateMobileTheme(
  hex: string,
  mode: ThemeMode,
  scheme: ThemeScheme
): MobileTheme {
  const dark = mode === "dark";
  const base = chroma(hex);
  const [h, s] = base.hsl();
  const hue = Number.isNaN(h) ? 220 : h;
  const sat = Math.min(0.85, Math.max(0.5, Number.isNaN(s) ? 0.5 : s));
  const hsl = (hh: number, ss: number, ll: number) => chroma.hsl(hh, ss, ll).hex();

  const primary = base.hex("rgb");
  const accent = hsl((hue + HUE_SHIFT[scheme]) % 360, sat, dark ? 0.62 : 0.52);
  const surface = dark ? hsl(hue, 0.18, 0.12) : "#ffffff";

  return {
    primary,
    onPrimary: onColor(primary),
    ink: ensureContrast(primary, surface, 3, dark),
    container: dark ? hsl(hue, 0.4, 0.2) : hsl(hue, 0.7, 0.93),
    onContainer: dark ? hsl(hue, 0.7, 0.85) : hsl(hue, 0.6, 0.22),
    accent,
    onAccent: onColor(accent),
    bg: dark ? hsl(hue, 0.2, 0.07) : hsl(hue, 0.3, 0.97),
    surface,
    border: dark ? hsl(hue, 0.15, 0.22) : hsl(hue, 0.2, 0.9),
    text: dark ? hsl(hue, 0.15, 0.95) : hsl(hue, 0.25, 0.12),
    muted: dark ? hsl(hue, 0.1, 0.65) : hsl(hue, 0.1, 0.42),
    success: hsl(145, 0.55, dark ? 0.5 : 0.38),
    warning: hsl(38, 0.9, dark ? 0.55 : 0.45),
    danger: hsl(2, 0.7, dark ? 0.6 : 0.5),
  };
}

export function themeToStyle(theme: MobileTheme): CSSProperties {
  const vars: Record<string, string> = {
    "--m-primary": theme.primary,
    "--m-on-primary": theme.onPrimary,
    "--m-ink": theme.ink,
    "--m-container": theme.container,
    "--m-on-container": theme.onContainer,
    "--m-accent": theme.accent,
    "--m-on-accent": theme.onAccent,
    "--m-bg": theme.bg,
    "--m-surface": theme.surface,
    "--m-border": theme.border,
    "--m-text": theme.text,
    "--m-muted": theme.muted,
    "--m-success": theme.success,
    "--m-warning": theme.warning,
    "--m-danger": theme.danger,
  };
  return vars as CSSProperties;
}

export type ThemeToken = keyof MobileTheme;

export const THEME_GROUPS: {
  label: string;
  tokens: { key: ThemeToken; label: string; on?: ThemeToken }[];
}[] = [
  {
    label: "Brand",
    tokens: [
      { key: "primary", label: "Primary", on: "onPrimary" },
      { key: "onPrimary", label: "On primary" },
      { key: "ink", label: "Ink", on: "surface" },
      { key: "accent", label: "Accent", on: "onAccent" },
      { key: "onAccent", label: "On accent" },
    ],
  },
  {
    label: "Surfaces",
    tokens: [
      { key: "bg", label: "Background", on: "text" },
      { key: "surface", label: "Surface", on: "text" },
      { key: "container", label: "Container", on: "onContainer" },
      { key: "onContainer", label: "On container" },
      { key: "border", label: "Border" },
    ],
  },
  {
    label: "Text",
    tokens: [
      { key: "text", label: "Text", on: "bg" },
      { key: "muted", label: "Muted", on: "surface" },
    ],
  },
  {
    label: "Status",
    tokens: [
      { key: "success", label: "Success" },
      { key: "warning", label: "Warning" },
      { key: "danger", label: "Danger" },
    ],
  },
];

export type ThemeExportFormat = "css" | "tailwind" | "flutter" | "android";

export const THEME_EXPORT_FORMATS: { id: ThemeExportFormat; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "tailwind", label: "Tailwind" },
  { id: "flutter", label: "Flutter" },
  { id: "android", label: "Android" },
];

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const snake = (key: string) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
const entries = (theme: MobileTheme) => Object.entries(theme) as [ThemeToken, string][];

/** The theme as code for a given platform. */
export function exportTheme(theme: MobileTheme, format: ThemeExportFormat): string {
  switch (format) {
    case "css":
      return `:root {\n${entries(theme).map(([k, v]) => `  --color-${kebab(k)}: ${v};`).join("\n")}\n}`;
    case "tailwind":
      return [
        "// tailwind.config.js",
        "module.exports = {",
        "  theme: {",
        "    extend: {",
        "      colors: {",
        ...entries(theme).map(([k, v]) => `        "${kebab(k)}": "${v}",`),
        "      },",
        "    },",
        "  },",
        "};",
      ].join("\n");
    case "flutter":
      return [
        "import 'package:flutter/material.dart';",
        "",
        "abstract final class AppColors {",
        ...entries(theme).map(
          ([k, v]) => `  static const Color ${k} = Color(0xFF${v.slice(1).toUpperCase()});`
        ),
        "}",
      ].join("\n");
    case "android":
      return [
        '<?xml version="1.0" encoding="utf-8"?>',
        "<resources>",
        ...entries(theme).map(([k, v]) => `    <color name="${snake(k)}">${v.toUpperCase()}</color>`),
        "</resources>",
      ].join("\n");
  }
}
