import Image from "next/image";
import Link from "next/link";
import ScrollRevealText from "@/components/motion/ScrollRevealText";

export default function BrandStory() {
  return (
    <div className="relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-lg border border-border p-8">
      <Image
        src="https://picsum.photos/seed/cray-philosophy/800/900"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover grayscale-[50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-black/10" />
      <div className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Our philosophy</p>
        <h2 className="mt-3 text-2xl font-semibold uppercase tracking-tight">Second life. First choice.</h2>
        <ScrollRevealText
          text="Every piece is unique. Every piece has a story. We give clothes a second life."
          className="mt-3 text-sm leading-relaxed text-muted"
        />
        <Link
          href="/faq"
          className="mt-6 inline-block rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
        >
          Read our story
        </Link>
      </div>
    </div>
  );
}
