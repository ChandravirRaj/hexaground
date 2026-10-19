"use client";

import { useEffect, useState } from "react";

import { useSettingsStore } from "@/store/useSettingsStore";

/** Loads saved settings, applies the `dark` class and returns the resolved mode. */
export function useApplyTheme(): boolean {
  const theme = useSettingsStore((s) => s.theme);
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    void useSettingsStore.persist.rehydrate();
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      document.documentElement.classList.toggle("dark", dark);
      setIsDark(dark);
    };

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, ready]);

  return isDark;
}
