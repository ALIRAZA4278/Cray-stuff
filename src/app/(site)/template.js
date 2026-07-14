"use client";

import { motion } from "motion/react";

const ease = [0.76, 0, 0.24, 1];
const COLUMNS = 5;

// Branded curtain page transition: a row of columns wipes up in a staggered
// wave to reveal the new page, with the wordmark fading over the top. Runs
// because template.js re-mounts on each route change.
export default function Template({ children }) {
  return (
    <>
      {/* Column wipe */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[92] flex">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease }}
            style={{ transformOrigin: "top" }}
            className="h-full flex-1 border-t-2 border-accent bg-background"
          />
        ))}
      </div>

      {/* Wordmark fades over the closing curtain */}
      <motion.div
        aria-hidden
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.45, ease }}
        className="pointer-events-none fixed inset-0 z-[93] flex items-center justify-center"
      >
        <span className="wordmark text-4xl uppercase text-foreground sm:text-6xl">
          Cray<span className="text-accent"> Stuff</span>
        </span>
      </motion.div>

      {/* Page content eases in as the curtain clears */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
