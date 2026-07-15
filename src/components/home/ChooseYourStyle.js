"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import SectionHeading from "@/components/home/SectionHeading";
import { slugify } from "@/lib/shop-filters";

// The four aesthetics the store is built around. "Hidden Gems" is our name for
// the no-name pieces — cool stuff without a famous label.
// TODO(wiktor): swap in real lookbook shots per style when they land.
const styles = [
  {
    tag: "Vintage",
    blurb: "Lived-in, worn-in, one of one.",
    image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/cord-jacket-a.jpg",
  },
  {
    tag: "Y2K",
    blurb: "Baggy, loud, unmistakably 2000s.",
    image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/true-religion-jeans.jpg",
  },
  {
    tag: "Skate",
    blurb: "Built to be thrashed, aged right.",
    image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/y2k-jeans-2.jpg",
  },
  {
    tag: "Hidden Gems",
    blurb: "No label, all character.",
    image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/cord-jacket-b.jpg",
  },
];

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ChooseYourStyle() {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Find your lane"
          title="Choose your style"
          link={{ href: "/shop", label: "All pieces" }}
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
                    Shop {style.tag} &rarr;
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
