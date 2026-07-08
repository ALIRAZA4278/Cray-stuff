"use client";

import { useState } from "react";

export default function FireListButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSaved((value) => !value)}
      aria-pressed={saved}
      aria-label="Add to Fire List"
      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
        saved ? "border-accent text-accent" : "border-border text-muted hover:text-foreground"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
      >
        <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4.5 5.9 4c2-.3 3.9.7 4.9 2.3C11.9 4.7 13.8 3.7 15.8 4c3.6.5 5.5 4.1 3.9 7.7C21.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}
