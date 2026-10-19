import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PreviewDevice } from "@/types/design";
import { createGuardedStorage, STORAGE_KEYS } from "@/utils/storage";
import { isFormatId, type FormatId } from "@/utils/formats";
import { isPreviewCategoryId, type PreviewCategoryId } from "@/utils/previewCategories";

export type ThemePreference = "system" | "light" | "dark";

interface SettingsStore {
  theme: ThemePreference;
  defaultFormat: FormatId;
  previewCategory: PreviewCategoryId;
  previewDevice: PreviewDevice;
  settingsOpen: boolean;
  setTheme: (theme: ThemePreference) => void;
  setDefaultFormat: (format: FormatId) => void;
  setPreviewCategory: (category: PreviewCategoryId) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  setSettingsOpen: (open: boolean) => void;
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

const guarded = createGuardedStorage();

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: "system",
      defaultFormat: "hex",
      previewCategory: "general",
      previewDevice: "mobile",
      settingsOpen: false,
      setTheme: (theme) => set({ theme }),
      setDefaultFormat: (defaultFormat) => set({ defaultFormat }),
      setPreviewCategory: (previewCategory) => set({ previewCategory }),
      setPreviewDevice: (previewDevice) => set({ previewDevice }),
      setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
    }),
    {
      name: STORAGE_KEYS.settings,
      partialize: (state) => ({
        theme: state.theme,
        defaultFormat: state.defaultFormat,
        previewCategory: state.previewCategory,
        previewDevice: state.previewDevice,
      }),
      merge: (persisted, current) => {
        const stored = persisted as Partial<SettingsStore> | undefined;
        return {
          ...current,
          theme: isThemePreference(stored?.theme) ? stored.theme : current.theme,
          defaultFormat: isFormatId(stored?.defaultFormat)
            ? stored.defaultFormat
            : current.defaultFormat,
          previewCategory: isPreviewCategoryId(stored?.previewCategory)
            ? stored.previewCategory
            : current.previewCategory,
          previewDevice:
            stored?.previewDevice === "web" || stored?.previewDevice === "mobile"
              ? stored.previewDevice
              : current.previewDevice,
        };
      },
      storage: guarded.storage,
      onRehydrateStorage: () => guarded.markHydrated,
      skipHydration: true,
    }
  )
);
