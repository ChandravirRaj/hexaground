"use client";

import { useEffect } from "react";

import { useColorStore } from "@/store/useColorStore";
import { useSharedStore } from "@/store/useSharedStore";
import { parseShareParams } from "@/utils/shareLink";

/** Opens a color or palette from the page URL once, then cleans the address bar. */
export function useShareLink() {
  useEffect(() => {
    const shared = parseShareParams(window.location.search);
    if (!shared) return;

    if (shared.type === "color") {
      useColorStore.getState().loadColor(shared.hex, shared.opacity);
    } else {
      useColorStore.getState().loadColor(shared.colors[0].hex);
      useSharedStore.getState().setPalette({ name: shared.name, colors: shared.colors });
    }
    window.history.replaceState(null, "", window.location.pathname);
  }, []);
}
