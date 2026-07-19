import { create } from "zustand";

interface ToastStore {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastStore>((set) => ({
  visible: false,
  show: () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    set({ visible: true });
    hideTimeout = setTimeout(() => {
      set({ visible: false });
      hideTimeout = null;
    }, 2000);
  },
  hide: () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    set({ visible: false });
  },
}));
