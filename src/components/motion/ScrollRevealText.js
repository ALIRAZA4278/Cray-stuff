"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export default function ScrollRevealText({ text, className }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.35"],
  });
  const words = text.split(" ");

  return (
    <p ref={container} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
