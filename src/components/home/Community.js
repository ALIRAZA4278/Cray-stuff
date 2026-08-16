import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { galleryImages } from "@/lib/gallery";
import { getDict } from "@/lib/i18n";

export default async function Community() {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  // A teaser of the gallery — the full set lives on /gallery.
  const tiles = galleryImages.slice(0, 6);

  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.hmCommunityEyebrow}
          title={t.hmCommunityTitle}
          link={{ href: "/gallery", label: t.hmCommunityViewGallery }}
        />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {tiles.map((image, index) => (
            <Reveal key={image} delay={index * 0.04}>
              <Link
                href="/gallery"
                className="group relative block aspect-square overflow-hidden rounded-md border border-border transition-colors hover:border-accent"
              >
                <Image
                  src={image}
                  alt={t.hmCommunityAlt}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover grayscale-[30%] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-300 group-hover:bg-background/40 group-hover:opacity-100">
                  <ExpandIcon />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-foreground">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" strokeLinecap="round" />
    </svg>
  );
}
