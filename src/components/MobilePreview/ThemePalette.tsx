"use client";

import { useEffect, useRef, useState } from "react";
import chroma from "chroma-js";
import { Copy, Palette, X } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";
import { useSettingsStore } from "@/store/useSettingsStore";
import { formatColor } from "@/utils/formats";
import {
  exportTheme,
  THEME_EXPORT_FORMATS,
  THEME_GROUPS,
  type MobileTheme,
} from "@/utils/mobileTheme";

function rating(ratio: number): { label: string; className: string } {
  if (ratio >= 7) return { label: "AAA", className: "bg-emerald-100 text-emerald-800" };
  if (ratio >= 4.5) return { label: "AA", className: "bg-emerald-100 text-emerald-800" };
  if (ratio >= 3) return { label: "AA large", className: "bg-amber-100 text-amber-800" };
  return { label: "Fail", className: "bg-red-100 text-red-700" };
}

export function ThemePalette({ theme }: { theme: MobileTheme }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);
  const { copy } = useCopyToClipboard();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const preview = [theme.primary, theme.accent, theme.container, theme.bg];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <Palette className="h-3.5 w-3.5" aria-hidden="true" />
        Theme
        <span className="hidden items-center sm:flex" aria-hidden="true">
          {preview.map((c, i) => (
            <span
              key={i}
              className="-ml-1 h-4 w-4 rounded-full ring-2 ring-neutral-800 first:ml-0"
              style={{ backgroundColor: c }}
            />
          ))}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Theme colors"
          className={cn(
            "z-20 flex max-h-[80vh] flex-col overflow-hidden bg-neutral-50 text-neutral-900 shadow-2xl ring-1 ring-neutral-200",
            "fixed inset-x-0 bottom-0 rounded-t-2xl",
            "sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-10 sm:w-[22rem] sm:rounded-xl"
          )}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold">Theme colors</h3>
              <p className="text-[11px] text-neutral-500">Tap a color to copy it.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close theme colors"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {THEME_GROUPS.map((group) => (
              <section key={group.label} className="mb-4 last:mb-0">
                <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  {group.label}
                </h4>
                <ul className="flex flex-col gap-1">
                  {group.tokens.map(({ key, label, on }) => {
                    const hex = theme[key];
                    const score = on ? rating(chroma.contrast(hex, theme[on])) : null;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => copy(formatColor(hex, 1, defaultFormat))}
                          title={`Copy ${label}`}
                          className="flex w-full items-center gap-3 rounded-lg px-1.5 py-1 text-left hover:bg-neutral-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                        >
                          <span
                            className="h-8 w-8 shrink-0 rounded-md ring-1 ring-black/10"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-medium">{label}</span>
                            <span className="block font-mono text-[10px] uppercase text-neutral-500">{hex}</span>
                          </span>
                          {score && on && (
                            <span
                              className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", score.className)}
                              title={`Contrast against ${on}: ${chroma.contrast(hex, theme[on]).toFixed(2)}:1`}
                            >
                              {score.label}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <div className="border-t border-neutral-200 px-4 py-3">
            <p className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold text-neutral-600">
              <Copy className="h-3 w-3" aria-hidden="true" /> Copy all as
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {THEME_EXPORT_FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => copy(exportTheme(theme, f.id))}
                  className="rounded-lg bg-neutral-900 px-2 py-1.5 text-[11px] font-medium text-white hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-1"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
