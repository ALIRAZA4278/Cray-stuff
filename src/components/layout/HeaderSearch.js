"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { styleTags } from "@/lib/mock-products";
import { slugify } from "@/lib/shop-filters";

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  // Escape closes it, and the page behind shouldn't scroll while it's up.
  useEffect(() => {
    if (!open) return;
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  function go(href) {
    router.push(href);
    setOpen(false);
    setQ("");
  }

  function submit(event) {
    event.preventDefault();
    const query = q.trim();
    go(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-foreground"
      >
        <SearchIcon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto mt-[12vh] w-[92%] max-w-2xl rounded-2xl border border-border bg-background p-5 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Search the archive</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={submit} className="mt-4 flex items-center gap-3 border-b-2 border-border pb-3 focus-within:border-accent">
                <span className="text-muted">
                  <SearchIcon />
                </span>
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Brand, piece, style…"
                  className="w-full bg-transparent text-lg outline-none placeholder:text-muted sm:text-2xl"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-medium uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Search
                </button>
              </form>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">Jump to a style</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {styleTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => go(`/shop/${slugify(tag)}`)}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 font-mono text-[11px] uppercase tracking-widest text-muted">
                <button type="button" onClick={() => go("/shop")} className="transition-colors hover:text-accent">
                  All pieces &rarr;
                </button>
                <button type="button" onClick={() => go("/shop?sort=new")} className="transition-colors hover:text-accent">
                  New drop &rarr;
                </button>
                <button type="button" onClick={() => go("/sold")} className="transition-colors hover:text-accent">
                  Recently sold &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
