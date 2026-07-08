"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

const carriers = [
  { id: "inpost", label: "InPost Locker" },
  { id: "orlen", label: "Orlen Paczka" },
  { id: "gls", label: "GLS Courier" },
  { id: "dpd", label: "DPD Courier" },
];

const paymentMethods = [
  { id: "card", label: "Card" },
  { id: "blik", label: "BLIK" },
  { id: "apple-pay", label: "Apple Pay" },
  { id: "google-pay", label: "Google Pay" },
];

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

function pillClass(active) {
  return `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
    active ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted hover:text-foreground"
  }`;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [carrier, setCarrier] = useState("inpost");
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);

  const shipping = items.length === 0 || subtotal >= 58 ? 0 : 6;
  const total = subtotal + shipping;

  function handleSubmit(event) {
    event.preventDefault();
    setPlaced(true);
    clearCart();
  }

  if (placed) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Order placed</p>
        <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight">Thank you</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          We&apos;ve got your order — a confirmation will be sent to your email once payment processing is fully
          wired up.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="px-6 py-24 text-center text-muted">
        <p>Your cart is empty.</p>
        <Link href="/shop" className="mt-3 inline-block text-sm text-accent hover:opacity-80">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <h1 className="text-2xl font-semibold uppercase tracking-tight">Checkout</h1>

          <div>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className={`${inputClass} sm:col-span-2`} />
              <input required placeholder="Address" className={`${inputClass} sm:col-span-2`} />
              <input required placeholder="City" className={inputClass} />
              <input required placeholder="Postal code" className={inputClass} />
              <input required placeholder="Country" className={`${inputClass} sm:col-span-2`} />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Shipping carrier</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {carriers.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setCarrier(option.id)}
                  className={pillClass(carrier === option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Payment method</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {paymentMethods.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPayment(option.id)}
                  className={pillClass(payment === option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Place order &mdash; &euro;{total}
          </button>
        </form>

        <div className="h-fit rounded-lg border border-border bg-surface p-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.slug} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-mono">&euro;{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="font-mono">&euro;{subtotal}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span className="font-mono">{shipping === 0 ? "Free" : `€${shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span className="font-mono">&euro;{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
