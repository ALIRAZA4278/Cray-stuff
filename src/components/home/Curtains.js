"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { reviewsCount } from "@/lib/reviews";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

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
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  // Cheap opacity dim for depth instead of an expensive scroll-linked filter.
  const dim = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 0.5]);

  return (
    <section
      ref={ref}
      className="sticky top-0 flex h-[100svh] items-center overflow-hidden rounded-t-[2.75rem] border-t border-white/10 px-6 shadow-[0_-30px_60px_rgba(0,0,0,0.55)]"
    >
      <motion.div style={{ scale }} className={`absolute inset-0 transform-gpu bg-gradient-to-br ${panel.base}`}>
        {/* Fine grain */}
        <div aria-hidden className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: noise }} />
        {/* Vignette */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.5))]" />
        {/* Depth dim — scroll-linked opacity (GPU-cheap) */}
        <motion.div aria-hidden style={{ opacity: dim }} className="absolute inset-0 bg-black" />
      </motion.div>

      {/* Giant ghost index number */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[42vw] font-semibold leading-none text-white/[0.03] sm:text-[26vw]"
      >
        {panel.index}
      </span>

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
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-wide text-accent-foreground shadow-[0_0_30px_var(--accent-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_46px_var(--accent-glow)]"
          >
            {panel.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Curtains() {
  const t = getDict(useLocale());

  // Free rebuild of Motion+'s useCurtains: full-height panels pinned with sticky,
  // each sliding up over the last with a rounded "curtain" lip. Backgrounds are
  // designed dark panels (gradient only) that sit on the brand theme.
  const panels = [
    {
      index: "01",
      eyebrow: t.hmCurtain1Eyebrow,
      title: t.hmCurtain1Title,
      copy: t.hmCurtain1Copy,
      meta: ["Vintage", "Y2K", "Skate", t.hmArchive],
      cta: t.hmCurtain1Cta,
      href: "/shop",
      base: "from-[#241f33] via-[#191622] to-[#0d0b12]",
    },
    {
      index: "02",
      eyebrow: t.hmCurtain2Eyebrow,
      title: t.hmCurtain2Title,
      copy: t.hmCurtain2Copy,
      meta: [t.hmCurtain2MetaNew, t.hmShipsIn24h, t.hmHeroPolandWorldwide],
      cta: t.hmCurtain2Cta,
      href: "/shop?sort=new",
      base: "from-[#20202a] via-[#161620] to-[#0b0b10]",
    },
    {
      index: "03",
      eyebrow: t.hmOurPhilosophy,
      title: t.hmSecondLifeFirstChoice,
      copy: t.hmCurtain3Copy.replace("{n}", reviewsCount),
      meta: ["Est. 2021", t.hmCurtain3MetaHand, t.hmCurtain3Reviews.replace("{n}", reviewsCount)],
      cta: t.hmCurtain3Cta,
      href: "/about",
      base: "from-[#26202f] via-[#181521] to-[#0c0a11]",
    },
  ];

  return (
    <div className="relative">
      {panels.map((panel, i) => (
        <Panel key={panel.index} panel={panel} isLast={i === panels.length - 1} total={panels.length} />
      ))}
    </div>
  );
}
