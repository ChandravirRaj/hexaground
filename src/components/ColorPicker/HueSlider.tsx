"use client";

import { useColorStore, useHue } from "@/store/useColorStore";
import { useSlider } from "@/hooks/useSlider";
import { cn } from "@/lib/cn";

export function HueSlider() {
  const hue = useHue();
  const setHue = useColorStore((s) => s.setHue);

  const { trackRef, percent, handlePointerDown, handlePointerMove, handleKeyDown } =
    useSlider({
      value: hue,
      min: 0,
      max: 360,
      horizontal: true,
      onChange: setHue,
    });

  return (
    <div className="shrink-0 space-y-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
        Hue
      </label>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Hue"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hue)}
        aria-valuetext={`${Math.round(hue)} degrees`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative h-4 w-full cursor-pointer rounded-full",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
        )}
        style={{
          background:
            "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
        }}
      >
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-md"
          style={{ left: `${percent}%` }}
        />
      </div>
    </div>
  );
}
