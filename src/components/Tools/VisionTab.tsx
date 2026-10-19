"use client";

import { useMemo } from "react";

import { cn } from "@/lib/cn";
import { useSelectedColorStrings } from "@/store/useColorStore";
import { useVisionStore } from "@/store/useVisionStore";
import { simulateHex, VISION_MODES } from "@/utils/colorBlindness";

export function VisionTab() {
  const { hex } = useSelectedColorStrings();
  const mode = useVisionStore((s) => s.mode);
  const setMode = useVisionStore((s) => s.setMode);

  const simulated = useMemo(
    () => VISION_MODES.map((m) => ({ ...m, hex: simulateHex(hex, m.id) })),
    [hex]
  );

  return (
    <div>
      <ul className="grid grid-cols-5 gap-1.5" aria-label="Selected color as seen with color blindness">
        {simulated.map((m) => (
          <li key={m.id} className="min-w-0">
            <button
              type="button"
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              title={`${m.label}: ${m.hint}. Use in App preview.`}
              className={cn(
                "w-full rounded-lg p-1 text-center transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                mode === m.id ? "bg-brand/15 ring-1 ring-brand" : "hover:bg-neutral-100"
              )}
            >
              <span
                className="block h-10 rounded-md ring-1 ring-black/5"
                style={{ backgroundColor: m.hex }}
              />
              <span className="mt-1 block truncate text-[10px] font-medium text-neutral-700">
                {m.label}
              </span>
              <span className="block truncate font-mono text-[9px] text-neutral-500">{m.hex}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 text-[11px] text-neutral-500">
        Pick one to apply it to App preview screens.
      </p>
    </div>
  );
}
