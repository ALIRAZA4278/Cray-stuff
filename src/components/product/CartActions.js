"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useRequireLogin } from "@/lib/AuthContext";

export default function CartActions({ product }) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const run = useRequireLogin();
  const [added, setAdded] = useState(false);

  const inCart = items.some((item) => item.slug === product.slug);

  function handleBuyNow() {
    run(() => {
      addItem(product);
      router.push("/checkout");
    });
  }

  function handleAddToCart() {
    run(() => {
      addItem(product);
      setAdded(true);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={handleBuyNow}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Buy now
      </button>
      <button
        type="button"
        onClick={handleAddToCart}
        className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
      >
        {inCart || added ? "Added to cart" : "Add to cart"}
      </button>
    </>
  );
}
