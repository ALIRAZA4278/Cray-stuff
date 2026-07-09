"use client";

import { motion, AnimatePresence } from "motion/react";
import { useFireList } from "@/lib/FireListContext";
import { useRequireLogin } from "@/lib/AuthContext";

export default function FireListButton({ product }) {
  const { isSaved, toggle } = useFireList();
  const saved = isSaved(product.slug);
  const run = useRequireLogin();

  return (
    <motion.button
      type="button"
      onClick={() => run(() => toggle(product))}
      aria-pressed={saved}
      aria-label={saved ? "Remove from Fire List" : "Add to Fire List"}
      whileTap={{ scale: 0.85 }}
      className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${
        saved
          ? "border-accent bg-accent/10 text-accent shadow-[0_0_22px_var(--accent-glow)]"
          : "border-border text-muted hover:text-foreground"
      }`}
    >
      <AnimatePresence>
        {saved && (
          <motion.span
            key="burst"
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full border border-accent"
          />
        )}
      </AnimatePresence>
      <motion.svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        animate={saved ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </motion.svg>
    </motion.button>
  );
}
