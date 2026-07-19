"use client";

import chroma from "chroma-js";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { useSelectedColorStrings } from "@/store/useColorStore";
import { getContrastText } from "@/utils/color";
import { cn } from "@/lib/cn";

export function UIPreview() {
  const { hex } = useSelectedColorStrings();
  const textClass = getContrastText(hex);
  const tintedBg = chroma(hex).alpha(0.12).css();

  return (
    <GlassPanel title="Live UI Preview" contentClassName="p-4">
      <div
        aria-label="Live UI preview"
        className={cn(
          "flex flex-wrap items-center gap-3",
          "md:grid md:grid-cols-2 md:gap-3",
          "lg:flex lg:flex-nowrap lg:justify-between"
        )}
      >
        <button
          type="button"
          className={cn(
            "rounded-lg px-4 py-2 text-xs font-medium shadow-sm transition-transform duration-200 hover:scale-[1.02]",
            textClass
          )}
          style={{ backgroundColor: hex }}
        >
          Button
        </button>

        <div
          className="rounded-lg border border-neutral-200/60 p-3 shadow-sm md:justify-self-end lg:justify-self-auto"
          style={{ backgroundColor: tintedBg }}
        >
          <p className="text-xs font-medium text-neutral-800">Card</p>
          <p className="mt-0.5 text-[10px] text-neutral-500">Preview</p>
        </div>

        <input
          type="text"
          placeholder="Input field"
          aria-label="Preview input field"
          className="min-w-[120px] flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-900 outline-none transition-shadow md:col-span-2 md:min-w-0 lg:col-span-1 lg:max-w-[140px]"
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 3px ${chroma(hex).alpha(0.25).hex()}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        />

        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold",
            textClass
          )}
          style={{ backgroundColor: hex }}
        >
          Badge
        </span>
      </div>
    </GlassPanel>
  );
}
