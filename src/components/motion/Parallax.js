"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Motion equivalent of Locomotive's data-scroll-speed: the element drifts
// vertically as the page scrolls. Positive speed moves it up faster than the
// page (foreground feel), negative drifts it down (background feel).
export default function Parallax({ children, speed = 0.2, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 140, speed * -140]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
