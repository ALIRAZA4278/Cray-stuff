"use client";

import { motion } from "motion/react";

export default function UnveilReveal({ children, delay = 0, className }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {children}
      <motion.div
        aria-hidden
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute inset-0 z-10 border-r border-accent/50 bg-background"
      />
    </div>
  );
}
