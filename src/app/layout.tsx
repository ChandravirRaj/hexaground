import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { env } from "@/lib/env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${env.appName} — Color Playground`,
  description:
    "A premium, minimal color picker for exploring, converting, and saving colors.",
  metadataBase: new URL(env.appUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-dvh bg-neutral-50 font-sans text-neutral-900 antialiased md:overflow-hidden">
        {children}
      </body>
    </html>
  );
}
