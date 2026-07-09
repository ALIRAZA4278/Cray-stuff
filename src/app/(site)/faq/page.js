"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const faqs = [
  {
    q: "What does “one-of-one” mean?",
    a: "Every piece on CRAY STUFF is a single, hand-sourced item — no restocks, no duplicates, no size runs. Once a piece sells, it's gone for good. That's why we keep sold items visible with a Sold Out label rather than removing them.",
  },
  {
    q: "How does “Make an Offer” work?",
    a: "Every piece has a fixed price you can buy instantly. If you'd rather negotiate, submit an offer on the product page. Reasonable offers are accepted automatically and take you straight to checkout; lower offers get an instant counter at the best price we can do. No auctions, no waiting.",
  },
  {
    q: "What is the Fire List?",
    a: "The Fire List is your saved-pieces list — tap the heart on any item to add it. If a piece on your Fire List drops in price, we'll let you know. The most-saved pieces across all shoppers shape our Most Popular section.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "BLIK, debit and credit cards, Apple Pay and Google Pay — all handled securely through Stripe. BLIK is fully supported for our Polish customers.",
  },
  {
    q: "How fast do you ship, and with which carriers?",
    a: "Orders are packed and shipped within 24 hours. Within Poland we ship via InPost, Orlen Paczka, GLS and DPD. International shipping is available across Europe and beyond — carrier and cost are shown at checkout.",
  },
  {
    q: "Is shipping free?",
    a: "Shipping is free within Poland on orders over 250 PLN. Below that, a small flat carrier fee is shown at checkout before you pay.",
  },
  {
    q: "How do you grade condition?",
    a: "Each piece is graded honestly — Excellent, Very Good, or Good — with measurements and a written description covering any wear. Vintage means character; we tell you exactly what to expect before you buy.",
  },
  {
    q: "Can I return a piece?",
    a: "Because every item is one-of-one and described in detail, we handle returns case by case. If something arrives not as described, contact us within 48 hours of delivery and we'll make it right.",
  },
  {
    q: "Do you ship outside Poland?",
    a: "Yes. CRAY STUFF ships across Europe and worldwide. Available carriers and delivery estimates appear at checkout based on your address.",
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
