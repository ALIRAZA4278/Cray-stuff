"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function AnnouncementBar() {
  const t = getDict(useLocale());
  const messages = [
    t.annShipping,
    t.annNewsletter,
    t.annNewDrop,
    t.annMakeOffer,
    t.annFreeShipping,
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative h-8 overflow-hidden border-b border-border px-6 text-center text-xs uppercase tracking-wide text-muted">
      {messages.map((message, i) => (
        <p
          key={message}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {message}
        </p>
      ))}
    </div>
  );
}
