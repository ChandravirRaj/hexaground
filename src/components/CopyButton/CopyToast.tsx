"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useToastStore } from "@/store/useToastStore";

export function CopyToast() {
  const visible = useToastStore((s) => s.visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          Copied!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
