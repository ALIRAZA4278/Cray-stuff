import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function CollectionBanner({ eyebrow, title, href, cta, seed }) {
  return (
    <section className="relative flex h-[340px] items-center overflow-hidden border-b border-border px-6 sm:h-[440px]">
      <Image
        src={`https://picsum.photos/seed/${seed}/1600/800`}
        alt=""
        fill
        sizes="100vw"
        className="object-cover grayscale-[25%]"
      />
      {/* Dark editorial wash — keeps the banner rich and legible in both themes. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <Reveal className="relative mx-auto w-full max-w-7xl">
        <span className="inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur">
          {eyebrow}
        </span>
        <h2 className="mt-4 text-5xl font-semibold uppercase leading-none tracking-tight text-white drop-shadow-sm sm:text-7xl">
          {title}
        </h2>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3 font-mono text-xs uppercase tracking-widest text-white backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          {cta} &rarr;
        </Link>
      </Reveal>
    </section>
  );
}
