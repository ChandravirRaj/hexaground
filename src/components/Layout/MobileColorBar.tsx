"use client";

import { useEffect, useState } from "react";

import { CopyButton } from "@/components/CopyButton/CopyButton";
import { useSelectedColorStrings } from "@/store/useColorStore";
import { getColorName } from "@/utils/colorName";

/** Phone-only bar that keeps the current color visible once the big swatch scrolls away. */
export function MobileColorBar() {
  const { hex, opacity } = useSelectedColorStrings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("color-hero");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-30 flex items-center gap-3 border-b border-white/50 bg-white/80 px-4 py-2 shadow-soft backdrop-blur-xl md:hidden">
      <span
        className="h-8 w-8 shrink-0 rounded-lg ring-1 ring-neutral-200"
        style={{ backgroundColor: hex, opacity: Math.max(opacity, 0.15) }}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs font-semibold text-neutral-800">{hex}</p>
        <p className="truncate text-[11px] text-neutral-500">{getColorName(hex)}</p>
      </div>
      <CopyButton value={hex} label="HEX" className="h-8 w-8" />
    </div>
  );
}
