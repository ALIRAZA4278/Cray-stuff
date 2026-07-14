"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";

// Free rebuild of Motion+'s useCurtains: full-height panels pinned with sticky,
// each sliding up over the last with a rounded "curtain" lip. The covered panel
// scales down and dims for depth (scroll-linked via useScroll/useMotionTemplate).
// Backgrounds are designed dark panels (gradient + accent glow) that sit on the
// brand theme rather than stock photos.
const panels = [
  {
    index: "01",
    eyebrow: "The archive",
    title: "One of one",
    copy: "Every piece is the only one that will ever exist. No restocks, no duplicates — hand-picked, authenticated, and yours alone. Once it's gone, it's gone for good.",
    meta: ["Vintage", "Y2K", "Skate", "Archive"],
    cta: "Shop the drop",
    href: "/shop",
    glow: "left-[15%] top-[10%]",
    base: "from-[#241f33] via-[#191622] to-[#0d0b12]",
  },
  {
    index: "02",
    eyebrow: "Never restocked",
    title: "Wear it first",
    copy: "Fresh finds land every week and they don't wait around. Catch the drop before someone else does — packed and shipped within 24 hours, Warsaw to worldwide.",
    meta: ["New weekly", "Ships in 24h", "Warsaw → Worldwide"],
    cta: "New arrivals",
    href: "/shop?sort=new",
    glow: "left-1/2 top-[35%] -translate-x-1/2",
    base: "from-[#20202a] via-[#161620] to-[#0b0b10]",
  },
  {
    index: "03",
    eyebrow: "Our philosophy",
    title: "Second life. First choice.",
    copy: "Vintage with history and character — clothing that deserves a second life, not a landfill. Sourced by hand, checked by hand, and loved by 530+ buyers across the EU.",
    meta: ["Est. 2021", "Hand-checked", "530+ reviews"],
    cta: "Our story",
    href: "/about",
    glow: "right-[12%] bottom-[8%]",
    base: "from-[#26202f] via-[#181521] to-[#0c0a11]",
  },
];

const noise =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Panel({ panel, isLast, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.9]);
  const bright = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.5]);
  const filter = useMotionTemplate`brightness(${bright})`;

  return (
    <section
      ref={ref}
      className="sticky top-0 flex h-[100svh] items-center overflow-hidden rounded-t-[2.75rem] border-t border-white/10 px-6 shadow-[0_-30px_60px_rgba(0,0,0,0.55)]"
    >
      <motion.div style={{ scale, filter }} className={`absolute inset-0 bg-gradient-to-br ${panel.base}`}>
        {/* Accent glow */}
        <div aria-hidden className={`pointer-events-none absolute h-[620px] w-[720px] rounded-full bg-[#8b5cf6]/25 blur-[160px] ${panel.glow}`} />
        {/* Cooler counter-glow for depth */}
        <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/3 h-[460px] w-[520px] rounded-full bg-accent/15 blur-[150px]" />
        {/* Fine grain */}
        <div aria-hidden className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: noise }} />
        {/* Vignette */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.5))]" />
      </motion.div>

      {/* Editorial corner labels */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-8 font-mono text-[11px] uppercase tracking-widest text-white/50 sm:px-10">
        <span className="text-violet-300">
          {panel.index} <span className="text-white/40">/ 0{total}</span>
        </span>
        <span>Cray Stuff</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="relative z-10 mx-auto w-full max-w-4xl -translate-y-6 text-center sm:-translate-y-10"
      >
        <motion.p variants={rise} className="font-mono text-xs uppercase tracking-[0.3em] text-violet-300">
          {panel.eyebrow}
        </motion.p>
        <motion.h2
          variants={rise}
          className="mt-5 font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.6)] sm:text-8xl"
        >
          {panel.title}
        </motion.h2>
        <motion.p variants={rise} className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          {panel.copy}
        </motion.p>

        <motion.div variants={rise} className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {panel.meta.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/80 backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div variants={rise}>
          <Link
            href={panel.href}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-wide text-accent-foreground shadow-[0_0_30px_var(--accent-glow)] transition-opacity hover:opacity-90"
          >
            {panel.cta} &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Curtains() {
  return (
    <div className="relative">
      {panels.map((panel, i) => (
        <Panel key={panel.index} panel={panel} isLast={i === panels.length - 1} total={panels.length} />
      ))}
    </div>
  );
}
