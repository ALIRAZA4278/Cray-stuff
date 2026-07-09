"use client";

import { useState } from "react";

// Wraps the filter sidebar: always visible + sticky on desktop, collapsible
// behind a "Filters" button on mobile.
export default function CollapsibleAside({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mb-4 flex w-full items-center justify-between rounded-lg border border-border px-4 py-2.5 lg:hidden"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Filters</span>
        <span className="font-mono text-lg leading-none text-accent">{open ? "−" : "+"}</span>
      </button>
      <div className={`${open ? "block" : "hidden"} lg:block lg:sticky lg:top-24`}>{children}</div>
    </div>
  );
}
