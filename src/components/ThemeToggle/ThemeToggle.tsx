"use client";

import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/cn";
import { useSettingsStore } from "@/store/useSettingsStore";

export function ThemeToggle({ isDark }: { isDark: boolean }) {
  const setTheme = useSettingsStore((s) => s.setTheme);
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-soft transition-all duration-200",
        "bg-white/80 text-neutral-800 backdrop-blur-sm hover:scale-[1.04] hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
