"use client";

import { useColorStore, useOpacity, useSelectedColorStrings } from "@/store/useColorStore";
import { useSlider } from "@/hooks/useSlider";
import { cn } from "@/lib/cn";

export function OpacitySlider() {
  const opacity = useOpacity();
  const { hex } = useSelectedColorStrings();
  const setOpacity = useColorStore((s) => s.setOpacity);

  const { trackRef, percent, handlePointerDown, handlePointerMove, handleKeyDown } =
    useSlider({
      value: opacity * 100,
      min: 0,
      max: 100,
      horizontal: true,
      onChange: (v) => setOpacity(v / 100),
    });

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
        Opacity
      </label>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Opacity"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(opacity * 100)}
        aria-valuetext={`${Math.round(opacity * 100)} percent`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative h-4 w-full cursor-pointer overflow-hidden rounded-full ring-1 ring-neutral-200/80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
        )}
      >
        <div className="absolute inset-0 bg-[repeating-conic-gradient(#d4d4d4_0%_25%,#fff_0%_50%)] [background-size:10px_10px]" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, transparent, ${hex})`,
          }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-md"
          style={{ left: `${percent}%` }}
        />
      </div>
    </div>
  );
}
