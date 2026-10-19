"use client";

import { useEffect, useRef, useState } from "react";
import { LogIn, LogOut, Palette, Settings, Smartphone } from "lucide-react";

import { cn } from "@/lib/cn";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { useMobilePreviewStore } from "@/store/useMobilePreviewStore";
import { usePaletteStore } from "@/store/usePaletteStore";
import { useSettingsStore } from "@/store/useSettingsStore";

const itemClass = cn(
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 transition-colors",
  "hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none"
);

export function AccountMenu() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const signIn = useAuthStore((s) => s.signIn);
  const signOut = useAuthStore((s) => s.signOut);
  const openPalettes = usePaletteStore((s) => s.setOpen);
  const openMobilePreview = useMobilePreviewStore((s) => s.setOpen);
  const openSettings = useSettingsStore((s) => s.setSettingsOpen);

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!isFirebaseConfigured) return null;

  if (loading) {
    return <span className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-neutral-200/70" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-end">
        <button
          type="button"
          onClick={signIn}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-brand px-3.5 text-sm font-semibold text-on-brand shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Sign in with Google</span>
          <span className="sm:hidden">Sign in</span>
        </button>
        {error && (
          <span role="alert" className="mt-1 text-xs text-red-600">
            {error}
          </span>
        )}
      </div>
    );
  }

  const run = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {user.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-full shadow-soft ring-2 ring-white/80"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-on-brand shadow-soft">
            {(user.displayName ?? user.email ?? "?").charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 z-30 w-60 rounded-2xl bg-neutral-50 p-1.5 shadow-xl ring-1 ring-neutral-200/70"
        >
          <div className="border-b border-neutral-200/70 px-3 pb-2 pt-1.5">
            <p className="truncate text-sm font-semibold text-neutral-900">
              {user.displayName ?? "Signed in"}
            </p>
            <p className="truncate text-xs text-neutral-500">{user.email}</p>
          </div>
          <div className="pt-1.5">
            <button type="button" role="menuitem" className={itemClass} onClick={run(() => openPalettes(true))}>
              <Palette className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              My palettes
            </button>
            <button type="button" role="menuitem" className={itemClass} onClick={run(() => openMobilePreview(true))}>
              <Smartphone className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              App preview (mobile & web)
            </button>
            <button type="button" role="menuitem" className={itemClass} onClick={run(() => openSettings(true))}>
              <Settings className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              Profile & settings
            </button>
            <button type="button" role="menuitem" className={itemClass} onClick={run(() => void signOut())}>
              <LogOut className="h-4 w-4 text-neutral-500" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
