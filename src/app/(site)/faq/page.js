"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const faqs = [
  {
    q: "What kind of pieces do you sell?",
    a: "Handpicked vintage, Y2K, skatewear, Japanese archive and selected high-end pieces — for people who appreciate individuality and clothing with character. Every item is one-of-one: no restocks, no duplicates.",
  },
  {
    q: "How do you describe condition and flaws?",
    a: "We don't use rating scores like 8/10. A piece is simply marked New With Tags or Used. Every listing includes exact measurements, a condition description, and if there are any flaws you'll see them clearly in the photos and read about them in the description. All products are washed and prepared to wear before shipping.",
  },
  {
    q: "How does “Make an Offer” work?",
    a: "Every piece has a fixed price you can buy instantly. You can also submit your own offer — offers don't reserve an item, and you're never obligated to buy after making one. If an offer is accepted, it stays valid for 48 hours. Suggested offers are usually within about 35% of the listed price.",
  },
  {
    q: "What is the Fire List?",
    a: "The Fire List is your saved-pieces list — tap the flame on any item to save it for later. Adding a piece to your Fire List doesn't reserve it, so if you love something, don't wait too long.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "BLIK, debit and credit cards, Apple Pay and Google Pay — all handled securely. BLIK is fully supported for our Polish customers.",
  },
  {
    q: "Which carriers do you ship with?",
    a: "InPost, DPD, DHL, GLS, UPS and Orlen Paczka. Orders are packed and shipped within 24 hours. The available options and cost are shown at checkout based on your address.",
  },
  {
    q: "Is shipping free?",
    a: "Shipping is free on any order of 3 items or more. On smaller orders a flat shipping rate applies and is shown at checkout before you pay.",
  },
  {
    q: "What is your return policy?",
    a: "You have 14 days to return a product in line with EU regulations. Customers cover the cost of standard returns. If an item isn't as described, or the mistake was on our side, we cover the return cost.",
  },
  {
    q: "Are the pieces authentic?",
    a: "Yes — 100% authenticity guarantee. Every product is checked by hand before it's listed. If authenticity concerns are ever confirmed, you get a full refund.",
  },
  {
    q: "How often do you drop new pieces?",
    a: "New products are added frequently, with major drops usually every 1–2 weeks. Each drop typically has between 10 and 30 pieces. Join the newsletter for early access and a 10% code on your first order.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-accent"
      >
        <span className="text-base font-medium sm:text-lg">{item.q}</span>
        <span
          aria-hidden
          className={`shrink-0 font-mono text-lg text-accent transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <p className="min-h-0 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Help</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">Frequently asked</h1>
          <p className="mt-2 text-sm text-muted">
            Everything about buying one-of-one pieces from CRAY STUFF. Still stuck? We&apos;re one message away.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 border-t border-border">
          {faqs.map((item, index) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-6">
            <div>
              <p className="text-base font-medium">Still have a question?</p>
              <p className="mt-1 text-sm text-muted">We reply to every message, usually within a day.</p>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
