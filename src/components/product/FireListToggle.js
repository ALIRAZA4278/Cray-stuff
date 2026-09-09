"use client";

import { motion, AnimatePresence } from "motion/react";
import { useFireList } from "@/lib/FireListContext";
import { useRequireLogin } from "@/lib/AuthContext";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function FireListToggle({ product }) {
  const { isSaved, toggle } = useFireList();
  const saved = isSaved(product.slug);
  const run = useRequireLogin();
  const t = getDict(useLocale());

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
      aria-label={saved ? t.prRemoveFromFireList : t.prAddToFireList}
      whileTap={{ scale: 0.8 }}
      // Saved used to be a purple glyph on a 20%-purple translucent pill with a
      // backdrop blur and a glow — purple on purple, over a photo. On bright
      // shots it disappeared and read as a smudge. It is a solid white disc with
      // a purple flame now, so it holds its contrast against any photo.
      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
        saved
          ? "bg-white text-accent shadow-[0_0_18px_var(--accent-glow)] ring-2 ring-accent"
          : "bg-black/55 text-white ring-1 ring-white/70 backdrop-blur hover:bg-black/70"
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
        strokeWidth={saved ? 1 : 1.75}
        className="h-[18px] w-[18px]"
        animate={saved ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </motion.svg>
    </motion.button>
  );
}
