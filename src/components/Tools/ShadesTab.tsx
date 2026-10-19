"use client";

import { useMemo } from "react";
import { Copy } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";
import { useColorStore, useSelectedColorStrings } from "@/store/useColorStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { getContrastText } from "@/utils/color";
import { formatColor } from "@/utils/formats";
import { generateShades } from "@/utils/shades";

export function ShadesTab() {
  const { hex } = useSelectedColorStrings();
  const loadColor = useColorStore((s) => s.loadColor);
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);
  const { copy } = useCopyToClipboard();

  const shades = useMemo(() => generateShades(hex), [hex]);

  return (
    <div className="flex items-start gap-3">
      <ul
        aria-label="Shades of the selected color"
        className="grid min-w-0 flex-1 grid-cols-11 overflow-hidden rounded-lg ring-1 ring-neutral-200/60"
      >
        {shades.map((shade) => (
          <li key={shade.step}>
            <button
              type="button"
              onClick={() => loadColor(shade.hex)}
              title={`${shade.step} · ${shade.hex}${shade.isBase ? " (selected)" : ""}`}
              aria-label={`Load shade ${shade.step}, ${shade.hex}`}
              style={{ backgroundColor: shade.hex }}
              className={cn(
                "flex h-12 w-full flex-col items-center justify-end pb-1 text-[9px] font-medium",
                "transition-transform hover:z-10 hover:scale-y-110 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
                getContrastText(shade.hex)
              )}
            >
              {shade.isBase ? "●" : shade.step}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => copy(shades.map((s) => formatColor(s.hex, 1, defaultFormat)).join(", "))}
        aria-label="Copy all shades"
        title="Copy all shades"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
