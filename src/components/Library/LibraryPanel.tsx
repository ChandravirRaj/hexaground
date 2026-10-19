"use client";

import { useEffect, useState } from "react";

import { FavoriteColors } from "@/components/FavoriteColors/FavoriteColors";
import { DesignsList } from "@/components/Library/DesignsList";
import { PalettesList } from "@/components/Library/PalettesList";
import { RecentColors } from "@/components/RecentColors/RecentColors";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/cn";
import { useAuthStore } from "@/store/useAuthStore";
import { useFavoriteColors, useRecentColors } from "@/store/useColorStore";
import { useDesignStore } from "@/store/useDesignStore";
import { usePaletteStore } from "@/store/usePaletteStore";

type TabId = "recent" | "favorites" | "palettes" | "designs";

export function LibraryPanel() {
  const signedIn = useAuthStore((s) => s.user !== null);
  const recentCount = useRecentColors().length;
  const favoriteCount = useFavoriteColors().length;
  const paletteCount = usePaletteStore((s) => s.palettes.length);
  const designCount = useDesignStore((s) => s.designs.length);
  const [active, setActive] = useState<TabId>("recent");

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "recent", label: "Recent", count: recentCount },
    { id: "favorites", label: "Favorites", count: favoriteCount },
    ...(signedIn
      ? [
          { id: "palettes" as const, label: "Palettes", count: paletteCount },
          { id: "designs" as const, label: "Designs", count: designCount },
        ]
      : []),
  ];

  useEffect(() => {
    if (!signedIn && (active === "palettes" || active === "designs")) setActive("recent");
  }, [signedIn, active]);

  return (
    <GlassPanel
      id="library"
      title="Library"
      className="flex min-h-0 flex-1 flex-col"
      contentClassName="flex min-h-0 flex-1 flex-col p-4"
    >
      <div className="mb-3 flex shrink-0 gap-1 overflow-x-auto" role="tablist" aria-label="Library">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`library-tab-${tab.id}`}
            aria-selected={tab.id === active}
            aria-controls="library-tabpanel"
            onClick={() => setActive(tab.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              tab.id === active ? "bg-brand text-on-brand" : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {tab.label}
            <span className="tabular-nums opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      <div
        id="library-tabpanel"
        role="tabpanel"
        aria-labelledby={`library-tab-${active}`}
        className="max-h-72 min-h-0 flex-1 overflow-y-auto md:max-h-none"
      >
        {active === "recent" && <RecentColors />}
        {active === "favorites" && <FavoriteColors />}
        {active === "palettes" && <PalettesList />}
        {active === "designs" && <DesignsList />}
      </div>
    </GlassPanel>
  );
}
