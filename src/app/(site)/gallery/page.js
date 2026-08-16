import Image from "next/image";
import { cookies } from "next/headers";
import Reveal from "@/components/motion/Reveal";
import { galleryImages } from "@/lib/gallery";
import { socialLinks } from "@/lib/site";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "Gallery — CRAY STUFF",
  description: "The world of CRAY STUFF — pieces worn, styled and lived in.",
};

export default async function GalleryPage() {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgGalleryEyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-5xl">{t.pgGalleryTitle}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">{t.pgGalleryDesc}</p>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-border px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:border-accent"
          >
            @craybze &rarr;
          </a>
        </Reveal>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {galleryImages.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.05}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-md border border-border">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
