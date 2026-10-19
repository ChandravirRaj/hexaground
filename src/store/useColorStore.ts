import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import type { ColorState, FavoriteColor, RecentColor } from "@/types/color";
import { DEFAULT_COLOR } from "@/types/color";
import {
  chromaToColorState,
  colorStateToHex,
  colorStateToHsl,
  colorStateToRgb,
  colorStateToRgba,
  getColorKey,
  parseColorInput,
  parseAnyColorInput,
} from "@/utils/color";
import { createGuardedStorage, STORAGE_KEYS } from "@/utils/storage";
import chroma from "chroma-js";

const MAX_RECENT = 20;

interface ColorStore extends ColorState {
  recentColors: RecentColor[];
  favoriteColors: FavoriteColor[];
  setColor: (hue: number, saturation: number, lightness: number) => void;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setOpacity: (opacity: number) => void;
  setFromHex: (hex: string) => boolean;
  setFromRgb: (rgb: string) => boolean;
  setFromHsl: (hsl: string) => boolean;
  setFromSearch: (value: string) => boolean;
  addRecentColor: () => void;
  addFavorite: () => void;
  removeFavorite: (id: string) => void;
  loadColor: (hex: string, opacity?: number) => void;
  isFavorite: () => boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function applyColorState(state: ColorState): Partial<ColorStore> {
  return {
    hue: clamp(state.hue, 0, 360),
    saturation: clamp(state.saturation, 0, 100),
    lightness: clamp(state.lightness, 0, 100),
    opacity: clamp(state.opacity, 0, 1),
  };
}

const guarded = createGuardedStorage();

export const useColorStore = create<ColorStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_COLOR,
      recentColors: [],
      favoriteColors: [],

      setColor: (hue, saturation, lightness) => {
        const next = applyColorState({ ...get(), hue, saturation, lightness });
        const current = get();
        if (
          next.hue === current.hue &&
          next.saturation === current.saturation &&
          next.lightness === current.lightness
        ) {
          return;
        }
        set(next);
      },

      setHue: (hue) => {
        const next = clamp(hue, 0, 360);
        if (next !== get().hue) set({ hue: next });
      },

      setSaturation: (saturation) => {
        const next = clamp(saturation, 0, 100);
        if (next !== get().saturation) set({ saturation: next });
      },

      setLightness: (lightness) => {
        const next = clamp(lightness, 0, 100);
        if (next !== get().lightness) set({ lightness: next });
      },

      setOpacity: (opacity) => {
        const next = clamp(opacity, 0, 1);
        if (next !== get().opacity) set({ opacity: next });
      },

      setFromHex: (hex) => {
        const parsed = parseColorInput("hex", hex);
        if (!parsed) return false;
        set({ ...applyColorState({ ...parsed, opacity: get().opacity }) });
        return true;
      },

      setFromRgb: (rgb) => {
        const parsed = parseColorInput("rgb", rgb);
        if (!parsed) return false;
        set({ ...applyColorState({ ...parsed, opacity: get().opacity }) });
        return true;
      },

      setFromHsl: (hsl) => {
        const parsed = parseColorInput("hsl", hsl);
        if (!parsed) return false;
        set({ ...applyColorState({ ...parsed, opacity: get().opacity }) });
        return true;
      },

      setFromSearch: (value) => {
        const parsed = parseAnyColorInput(value);
        if (!parsed) return false;
        set(applyColorState(parsed));
        return true;
      },

      addRecentColor: () => {
        const state = get();
        const hex = colorStateToHex(state);
        const key = getColorKey(hex, state.opacity);

        set({
          recentColors: [
            { hex, opacity: state.opacity, timestamp: Date.now() },
            ...state.recentColors.filter(
              (c) => getColorKey(c.hex, c.opacity) !== key
            ),
          ].slice(0, MAX_RECENT),
        });
      },

      addFavorite: () => {
        const state = get();
        const hex = colorStateToHex(state);
        const key = getColorKey(hex, state.opacity);

        if (state.favoriteColors.some((f) => getColorKey(f.hex, f.opacity) === key)) {
          return;
        }

        set({
          favoriteColors: [
            {
              id: crypto.randomUUID(),
              hex,
              opacity: state.opacity,
              savedAt: Date.now(),
            },
            ...state.favoriteColors,
          ],
        });
      },

      removeFavorite: (id) => {
        set({
          favoriteColors: get().favoriteColors.filter((f) => f.id !== id),
        });
      },

      loadColor: (hex, opacity) => {
        const color = chromaToColorState(chroma(hex), opacity ?? 1);
        set(applyColorState(color));
      },

      isFavorite: () => {
        const state = get();
        const key = getColorKey(colorStateToHex(state), state.opacity);
        return state.favoriteColors.some(
          (f) => getColorKey(f.hex, f.opacity) === key
        );
      },
    }),
    {
      name: STORAGE_KEYS.colorStore,
      partialize: (state) => ({
        recentColors: state.recentColors,
        favoriteColors: state.favoriteColors,
      }),
      merge: (persisted, current) => {
        const stored = persisted as Partial<ColorStore> | undefined;
        return {
          ...current,
          recentColors: stored?.recentColors ?? current.recentColors,
          favoriteColors: stored?.favoriteColors ?? current.favoriteColors,
        };
      },
      storage: guarded.storage,
      onRehydrateStorage: () => guarded.markHydrated,
      skipHydration: true,
    }
  )
);

export const useHue = () => useColorStore((s) => s.hue);
export const useSaturation = () => useColorStore((s) => s.saturation);
export const useLightness = () => useColorStore((s) => s.lightness);
export const useOpacity = () => useColorStore((s) => s.opacity);
export const useRecentColors = () => useColorStore((s) => s.recentColors);
export const useFavoriteColors = () => useColorStore((s) => s.favoriteColors);

export function useSelectedColorStrings() {
  return useColorStore(
    useShallow((s) => {
      const state: ColorState = {
        hue: s.hue,
        saturation: s.saturation,
        lightness: s.lightness,
        opacity: s.opacity,
      };
      return {
        hex: colorStateToHex(state),
        rgb: colorStateToRgb(state),
        rgba: colorStateToRgba(state),
        hsl: colorStateToHsl(state),
        opacity: s.opacity,
      };
    })
  );
}
