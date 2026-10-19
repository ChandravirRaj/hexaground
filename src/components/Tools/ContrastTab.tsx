"use client";

import { useState } from "react";
import chroma from "chroma-js";
import { ArrowLeftRight, Check, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { useColorStore, useSelectedColorStrings } from "@/store/useColorStore";

const CHECKS = [
  { label: "AA", sub: "Normal text", min: 4.5 },
  { label: "AA", sub: "Large text", min: 3 },
  { label: "AAA", sub: "Normal text", min: 7 },
  { label: "AAA", sub: "Large text", min: 4.5 },
];

export function ContrastTab() {
  const { hex } = useSelectedColorStrings();
  const loadColor = useColorStore((s) => s.loadColor);
  const [bgInput, setBgInput] = useState("#FFFFFF");

  const fg = chroma(hex).hex("rgb");
  const bgValid = chroma.valid(bgInput);
  const bg = bgValid ? chroma(bgInput).hex("rgb") : "#ffffff";
  const ratio = chroma.contrast(fg, bg);

  const swap = () => {
    setBgInput(fg.toUpperCase());
    loadColor(bg);
  };

  return (
    <div className="flex gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="contrast-bg" className="shrink-0 text-[11px] font-medium text-neutral-600">
            Background
          </label>
          <input
            id="contrast-bg"
            value={bgInput}
            onChange={(e) => setBgInput(e.target.value)}
            spellCheck={false}
            aria-invalid={!bgValid}
            className={cn(
              "min-w-0 flex-1 rounded-lg border bg-white/80 px-2 py-1 font-mono text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200",
              bgValid ? "border-neutral-200/80" : "border-red-400"
            )}
          />
          <button
            type="button"
            onClick={swap}
            disabled={!bgValid}
            aria-label="Swap text and background colors"
            title="Swap colors"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex gap-1.5">
          {["#FFFFFF", "#000000"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setBgInput(preset)}
              className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600 hover:bg-neutral-200"
            >
              {preset === "#FFFFFF" ? "White" : "Black"}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
          {CHECKS.map((check) => {
            const pass = ratio >= check.min;
            return (
              <li key={`${check.label}-${check.sub}`} className="flex items-center gap-1.5 text-[11px]">
                {pass ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-label="Pass" />
                ) : (
                  <X className="h-3.5 w-3.5 shrink-0 text-red-500" aria-label="Fail" />
                )}
                <span className="font-semibold text-neutral-700">{check.label}</span>
                <span className="truncate text-neutral-500">{check.sub}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="flex w-28 shrink-0 flex-col items-center justify-center rounded-lg p-2 ring-1 ring-neutral-200/60"
        style={{ backgroundColor: bg, color: fg }}
        aria-label="Contrast sample"
      >
        <span className="text-xl font-bold tabular-nums">{ratio.toFixed(2)}:1</span>
        <span className="text-[11px]">Aa — Sample text</span>
      </div>
    </div>
  );
}
