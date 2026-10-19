import { getStorageKey } from "@/lib/env";

/** Prefixes used before the app was renamed from Hexelly to Hexaground. */
const LEGACY_PREFIXES = ["hexelly", "hexelly-dev"];

const SUFFIXES = ["color-store", "settings", "session", "recent", "favorites"] as const;

/**
 * Inline script that copies data saved under the old prefix to the new one.
 * It runs before the page hydrates, so stores and the theme script see the
 * migrated values. Safe to run on every load: it never overwrites new data.
 */
export function getStorageMigrationScript(): string {
  const moves = LEGACY_PREFIXES.flatMap((prefix) =>
    SUFFIXES.map((suffix) => [`${prefix}-${suffix}`, getStorageKey(suffix)])
  ).filter(([from, to]) => from !== to);

  return `try{var m=${JSON.stringify(moves)};for(var i=0;i<m.length;i++){var o=localStorage.getItem(m[i][0]);if(o!==null){if(localStorage.getItem(m[i][1])===null)localStorage.setItem(m[i][1],o);localStorage.removeItem(m[i][0])}}}catch(e){}`;
}
