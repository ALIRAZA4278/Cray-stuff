"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { placeOrder } from "@/lib/actions/orders";
import { useAuth } from "@/lib/AuthContext";

const carriers = [
  { id: "inpost", label: "InPost Locker" },
  { id: "dpd", label: "DPD Courier" },
  { id: "dhl", label: "DHL" },
  { id: "gls", label: "GLS Courier" },
  { id: "ups", label: "UPS" },
  { id: "orlen", label: "Orlen Paczka" },
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

function thumb(item) {
  return item.image || `https://picsum.photos/seed/${item.slug}/200/260`;
}

function StepLabel({ n, children }) {
  return (
    <h2 className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide">
      <span className="font-mono text-xs text-accent">{n}</span>
      {children}
    </h2>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user, loading } = useAuth();
  const [carrier, setCarrier] = useState("inpost");
  const [payment, setPayment] = useState("card");
  const [email, setEmail] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const shipping = items.length === 0 || subtotal >= 58 ? 0 : 6;
  const total = subtotal + shipping;

  // Prefill with the signed-in account email so the order lands in this
  // customer's order history — they can still edit it if ordering for someone else.
  useEffect(() => {
    if (user?.email) setEmail((current) => current || user.email);
  }, [user]);

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
      email,
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
      <div className="px-6 py-24">
        <div className="mx-auto max-w-md rounded-lg border border-dashed border-border bg-surface p-12 text-center">
          <h1 className="text-2xl font-semibold uppercase tracking-tight">Sign in to check out</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">Your bag is saved — log in to complete your order.</p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="px-6 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent text-accent shadow-[0_0_22px_var(--accent-glow)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
            <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-accent">Order placed</p>
        <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">Thank you</h1>
        {orderId && (
          <p className="mt-4 inline-block rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-sm">
            {orderId}
          </p>
        )}
        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          We&apos;ve got your order and it&apos;s in our queue. You&apos;ll get a confirmation by email — payment is
          handled once Stripe is connected.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/account/orders"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Track your order
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
          >
            Continue shopping
          </Link>
        </div>
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
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <Link href="/cart" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent">
            &larr; Back to cart
          </Link>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-accent">Secure checkout</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">Checkout</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <StepLabel n="01">Contact &amp; shipping</StepLabel>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Full name" className={`${inputClass} sm:col-span-2`} autoComplete="name" />
                <input name="email" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} sm:col-span-2`} autoComplete="email" />
                <input name="address" required placeholder="Address" className={`${inputClass} sm:col-span-2`} autoComplete="street-address" />
                <input name="city" required placeholder="City" className={inputClass} autoComplete="address-level2" />
                <input name="postal" required placeholder="Postal code" className={inputClass} autoComplete="postal-code" />
                <input name="country" required placeholder="Country" className={`${inputClass} sm:col-span-2`} autoComplete="country-name" />
              </div>
            </section>

            <section>
              <StepLabel n="02">Delivery</StepLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {carriers.map((option) => (
                  <button key={option.id} type="button" onClick={() => setCarrier(option.id)} className={pillClass(carrier === option.id)}>
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <StepLabel n="03">Payment</StepLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {paymentMethods.map((option) => (
                  <button key={option.id} type="button" onClick={() => setPayment(option.id)} className={pillClass(payment === option.id)}>
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">No payment is taken yet — this places the order for review.</p>
            </section>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Placing order…" : `Place order — €${total}`}
            </button>
          </form>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Order summary</h2>
              <ul className="mt-4 space-y-4">
                {items.map((item) => (
                  <li key={item.slug} className="flex items-center gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-background">
                      <Image src={thumb(item)} alt={item.name} fill sizes="56px" className="object-cover grayscale-[30%]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-wide text-accent">{item.brand}</p>
                      <p className="truncate text-sm">{item.name}</p>
                      {item.size && <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Size {item.size}</p>}
                    </div>
                    <span className="font-mono text-sm">&euro;{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-mono">&euro;{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span className="font-mono">{shipping === 0 ? "Free" : `€${shipping}`}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-medium">
                  <span>Total</span>
                  <span className="font-mono">&euro;{total}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 px-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              Ships within 24h · InPost · Orlen · GLS · DPD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
