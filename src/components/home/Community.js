import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { socialLinks } from "@/lib/site";

const tiles = Array.from({ length: 6 }, (_, index) => `cray-community-${index}`);

export default function Community() {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Worn by the community"
          title="From our world"
          link={{ href: socialLinks.instagram, label: "@craybze" }}
        />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {tiles.map((seed, index) => (
            <Reveal key={seed} delay={index * 0.04}>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-md border border-border transition-colors hover:border-accent"
              >
                <Image
                  src={`https://picsum.photos/seed/${seed}/300/300`}
                  alt="Community post"
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover grayscale-[30%] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-300 group-hover:bg-background/40 group-hover:opacity-100">
                  <InstagramIcon />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-foreground">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
