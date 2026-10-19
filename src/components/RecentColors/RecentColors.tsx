"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import { Clock } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
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
    <section aria-label="Recent colors">
      {recentColors.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No recent colors"
          hint="Colors you pick will show up here."
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {recentColors.map((color, index) => (
            <MemoizedChip
              key={`${color.hex}-${color.opacity}-${color.timestamp}`}
              hex={color.hex}
              opacity={color.opacity}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}
