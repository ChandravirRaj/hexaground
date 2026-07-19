"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { CopyButton } from "@/components/CopyButton/CopyButton";
import {
  useColorStore,
  useOpacity,
  useSelectedColorStrings,
} from "@/store/useColorStore";
import { formatOpacity } from "@/utils/color";
import { cn } from "@/lib/cn";

type FormatKey = "hex" | "rgb" | "rgba" | "hsl";

const FORMATS: { key: FormatKey; label: string }[] = [
  { key: "hex", label: "HEX" },
  { key: "rgb", label: "RGB" },
  { key: "rgba", label: "RGBA" },
  { key: "hsl", label: "HSL" },
];

export function ColorPreview() {
  const colors = useSelectedColorStrings();
  const opacity = useOpacity();
  const setFromHex = useColorStore((s) => s.setFromHex);
  const setFromRgb = useColorStore((s) => s.setFromRgb);
  const setFromHsl = useColorStore((s) => s.setFromHsl);

  const [drafts, setDrafts] = useState(colors);

  useEffect(() => {
    setDrafts(colors);
  }, [colors]);

  const commit = useCallback(
    (format: FormatKey, value: string) => {
      const handlers = {
        hex: setFromHex,
        rgb: setFromRgb,
        rgba: setFromRgb,
        hsl: setFromHsl,
      };
      const ok = handlers[format](value);
      if (!ok) setDrafts(colors);
    },
    [colors, setFromHex, setFromRgb, setFromHsl]
  );

  return (
    <section aria-label="Color preview" className="flex shrink-0 flex-col gap-3">
      <div className="flex gap-3">
        <motion.div
          layout
          className="relative h-28 flex-1 overflow-hidden rounded-lg shadow-md sm:h-32 md:h-28 lg:h-36"
          animate={{ backgroundColor: colors.hex }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[repeating-conic-gradient(#e5e5e5_0%_25%,#fff_0%_50%)] [background-size:12px_12px]" />
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: colors.hex, opacity }}
            animate={{ backgroundColor: colors.hex }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="flex w-24 shrink-0 flex-col justify-center rounded-lg bg-white/60 px-3 py-2 ring-1 ring-white/80 backdrop-blur-sm md:w-28">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Opacity
          </span>
          <span className="mt-1 text-lg font-semibold tabular-nums text-neutral-800">
            {formatOpacity(opacity)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {FORMATS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <label
              htmlFor={`color-${key}`}
              className="w-10 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-neutral-400"
            >
              {label}
            </label>
            <input
              id={`color-${key}`}
              type="text"
              value={drafts[key]}
              onChange={(e) =>
                setDrafts((prev) => ({ ...prev, [key]: e.target.value }))
              }
              onBlur={() => commit(key, drafts[key])}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              className={cn(
                "min-w-0 flex-1 rounded-lg border border-neutral-200/80 bg-white/80 px-2.5 py-1.5",
                "font-mono text-xs text-neutral-900 backdrop-blur-sm",
                "transition-colors focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200/80"
              )}
              spellCheck={false}
            />
            <CopyButton value={colors[key]} label={label} className="h-8 w-8" />
          </div>
        ))}
      </div>
    </section>
  );
}
