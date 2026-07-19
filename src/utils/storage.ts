import { getStorageKey } from "@/lib/env";

export const STORAGE_KEYS = {
  recent: getStorageKey("recent"),
  favorites: getStorageKey("favorites"),
  colorStore: getStorageKey("color-store"),
} as const;

export function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
