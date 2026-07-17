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

// Four different pieces, side by side. Each column drifts on its own clock so
// the strip never looks like a static collage.
const heroShots = [
  // Far left: the shorts photo (same piece as the New Drop tile, no text baked in).
  "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/new-drop-jeans.jpg",
  // Second: True Religion — stays exactly as it was.
  "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/true-religion-jeans.jpg",
  // Third: Real Point (Really Point) Y2K zip hoodie.
  "/PRODOCT/NEW/real-point-hoodie.jpg",
  // Far right: Nike Brasil track jacket.
  "/PRODOCT/NEW/brazil-track-jacket.jpg",
];

export default function Hero() {
  const sectionRef = useRef(null);
  const px = useMotionValue(0); // -0.5 .. 0.5
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 55, damping: 18, mass: 0.4 });

  // Aurora drifts with the cursor for interactive parallax depth.
  const auroraX = useTransform(sx, [-0.5, 0.5], [-28, 28]);
  const auroraY = useTransform(sy, [-0.5, 0.5], [-28, 28]);

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
      {/* Four-up product strip; whole strip drifts with the cursor for depth. */}
      <motion.div aria-hidden style={{ x: auroraX, y: auroraY }} className="absolute -inset-16 transform-gpu">
        <div className="grid h-full w-full grid-cols-2 sm:grid-cols-4">
          {heroShots.map((src, index) => (
            <div key={src} className="relative overflow-hidden border-white/10 sm:border-r last:border-r-0">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: index % 2 === 0 ? [-16, 16] : [16, -16] }}
                transition={{
                  opacity: { duration: 0.8, delay: index * 0.1 },
                  y: {
                    duration: 7 + index * 1.3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: index * 0.1,
                  },
                }}
                className="absolute -inset-y-10 inset-x-0 transform-gpu"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={index < 2}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center grayscale-[30%]"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Dark editorial wash — legible white type over the photo. */}
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
      {/* Soft scrim behind the headline. This has to live outside the reveal
          masks: a text-shadow inside one gets clipped flat by its
          overflow-hidden, which reads as a hard edge above and below each line.
          An ellipse out here falls off evenly on every side instead. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.5)_32%,rgba(0,0,0,0.22)_52%,transparent_72%)]"
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
        {/* No text-shadow on the lines — the reveal masks would clip it square.
            The scrim above does the legibility work. */}
        <h1 className="mt-4 text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl">
          <MaskedLine>We don&apos;t follow trends.</MaskedLine>
          <MaskedLine className="text-outline">
            {/* stroke styling lives on the span so the mask can still clip it */}
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
        <span>Poland &rarr; Worldwide</span>
        <span>One-of-one archive</span>
        <span>Ships in 24h</span>
      </div>
    </section>
  );
}
