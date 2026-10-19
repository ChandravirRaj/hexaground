"use client";

import { useState } from "react";
import { Lock, Smartphone } from "lucide-react";

import { ContrastTab } from "@/components/Tools/ContrastTab";
import { ImageTab } from "@/components/Tools/ImageTab";
import { HarmoniesTab } from "@/components/Tools/HarmoniesTab";
import { ShadesTab } from "@/components/Tools/ShadesTab";
import { VisionTab } from "@/components/Tools/VisionTab";
import { UIPreview } from "@/components/UIPreview/UIPreview";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/cn";
import { useFeature } from "@/lib/features";
import { useAuthStore } from "@/store/useAuthStore";
import { useMobilePreviewStore } from "@/store/useMobilePreviewStore";

const TABS = [
  { id: "preview", label: "Preview", locked: false, Component: UIPreview },
  { id: "shades", label: "Shades", locked: true, Component: ShadesTab },
  { id: "harmonies", label: "Harmonies", locked: true, Component: HarmoniesTab },
  { id: "contrast", label: "Contrast", locked: true, Component: ContrastTab },
  { id: "image", label: "Image", locked: false, Component: ImageTab },
  { id: "vision", label: "Vision", locked: false, Component: VisionTab },
] as const;

function LockedNotice({ feature }: { feature: string }) {
  const signIn = useAuthStore((s) => s.signIn);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <Lock className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-neutral-700">{feature} is for signed-in users</p>
      <button
        type="button"
        onClick={signIn}
        className="rounded-xl bg-brand px-3.5 py-1.5 text-xs font-semibold text-on-brand shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export function ToolsPanel() {
  const unlocked = useFeature("tools");
  const signedIn = useAuthStore((s) => s.user !== null);
  const signIn = useAuthStore((s) => s.signIn);
  const openMobilePreview = useMobilePreviewStore((s) => s.setOpen);
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("preview");

  const tab = TABS.find((t) => t.id === active)!;
  const Component = tab.Component;

  return (
    <GlassPanel
      id="tools"
      title="Color Tools"
      className="shrink-0"
      contentClassName="p-4"
      action={
        <button
          type="button"
          onClick={() => (signedIn ? openMobilePreview(true) : void signIn())}
          title={signedIn ? "See your color on mobile and web app screens" : "Sign in to use App Preview"}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1 text-[11px] font-semibold text-on-brand transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {signedIn ? (
            <Smartphone className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Lock className="h-3 w-3" aria-hidden="true" />
          )}
          App preview
        </button>
      }
    >
      <div className="mb-3 flex gap-1 overflow-x-auto" role="tablist" aria-label="Color tools">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tools-tab-${t.id}`}
            aria-selected={t.id === active}
            aria-controls="tools-tabpanel"
            onClick={() => setActive(t.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              t.id === active
                ? "bg-brand text-on-brand"
                : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {t.label}
            {t.locked && !unlocked && <Lock className="h-3 w-3 opacity-70" aria-label="Locked" />}
          </button>
        ))}
      </div>
      <div
        id="tools-tabpanel"
        role="tabpanel"
        aria-labelledby={`tools-tab-${active}`}
        className="h-[138px] overflow-y-auto"
      >
        {tab.locked && !unlocked ? <LockedNotice feature={tab.label} /> : <Component />}
      </div>
    </GlassPanel>
  );
}
