"use client";

import { useState } from "react";

export default function FireListToggle() {
  const [saved, setSaved] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setSaved((value) => !value);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label="Add to Fire List"
      className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur transition-all duration-300 ${
        saved ? "text-accent shadow-[0_0_14px_var(--accent-glow)]" : "text-muted hover:text-foreground"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-4 w-4"
      >
        <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4.5 5.9 4c2-.3 3.9.7 4.9 2.3C11.9 4.7 13.8 3.7 15.8 4c3.6.5 5.5 4.1 3.9 7.7C21.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}
