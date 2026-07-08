import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function CollectionBanner({ eyebrow, title, href, cta, seed }) {
  return (
    <section className="relative flex h-[300px] items-center overflow-hidden border-b border-border px-6 sm:h-[380px]">
      <Image
        src={`https://picsum.photos/seed/${seed}/1600/800`}
        alt=""
        fill
        sizes="100vw"
        className="object-cover grayscale-[45%]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
      <Reveal className="relative mx-auto w-full max-w-7xl">
        <span className="inline-block rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
        <h2 className="mt-4 text-5xl font-semibold uppercase leading-none tracking-tight sm:text-7xl">
          {title}
        </h2>
        <Link
          href={href}
          className="mt-6 inline-block rounded-full border border-border bg-background/40 px-7 py-3 font-mono text-xs uppercase tracking-widest backdrop-blur transition-colors hover:border-accent"
        >
          {cta} &rarr;
        </Link>
      </Reveal>
    </section>
  );
}
