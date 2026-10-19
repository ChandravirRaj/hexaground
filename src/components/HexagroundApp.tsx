"use client";

import { useEffect, useMemo } from "react";
import { MotionConfig, motion } from "framer-motion";

import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { ColorPreview } from "@/components/ColorPreview/ColorPreview";
import { CopyToast } from "@/components/CopyButton/CopyToast";
import { Header } from "@/components/Header/Header";
import { FeatureCards } from "@/components/Landing/FeatureCards";
import { Hero } from "@/components/Landing/Hero";
import { Footer } from "@/components/Layout/Footer";
import { MobileColorBar } from "@/components/Layout/MobileColorBar";
import { MobileNav } from "@/components/Layout/MobileNav";
import { LibraryPanel } from "@/components/Library/LibraryPanel";
import { AppPreviewPanel } from "@/components/MobilePreview/AppPreviewPanel";
import { PalettesModal } from "@/components/Palettes/PalettesModal";
import { SharedPaletteBanner } from "@/components/Share/SharedPaletteBanner";
import { SettingsModal } from "@/components/Settings/SettingsModal";
import { ToolsPanel } from "@/components/Tools/ToolsPanel";
import { VisionFilters } from "@/components/Vision/VisionFilters";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { useCloudSync } from "@/hooks/useCloudSync";
import { useDebouncedColor } from "@/hooks/useDebouncedColor";
import { useShareLink } from "@/hooks/useShareLink";
import { cn } from "@/lib/cn";
import { useAuthStore } from "@/store/useAuthStore";
import { useColorStore, useSelectedColorStrings } from "@/store/useColorStore";
import { getBrandStyle } from "@/utils/brand";
import { getBackgroundGradient } from "@/utils/color";

export function HexagroundApp() {
  const { hex } = useSelectedColorStrings();
  const loading = useAuthStore((s) => s.loading);
  const signedIn = useAuthStore((s) => s.user !== null);

  const isDark = useApplyTheme();
  useDebouncedColor();

  useEffect(() => {
    void useColorStore.persist.rehydrate();
  }, []);

  useShareLink();
  useCloudSync();

  const brandStyle = useMemo(() => getBrandStyle(hex, isDark), [hex, isDark]);

  // Signed-out visitors also see the hero and feature cards. While auth resolves,
  // a CSS hint (set from the last session) avoids flashing the wrong layout.
  const landingClass = loading ? "landing-pending" : signedIn ? "hidden" : "";

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        animate={{ background: getBackgroundGradient(hex, isDark) }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <VisionFilters />
      <MobileColorBar />

      <div className="app-shell" style={brandStyle}>
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3 pb-24 sm:px-5 md:py-4 md:pb-6">
          <Header hex={hex} isDark={isDark} />

          <div className={landingClass}>
            <Hero />
          </div>

          <SharedPaletteBanner />

          <main
            className={cn(
              "flex flex-col gap-4",
              "md:grid md:h-[max(600px,calc(100dvh-7rem))] md:shrink-0 md:grid-cols-2 md:grid-rows-1 md:gap-4",
              "lg:grid-cols-[1.05fr_0.95fr] lg:gap-5"
            )}
          >
            <Reveal className="min-h-0 md:h-full">
              <GlassPanel
                id="canvas"
                title="Color Playground"
                className="flex min-h-0 flex-col md:h-full md:overflow-hidden"
                contentClassName="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
              >
                <ColorPreview />
                <ColorPicker />
              </GlassPanel>
            </Reveal>

            <Reveal delay={0.08} className="flex min-h-0 flex-col gap-4 md:h-full md:overflow-hidden">
              <ToolsPanel />
              <LibraryPanel />
            </Reveal>
          </main>

          <div className={landingClass}>
            <FeatureCards />
          </div>

          <Footer hex={hex} />
        </div>
      </div>

      <MobileNav />
      <PalettesModal />
      <SettingsModal />
      <AppPreviewPanel />
      <CopyToast />
    </MotionConfig>
  );
}
