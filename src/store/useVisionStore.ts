import { create } from "zustand";

import type { VisionMode } from "@/utils/colorBlindness";

interface VisionStore {
  mode: VisionMode;
  setMode: (mode: VisionMode) => void;
}

/** Color-vision simulation applied to the app previews. Not persisted. */
export const useVisionStore = create<VisionStore>((set) => ({
  mode: "normal",
  setMode: (mode) => set({ mode }),
}));
