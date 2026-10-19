import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { env, getStorageKey } from "@/lib/env";
import { getStorageMigrationScript } from "@/lib/storageMigration";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${env.appName} — Color Playground`,
  description:
    "A premium, minimal color picker for exploring, converting, and saving colors.",
  metadataBase: new URL(env.appUrl),
};

const themeScript = `(function(){${getStorageMigrationScript()}try{var s=(JSON.parse(localStorage.getItem(${JSON.stringify(getStorageKey("settings"))})||"{}").state)||{};var t=s.theme||"system";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.dataset.session=localStorage.getItem(${JSON.stringify(getStorageKey("session"))})==="1"?"1":"0"}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-neutral-50 font-sans text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
