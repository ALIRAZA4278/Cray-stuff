"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit(event) {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    setOpen(false);
    setQ("");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Search"
        className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-foreground"
      >
        <SearchIcon />
      </button>
      {open && (
        <form
          onSubmit={submit}
          className="absolute left-0 top-11 z-50 flex w-60 items-center gap-2 rounded-lg border border-border bg-background p-2 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
        >
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pieces…"
            className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            aria-label="Search"
            className="shrink-0 rounded-md bg-accent px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-accent-foreground"
          >
            Go
          </button>
        </form>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
  );
}
