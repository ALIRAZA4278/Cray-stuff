"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Headline lines climb out from behind a mask for a cinematic reveal.
const lineMask = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

function MaskedLine({ children, className }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span variants={lineMask} className={`block ${className ?? ""}`}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const px = useMotionValue(0); // -0.5 .. 0.5
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 55, damping: 18, mass: 0.4 });

  // Glow chases the cursor; image drifts the opposite way for parallax depth.
  const glowX = useTransform(sx, [-0.5, 0.5], [-55, 55]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-55, 55]);
  const imgX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const imgY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  function handleMove(e) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex h-[520px] items-center justify-center overflow-hidden border-b border-border px-6 text-center sm:h-[640px]"
    >
      <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-10 transform-gpu">
        <Image
          src="https://picsum.photos/seed/cray-hero/1920/1080"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
      </motion.div>
      {/* Dark editorial wash — rich hero image with legible white type in both themes. */}
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />
      {/* Focused vignette so the headline reads against a busy photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_70%)]"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full bg-accent/25 blur-[95px]"
      />

      <motion.div variants={container} initial="hidden" animate="show" className="relative mx-auto max-w-4xl">
        <motion.p
          variants={rise}
          className="font-mono text-sm font-semibold uppercase tracking-widest text-violet-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]"
        >
          Cray Stuff &mdash; One of one
        </motion.p>
        <h1 className="mt-4 text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
          <MaskedLine>We don&apos;t follow trends.</MaskedLine>
          <MaskedLine
            className="text-outline filter-[drop-shadow(0_2px_12px_rgba(0,0,0,0.65))]"
            // stroke styling lives on the span so the mask can still clip it
          >
            <span style={{ WebkitTextStrokeColor: "#ffffff", WebkitTextStrokeWidth: "2px" }}>Trends follow us.</span>
          </MaskedLine>
        </h1>
        <motion.p variants={rise} className="mx-auto mt-5 max-w-lg text-sm text-white/70 sm:text-base">
          Premium curated vintage &amp; streetwear &mdash; carefully selected pieces with history, character and style.
        </motion.p>
        <motion.div variants={rise} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/shop"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
            >
              Shop now &rarr;
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/shop?sort=new"
              className="inline-block rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-white backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              New drop
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between border-t border-white/10 bg-black/30 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white/60 backdrop-blur sm:flex">
        <span>Warsaw &rarr; Worldwide</span>
        <span>One-of-one archive</span>
        <span>Ships in 24h</span>
      </div>
    </section>
  );
}
