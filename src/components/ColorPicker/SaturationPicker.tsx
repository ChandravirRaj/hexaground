"use client";

import { useCallback, useRef } from "react";
import chroma from "chroma-js";

import { useColorStore, useHue, useLightness, useSaturation } from "@/store/useColorStore";
import { cn } from "@/lib/cn";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function SaturationPicker() {
  const hue = useHue();
  const saturation = useSaturation();
  const lightness = useLightness();
  const setColor = useColorStore((s) => s.setColor);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const s = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      const l = clamp((1 - (clientY - rect.top) / rect.height) * 100, 0, 100);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setColor(hue, s, l));
    },
    [hue, setColor]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    updateFromPointer(e.clientX, e.clientY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1;
    let s = saturation;
    let l = lightness;

    switch (e.key) {
      case "ArrowRight":
        s += step;
        break;
      case "ArrowLeft":
        s -= step;
        break;
      case "ArrowUp":
        l += step;
        break;
      case "ArrowDown":
        l -= step;
        break;
      default:
        return;
    }

    e.preventDefault();
    setColor(hue, clamp(s, 0, 100), clamp(l, 0, 100));
  };

  const hueColor = chroma.hsl(hue, 1, 0.5).hex();
  const pointerColor = chroma.hsl(hue, saturation / 100, lightness / 100).hex();

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label="Saturation and lightness"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(saturation)}
      aria-valuetext={`Saturation ${Math.round(saturation)}%, Lightness ${Math.round(lightness)}%`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative h-full min-h-[80px] w-full cursor-crosshair overflow-hidden rounded-lg",
        "shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
      )}
      style={{
        background: `
          linear-gradient(to top, #000, transparent),
          linear-gradient(to right, #fff, ${hueColor})
        `,
      }}
    >
      <div
        className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        style={{
          left: `${saturation}%`,
          top: `${100 - lightness}%`,
          backgroundColor: pointerColor,
        }}
      />
    </div>
  );
}
