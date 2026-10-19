"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, Eye, Monitor, Moon, Smartphone, Sun, X } from "lucide-react";

import { CATEGORIES, getCategory } from "@/components/MobilePreview/categories";
import { ThemePalette } from "@/components/MobilePreview/ThemePalette";
import { PhoneFrame } from "@/components/MobilePreview/PhoneFrame";
import { BrowserFrame } from "@/components/WebPreview/BrowserFrame";
import { WEB_SCREENS } from "@/components/WebPreview/webCategories";
import { cn } from "@/lib/cn";
import { useColorStore, useSelectedColorStrings } from "@/store/useColorStore";
import { MAX_SAVED_DESIGNS, useDesignStore } from "@/store/useDesignStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { isPreviewCategoryId } from "@/utils/previewCategories";
import { useMobilePreviewStore } from "@/store/useMobilePreviewStore";
import { useVisionStore } from "@/store/useVisionStore";
import { isVisionMode, VISION_MODES, visionFilter } from "@/utils/colorBlindness";
import {
  generateMobileTheme,
  themeToStyle,
  type ThemeScheme,
} from "@/utils/mobileTheme";

const SCHEMES: { id: ThemeScheme; label: string }[] = [
  { id: "monochrome", label: "Monochrome" },
  { id: "analogous", label: "Analogous" },
  { id: "complementary", label: "Complementary" },
];

export function AppPreviewPanel() {
  const open = useMobilePreviewStore((s) => s.open);
  const setOpen = useMobilePreviewStore((s) => s.setOpen);
  const { hex } = useSelectedColorStrings();
  const categoryId = useSettingsStore((s) => s.previewCategory);
  const setCategoryId = useSettingsStore((s) => s.setPreviewCategory);
  const device = useSettingsStore((s) => s.previewDevice);
  const setDevice = useSettingsStore((s) => s.setPreviewDevice);
  const category = getCategory(categoryId);
  const mode = useMobilePreviewStore((s) => s.mode);
  const setMode = useMobilePreviewStore((s) => s.setMode);
  const scheme = useMobilePreviewStore((s) => s.scheme);
  const setScheme = useMobilePreviewStore((s) => s.setScheme);
  const vision = useVisionStore((s) => s.mode);
  const setVision = useVisionStore((s) => s.setMode);
  const opacity = useColorStore((s) => s.opacity);
  const saveDesign = useDesignStore((s) => s.save);
  const savedCount = useDesignStore((s) => s.designs.length);

  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const theme = useMemo(() => generateMobileTheme(hex, mode, scheme), [hex, mode, scheme]);
  const style = useMemo(() => themeToStyle(theme), [theme]);

  useEffect(() => {
    if (!open) {
      setSaving(false);
      setStatus("idle");
    }
  }, [open]);

  const defaultName = `${category.label} · ${device === "web" ? "Web" : "Mobile"} · ${hex}`;

  const submitSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await saveDesign({
      name: (name.trim() || defaultName).slice(0, 60),
      hex,
      opacity,
      category: categoryId,
      device,
      scheme,
      mode,
    });
    setStatus(ok ? "saved" : "error");
    if (ok) {
      setSaving(false);
      setName("");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="App theme preview"
          className="keep-light fixed inset-0 z-40 flex flex-col bg-neutral-900/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold text-white">App Preview</h2>
            <span
              className="h-5 w-5 rounded-full ring-2 ring-white/60"
              style={{ backgroundColor: hex }}
              aria-label={`Selected color ${hex}`}
            />
            <span className="font-mono text-xs text-white/70">{hex}</span>

            <div className="ml-auto flex flex-wrap items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSaving((v) => !v)}
                  aria-expanded={saving}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                    status === "saved" ? "bg-emerald-500 text-white" : "bg-white text-neutral-900 hover:bg-white/90"
                  )}
                >
                  {status === "saved" ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {status === "saved" ? "Saved" : "Save design"}
                </button>

                {saving && (
                  <form
                    onSubmit={submitSave}
                    className="absolute right-0 top-10 z-10 w-72 rounded-xl bg-neutral-50 p-3 shadow-xl ring-1 ring-neutral-200"
                  >
                    <label htmlFor="design-name" className="text-xs font-semibold text-neutral-700">
                      Name this design
                    </label>
                    <input
                      id="design-name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={60}
                      placeholder={defaultName}
                      className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    />
                    <p className="mt-1.5 text-[11px] text-neutral-500">
                      Saves your color, {category.label}, {device === "web" ? "Web" : "Mobile"}, scheme and mode.
                      {savedCount >= MAX_SAVED_DESIGNS && " You've reached the limit of 50 designs."}
                    </p>
                    {status === "error" && (
                      <p role="alert" className="mt-1 text-[11px] text-red-600">
                        Couldn&apos;t save. Please try again.
                      </p>
                    )}
                    <div className="mt-2 flex justify-end gap-2">
                      <button type="button" onClick={() => setSaving(false)} className="rounded-lg px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100">
                        Cancel
                      </button>
                      <button type="submit" className="rounded-lg bg-neutral-900 px-3 py-1 text-xs font-medium text-white hover:bg-neutral-700">
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <ThemePalette theme={theme} />

              <div className="flex rounded-lg bg-white/10 p-0.5" role="group" aria-label="Device">
                {([["mobile", Smartphone, "Mobile"], ["web", Monitor, "Web"]] as const).map(([id, Icon, label]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={device === id}
                    onClick={() => setDevice(id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                      device === id ? "bg-white text-neutral-900" : "text-white/80 hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <label htmlFor="preview-category" className="sr-only">
                  App category
                </label>
                <category.icon className="h-4 w-4 text-white/80" aria-hidden="true" />
                <select
                  id="preview-category"
                  value={categoryId}
                  onChange={(e) => isPreviewCategoryId(e.target.value) && setCategoryId(e.target.value)}
                  className="rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 [&>option]:text-neutral-900"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label htmlFor="preview-vision" className="sr-only">
                  Color vision
                </label>
                <Eye className="h-4 w-4 text-white/80" aria-hidden="true" />
                <select
                  id="preview-vision"
                  value={vision}
                  onChange={(e) => isVisionMode(e.target.value) && setVision(e.target.value)}
                  className="rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 [&>option]:text-neutral-900"
                >
                  {VISION_MODES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.id === "normal" ? "Normal vision" : m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex rounded-lg bg-white/10 p-0.5" role="group" aria-label="Scheme">
                {SCHEMES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={scheme === s.id}
                    onClick={() => setScheme(s.id)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                      scheme === s.id ? "bg-white text-neutral-900" : "text-white/80 hover:bg-white/10"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex rounded-lg bg-white/10 p-0.5" role="group" aria-label="Mode">
                {(["light", "dark"] as const).map((m) => {
                  const Icon = m === "light" ? Sun : Moon;
                  return (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mode === m}
                      aria-label={`${m} mode`}
                      onClick={() => setMode(m)}
                      className={cn(
                        "rounded-md px-2.5 py-1 transition-colors",
                        mode === m ? "bg-white text-neutral-900" : "text-white/80 hover:bg-white/10"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close mobile preview"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className="flex min-h-0 flex-1 flex-wrap content-start justify-center gap-x-8 gap-y-10 overflow-auto px-6 py-6"
            style={{ filter: visionFilter(vision) }}
          >
            {device === "mobile"
              ? category.screens.map(({ id, label, Component, copy }) => (
                  <PhoneFrame key={`m-${category.id}-${id}`} label={label} style={style}>
                    <Component copy={copy} />
                  </PhoneFrame>
                ))
              : WEB_SCREENS[category.id].map(({ id, label, path, Component, copy }) => (
                  <BrowserFrame key={`w-${category.id}-${id}`} label={label} url={path} style={style}>
                    <Component copy={copy} />
                  </BrowserFrame>
                ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
