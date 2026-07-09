"use client";

import { motion, AnimatePresence } from "motion/react";
import { useFireList } from "@/lib/FireListContext";
import { useRequireLogin } from "@/lib/AuthContext";

export default function FireListToggle({ product }) {
  const { isSaved, toggle } = useFireList();
  const saved = isSaved(product.slug);
  const run = useRequireLogin();

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    run(() => toggle(product));
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from Fire List" : "Add to Fire List"}
      whileTap={{ scale: 0.8 }}
      className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition-colors duration-300 ${
        saved
          ? "border-accent/60 bg-accent/20 text-accent shadow-[0_0_16px_var(--accent-glow)]"
          : "border-transparent bg-black/50 text-white/80 hover:text-white"
      }`}
    >
      <AnimatePresence>
        {saved && (
          <motion.span
            key="burst"
            initial={{ scale: 0.5, opacity: 0.7 }}
            animate={{ scale: 1.9, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full border border-accent"
          />
        )}
      </AnimatePresence>
      <motion.svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-4 w-4"
        animate={saved ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </motion.svg>
    </motion.button>
  );
}
