"use client";

import { Heart } from "lucide-react";

import { cn } from "@/lib/cn";
import { useColorStore } from "@/store/useColorStore";
import { colorStateToHex, getColorKey } from "@/utils/color";

export function FavoriteButton() {
  const addFavorite = useColorStore((s) => s.addFavorite);
  const favorited = useColorStore((s) =>
    s.favoriteColors.some(
      (f) =>
        getColorKey(f.hex, f.opacity) ===
        getColorKey(
          colorStateToHex({
            hue: s.hue,
            saturation: s.saturation,
            lightness: s.lightness,
            opacity: s.opacity,
          }),
          s.opacity
        )
    )
  );

  return (
    <button
      type="button"
      onClick={addFavorite}
      disabled={favorited}
      aria-label={favorited ? "Color already in favorites" : "Add to favorites"}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-medium shadow-soft transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        favorited
          ? "cursor-default bg-neutral-100/80 text-neutral-400"
          : "bg-white/80 text-neutral-800 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-md"
      )}
    >
      <Heart
        className={cn("h-4 w-4", favorited ? "fill-neutral-300" : "text-rose-500")}
        aria-hidden="true"
      />
      <span className="hidden lg:inline">{favorited ? "Saved" : "Add to Favorites"}</span>
    </button>
  );
}
