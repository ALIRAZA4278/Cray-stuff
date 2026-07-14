import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import ReviewCard from "@/components/reviews/ReviewCard";
import { reviews, reviewsCount } from "@/lib/reviews";
import { socialLinks } from "@/lib/site";

export default function Reviews() {
  const featured = reviews.slice(0, 3);

  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={`${reviewsCount}+ happy buyers`}
          title="What buyers say"
          link={{ href: "/reviews", label: "All reviews" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.06}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-sm text-muted">
            Real words from Vinted customers.{" "}
            <a
              href={socialLinks.vinted}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              See our Vinted profile &rarr;
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
