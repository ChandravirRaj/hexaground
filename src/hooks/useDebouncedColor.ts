"use client";

import { useEffect, useRef } from "react";

import { useColorStore } from "@/store/useColorStore";
import { colorStateToHex } from "@/utils/color";

export function useDebouncedColor(delay = 150) {
  const addRecentColor = useColorStore((s) => s.addRecentColor);
  const hue = useColorStore((s) => s.hue);
  const saturation = useColorStore((s) => s.saturation);
  const lightness = useColorStore((s) => s.lightness);
  const opacity = useColorStore((s) => s.opacity);
  const isFirstRender = useRef(true);
  const lastAdded = useRef("");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const key = `${colorStateToHex({ hue, saturation, lightness, opacity })}-${opacity.toFixed(2)}`;
      if (key !== lastAdded.current) {
        lastAdded.current = key;
        addRecentColor();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [hue, saturation, lightness, opacity, delay, addRecentColor]);
}
