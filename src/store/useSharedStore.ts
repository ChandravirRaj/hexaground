import { create } from "zustand";

import type { PaletteColor } from "@/types/color";

interface SharedPalette {
  name: string;
  colors: PaletteColor[];
}

interface SharedStore {
  palette: SharedPalette | null;
  setPalette: (palette: SharedPalette | null) => void;
}

/** A palette opened from a share link, shown until saved or dismissed. */
export const useSharedStore = create<SharedStore>((set) => ({
  palette: null,
  setPalette: (palette) => set({ palette }),
}));
