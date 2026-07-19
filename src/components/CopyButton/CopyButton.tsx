"use client";

import { memo } from "react";
import { Check, Copy } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";

interface CopyButtonProps {
  value: string;
  label: string;
  className?: string;
}

function CopyButtonComponent({ value, label, className }: CopyButtonProps) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={`Copy ${label} value`}
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
        "bg-neutral-100 text-neutral-600 transition-colors duration-200",
        "hover:bg-neutral-200 hover:text-neutral-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
        className
      )}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

export const CopyButton = memo(CopyButtonComponent);
