"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";
import { useLiteMotion } from "@/lib/useLiteMotion";

// Real people in the pieces. Mobile shows just the first (strongest) shot;
// desktop fans out all four side by side.
const heroShots = [
  "/PRODOCT/NEW/hero-red-model.jpg",
  "/PRODOCT/NEW/hero-teal.jpg",
  "/PRODOCT/NEW/hero-red-group.jpg",
  "/PRODOCT/NEW/hero-street.jpg",
];

export default function Hero() {
  const t = getDict(useLocale());
  const lite = useLiteMotion();
  const sectionRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 55, damping: 18, mass: 0.4 });

  // Aurora drifts with the cursor for interactive parallax depth (desktop only).
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
      onMouseMove={lite ? undefined : handleMove}
      onMouseLeave={lite ? undefined : handleLeave}
      className="relative flex h-[520px] items-center justify-center overflow-hidden border-b border-border px-6 text-center sm:h-[640px]"
    >
      {/* Four-up product strip. Rendered visible immediately (no entrance fade)
          so it can be the LCP paint without waiting on JS. The whole strip drifts
          with the cursor on desktop for depth. */}
      <motion.div aria-hidden style={lite ? undefined : { x: auroraX, y: auroraY }} className="absolute -inset-16 transform-gpu">
        <div className="grid h-full w-full grid-cols-1 sm:grid-cols-4">
          {heroShots.map((src, index) => (
            <div
              key={src}
              className={`relative overflow-hidden border-white/10 sm:border-r last:border-r-0 ${
                index > 0 ? "hidden sm:block" : ""
              }`}
            >
              <div className="absolute -inset-y-10 inset-x-0 transform-gpu">
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-center grayscale-[30%]"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Dark editorial wash — legible white type over the photo. */}
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
      {/* Soft scrim behind the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.5)_32%,rgba(0,0,0,0.22)_52%,transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full bg-accent/25 blur-[95px]"
      />

      <div className="relative mx-auto max-w-4xl">
        <p className="font-mono text-sm font-semibold uppercase tracking-widest text-violet-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
          Cray Stuff &mdash; {t.hmHeroOneOfOne}
        </p>
        <h1 className="mt-4 text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl">
          <span className="block">{t.hmHeroLine1}</span>
          <span className="block text-outline">
            <span style={{ WebkitTextStrokeColor: "#ffffff", WebkitTextStrokeWidth: "2px" }}>{t.hmHeroLine2}</span>
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-sm text-white/70 sm:text-base">{t.hmHeroSubtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-accent-foreground transition-transform hover:scale-[1.04] active:scale-95"
          >
            {t.hmShopNow} &rarr;
          </Link>
          <Link
            href="/shop?sort=new"
            className="inline-block rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-white backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            {t.hmNewDrop}
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between border-t border-white/10 bg-black/30 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white/60 backdrop-blur sm:flex">
        <span>{t.hmHeroPolandWorldwide}</span>
        <span>{t.hmHeroArchive}</span>
        <span>{t.hmShipsIn24h}</span>
      </div>
    </section>
  );
}
