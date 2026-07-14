"use client";

import { motion } from "motion/react";

// Re-mounts on every navigation, so each page eases in — a subtle, site-wide
// page transition. Header/Footer stay put; only the page content animates.
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
