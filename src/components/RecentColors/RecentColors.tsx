"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { useColorStore, useRecentColors } from "@/store/useColorStore";
import { cn } from "@/lib/cn";

function RecentColorChip({
  hex,
  opacity,
  index,
}: {
  hex: string;
  opacity: number;
  index: number;
}) {
  const loadColor = useColorStore((s) => s.loadColor);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => loadColor(hex, opacity)}
      aria-label={`Load color ${hex}`}
      className={cn(
        "relative h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-sm",
        "md:h-9 md:w-9",
        "ring-1 ring-neutral-200/80 transition-shadow hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
      )}
    >
      <span className="absolute inset-0 bg-[repeating-conic-gradient(#e5e5e5_0%_25%,#fff_0%_50%)] [background-size:6px_6px]" />
      <span
        className="absolute inset-0"
        style={{ backgroundColor: hex, opacity }}
      />
    </motion.button>
  );
}

const MemoizedChip = memo(RecentColorChip);

export function RecentColors() {
  const recentColors = useRecentColors();

  return (
    <GlassPanel
      title="Recent Colors"
      contentClassName="p-4"
      className="shrink-0"
    >
      <section aria-label="Recent colors">
        {recentColors.length === 0 ? (
          <p className="text-xs text-neutral-500">Colors you pick will appear here.</p>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex flex-1 gap-2 overflow-x-auto pb-0.5">
              {recentColors.map((color, index) => (
                <MemoizedChip
                  key={`${color.hex}-${color.opacity}-${color.timestamp}`}
                  hex={color.hex}
                  opacity={color.opacity}
                  index={index}
                />
              ))}
            </div>
            <span className="shrink-0 text-[10px] tabular-nums text-neutral-400">
              {recentColors.length}
            </span>
          </div>
        )}
      </section>
    </GlassPanel>
  );
}
