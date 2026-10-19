"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { startCloudSync } from "@/lib/cloudSync";
import { getStorageKey } from "@/lib/env";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { startDesignSync } from "@/store/useDesignStore";
import { useMobilePreviewStore } from "@/store/useMobilePreviewStore";
import { startPaletteSync } from "@/store/usePaletteStore";
import { useColorStore } from "@/store/useColorStore";

/** Tracks the Firebase auth session and syncs colors while signed in. */
export function useCloudSync() {
  const setUser = useAuthStore((s) => s.setUser);
  const uid = useAuthStore((s) => s.user?.uid);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setUser(null);
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      const wasSignedIn = useAuthStore.getState().user !== null;

      // Lets the next page load pick the right layout before auth resolves.
      try {
        localStorage.setItem(getStorageKey("session"), user ? "1" : "0");
        document.documentElement.dataset.session = user ? "1" : "0";
      } catch {
        // storage unavailable
      }

      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
        // Don't leave a previous account's data on a shared device.
        if (wasSignedIn) {
          useColorStore.setState({ favoriteColors: [], recentColors: [] });
        }
      }
    });
  }, [setUser]);

  useEffect(() => {
    if (!uid) return;
    const stopColors = startCloudSync(uid);
    const stopPalettes = startPaletteSync(uid);
    const stopDesigns = startDesignSync(uid);
    return () => {
      stopColors();
      stopPalettes();
      stopDesigns();
      useMobilePreviewStore.getState().setOpen(false);
    };
  }, [uid]);
}
