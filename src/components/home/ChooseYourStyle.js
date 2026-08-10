"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import SectionHeading from "@/components/home/SectionHeading";
import { slugify } from "@/lib/shop-filters";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ChooseYourStyle() {
  const t = getDict(useLocale());

  // The four aesthetics the store is built around. "Just Swag" is our name for
  // the no-name pieces — good-looking stuff without a famous label.
  // TODO(wiktor): swap in real lookbook shots per style when they land.
  const styles = [
    {
      tag: "Vintage",
      blurb: t.hmStyleVintageBlurb,
      image: "/PRODOCT/NEW/usa-leather-jacket.jpg",
    },
    {
      tag: "Y2K",
      blurb: t.hmStyleY2KBlurb,
      image: "/PRODOCT/NEW/y2k-rockrevival.jpg",
    },
    {
      tag: "Skate",
      blurb: t.hmStyleSkateBlurb,
      image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/y2k-jeans-2.jpg",
    },
    {
      tag: "Just Swag",
      blurb: t.hmStyleSwagBlurb,
      image: "/PRODOCT/NEW/just-swag-ruthless.jpg",
    },
  ];

  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.hmFindYourLane}
          title={t.hmChooseYourStyle}
          link={{ href: "/shop", label: t.hmAllPieces }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.09 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {styles.map((style) => (
            <motion.div key={style.tag} variants={card}>
              <Link
                href={`/shop/${slugify(style.tag)}`}
                className="group relative flex h-[300px] items-end overflow-hidden rounded-lg border border-border sm:h-[420px]"
              >
                <Image
                  src={style.image}
                  alt={style.tag}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                {/* Accent sweep on hover so the card feels alive, not static. */}
                <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-accent/30 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                <div className="relative z-10 w-full p-5">
                  <p className="font-display text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl">
                    {style.tag}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{style.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {t.hmShop} {style.tag} &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
