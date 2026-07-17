import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { styleTags } from "@/lib/mock-products";
import { slugify } from "@/lib/shop-filters";
import { styleImages } from "@/lib/style-images";

export default function ShopByStyle() {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Curated edits" title="Shop by style" link={{ href: "/shop", label: "All styles" }} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {styleTags.map((style, index) => (
            <Reveal key={style} delay={index * 0.05}>
              <Link
                href={`/shop/${slugify(style)}`}
                className="group relative flex aspect-square items-end overflow-hidden rounded-lg border border-border transition-colors hover:border-accent"
              >
                <Image
                  src={styleImages[slugify(style)]}
                  alt={style}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover grayscale-[40%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
                <div className="relative z-10 flex w-full items-center justify-between p-3">
                  <span className="text-sm font-medium uppercase tracking-wide text-white">{style}</span>
                  <span className="font-mono text-xs text-white/0 transition-all duration-300 group-hover:text-accent">
                    &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
