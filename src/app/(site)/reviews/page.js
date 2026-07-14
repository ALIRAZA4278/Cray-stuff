import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ReviewCard from "@/components/reviews/ReviewCard";
import { reviews, reviewsCount } from "@/lib/reviews";
import { socialLinks } from "@/lib/site";

export const metadata = {
  title: "Reviews — CRAY STUFF",
  description: "Real reviews from CRAY STUFF customers on Vinted.",
};

export default function ReviewsPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">The receipts</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-5xl">Reviews</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            {reviewsCount}+ buyers across Poland and the EU — in their own words. Every piece hand-picked, honestly
            described, and packed with care.
          </p>
          <a
            href={socialLinks.vinted}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-border px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:border-accent"
          >
            View our Vinted profile &rarr;
          </a>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={(index % 3) * 0.06}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-6 text-center sm:text-left">
            <div>
              <p className="text-base font-medium">Bought something you love?</p>
              <p className="mt-1 text-sm text-muted">Tag us — your fit could feature on our page.</p>
            </div>
            <Link
              href="/shop"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Shop the drop
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
