"use client";

import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const word = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Splits text into words that rise out from behind a mask, one after another,
// when scrolled into view — the editorial heading reveal (ochi.design style).
export default function RevealText({ text, className = "" }) {
  const words = String(text).split(" ");
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={`inline-block ${className}`}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
