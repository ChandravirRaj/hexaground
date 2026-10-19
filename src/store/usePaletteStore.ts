import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { create } from "zustand";

import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import type { Palette, PaletteColor } from "@/types/color";
import { getColorKey } from "@/utils/color";

const MAX_COLORS_PER_PALETTE = 30;

interface PaletteStore {
  palettes: Palette[];
  open: boolean;
  setOpen: (open: boolean) => void;
  createPalette: (name: string, color?: PaletteColor | PaletteColor[]) => Promise<void>;
  renamePalette: (id: string, name: string) => Promise<void>;
  deletePalette: (id: string) => Promise<void>;
  addColor: (id: string, color: PaletteColor) => Promise<void>;
  removeColor: (id: string, index: number) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  movePalette: (id: string, direction: -1 | 1) => Promise<void>;
}

/** Favorites first, then manual order (newest first until reordered). */
export function sortPalettes(palettes: Palette[]): Palette[] {
  const position = (p: Palette) => p.order ?? -p.createdAt;
  return [...palettes].sort(
    (a, b) =>
      Number(Boolean(b.favorite)) - Number(Boolean(a.favorite)) ||
      position(a) - position(b)
  );
}

let currentUid: string | null = null;

function paletteDoc(id: string) {
  const db = getFirebaseDb();
  if (!db || !currentUid) return null;
  return doc(db, "users", currentUid, "palettes", id);
}

async function save(palette: Palette) {
  const ref = paletteDoc(palette.id);
  if (!ref) return;
  try {
    await setDoc(ref, palette);
  } catch (err) {
    console.error("[hexaground] palette save error", err);
  }
}

export const usePaletteStore = create<PaletteStore>((set, get) => ({
  palettes: [],
  open: false,
  setOpen: (open) => set({ open }),

  createPalette: async (name, color) => {
    const now = Date.now();
    await save({
      id: crypto.randomUUID(),
      name: name.trim() || "Untitled palette",
      colors: Array.isArray(color)
        ? color.slice(0, MAX_COLORS_PER_PALETTE)
        : color
          ? [color]
          : [],
      createdAt: now,
      updatedAt: now,
      favorite: false,
      order: -now,
    });
  },

  renamePalette: async (id, name) => {
    const palette = get().palettes.find((p) => p.id === id);
    const trimmed = name.trim();
    if (!palette || !trimmed || trimmed === palette.name) return;
    await save({ ...palette, name: trimmed, updatedAt: Date.now() });
  },

  deletePalette: async (id) => {
    const ref = paletteDoc(id);
    if (!ref) return;
    try {
      await deleteDoc(ref);
    } catch (err) {
      console.error("[hexaground] palette delete error", err);
    }
  },

  addColor: async (id, color) => {
    const palette = get().palettes.find((p) => p.id === id);
    if (!palette || palette.colors.length >= MAX_COLORS_PER_PALETTE) return;
    const key = getColorKey(color.hex, color.opacity);
    if (palette.colors.some((c) => getColorKey(c.hex, c.opacity) === key)) return;
    await save({
      ...palette,
      colors: [...palette.colors, color],
      updatedAt: Date.now(),
    });
  },

  removeColor: async (id, index) => {
    const palette = get().palettes.find((p) => p.id === id);
    if (!palette) return;
    await save({
      ...palette,
      colors: palette.colors.filter((_, i) => i !== index),
      updatedAt: Date.now(),
    });
  },

  toggleFavorite: async (id) => {
    const palette = get().palettes.find((p) => p.id === id);
    if (!palette) return;
    // Land at the top of the group it moves into.
    const siblings = get().palettes.filter(
      (p) => Boolean(p.favorite) !== !palette.favorite
    );
    const top = Math.min(0, ...siblings.map((p) => p.order ?? -p.createdAt)) - 1;
    await save({ ...palette, favorite: !palette.favorite, order: top });
  },

  movePalette: async (id, direction) => {
    const palette = get().palettes.find((p) => p.id === id);
    const db = getFirebaseDb();
    if (!palette || !db || !currentUid) return;

    const group = get().palettes.filter(
      (p) => Boolean(p.favorite) === Boolean(palette.favorite)
    );
    const from = group.findIndex((p) => p.id === id);
    const to = from + direction;
    if (to < 0 || to >= group.length) return;

    const reordered = [...group];
    [reordered[from], reordered[to]] = [reordered[to], reordered[from]];

    try {
      const batch = writeBatch(db);
      reordered.forEach((p, i) =>
        batch.set(doc(db, "users", currentUid!, "palettes", p.id), { ...p, order: i })
      );
      await batch.commit();
    } catch (err) {
      console.error("[hexaground] palette reorder error", err);
    }
  },
}));

/** Subscribes to users/{uid}/palettes. Returns a cleanup function. */
export function startPaletteSync(uid: string): () => void {
  const db = getFirebaseDb();
  if (!db) return () => {};

  currentUid = uid;
  const unsub = onSnapshot(
    collection(db, "users", uid, "palettes"),
    (snap) => {
      const palettes = sortPalettes(snap.docs.map((d) => d.data() as Palette));
      usePaletteStore.setState({ palettes });
    },
    (err) => {
      if (getFirebaseAuth()?.currentUser === null) return; // signed out
      console.error("[hexaground] palettes listener error", err);
    }
  );

  return () => {
    unsub();
    currentUid = null;
    usePaletteStore.setState({ palettes: [], open: false });
  };
}

export { MAX_COLORS_PER_PALETTE };
