import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { create } from "zustand";

import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import { useColorStore } from "@/store/useColorStore";
import { useMobilePreviewStore } from "@/store/useMobilePreviewStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { SavedDesign } from "@/types/design";
import { isPreviewCategoryId } from "@/utils/previewCategories";

export const MAX_SAVED_DESIGNS = 50;

interface DesignStore {
  designs: SavedDesign[];
  save: (design: Omit<SavedDesign, "id" | "createdAt">) => Promise<boolean>;
  remove: (id: string) => Promise<void>;
}

let currentUid: string | null = null;

function designDoc(id: string) {
  const db = getFirebaseDb();
  if (!db || !currentUid) return null;
  return doc(db, "users", currentUid, "designs", id);
}

function isValid(design: SavedDesign): boolean {
  return (
    typeof design.hex === "string" &&
    isPreviewCategoryId(design.category) &&
    (design.device === "mobile" || design.device === "web") &&
    ["monochrome", "analogous", "complementary"].includes(design.scheme) &&
    (design.mode === "light" || design.mode === "dark")
  );
}

export const useDesignStore = create<DesignStore>((_, get) => ({
  designs: [],

  save: async (design) => {
    if (get().designs.length >= MAX_SAVED_DESIGNS) return false;
    const id = crypto.randomUUID();
    const target = designDoc(id);
    if (!target) return false;
    try {
      await setDoc(target, { ...design, id, createdAt: Date.now() });
      return true;
    } catch (err) {
      console.error("[hexaground] design save error", err);
      return false;
    }
  },

  remove: async (id) => {
    const ref = designDoc(id);
    if (!ref) return;
    try {
      await deleteDoc(ref);
    } catch (err) {
      console.error("[hexaground] design delete error", err);
    }
  },
}));

/** Reopens App Preview exactly as it was when the design was saved. */
export function openSavedDesign(design: SavedDesign) {
  useColorStore.getState().loadColor(design.hex, design.opacity);
  const settings = useSettingsStore.getState();
  settings.setPreviewCategory(design.category);
  settings.setPreviewDevice(design.device);
  const preview = useMobilePreviewStore.getState();
  preview.setScheme(design.scheme);
  preview.setMode(design.mode);
  preview.setOpen(true);
}

/** Subscribes to users/{uid}/designs. Returns a cleanup function. */
export function startDesignSync(uid: string): () => void {
  const db = getFirebaseDb();
  if (!db) return () => {};

  currentUid = uid;
  const unsub = onSnapshot(
    collection(db, "users", uid, "designs"),
    (snap) => {
      const designs = snap.docs
        .map((d) => d.data() as SavedDesign)
        .filter(isValid)
        .sort((a, b) => b.createdAt - a.createdAt);
      useDesignStore.setState({ designs });
    },
    (err) => {
      if (getFirebaseAuth()?.currentUser === null) return; // signed out
      console.error("[hexaground] designs listener error", err);
    }
  );

  return () => {
    unsub();
    currentUid = null;
    useDesignStore.setState({ designs: [] });
  };
}
