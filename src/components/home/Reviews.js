import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import SectionHeading from "@/components/home/SectionHeading";
import ReviewCard from "@/components/reviews/ReviewCard";
import { reviews, reviewsCount } from "@/lib/reviews";
import { socialLinks } from "@/lib/site";

export default function Reviews() {
  const featured = reviews.slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-border px-6 py-16">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading eyebrow="Verified on Vinted" title="What buyers say" link={{ href: "/reviews", label: "All reviews" }} />

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
              <CountUp to={reviewsCount} className="font-display text-4xl font-semibold text-accent sm:text-5xl" />
              <span className="font-display text-4xl font-semibold text-accent sm:text-5xl">+</span>
            </span>
            <span className="text-left">
              <span className="block text-sm font-medium">ratings on our Vinted profile</span>
              <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-widest text-muted transition-colors group-hover:text-accent">
                Check it yourself &rarr;
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
            Every quote here was written by a real buyer — we leave out Vinted&apos;s automatic ones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
