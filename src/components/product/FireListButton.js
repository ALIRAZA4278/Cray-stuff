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
        <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4.5 5.9 4c2-.3 3.9.7 4.9 2.3C11.9 4.7 13.8 3.7 15.8 4c3.6.5 5.5 4.1 3.9 7.7C21.5 16.4 12 21 12 21z" />
      </motion.svg>
    </motion.button>
  );
}
