"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Buttery momentum scrolling (the ochi.design feel). Runs globally; motion's
// scroll-linked and in-view animations keep working on top of it.
export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who ask for reduced motion — leave native scroll alone.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
