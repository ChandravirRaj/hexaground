import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  writeBatch,
  type Firestore,
} from "firebase/firestore";

import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import { useColorStore } from "@/store/useColorStore";
import { isThemePreference, useSettingsStore } from "@/store/useSettingsStore";
import type { FavoriteColor, RecentColor } from "@/types/color";
import { getColorKey } from "@/utils/color";
import { isFormatId } from "@/utils/formats";

const MAX_RECENT = 20;

function logError(err: unknown) {
  console.error("[hexaground] cloud sync error", err);
}

/** Listener errors; ignores the brief window after sign-out, when permission is rightly denied. */
function listenerError(label: string) {
  return (err: unknown) => {
    if (getFirebaseAuth()?.currentUser === null) return;
    console.error(`[hexaground] ${label} listener error`, err);
  };
}

/**
 * Two-way sync between the Zustand store and
 * users/{uid}/favorites and users/{uid}/recents.
 * Local data present at first sync is merged into the account.
 * Returns a cleanup function.
 */
export function startCloudSync(uid: string): () => void {
  const db: Firestore | null = getFirebaseDb();
  if (!db) return () => {};

  const favCol = collection(db, "users", uid, "favorites");
  const recCol = collection(db, "users", uid, "recents");

  const settingsRef = doc(db, "users", uid, "settings", "preferences");

  let applyingRemote = false;
  let settingsReady = false;
  let favReady = false;
  let recReady = false;

  const applyRemote = (patch: Partial<ReturnType<typeof useColorStore.getState>>) => {
    applyingRemote = true;
    try {
      useColorStore.setState(patch);
    } finally {
      applyingRemote = false;
    }
  };

  const unsubFav = onSnapshot(
    favCol,
    (snap) => {
      const remote = snap.docs.map((d) => d.data() as FavoriteColor);

      if (!favReady) {
        const remoteKeys = new Set(remote.map((f) => getColorKey(f.hex, f.opacity)));
        const localOnly = useColorStore
          .getState()
          .favoriteColors.filter((f) => !remoteKeys.has(getColorKey(f.hex, f.opacity)));
        localOnly.forEach((f) =>
          setDoc(doc(favCol, f.id), f).catch(logError)
        );
        remote.push(...localOnly);
        favReady = true;
      }

      remote.sort((a, b) => b.savedAt - a.savedAt);
      applyRemote({ favoriteColors: remote });
    },
    listenerError("favorites")
  );

  const unsubRec = onSnapshot(
    recCol,
    (snap) => {
      const byKey = new Map<string, RecentColor>();
      snap.docs.forEach((d) => {
        const r = d.data() as RecentColor;
        byKey.set(getColorKey(r.hex, r.opacity), r);
      });

      if (!recReady) {
        useColorStore.getState().recentColors.forEach((r) => {
          const key = getColorKey(r.hex, r.opacity);
          const existing = byKey.get(key);
          if (!existing || existing.timestamp < r.timestamp) {
            byKey.set(key, r);
            setDoc(doc(recCol, key), r).catch(logError);
          }
        });
        recReady = true;
      }

      const sorted = [...byKey.values()].sort((a, b) => b.timestamp - a.timestamp);
      sorted.slice(MAX_RECENT).forEach((r) =>
        deleteDoc(doc(recCol, getColorKey(r.hex, r.opacity))).catch(logError)
      );
      applyRemote({ recentColors: sorted.slice(0, MAX_RECENT) });
    },
    listenerError("recents")
  );

  const unsubSettings = onSnapshot(
    settingsRef,
    (snap) => {
      if (!settingsReady) {
        settingsReady = true;
        if (!snap.exists()) {
          const { theme, defaultFormat } = useSettingsStore.getState();
          setDoc(settingsRef, { theme, defaultFormat }).catch(logError);
          return;
        }
      }

      const data = snap.data();
      if (!data) return;
      applyingRemote = true;
      try {
        useSettingsStore.setState({
          ...(isThemePreference(data.theme) && { theme: data.theme }),
          ...(isFormatId(data.defaultFormat) && { defaultFormat: data.defaultFormat }),
        });
      } finally {
        applyingRemote = false;
      }
    },
    listenerError("settings")
  );

  const unsubSettingsStore = useSettingsStore.subscribe((state, prev) => {
    if (applyingRemote || !settingsReady) return;
    if (state.theme !== prev.theme || state.defaultFormat !== prev.defaultFormat) {
      setDoc(settingsRef, {
        theme: state.theme,
        defaultFormat: state.defaultFormat,
      }).catch(logError);
    }
  });

  const unsubStore = useColorStore.subscribe((state, prev) => {
    if (applyingRemote) return;

    if (favReady && state.favoriteColors !== prev.favoriteColors) {
      const prevIds = new Set(prev.favoriteColors.map((f) => f.id));
      const nextIds = new Set(state.favoriteColors.map((f) => f.id));
      state.favoriteColors
        .filter((f) => !prevIds.has(f.id))
        .forEach((f) => setDoc(doc(favCol, f.id), f).catch(logError));
      prev.favoriteColors
        .filter((f) => !nextIds.has(f.id))
        .forEach((f) => deleteDoc(doc(favCol, f.id)).catch(logError));
    }

    if (recReady && state.recentColors !== prev.recentColors) {
      const prevStamps = new Map(
        prev.recentColors.map((r) => [getColorKey(r.hex, r.opacity), r.timestamp])
      );
      const nextKeys = new Set(
        state.recentColors.map((r) => getColorKey(r.hex, r.opacity))
      );
      state.recentColors.forEach((r) => {
        const key = getColorKey(r.hex, r.opacity);
        if (prevStamps.get(key) !== r.timestamp) {
          setDoc(doc(recCol, key), r).catch(logError);
        }
      });
      prevStamps.forEach((_, key) => {
        if (!nextKeys.has(key)) deleteDoc(doc(recCol, key)).catch(logError);
      });
    }
  });

  return () => {
    unsubFav();
    unsubRec();
    unsubSettings();
    unsubSettingsStore();
    unsubStore();
  };
}

/** Deletes everything stored for this account (the sign-in itself is kept). */
export async function deleteAllUserData(uid: string): Promise<void> {
  const db = getFirebaseDb();
  if (!db) return;

  for (const name of ["favorites", "recents", "palettes", "designs", "settings"]) {
    const snap = await getDocs(collection(db, "users", uid, name));
    for (let i = 0; i < snap.docs.length; i += 400) {
      const batch = writeBatch(db);
      snap.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
  }
}
