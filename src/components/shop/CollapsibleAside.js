"use client";

import { useState } from "react";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

// Wraps the filter sidebar: sticky and self-scrolling on desktop, collapsible
// behind a "Filters" button on mobile.
export default function CollapsibleAside({ children, activeCount = 0 }) {
  const t = getDict(useLocale());
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mb-4 flex w-full items-center justify-between rounded-lg border border-border px-4 py-2.5 lg:hidden"
      >
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
          {t.shFilters}
          {activeCount > 0 && (
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] leading-none text-white">{activeCount}</span>
          )}
        </span>
        <span className="font-mono text-lg leading-none text-accent">{open ? "−" : "+"}</span>
      </button>
      {/* The sidebar is taller than the viewport, so `sticky` alone still forced
          a scroll to the bottom to reach Price. Capping the height and letting
          the panel scroll on its own keeps every group reachable while browsing.
          On mobile it is capped too, so an open filter panel can never swallow
          the whole screen and push the products out of view. */}
      <div
        className={`${
          open ? "block" : "hidden"
        } max-h-[60vh] overflow-y-auto overscroll-contain pr-1 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)]`}
      >
        {children}
      </div>
    </div>
  );
}
