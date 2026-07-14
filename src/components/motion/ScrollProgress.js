"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin accent bar pinned to the very top that fills as the page scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-accent shadow-[0_0_10px_var(--accent-glow)]"
    />
  );
}
