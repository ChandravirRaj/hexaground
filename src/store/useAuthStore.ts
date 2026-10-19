import { create } from "zustand";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { getFirebaseAuth } from "@/lib/firebase";

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthStore {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  setUser: (user: AuthUser | null) => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const IGNORED_ERRORS = [
  "auth/popup-closed-by-user",
  "auth/cancelled-popup-request",
];

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user, loading: false }),

  signIn: async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      set({ error: "Firebase is not configured." });
      return;
    }

    set({ error: null });
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      if (!IGNORED_ERRORS.includes(code)) {
        console.error("[hexaground] sign-in failed", err);
        set({ error: `Sign-in failed (${code || "unknown error"}).` });
      }
    }
  },

  signOut: async () => {
    const auth = getFirebaseAuth();
    if (auth) await firebaseSignOut(auth);
  },
}));
