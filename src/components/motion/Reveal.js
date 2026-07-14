"use client";

import { motion } from "motion/react";

// Starting offsets per direction — lets different sections enter from
// different sides for a livelier scroll instead of everything fading up.
const offsets = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: 44 },
  right: { x: -44 },
  scale: { scale: 0.92, y: 14 },
  fade: {},
};

export default function Reveal({ children, delay = 0, variant = "up", className }) {
  const from = offsets[variant] ?? offsets.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
