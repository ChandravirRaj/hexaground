"use client";

import { Library, Palette, SlidersHorizontal, User } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { useSettingsStore } from "@/store/useSettingsStore";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

const itemClass =
  "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";

export function MobileNav() {
  const signedIn = useAuthStore((s) => s.user !== null);
  const signIn = useAuthStore((s) => s.signIn);
  const openSettings = useSettingsStore((s) => s.setSettingsOpen);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 flex gap-1 border-t border-white/50 bg-white/85 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 shadow-soft backdrop-blur-xl md:hidden"
    >
      <button type="button" className={itemClass} onClick={() => scrollToId("canvas")}>
        <Palette className="h-5 w-5" aria-hidden="true" />
        Pick
      </button>
      <button type="button" className={itemClass} onClick={() => scrollToId("tools")}>
        <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
        Tools
      </button>
      <button type="button" className={itemClass} onClick={() => scrollToId("library")}>
        <Library className="h-5 w-5" aria-hidden="true" />
        Library
      </button>
      <button
        type="button"
        className={itemClass}
        onClick={() => (signedIn ? openSettings(true) : void signIn())}
      >
        <User className="h-5 w-5" aria-hidden="true" />
        {signedIn ? "Profile" : "Sign in"}
      </button>
    </nav>
  );
}
