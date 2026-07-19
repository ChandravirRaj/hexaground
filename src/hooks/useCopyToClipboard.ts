"use client";

import { useCallback, useState } from "react";

import { useToastStore } from "@/store/useToastStore";

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const showToast = useToastStore((s) => s.show);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        showToast();
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        setCopied(false);
      }
    },
    [resetDelay, showToast]
  );

  return { copy, copied };
}
