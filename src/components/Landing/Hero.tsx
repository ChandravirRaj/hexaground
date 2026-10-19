"use client";

import { ArrowDown, LogIn } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { isFirebaseConfigured } from "@/lib/firebase";

export function Hero() {
  const signIn = useAuthStore((s) => s.signIn);

  return (
    <section aria-labelledby="hero-title" className="shrink-0 pb-5 pt-2 md:pb-6">
      <h2
        id="hero-title"
        className="max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl"
      >
        Pick a <span className="text-brand">color</span>.
        <br />
        See it everywhere.
      </h2>
      <p className="mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
        Explore colors, build shades and palettes, check contrast, and preview your
        choice on real mobile and web app screens, all in one place.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {isFirebaseConfigured && (
          <button
            type="button"
            onClick={signIn}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-on-brand shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in with Google
          </button>
        )}
        <a
          href="#color-hero"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Try the picker
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
