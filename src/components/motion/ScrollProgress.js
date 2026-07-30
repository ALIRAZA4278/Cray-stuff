"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useLiteMotion } from "@/lib/useLiteMotion";

// Thin accent bar pinned to the very top that fills as the page scrolls.
// Skipped on touch devices — a fixed, shadowed bar repainting every scroll frame
// is pure jank on mobile for a purely decorative indicator.
export default function ScrollProgress() {
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  if (lite) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-accent shadow-[0_0_10px_var(--accent-glow)]"
    />
  );
}
