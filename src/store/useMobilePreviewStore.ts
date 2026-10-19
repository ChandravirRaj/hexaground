import { create } from "zustand";

import type { ThemeMode, ThemeScheme } from "@/utils/mobileTheme";

interface MobilePreviewStore {
  open: boolean;
  mode: ThemeMode;
  scheme: ThemeScheme;
  setOpen: (open: boolean) => void;
  setMode: (mode: ThemeMode) => void;
  setScheme: (scheme: ThemeScheme) => void;
}

export const useMobilePreviewStore = create<MobilePreviewStore>((set) => ({
  open: false,
  mode: "light",
  scheme: "analogous",
  setOpen: (open) => set({ open }),
  setMode: (mode) => set({ mode }),
  setScheme: (scheme) => set({ scheme }),
}));
