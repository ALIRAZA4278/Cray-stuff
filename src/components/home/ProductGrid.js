import Link from "next/link";
import { cookies } from "next/headers";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";
import ProductCarousel from "@/components/home/ProductCarousel";
import { getDict } from "@/lib/i18n";

export default async function ProductGrid({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel,
  products,
  plain = false,
}) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  const label = viewAllLabel ?? t.hmViewAll;

  return (
    <section className="relative overflow-hidden border-b border-border px-6 py-16">
      <div className="relative mx-auto max-w-7xl">
        {!plain && (
          <Reveal className="mb-8 text-center">
            {eyebrow && (
              <p className="flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest text-accent">
                <span aria-hidden className="h-px w-10 bg-border" />
                {eyebrow}
                <span aria-hidden className="h-px w-10 bg-border" />
              </p>
            )}
            <h2 className="mt-2 text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
              <RevealText text={title} />
            </h2>
            <Link
              href={viewAllHref}
              className="mt-3 inline-block text-sm uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              {label} &rarr;
            </Link>
          </Reveal>
        )}
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
