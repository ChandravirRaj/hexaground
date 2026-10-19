import { createJSONStorage } from "zustand/middleware";

import { getStorageKey } from "@/lib/env";

export const STORAGE_KEYS = {
  recent: getStorageKey("recent"),
  favorites: getStorageKey("favorites"),
  colorStore: getStorageKey("color-store"),
  settings: getStorageKey("settings"),
} as const;

export function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/**
 * localStorage for stores that hydrate manually (skipHydration). Writes are held
 * back until hydration has finished, so an early state change can't overwrite
 * the saved data with defaults before it has been read.
 */
export function createGuardedStorage() {
  let hydrated = false;

  const storage = createJSONStorage(() => ({
    getItem: (name: string) => localStorage.getItem(name),
    setItem: (name: string, value: string) => {
      if (hydrated) localStorage.setItem(name, value);
    },
    removeItem: (name: string) => localStorage.removeItem(name),
  }));

  return {
    storage,
    /** Pass as `onRehydrateStorage: () => markHydrated`. */
    markHydrated: () => {
      hydrated = true;
    },
  };
}
