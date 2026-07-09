"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FireListContext = createContext(null);
const STORAGE_KEY = "cray-fire-list";

// Fire List — CRAY STUFF's custom wishlist. Persisted to localStorage, same
// pattern as the cart. Stores a small product summary so the Fire List page
// can render cards without re-fetching.
export function FireListProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function toggle(product) {
    setItems((current) => {
      if (current.some((item) => item.slug === product.slug)) {
        return current.filter((item) => item.slug !== product.slug);
      }
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

  return (
    <FireListContext.Provider value={{ items, toggle, remove, isSaved, count: items.length }}>
      {children}
    </FireListContext.Provider>
  );
}

export function useFireList() {
  const context = useContext(FireListContext);
  if (!context) throw new Error("useFireList must be used within FireListProvider");
  return context;
}
