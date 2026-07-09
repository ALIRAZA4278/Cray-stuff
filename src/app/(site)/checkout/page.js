"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { placeOrder } from "@/lib/actions/orders";
import { useAuth } from "@/lib/AuthContext";

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
  const { user, loading } = useAuth();
  const [carrier, setCarrier] = useState("inpost");
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const shipping = items.length === 0 || subtotal >= 58 ? 0 : 6;
  const total = subtotal + shipping;

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.target);
    const result = await placeOrder({
      items,
      total,
      carrier,
      payment,
      name: form.get("name"),
      email: form.get("email"),
      address: form.get("address"),
      city: form.get("city"),
      postal: form.get("postal"),
      country: form.get("country"),
    });

    setSubmitting(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    setOrderId(result.orderId);
    setPlaced(true);
    clearCart();
  }

  if (!loading && !user) {
    return (
      <div className="px-6 py-24 text-center text-muted">
        <p>Please log in to check out.</p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Log in
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Order placed</p>
        <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight">Thank you</h1>
        {orderId && (
          <p className="mt-3 font-mono text-sm text-muted">
            Order <span className="text-foreground">{orderId}</span>
          </p>
        )}
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          We&apos;ve got your order and it&apos;s in our queue. You&apos;ll get a confirmation by email — payment is
          handled once Stripe is connected.
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
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Contact & shipping</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Full name" className={`${inputClass} sm:col-span-2`} autoComplete="name" />
              <input name="email" type="email" required placeholder="Email" className={`${inputClass} sm:col-span-2`} autoComplete="email" />
              <input name="address" required placeholder="Address" className={`${inputClass} sm:col-span-2`} autoComplete="street-address" />
              <input name="city" required placeholder="City" className={inputClass} autoComplete="address-level2" />
              <input name="postal" required placeholder="Postal code" className={inputClass} autoComplete="postal-code" />
              <input name="country" required placeholder="Country" className={`${inputClass} sm:col-span-2`} autoComplete="country-name" />
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
            <p className="mt-2 text-xs text-muted">No payment is taken yet — this places the order for review.</p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Placing order…" : `Place order — €${total}`}
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
