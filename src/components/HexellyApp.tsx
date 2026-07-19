"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { ColorPreview } from "@/components/ColorPreview/ColorPreview";
import { ColorSearchBar } from "@/components/ColorSearchBar/ColorSearchBar";
import { CopyToast } from "@/components/CopyButton/CopyToast";
import { FavoriteColors } from "@/components/FavoriteColors/FavoriteColors";
import { RecentColors } from "@/components/RecentColors/RecentColors";
import { UIPreview } from "@/components/UIPreview/UIPreview";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useDebouncedColor } from "@/hooks/useDebouncedColor";
import { useColorStore, useSelectedColorStrings } from "@/store/useColorStore";
import { getBackgroundGradient, getColorKey, colorStateToHex } from "@/utils/color";
import { cn } from "@/lib/cn";
import { env } from "@/lib/env";

export function HexellyApp() {
  const { hex } = useSelectedColorStrings();
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

  useDebouncedColor();

  useEffect(() => {
    void useColorStore.persist.rehydrate();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        animate={{ background: getBackgroundGradient(hex) }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <div className="app-shell mx-auto flex w-full max-w-7xl flex-col px-4 py-3 sm:px-5 md:py-4">
        <header className="flex shrink-0 flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:gap-3 md:gap-4 md:pb-4">
          <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:justify-start">
            <div className="flex items-baseline gap-2.5">
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                {env.appName}
              </h1>
              <span className="hidden text-sm text-neutral-500 md:inline">
                Color Playground
              </span>
            </div>
            <button
              type="button"
              onClick={addFavorite}
              disabled={favorited}
              aria-label={favorited ? "Color already in favorites" : "Add to favorites"}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-soft transition-all duration-200 sm:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
                favorited
                  ? "cursor-default bg-neutral-100/80 text-neutral-400"
                  : "bg-white/80 text-neutral-800 backdrop-blur-sm hover:scale-[1.02] hover:shadow-md"
              )}
            >
              <Heart
                className={cn("h-4 w-4", favorited && "fill-neutral-300")}
                aria-hidden="true"
              />
              {favorited ? "Saved" : "Save"}
            </button>
          </div>

          <ColorSearchBar />

          <button
            type="button"
            onClick={addFavorite}
            disabled={favorited}
            aria-label={favorited ? "Color already in favorites" : "Add to favorites"}
            className={cn(
              "hidden shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium shadow-soft transition-all duration-200 sm:inline-flex",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
              favorited
                ? "cursor-default bg-neutral-100/80 text-neutral-400"
                : "bg-white/80 text-neutral-800 backdrop-blur-sm hover:scale-[1.02] hover:shadow-md"
            )}
          >
            <Heart
              className={cn("h-4 w-4", favorited && "fill-neutral-300")}
              aria-hidden="true"
            />
            <span className="hidden md:inline">{favorited ? "Saved" : "Add to Favorites"}</span>
            <span className="md:hidden">{favorited ? "Saved" : "Save"}</span>
          </button>
        </header>

        <main
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4",
            "md:grid md:grid-cols-2 md:gap-4 md:overflow-hidden md:pb-0",
            "lg:grid-cols-[1.1fr_0.9fr] lg:gap-5"
          )}
        >
          <GlassPanel
            title="Color Playground"
            className="flex min-h-0 flex-col md:overflow-hidden"
            contentClassName="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4"
          >
            <ColorPreview />
            <ColorPicker />
          </GlassPanel>

          <div className="flex min-h-0 flex-col gap-4 md:overflow-hidden">
            <UIPreview />
            <RecentColors />
            <FavoriteColors />
          </div>
        </main>
      </div>

      <CopyToast />
    </>
  );
}
