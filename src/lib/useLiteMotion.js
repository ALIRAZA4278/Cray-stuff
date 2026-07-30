"use client";

import { useEffect, useState } from "react";

// True when scroll-driven motion should be skipped — touch devices (where the
// per-frame transforms lag and flicker) or users who asked for reduced motion.
// Defaults to false so desktop keeps the effects; flips after mount on mobile.
export function useLiteMotion() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)");
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return lite;
}
