"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "motion/react";
import SectionHeading from "@/components/home/SectionHeading";

const charVariants = {
  initial: { y: "125%" },
  animate: { y: "0%" },
  exit: { y: "125%" },
};

function cardImage(product) {
  return product.images?.[0] || `https://picsum.photos/seed/${product.slug}/900/700`;
}

// Ochi-style featured card: hovering the image slides a giant accent title in
// letter-by-letter beside it (driven by useAnimation, exactly like the clone).
function FeaturedCard({ product, side }) {
  const controls = useAnimation();

  return (
    <motion.div
      onHoverStart={() => controls.start("animate")}
      onHoverEnd={() => controls.start("exit")}
      className="relative w-full md:w-1/2"
    >
      <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {product.brand}
      </p>

      {/* Giant title that reveals letter-by-letter, masked, over the card on hover */}
      <h3
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap px-4 pb-[0.12em] text-center font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight text-accent drop-shadow-[0_6px_40px_var(--accent-glow)] sm:block lg:text-7xl"
      >
        {product.name.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={charVariants}
            initial="initial"
            animate={controls}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: i * 0.03 }}
            className="inline-block"
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </h3>

      <Link
        href={`/product/${product.slug}`}
        className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <Image
          src={cardImage(product)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover grayscale-[25%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <p className="text-lg font-medium text-white">{product.name}</p>
          <span className="font-mono text-sm text-white">${product.price}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedCards({ products }) {
  const items = products.slice(0, 4);
  if (items.length === 0) return null;

  const rows = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));

  return (
    <section className="relative overflow-hidden border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Hand-picked" title="Featured pieces" link={{ href: "/shop?sort=popular", label: "Shop all" }} />
        <div className="space-y-16">
          {rows.map((row, r) => (
            <div key={r} className="flex flex-col gap-16 md:flex-row md:gap-10">
              {row.map((product, i) => (
                <FeaturedCard key={product.id} product={product} side={i === 0 ? "left" : "right"} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
