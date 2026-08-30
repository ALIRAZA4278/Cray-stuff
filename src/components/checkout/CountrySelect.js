"use client";

import { useEffect, useRef, useState } from "react";

// Native <select> dropdowns barely render their options against the theme, so
// this is a fully-styled replacement: a clear button + a scrollable, readable
// list that works in both light and dark.
export default function CountrySelect({ value, onChange, placeholder, countries }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={ref} className="relative sm:col-span-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
      >
        <span className={value ? "text-foreground" : "text-muted"}>{value || placeholder}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg"
        >
          {countries.map((c) => (
            <li key={c} role="option" aria-selected={c === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-accent/10 ${
                  c === value ? "text-accent" : "text-foreground"
                }`}
              >
                {c}
                {c === value && <span className="text-accent">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
