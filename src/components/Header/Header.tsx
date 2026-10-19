"use client";

import { AccountMenu } from "@/components/Header/AccountMenu";
import { FavoriteButton } from "@/components/Header/FavoriteButton";
import { Logo } from "@/components/Brand/Logo";
import { ColorSearchBar } from "@/components/ColorSearchBar/ColorSearchBar";
import { ShareButton } from "@/components/Share/ShareButton";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export function Header({ hex, isDark }: { hex: string; isDark: boolean }) {
  return (
    <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-3 pb-3 md:pb-4">
      <Logo hex={hex} />

      <div className="order-3 w-full md:order-none md:ml-4 md:w-auto md:flex-1">
        <ColorSearchBar />
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <FavoriteButton />
        <ShareButton />
        <ThemeToggle isDark={isDark} />
        <AccountMenu />
      </div>
    </header>
  );
}
