"use client";

import { useEffect } from "react";

// Buttery momentum scrolling (the ochi.design feel), driven by GSAP's ticker so
// GSAP ScrollTrigger animations stay in sync with Lenis. Lenis + GSAP are heavy,
// so they're loaded lazily AFTER first paint — they stay out of the critical JS
// bundle and no longer delay the page becoming visible.
export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who ask for reduced motion — leave native scroll alone.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis;
    let ticker;
    let gsapRef;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapRef = gsap;

      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      if (gsapRef && ticker) gsapRef.ticker.remove(ticker);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
