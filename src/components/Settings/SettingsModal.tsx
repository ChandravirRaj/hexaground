"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Monitor, Moon, Sun, Trash2, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { deleteAllUserData } from "@/lib/cloudSync";
import { useAuthStore } from "@/store/useAuthStore";
import { useColorStore } from "@/store/useColorStore";
import { useSettingsStore, type ThemePreference } from "@/store/useSettingsStore";
import {
  FORMAT_IDS,
  FORMAT_LABELS,
  formatColor,
  isFormatId,
} from "@/utils/formats";

const THEMES: { id: ThemePreference; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

const SAMPLE_HEX = "#3B82F6";

export function SettingsModal() {
  const open = useSettingsStore((s) => s.settingsOpen);
  const setOpen = useSettingsStore((s) => s.setSettingsOpen);
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);
  const setDefaultFormat = useSettingsStore((s) => s.setDefaultFormat);
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setConfirming(false);
      setMessage(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!user) setOpen(false);
  }, [user, setOpen]);

  const deleteData = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      await deleteAllUserData(user.uid);
      useColorStore.setState({ favoriteColors: [], recentColors: [] });
      setMessage("Your saved data was deleted.");
    } catch (err) {
      console.error("[hexaground] delete data error", err);
      setMessage("Couldn't delete your data. Please try again.");
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <AnimatePresence>
      {open && user && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-neutral-900/30 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Profile and settings"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-neutral-50 shadow-xl ring-1 ring-neutral-200/70"
          >
            <div className="flex items-center justify-between border-b border-neutral-200/60 px-4 py-3">
              <h2 className="text-sm font-semibold text-neutral-800">Profile & Settings</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close settings"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto p-4">
              <section className="flex items-center gap-3" aria-label="Account">
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-lg font-semibold text-neutral-700">
                    {(user.displayName ?? user.email ?? "?").charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {user.displayName ?? "Signed in"}
                  </p>
                  <p className="truncate text-xs text-neutral-500">{user.email}</p>
                </div>
              </section>

              <section aria-label="Appearance">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  Appearance
                </h3>
                <div className="grid grid-cols-3 gap-1 rounded-lg bg-neutral-100 p-1" role="group" aria-label="Theme">
                  {THEMES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={theme === id}
                      onClick={() => setTheme(id)}
                      className={cn(
                        "inline-flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
                        theme === id
                          ? "bg-white text-neutral-900 shadow-sm"
                          : "text-neutral-500 hover:text-neutral-800"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              <section aria-label="Default color format">
                <label
                  htmlFor="default-format"
                  className="mb-2 block text-xs font-semibold uppercase tracking-widest text-neutral-400"
                >
                  Default color format
                </label>
                <select
                  id="default-format"
                  value={defaultFormat}
                  onChange={(e) => isFormatId(e.target.value) && setDefaultFormat(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                >
                  {FORMAT_IDS.map((id) => (
                    <option key={id} value={id}>
                      {FORMAT_LABELS[id]}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Used when copying favorites, shades, harmonies and palettes. Example:{" "}
                  <code className="font-mono">{formatColor(SAMPLE_HEX, 1, defaultFormat)}</code>
                </p>
              </section>

              <section aria-label="Your data">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  Your data
                </h3>
                {confirming ? (
                  <div className="rounded-lg bg-red-50 p-3 ring-1 ring-red-200">
                    <p className="text-xs text-red-800">
                      This permanently deletes your favorites, recents, palettes, saved designs and settings
                      from the cloud. This can&apos;t be undone.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={deleteData}
                        disabled={deleting}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-[#ffffff] hover:bg-red-700 disabled:opacity-60"
                      >
                        {deleting ? "Deleting…" : "Yes, delete everything"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        disabled={deleting}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Delete my saved data
                  </button>
                )}
                {message && (
                  <p role="status" className="mt-2 text-xs text-neutral-600">
                    {message}
                  </p>
                )}
              </section>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void signOut();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
