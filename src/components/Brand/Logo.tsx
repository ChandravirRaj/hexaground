import { useId, useMemo } from "react";
import chroma from "chroma-js";

import { cn } from "@/lib/cn";
import { env } from "@/lib/env";

// Pointy-top hexagon, radius 27, centred in a 64×64 box.
const HEXAGON = "M32 5L55.38 18.5V45.5L32 59L8.62 45.5V18.5Z";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Gradient stops and a warm glow, all derived from the selected color. */
function gradientColors(hex: string) {
  const [h, s, l] = chroma(hex).hsl();
  const hue = Number.isNaN(h) ? 220 : h;
  const sat = clamp(Number.isNaN(s) ? 0.7 : s, 0.6, 0.95);
  const light = clamp(l, 0.52, 0.62);
  const at = (shift: number, lift = 0) =>
    chroma.hsl((hue + shift + 360) % 360, sat, clamp(light + lift, 0.4, 0.75)).hex();
  return { start: at(-25), middle: at(20), end: at(70), glow: at(150, 0.08) };
}

/**
 * Hexaground mark: a soft gradient hexagon (the "hex" in a color code) holding
 * a bold H whose crossbar carries a picker dot. Colors follow the selected color.
 */
export function LogoMark({ hex, className }: { hex: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const { start, middle, end, glow } = useMemo(() => gradientColors(hex), [hex]);

  return (
    <svg viewBox="0 0 64 64" className={cn("h-8 w-8 shrink-0", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={start} />
          <stop offset="0.55" stopColor={middle} />
          <stop offset="1" stopColor={end} />
        </linearGradient>
        <radialGradient id={`${id}w`} cx="50" cy="54" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={glow} stopOpacity="0.8" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}s`} x1="0" y1="5" x2="0" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <path d={HEXAGON} />
        </clipPath>
      </defs>

      <path
        d={HEXAGON}
        fill={`url(#${id}g)`}
        stroke={`url(#${id}g)`}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <g clipPath={`url(#${id}c)`}>
        <rect width="64" height="64" fill={`url(#${id}w)`} />
        <rect y="5" width="64" height="29" fill={`url(#${id}s)`} />
      </g>

      <g fill="#fff">
        <rect x="20.5" y="19.5" width="6" height="25" rx="3" />
        <rect x="37.5" y="19.5" width="6" height="25" rx="3" />
        <rect x="23" y="29" width="18" height="6" rx="3" />
      </g>
      <circle cx="32" cy="32" r="3.7" fill="#FFC53D" stroke="#fff" strokeWidth="1.6" />
    </svg>
  );
}

/** Two-tone wordmark: "Hexa" in ink, "ground" in the accent color. */
function Wordmark() {
  const name = env.appName;
  const split = name.toLowerCase().indexOf("ground");

  return (
    <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-neutral-900">
      {split > 0 ? (
        <>
          {name.slice(0, split)}
          <span className="text-brand">{name.slice(split)}</span>
        </>
      ) : (
        name
      )}
    </span>
  );
}

export function Logo({ hex, className }: { hex: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark hex={hex} />
      <Wordmark />
    </div>
  );
}
