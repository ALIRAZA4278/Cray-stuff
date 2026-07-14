"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

// Counts up from 0 to `to` when it scrolls into view — a clearly visible,
// distinct animation for stat numbers (review counts, "1000+", etc.).
export default function CountUp({ to, duration = 1.6, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
    </span>
  );
}
