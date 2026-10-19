"use client";

import { Palette, Plus, Star } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { useColorStore } from "@/store/useColorStore";
import { usePaletteStore } from "@/store/usePaletteStore";

export function PalettesList() {
  const palettes = usePaletteStore((s) => s.palettes);
  const setOpen = usePaletteStore((s) => s.setOpen);
  const loadColor = useColorStore((s) => s.loadColor);

  if (palettes.length === 0) {
    return (
      <EmptyState
        icon={Palette}
        title="No palettes yet"
        hint="Group colors into named palettes and export them as code."
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-1.5 text-xs font-semibold text-on-brand transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Create palette
        </button>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2">
        {palettes.map((palette) => (
          <li key={palette.id} className="rounded-xl bg-white/60 p-2.5 ring-1 ring-neutral-200/50">
            <p className="mb-1.5 flex items-center gap-1 truncate text-xs font-semibold text-neutral-700">
              {palette.favorite && (
                <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" aria-label="Favorite" />
              )}
              {palette.name}
              <span className="font-normal text-neutral-400">· {palette.colors.length}</span>
            </p>
            {palette.colors.length === 0 ? (
              <p className="text-[11px] text-neutral-400">Empty</p>
            ) : (
              <div className="flex overflow-hidden rounded-lg ring-1 ring-neutral-200/60">
                {palette.colors.map((color, i) => (
                  <button
                    key={`${color.hex}-${i}`}
                    type="button"
                    onClick={() => loadColor(color.hex, color.opacity)}
                    title={color.hex}
                    aria-label={`Load ${color.hex} from ${palette.name}`}
                    style={{ backgroundColor: color.hex, opacity: color.opacity }}
                    className="h-7 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="self-start rounded-lg px-2 py-1 text-xs font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        Manage palettes…
      </button>
    </div>
  );
}
