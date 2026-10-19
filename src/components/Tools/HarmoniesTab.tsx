"use client";

import { useMemo } from "react";
import { Copy } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useColorStore, useSelectedColorStrings } from "@/store/useColorStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { formatColor } from "@/utils/formats";
import { generateHarmony, HARMONIES } from "@/utils/harmonies";

export function HarmoniesTab() {
  const { hex } = useSelectedColorStrings();
  const loadColor = useColorStore((s) => s.loadColor);
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);
  const { copy } = useCopyToClipboard();

  const rows = useMemo(
    () => HARMONIES.map((h) => ({ ...h, colors: generateHarmony(hex, h.angles) })),
    [hex]
  );

  return (
    <ul className="flex flex-col gap-2">
      {rows.map((row) => (
        <li key={row.id} className="flex items-center gap-2">
          <span className="w-32 shrink-0 truncate text-[11px] font-medium text-neutral-600">
            {row.label}
          </span>
          <div className="flex min-w-0 flex-1 overflow-hidden rounded-md ring-1 ring-neutral-200/60">
            {row.colors.map((color, i) => (
              <button
                key={`${color}-${i}`}
                type="button"
                onClick={() => loadColor(color)}
                title={color}
                aria-label={`Load ${row.label} color ${color}`}
                style={{ backgroundColor: color }}
                className="h-7 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => copy(row.colors.map((c) => formatColor(c, 1, defaultFormat)).join(", "))}
            aria-label={`Copy ${row.label} colors`}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
