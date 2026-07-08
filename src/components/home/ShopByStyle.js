import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { styleTags } from "@/lib/mock-products";

export default function ShopByStyle() {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold uppercase tracking-tight">Shop by style</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {styleTags.map((style, index) => (
            <Reveal key={style} delay={index * 0.05}>
              <Link
                href={`/shop/${style.toLowerCase()}`}
                className="group relative flex aspect-square items-end overflow-hidden rounded-lg border border-border transition-colors hover:border-accent"
              >
                <Image
                  src={`https://picsum.photos/seed/cray-style-${style.toLowerCase()}/400/400`}
                  alt={style}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover grayscale-[40%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                <span className="relative z-10 p-3 text-sm font-medium uppercase tracking-wide">{style}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
