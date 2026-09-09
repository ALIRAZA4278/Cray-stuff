"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FireListContext = createContext(null);
const STORAGE_KEY = "cray-fire-list";
// Separate key so clearing the list doesn't re-trigger the explainer.
const INTRO_SEEN_KEY = "cray-fire-intro-seen";

// Fire List — CRAY STUFF's custom wishlist. Persisted to localStorage, same
// pattern as the cart. Stores a small product summary so the Fire List page
// can render cards without re-fetching.
export function FireListProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  // Shown once, the first time someone ever Fires a piece — most people have no
  // idea what the flame does until they press it.
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function toggle(product) {
    // The intro check lives outside the setItems updater on purpose: React can
    // invoke an updater more than once, and firing a side effect from inside it
    // would be unreliable.
    if (items.some((item) => item.slug === product.slug)) {
      setItems((current) => current.filter((item) => item.slug !== product.slug));
      return;
    }

    try {
      if (!localStorage.getItem(INTRO_SEEN_KEY)) setShowIntro(true);
    } catch {
      // Private mode / blocked storage: skip the explainer, still save the piece.
    }

    setItems((current) => {
      if (current.some((item) => item.slug === product.slug)) return current;
      return [
        ...current,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: product.price,
          size: product.size,
          condition: product.condition,
          tags: product.tags,
          sold: product.sold ?? false,
          // The summary used to omit images entirely, so the Fire List page
          // rendered ProductCards with no photo and they fell through to the
          // random-stock-photo placeholder — saved pieces showed as forests.
          // Two are enough: the card only uses a primary and a hover image.
          images: (product.images || []).slice(0, 2),
        },
      ];
    });
  }

  function remove(slug) {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }

  function isSaved(slug) {
    return items.some((item) => item.slug === slug);
  }

  function dismissIntro() {
    setShowIntro(false);
    try {
      localStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
  }

  return (
    <FireListContext.Provider value={{ items, toggle, remove, isSaved, count: items.length, showIntro, dismissIntro }}>
      {children}
    </FireListContext.Provider>
  );
}

export function useFireList() {
  const context = useContext(FireListContext);
  if (!context) throw new Error("useFireList must be used within FireListProvider");
  return context;
}
