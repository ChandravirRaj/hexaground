"use client";

import { Contrast, Layers, Lock, Palette, Smartphone } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";

const FEATURES = [
  {
    icon: Layers,
    title: "Shades & harmonies",
    text: "A 50–950 scale and five harmony schemes for any color.",
  },
  {
    icon: Contrast,
    title: "Contrast checker",
    text: "WCAG ratios with AA / AAA pass or fail at a glance.",
  },
  {
    icon: Palette,
    title: "Palettes",
    text: "Save named palettes to your account and export them as code.",
  },
  {
    icon: Smartphone,
    title: "App preview",
    text: "See your color on mobile and web screens for food, shop, salon and fitness apps.",
  },
];

export function FeatureCards() {
  const signIn = useAuthStore((s) => s.signIn);

  return (
    <section aria-labelledby="features-title" className="shrink-0 pb-8 pt-8">
      <h2 id="features-title" className="font-display text-xl font-bold tracking-tight text-neutral-900">
        Sign in to unlock more
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Your favorites, palettes and settings sync across every device.
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.06} className="h-full">
              <div className="relative h-full rounded-3xl bg-white/70 p-4 shadow-soft ring-1 ring-white/60 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-on-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <Lock
                  className="absolute right-4 top-4 h-3.5 w-3.5 text-neutral-400"
                  aria-label="Requires sign in"
                />
                <h3 className="mt-3 font-display text-sm font-bold text-neutral-900">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">{text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {isFirebaseConfigured && (
        <button
          type="button"
          onClick={signIn}
          className="mt-5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-on-brand shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Sign in with Google, it&apos;s free
        </button>
      )}
    </section>
  );
}
