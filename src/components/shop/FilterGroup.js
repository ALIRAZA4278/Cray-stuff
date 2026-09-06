"use client";

import { Children, useState } from "react";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

// One collapsible block of filter pills.
//
// Two separate caps, because the sidebar had two different problems:
//  - `defaultOpen={false}` collapses a whole group behind its heading.
//  - `previewCount` keeps a long group (Brand has 40+ entries) open but short,
//    behind a "+N more" toggle. Fully expanding every brand used to push the
//    products off the screen entirely on mobile.
export default function FilterGroup({ label, children, defaultOpen = true, previewCount = 0 }) {
  const t = getDict(useLocale());
  const [open, setOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);

  const items = Children.toArray(children);
  const capped = previewCount > 0 && !showAll && items.length > previewCount;
  const visible = capped ? items.slice(0, previewCount) : items;
  const hiddenCount = items.length - previewCount;

  return (
    <div className="border-b border-border/60 pb-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mb-2 flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</span>
        <span aria-hidden className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <>
          <div className="flex flex-wrap gap-2">{visible}</div>
          {previewCount > 0 && items.length > previewCount && (
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent transition-opacity hover:opacity-75"
            >
              {showAll ? t.shShowLess : `+${hiddenCount} ${t.shShowMore}`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
