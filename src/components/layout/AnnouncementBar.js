"use client";

import { useEffect, useState } from "react";

const messages = [
  "Shipping within 24 hours",
  "10% off for newsletter subscribers",
  "New drop available now",
  "Make an offer on every item",
  "Free shipping on orders over 250 PLN",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
