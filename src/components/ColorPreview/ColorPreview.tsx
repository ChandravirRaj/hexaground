"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Pipette, Star } from "lucide-react";

import { CopyButton } from "@/components/CopyButton/CopyButton";
import {
  useColorStore,
  useOpacity,
  useSelectedColorStrings,
} from "@/store/useColorStore";
import { useFeature } from "@/lib/features";
import { useSettingsStore } from "@/store/useSettingsStore";
import { formatOpacity } from "@/utils/color";
import { getColorName } from "@/utils/colorName";
import {
  EXTRA_FORMATS,
  FORMAT_LABELS,
  formatColor,
  type FormatId,
} from "@/utils/formats";
import { cn } from "@/lib/cn";

type FormatKey = "hex" | "rgb" | "rgba" | "hsl";

const FORMATS: { key: FormatKey; label: string }[] = [
  { key: "hex", label: "HEX" },
  { key: "rgb", label: "RGB" },
  { key: "rgba", label: "RGBA" },
  { key: "hsl", label: "HSL" },
];

interface EyeDropperWindow extends Window {
  EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> };
}

function DefaultMark({ format, current }: { format: FormatId; current: FormatId }) {
  if (format !== current) return null;
  return (
    <Star
      className="ml-0.5 inline h-2.5 w-2.5 fill-amber-400 text-amber-400"
      aria-label="Default format"
    />
  );
}

export function ColorPreview() {
  const colors = useSelectedColorStrings();
  const opacity = useOpacity();
  const setFromHex = useColorStore((s) => s.setFromHex);
  const setFromRgb = useColorStore((s) => s.setFromRgb);
  const setFromHsl = useColorStore((s) => s.setFromHsl);
  const loadColor = useColorStore((s) => s.loadColor);
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);

  const showName = useFeature("colorName");
  const eyedropperAllowed = useFeature("eyedropper");
  const showMore = useFeature("moreFormats");

  const [drafts, setDrafts] = useState(colors);
  const [moreOpen, setMoreOpen] = useState(false);
  const [eyedropperSupported, setEyedropperSupported] = useState(false);

  useEffect(() => {
    setEyedropperSupported("EyeDropper" in window);
  }, []);

  const pickFromScreen = useCallback(async () => {
    const Ctor = (window as EyeDropperWindow).EyeDropper;
    if (!Ctor) return;
    try {
      const { sRGBHex } = await new Ctor().open();
      loadColor(sRGBHex, opacity);
    } catch {
      // user cancelled the eyedropper
    }
  }, [loadColor, opacity]);

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
          id="color-hero"
          className="relative h-36 flex-1 overflow-hidden rounded-2xl shadow-lg sm:h-44 md:h-36 lg:h-44"
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
          {showName && (
            <span className="absolute bottom-2.5 left-2.5 rounded-lg bg-[rgba(0,0,0,0.5)] px-2.5 py-1 font-display text-xs font-medium text-[#ffffff] backdrop-blur-sm">
              {getColorName(colors.hex)}
            </span>
          )}
        </motion.div>

        <div className="flex w-24 shrink-0 flex-col gap-2 md:w-28">
          <div className="flex flex-1 flex-col justify-center rounded-lg bg-white/60 px-3 py-2 ring-1 ring-white/80 backdrop-blur-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Opacity
            </span>
            <span className="mt-1 text-lg font-semibold tabular-nums text-neutral-800">
              {formatOpacity(opacity)}
            </span>
          </div>
          {eyedropperAllowed && eyedropperSupported && (
            <button
              type="button"
              onClick={pickFromScreen}
              aria-label="Pick a color from the screen"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white/80 px-2 py-1.5 text-xs font-medium text-neutral-800 shadow-soft transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              <Pipette className="h-3.5 w-3.5" aria-hidden="true" />
              Pick
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {FORMATS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <label
              htmlFor={`color-${key}`}
              className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-neutral-400"
            >
              {label}
              <DefaultMark format={key} current={defaultFormat} />
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

      {showMore && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className="inline-flex items-center gap-1 self-start text-xs font-medium text-neutral-500 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")}
              aria-hidden="true"
            />
            More formats
          </button>

          {moreOpen && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {EXTRA_FORMATS.map((format) => {
                const value = formatColor(colors.hex, opacity, format);
                return (
                  <div key={format} className="flex items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                      {FORMAT_LABELS[format]}
                      <DefaultMark format={format} current={defaultFormat} />
                    </span>
                    <input
                      readOnly
                      value={value}
                      aria-label={FORMAT_LABELS[format]}
                      className="min-w-0 flex-1 rounded-lg border border-neutral-200/80 bg-white/80 px-2.5 py-1.5 font-mono text-xs text-neutral-900 backdrop-blur-sm focus:outline-none"
                    />
                    <CopyButton value={value} label={FORMAT_LABELS[format]} className="h-8 w-8" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
