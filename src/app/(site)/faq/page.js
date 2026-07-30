"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

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
  const t = getDict(useLocale());

  const faqs = [
    { q: t.pgFaqQ1, a: t.pgFaqA1 },
    { q: t.pgFaqQ2, a: t.pgFaqA2 },
    { q: t.pgFaqQ3, a: t.pgFaqA3 },
    { q: t.pgFaqQ4, a: t.pgFaqA4 },
    { q: t.pgFaqQ5, a: t.pgFaqA5 },
    { q: t.pgFaqQ6, a: t.pgFaqA6 },
    { q: t.pgFaqQ7, a: t.pgFaqA7 },
    { q: t.pgFaqQ8, a: t.pgFaqA8 },
    { q: t.pgFaqQ9, a: t.pgFaqA9 },
    { q: t.pgFaqQ10, a: t.pgFaqA10 },
  ];

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgFaqEyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{t.pgFaqTitle}</h1>
          <p className="mt-2 text-sm text-muted">
            {t.pgFaqIntro}
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
              <p className="text-base font-medium">{t.pgFaqStillTitle}</p>
              <p className="mt-1 text-sm text-muted">{t.pgFaqStillDesc}</p>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t.pgFaqContact}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
