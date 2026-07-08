import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

const tiles = Array.from({ length: 6 }, (_, index) => `cray-community-${index}`);

export default function Community() {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold uppercase tracking-tight">From our community</h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:opacity-80"
          >
            @craystuff
          </a>
        </Reveal>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {tiles.map((seed, index) => (
            <Reveal key={seed} delay={index * 0.04}>
              <div className="relative aspect-square overflow-hidden rounded-md border border-border">
                <Image
                  src={`https://picsum.photos/seed/${seed}/300/300`}
                  alt="Community post"
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover grayscale-[30%]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
