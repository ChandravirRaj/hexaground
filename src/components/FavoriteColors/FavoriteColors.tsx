"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";

import { CopyButton } from "@/components/CopyButton/CopyButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { useColorStore, useFavoriteColors } from "@/store/useColorStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { FORMAT_LABELS, formatColor } from "@/utils/formats";
import { cn } from "@/lib/cn";

export function FavoriteColors() {
  const favorites = useFavoriteColors();
  const loadColor = useColorStore((s) => s.loadColor);
  const removeFavorite = useColorStore((s) => s.removeFavorite);
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);

  return (
    <section aria-label="Favorite colors">
        {favorites.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            hint="Tap Add to Favorites to keep a color handy."
          />
        ) : (
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {favorites.map((favorite) => (
                <motion.div
                  key={favorite.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex shrink-0 items-center gap-3 rounded-lg bg-white/60 p-2 ring-1 ring-neutral-200/50 backdrop-blur-sm"
                >
                  <button
                    type="button"
                    onClick={() => loadColor(favorite.hex, favorite.opacity)}
                    aria-label={`Load favorite color ${favorite.hex}`}
                    className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    <span className="absolute inset-0 bg-[repeating-conic-gradient(#e5e5e5_0%_25%,#fff_0%_50%)] [background-size:8px_8px]" />
                    <span
                      className="absolute inset-0"
                      style={{
                        backgroundColor: favorite.hex,
                        opacity: favorite.opacity,
                      }}
                    />
                  </button>

                  <span className="min-w-0 flex-1 truncate font-mono text-xs font-medium text-neutral-700">
                    {favorite.hex}
                  </span>

                  <div className="flex shrink-0 items-center gap-1">
                    <CopyButton
                      value={formatColor(favorite.hex, favorite.opacity, defaultFormat)}
                      label={`${favorite.hex} ${FORMAT_LABELS[defaultFormat]}`}
                      className="h-8 w-8"
                    />
                    <button
                      type="button"
                      onClick={() => removeFavorite(favorite.id)}
                      aria-label={`Remove ${favorite.hex} from favorites`}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                        "text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
                      )}
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
    </section>
  );
}
