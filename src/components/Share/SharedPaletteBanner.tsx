"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { useColorStore } from "@/store/useColorStore";
import { usePaletteStore } from "@/store/usePaletteStore";
import { useSharedStore } from "@/store/useSharedStore";
import { getContrastText } from "@/utils/color";

export function SharedPaletteBanner() {
  const palette = useSharedStore((s) => s.palette);
  const setPalette = useSharedStore((s) => s.setPalette);
  const signedIn = useAuthStore((s) => s.user !== null);
  const signIn = useAuthStore((s) => s.signIn);
  const createPalette = usePaletteStore((s) => s.createPalette);
  const loadColor = useColorStore((s) => s.loadColor);
  const [saved, setSaved] = useState(false);

  if (!palette) return null;

  const save = async () => {
    if (!signedIn) return void signIn();
    await createPalette(palette.name, palette.colors);
    setSaved(true);
  };

  return (
    <section
      aria-label="Shared palette"
      className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-soft ring-1 ring-white/80 backdrop-blur-sm"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-neutral-800">{palette.name}</p>
        <p className="text-[11px] text-neutral-500">Shared with you. Click a color to load it.</p>
      </div>
      <ul className="flex min-w-0 flex-1 flex-wrap gap-1.5">
        {palette.colors.map((c) => (
          <li key={c.hex}>
            <button
              type="button"
              onClick={() => loadColor(c.hex, c.opacity)}
              aria-label={`Load ${c.hex}`}
              style={{ backgroundColor: c.hex }}
              className={`h-9 rounded-lg px-2 font-mono text-[10px] ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${getContrastText(c.hex)}`}
            >
              {c.hex.slice(1).toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={saved}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-on-brand shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {saved && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
          {saved ? "Saved" : signedIn ? "Save to my palettes" : "Sign in to save"}
        </button>
        <button
          type="button"
          onClick={() => setPalette(null)}
          aria-label="Dismiss shared palette"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
