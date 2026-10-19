"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, ImagePlus, Link2, Save } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";
import { useAuthStore } from "@/store/useAuthStore";
import { useColorStore } from "@/store/useColorStore";
import { usePaletteStore } from "@/store/usePaletteStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { getContrastText } from "@/utils/color";
import { formatColor } from "@/utils/formats";
import { paletteFromFile } from "@/utils/imagePalette";
import { buildPaletteLink } from "@/utils/shareLink";

const actionButton = cn(
  "inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium text-neutral-600 transition-colors",
  "hover:bg-neutral-100 hover:text-neutral-800",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
);

export function ImageTab() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadColor = useColorStore((s) => s.loadColor);
  const defaultFormat = useSettingsStore((s) => s.defaultFormat);
  const signedIn = useAuthStore((s) => s.user !== null);
  const signIn = useAuthStore((s) => s.signIn);
  const createPalette = usePaletteStore((s) => s.createPalette);
  const { copy } = useCopyToClipboard();

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file (PNG, JPG, WebP, GIF).");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await paletteFromFile(file);
      setColors(result.colors);
      setPreviewUrl(result.previewUrl);
      setFileName(file.name.replace(/\.[^.]+$/, ""));
      setSaved(false);
    } catch {
      setError("Couldn't read colors from that image.");
    } finally {
      setBusy(false);
    }
  };

  const palette = colors.map((hex) => ({ hex, opacity: 1 }));
  const name = fileName || "Image palette";

  const save = async () => {
    if (!signedIn) return void signIn();
    await createPalette(name, palette);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label="Choose an image to extract colors from"
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <div className="flex items-stretch gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void handleFile(e.dataTransfer.files[0]);
          }}
          className={cn(
            "flex h-16 w-20 shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border border-dashed text-[10px] font-medium text-neutral-500 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            dragging ? "border-brand bg-brand/10" : "border-neutral-300 hover:bg-neutral-100"
          )}
        >
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Uploaded image" className="h-full w-full object-cover" />
          ) : (
            <>
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              {busy ? "Reading…" : "Add image"}
            </>
          )}
        </button>

        {colors.length > 0 ? (
          <ul aria-label="Colors from the image" className="grid min-w-0 flex-1 grid-cols-6 gap-1.5">
            {colors.map((hex) => (
              <li key={hex}>
                <button
                  type="button"
                  onClick={() => loadColor(hex)}
                  title={`Load ${hex}`}
                  aria-label={`Load ${hex}`}
                  style={{ backgroundColor: hex }}
                  className={cn(
                    "flex h-16 w-full items-end justify-center rounded-lg pb-1 font-mono text-[8px] ring-1 ring-black/5 transition-transform",
                    "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
                    getContrastText(hex)
                  )}
                >
                  {hex.slice(1).toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="self-center text-xs text-neutral-500">
            Drop or choose an image to pull its main colors. Nothing is uploaded; it stays in your browser.
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-[11px] text-red-600">
          {error}
        </p>
      )}

      {colors.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => copy(colors.map((c) => formatColor(c, 1, defaultFormat)).join(", "))}
            className={actionButton}
          >
            <Copy className="h-3 w-3" aria-hidden="true" /> Copy all
          </button>
          <button
            type="button"
            onClick={() => copy(buildPaletteLink(name, palette))}
            className={actionButton}
          >
            <Link2 className="h-3 w-3" aria-hidden="true" /> Share link
          </button>
          <button type="button" onClick={save} disabled={saved} className={cn(actionButton, "disabled:opacity-60")}>
            <Save className="h-3 w-3" aria-hidden="true" />
            {saved ? "Saved" : signedIn ? "Save as palette" : "Sign in to save"}
          </button>
        </div>
      )}
    </div>
  );
}
