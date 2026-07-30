"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function CartActions({ product }) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const t = getDict(useLocale());

  const inCart = items.some((item) => item.slug === product.slug);

  // Adding to the bag needs no login — sign-in is only required at checkout.
  function handleBuyNow() {
    addItem(product);
    router.push("/checkout");
  }

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleBuyNow}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        {t.prBuyNow}
      </button>
      <button
        type="button"
        onClick={handleAddToCart}
        className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
      >
        {inCart || added ? t.prAddedToCart : t.prAddToCart}
      </button>
    </>
  );
}
