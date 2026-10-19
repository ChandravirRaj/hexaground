"use client";

import { Link2 } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";
import { useColorStore } from "@/store/useColorStore";
import { colorStateToHex } from "@/utils/color";
import { buildColorLink } from "@/utils/shareLink";

export function ShareButton() {
  const { copy } = useCopyToClipboard();
  const share = () => {
    const s = useColorStore.getState();
    const hex = colorStateToHex({
      hue: s.hue,
      saturation: s.saturation,
      lightness: s.lightness,
      opacity: s.opacity,
    });
    void copy(buildColorLink(hex, s.opacity));
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Copy a link to this color"
      title="Copy a link to this color"
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-white/80 px-3 text-sm font-medium text-neutral-800 shadow-soft backdrop-blur-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      )}
    >
      <Link2 className="h-4 w-4" aria-hidden="true" />
      <span className="hidden lg:inline">Share</span>
    </button>
  );
}
