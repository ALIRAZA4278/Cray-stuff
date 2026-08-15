import { cookies } from "next/headers";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import SectionHeading from "@/components/home/SectionHeading";
import ReviewCard from "@/components/reviews/ReviewCard";
import { reviews, reviewsCount } from "@/lib/reviews";
import { socialLinks } from "@/lib/site";
import { getDict } from "@/lib/i18n";

export default async function Reviews({ reviewCount = reviewsCount }) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  const featured = reviews.slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-border px-6 py-16">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.hmReviewsEyebrow} title={t.hmReviewsTitle} link={{ href: "/reviews", label: t.hmReviewsAll }} />

        {/* Counter reads straight off the Vinted profile, and the link next to it
            lets anyone check the number themselves. */}
        <Reveal>
          <a
            href={socialLinks.vinted}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-lg border border-border bg-surface px-6 py-5 text-center transition-colors hover:border-accent"
          >
            <span className="flex items-baseline gap-2">
              <CountUp to={reviewCount} className="font-display text-4xl font-semibold text-accent sm:text-5xl" />
              <span className="font-display text-4xl font-semibold text-accent sm:text-5xl">+</span>
            </span>
            <span className="text-left">
              <span className="block text-sm font-medium">{t.hmReviewsRatings}</span>
              <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-widest text-muted transition-colors group-hover:text-accent">
                {t.hmReviewsCheck} &rarr;
              </span>
            </span>
          </a>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.06}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-sm text-muted">
            {t.hmReviewsDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
