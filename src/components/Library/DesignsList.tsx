"use client";

import { Bookmark, Monitor, Smartphone, Trash2 } from "lucide-react";

import { getCategory } from "@/components/MobilePreview/categories";
import { EmptyState } from "@/components/ui/EmptyState";
import { openSavedDesign, useDesignStore } from "@/store/useDesignStore";

export function DesignsList() {
  const designs = useDesignStore((s) => s.designs);
  const remove = useDesignStore((s) => s.remove);

  if (designs.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No saved designs"
        hint="Open App preview and press Save design to keep a look for later."
      />
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {designs.map((design) => {
        const DeviceIcon = design.device === "web" ? Monitor : Smartphone;
        return (
          <li key={design.id} className="flex items-center gap-2 rounded-xl bg-white/60 p-2 ring-1 ring-neutral-200/50">
            <button
              type="button"
              onClick={() => openSavedDesign(design)}
              aria-label={`Open saved design ${design.name}`}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg ring-1 ring-neutral-200">
                <span className="absolute inset-0 bg-[repeating-conic-gradient(#e5e5e5_0%_25%,#fff_0%_50%)] [background-size:8px_8px]" />
                <span className="absolute inset-0" style={{ backgroundColor: design.hex, opacity: design.opacity }} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-neutral-800">{design.name}</span>
                <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                  <DeviceIcon className="h-3 w-3" aria-hidden="true" />
                  {getCategory(design.category).label} · {design.mode === "dark" ? "Dark" : "Light"}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => remove(design.id)}
              aria-label={`Delete saved design ${design.name}`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
