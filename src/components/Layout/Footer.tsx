"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/Brand/Logo";
import { env } from "@/lib/env";
import { useAuthStore } from "@/store/useAuthStore";
import { useMobilePreviewStore } from "@/store/useMobilePreviewStore";
import { usePaletteStore } from "@/store/usePaletteStore";
import { useSettingsStore } from "@/store/useSettingsStore";

const linkClass =
  "text-left text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded";

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

export function Footer({ hex }: { hex: string }) {
  const signedIn = useAuthStore((s) => s.user !== null);
  const signIn = useAuthStore((s) => s.signIn);
  const openPalettes = usePaletteStore((s) => s.setOpen);
  const openPreview = useMobilePreviewStore((s) => s.setOpen);
  const openSettings = useSettingsStore((s) => s.setSettingsOpen);

  return (
    <footer className="mt-6 shrink-0 rounded-2xl bg-white/70 px-4 py-3 shadow-soft ring-1 ring-white/60 backdrop-blur-xl md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Logo hex={hex} className="[&_span]:text-base [&_svg]:h-6 [&_svg]:w-6" />

        <nav aria-label="Footer" className="order-3 flex w-full flex-wrap gap-x-5 gap-y-1 md:order-none md:w-auto">
          <a href="#canvas" className={linkClass}>Playground</a>
          <a href="#tools" className={linkClass}>Tools</a>
          <a href="#library" className={linkClass}>Library</a>
          {signedIn ? (
            <>
              <button type="button" className={linkClass} onClick={() => openPalettes(true)}>Palettes</button>
              <button type="button" className={linkClass} onClick={() => openPreview(true)}>App preview</button>
              <button type="button" className={linkClass} onClick={() => openSettings(true)}>Settings</button>
            </>
          ) : (
            <button type="button" className={linkClass} onClick={() => void signIn()}>Sign in</button>
          )}
        </nav>

        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {env.appName}</p>
          <Link href="/privacy" className={linkClass}>Privacy</Link>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
