"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Code2, Copy, Download, Link2, Plus, Star, Trash2, X } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";
import { useColorStore } from "@/store/useColorStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { formatColor } from "@/utils/formats";
import { MAX_COLORS_PER_PALETTE, usePaletteStore } from "@/store/usePaletteStore";
import type { Palette } from "@/types/color";
import { colorStateToHex, getColorKey } from "@/utils/color";
import {
  downloadText,
  EXPORT_FORMATS,
  exportPalette,
  slugify,
  type ExportFormat,
} from "@/utils/exportPalette";
import { buildPaletteLink } from "@/utils/shareLink";

const iconButton = cn(
  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors",
  "hover:bg-neutral-100 hover:text-neutral-800",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
);

function useCurrentColor() {
  const hex = useColorStore((s) =>
    colorStateToHex({
      hue: s.hue,
      saturation: s.saturation,
      lightness: s.lightness,
      opacity: s.opacity,
    })
  );
  const opacity = useColorStore((s) => s.opacity);
  return { hex, opacity };
}

function PaletteCard({
  palette,
  canMoveUp,
  canMoveDown,
}: {
  palette: Palette;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const {
    addColor,
    removeColor,
    renamePalette,
    deletePalette,
    toggleFavorite,
    movePalette,
  } = usePaletteStore();
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);
  const loadColor = useColorStore((s) => s.loadColor);
  const { hex, opacity } = useCurrentColor();
  const { copy } = useCopyToClipboard();
  const [name, setName] = useState(palette.name);
  const [exportOpen, setExportOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>("css");

  useEffect(() => setName(palette.name), [palette.name]);

  const full = palette.colors.length >= MAX_COLORS_PER_PALETTE;
  const currentKey = getColorKey(hex, opacity);
  const duplicate = palette.colors.some(
    (c) => getColorKey(c.hex, c.opacity) === currentKey
  );

  return (
    <li className="rounded-xl bg-white/70 p-3 ring-1 ring-neutral-200/60">
      <div className="mb-2 flex items-center gap-1">
        <button
          type="button"
          onClick={() => toggleFavorite(palette.id)}
          aria-pressed={Boolean(palette.favorite)}
          aria-label={palette.favorite ? `Unfavorite ${palette.name}` : `Favorite ${palette.name}`}
          className={iconButton}
        >
          <Star
            className={cn(
              "h-3.5 w-3.5",
              palette.favorite && "fill-amber-400 text-amber-400"
            )}
            aria-hidden="true"
          />
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (name.trim()) void renamePalette(palette.id, name);
            else setName(palette.name);
          }}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          maxLength={40}
          aria-label="Palette name"
          className="min-w-0 flex-1 rounded-md bg-transparent px-1.5 py-1 text-sm font-semibold text-neutral-800 outline-none focus:bg-white focus:ring-2 focus:ring-neutral-300"
        />
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => movePalette(palette.id, -1)}
            disabled={!canMoveUp}
            aria-label={`Move ${palette.name} up`}
            className="flex h-4 w-6 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-30"
          >
            <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => movePalette(palette.id, 1)}
            disabled={!canMoveDown}
            aria-label={`Move ${palette.name} down`}
            className="flex h-4 w-6 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-30"
          >
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            copy(
              palette.colors
                .map((c) => formatColor(c.hex, c.opacity, defaultFormat))
                .join(", ")
            )
          }
          disabled={palette.colors.length === 0}
          aria-label={`Copy all colors in ${palette.name}`}
          className={cn(iconButton, "disabled:opacity-40")}
        >
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => copy(buildPaletteLink(palette.name, palette.colors))}
          disabled={palette.colors.length === 0}
          aria-label={`Copy a share link for ${palette.name}`}
          title="Copy share link"
          className={cn(iconButton, "disabled:opacity-40")}
        >
          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setExportOpen((v) => !v)}
          disabled={palette.colors.length === 0}
          aria-expanded={exportOpen}
          aria-label={`Export ${palette.name} as code`}
          className={cn(iconButton, "disabled:opacity-40", exportOpen && "bg-neutral-100")}
        >
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => deletePalette(palette.id)}
          aria-label={`Delete palette ${palette.name}`}
          className={cn(iconButton, "hover:bg-red-50 hover:text-red-600")}
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <ul className="flex flex-wrap gap-2">
        {palette.colors.map((color, i) => (
          <li key={`${color.hex}-${color.opacity}`} className="group relative">
            <button
              type="button"
              onClick={() => loadColor(color.hex, color.opacity)}
              aria-label={`Load color ${color.hex}`}
              title={color.hex}
              className="relative block h-10 w-10 overflow-hidden rounded-lg ring-1 ring-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              <span className="absolute inset-0 bg-[repeating-conic-gradient(#e5e5e5_0%_25%,#fff_0%_50%)] [background-size:8px_8px]" />
              <span
                className="absolute inset-0"
                style={{ backgroundColor: color.hex, opacity: color.opacity }}
              />
            </button>
            <button
              type="button"
              onClick={() => removeColor(palette.id, i)}
              aria-label={`Remove ${color.hex} from ${palette.name}`}
              className="absolute -right-1.5 -top-1.5 hidden h-4 w-4 items-center justify-center rounded-full bg-neutral-800 text-white group-focus-within:flex group-hover:flex"
            >
              <X className="h-2.5 w-2.5" aria-hidden="true" />
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => addColor(palette.id, { hex, opacity })}
            disabled={full || duplicate}
            aria-label={`Add current color to ${palette.name}`}
            title={
              full
                ? "Palette is full"
                : duplicate
                  ? "Already in this palette. Pick a different color first."
                  : "Add current color"
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-800 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </li>
      </ul>

      {exportOpen && palette.colors.length > 0 && (
        <ExportSection palette={palette} format={format} onFormatChange={setFormat} />
      )}
    </li>
  );
}

function ExportSection({
  palette,
  format,
  onFormatChange,
}: {
  palette: Palette;
  format: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
}) {
  const { copy } = useCopyToClipboard();
  const code = exportPalette(palette, format);
  const meta = EXPORT_FORMATS.find((f) => f.id === format)!;

  return (
    <div className="mt-3 border-t border-neutral-200/60 pt-3">
      <div className="mb-2 flex items-center gap-1" role="tablist" aria-label="Export format">
        {EXPORT_FORMATS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={f.id === format}
            onClick={() => onFormatChange(f.id)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              f.id === format
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {f.label}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => copy(code)}
            aria-label="Copy code"
            className={iconButton}
          >
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() =>
              downloadText(
                `${slugify(palette.name)}.${format === "tailwind" ? "tailwind.config." : ""}${meta.extension}`,
                code,
                meta.mime
              )
            }
            aria-label="Download file"
            className={iconButton}
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <pre className="max-h-48 overflow-auto rounded-lg bg-neutral-900 p-3 font-mono text-xs leading-relaxed text-neutral-100">
        {code}
      </pre>
    </div>
  );
}

export function PalettesModal() {
  const open = usePaletteStore((s) => s.open);
  const setOpen = usePaletteStore((s) => s.setOpen);
  const palettes = usePaletteStore((s) => s.palettes);
  const createPalette = usePaletteStore((s) => s.createPalette);
  const current = useCurrentColor();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    void createPalette(newName, current);
    setNewName("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end p-3 sm:inset-y-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-label="My palettes"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex max-h-[45dvh] w-full flex-col self-end rounded-2xl bg-neutral-50/95 shadow-xl ring-1 ring-neutral-200/70 backdrop-blur-xl sm:max-h-full sm:w-96 sm:self-stretch"
          >
            <div className="flex items-center justify-between border-b border-neutral-200/60 px-4 py-3">
              <h2 className="text-sm font-semibold text-neutral-800">My Palettes</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close palettes"
                className={iconButton}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={submit} className="flex gap-2 px-4 pt-3">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                maxLength={40}
                placeholder="New palette name"
                aria-label="New palette name"
                className="min-w-0 flex-1 rounded-lg bg-white px-3 py-2 text-sm outline-none ring-1 ring-neutral-200 focus:ring-2 focus:ring-neutral-400"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Create
              </button>
            </form>
            <p className="px-4 pb-2 pt-1.5 text-xs text-neutral-500">
              Keep this panel open, pick a color, then press + on a palette to add it.
            </p>

            <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4">
              {palettes.length === 0 ? (
                <li className="py-6 text-center text-sm text-neutral-500">
                  No palettes yet. Create one to group your colors.
                </li>
              ) : (
                palettes.map((p, i) => (
                  <PaletteCard
                    key={p.id}
                    palette={p}
                    canMoveUp={i > 0 && Boolean(palettes[i - 1].favorite) === Boolean(p.favorite)}
                    canMoveDown={
                      i < palettes.length - 1 &&
                      Boolean(palettes[i + 1].favorite) === Boolean(p.favorite)
                    }
                  />
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
