"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { placeOrder, createCheckoutSession } from "@/lib/actions/orders";
import { validateDiscount } from "@/lib/actions/discounts";
import { getMyAcceptedOffers } from "@/lib/actions/offers";
import { useAuth } from "@/lib/AuthContext";
import { useCurrency } from "@/lib/CurrencyContext";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

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

function CheckoutInner() {
  const { items, clearCart } = useCart();
  const { user, loading } = useAuth();
  const { format } = useCurrency();
  const t = getDict(useLocale());

  const carriers = [
    { id: "inpost", label: `InPost ${t.prCarrierLocker}` },
    { id: "dpd", label: `DPD ${t.prCarrierCourier}` },
    { id: "dhl", label: "DHL" },
    { id: "gls", label: `GLS ${t.prCarrierCourier}` },
    { id: "ups", label: "UPS" },
    { id: "orlen", label: "Orlen Paczka" },
  ];

  const paymentMethods = [
    { id: "card", label: t.prPaymentCard },
    { id: "blik", label: "BLIK" },
    { id: "apple-pay", label: "Apple Pay" },
    { id: "google-pay", label: "Google Pay" },
  ];
  // This customer's honoured (accepted) offer prices, keyed by product slug.
  const [offers, setOffers] = useState({});
  const priceOf = (item) => offers[item.slug] ?? item.price;
  const subtotal = items.reduce((sum, it) => sum + priceOf(it), 0);
  const [carrier, setCarrier] = useState("inpost");
  const [payment, setPayment] = useState("card");
  const [email, setEmail] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();

  // Returning from a successful Stripe payment — show the confirmation and empty
  // the bag (the webhook has already marked the order Paid).
  useEffect(() => {
    if (searchParams.get("success")) {
      setOrderId(searchParams.get("order"));
      setPlaced(true);
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Discount code state.
  const [codeInput, setCodeInput] = useState("");
  const [discount, setDiscount] = useState(null); // { code, amount, label }
  const [discountError, setDiscountError] = useState(null);
  const [applying, setApplying] = useState(false);

  // Free shipping on orders of 3 items or more (every piece is one-of-one, so
  // items.length is the piece count). Smaller orders pay a flat rate.
  const shipping = items.length === 0 || items.length >= 3 ? 0 : 6;
  const discountValue = discount?.amount || 0;
  const total = Math.max(0, subtotal + shipping - discountValue);

  async function applyCode() {
    if (!codeInput.trim() || applying) return;
    setApplying(true);
    setDiscountError(null);
    const res = await validateDiscount({
      code: codeInput,
      subtotal,
      itemCount: items.length,
      prices: items.map(priceOf),
      email: user?.email,
    });
    setApplying(false);
    if (res.valid) {
      setDiscount({ code: res.code, amount: res.amount, label: res.label });
      setCodeInput(res.code);
    } else {
      setDiscount(null);
      setDiscountError(res.message);
    }
  }

  function removeDiscount() {
    setDiscount(null);
    setCodeInput("");
    setDiscountError(null);
  }

  // Prefill with the signed-in account email so the order lands in this
  // customer's order history — they can still edit it if ordering for someone else.
  useEffect(() => {
    if (user?.email) setEmail((current) => current || user.email);
  }, [user]);

  // Pull the customer's negotiated prices so the summary shows the deal.
  useEffect(() => {
    let active = true;
    getMyAcceptedOffers().then((map) => {
      if (active) setOffers(map || {});
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    // Re-check the code at the last moment so the charged total always matches
    // a currently-valid discount, even if something changed.
    let appliedCode = null;
    let appliedAmount = 0;
    if (discount?.code) {
      const check = await validateDiscount({
        code: discount.code,
        subtotal,
        itemCount: items.length,
        prices: items.map(priceOf),
        email: user?.email,
      });
      if (check.valid) {
        appliedCode = check.code;
        appliedAmount = check.amount;
      } else {
        setDiscount(null);
        setDiscountError(check.message);
        setSubmitting(false);
        return;
      }
    }
    const finalTotal = Math.max(0, subtotal + shipping - appliedAmount);

    const form = new FormData(event.target);
    const payload = {
      items,
      subtotal,
      discountCode: appliedCode,
      discountAmount: appliedAmount,
      total: finalTotal,
      carrier,
      payment,
      name: form.get("name"),
      email,
      address: form.get("address"),
      city: form.get("city"),
      postal: form.get("postal"),
      country: form.get("country"),
    };

    // If Stripe is connected, hand off to the hosted card page. Otherwise the
    // order is just recorded for review (no charge) and we show confirmation.
    const checkout = await createCheckoutSession(payload);
    if (checkout?.url) {
      window.location.href = checkout.url;
      return;
    }
    if (checkout?.error) {
      setSubmitting(false);
      setError(checkout.error);
      return;
    }

    const result = await placeOrder(payload);

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
          <h1 className="text-2xl font-semibold uppercase tracking-tight">{t.prSignInToCheckout}</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{t.prBagSaved}</p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.prLogIn}
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
        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-accent">{t.prOrderPlaced}</p>
        <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{t.prThankYou}</h1>
        {orderId && (
          <p className="mt-4 inline-block rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-sm">
            {orderId}
          </p>
        )}
        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          {t.prOrderConfirmBody}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/account/orders"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.prTrackYourOrder}
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
          >
            {t.prContinueShopping}
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="px-6 py-24 text-center text-muted">
        <p>{t.prCartEmpty}</p>
        <Link href="/shop" className="mt-3 inline-block text-sm text-accent hover:opacity-80">
          {t.prContinueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <Link href="/cart" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent">
            &larr; {t.prBackToCart}
          </Link>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-accent">{t.prSecureCheckout}</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{t.prCheckout}</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <StepLabel n="01">{t.prStepContact}</StepLabel>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder={t.prPhFullName} className={`${inputClass} sm:col-span-2`} autoComplete="name" />
                <input name="email" type="email" required placeholder={t.prPhEmail} value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} sm:col-span-2`} autoComplete="email" />
                <input name="address" required placeholder={t.prPhAddress} className={`${inputClass} sm:col-span-2`} autoComplete="street-address" />
                <input name="city" required placeholder={t.prPhCity} className={inputClass} autoComplete="address-level2" />
                <input name="postal" required placeholder={t.prPhPostal} className={inputClass} autoComplete="postal-code" />
                <input name="country" required placeholder={t.prPhCountry} className={`${inputClass} sm:col-span-2`} autoComplete="country-name" />
              </div>
            </section>

            <section>
              <StepLabel n="02">{t.prStepDelivery}</StepLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {carriers.map((option) => (
                  <button key={option.id} type="button" onClick={() => setCarrier(option.id)} className={pillClass(carrier === option.id)}>
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <StepLabel n="03">{t.prStepPayment}</StepLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {paymentMethods.map((option) => (
                  <button key={option.id} type="button" onClick={() => setPayment(option.id)} className={pillClass(payment === option.id)}>
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">{t.prNoPaymentYet}</p>
            </section>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? t.prPlacingOrder : t.prPlaceOrder.replace("{total}", format(total))}
            </button>
          </form>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.prOrderSummary}</h2>
              <ul className="mt-4 space-y-4">
                {items.map((item) => (
                  <li key={item.slug} className="flex items-center gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-background">
                      <Image src={thumb(item)} alt={item.name} fill sizes="56px" className="object-cover grayscale-[30%]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-wide text-accent">{item.brand}</p>
                      <p className="truncate text-sm">{item.name}</p>
                      {item.size && <p className="font-mono text-[10px] uppercase tracking-wide text-muted">{t.prFit} {item.size}</p>}
                    </div>
                    <span className="font-mono text-sm">
                      {offers[item.slug] != null && (
                        <span className="mr-1 text-muted line-through">{format(item.price)}</span>
                      )}
                      {format(priceOf(item))}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Discount code */}
              <div className="mt-5 border-t border-border pt-4">
                {discount ? (
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-accent/40 bg-accent/5 px-3 py-2">
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-wide text-accent">{discount.code}</p>
                      <p className="text-[11px] text-muted">{t.prLabelApplied.replace("{label}", discount.label)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={removeDiscount}
                      className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
                    >
                      {t.prRemove}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            applyCode();
                          }
                        }}
                        placeholder={t.prDiscountCode}
                        className={`${inputClass} font-mono uppercase`}
                      />
                      <button
                        type="button"
                        onClick={applyCode}
                        disabled={applying || !codeInput.trim()}
                        className="shrink-0 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:border-accent disabled:opacity-50"
                      >
                        {applying ? "…" : t.prApply}
                      </button>
                    </div>
                    {discountError && <p className="mt-1.5 text-xs text-red-400">{discountError}</p>}
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted">
                  <span>{t.prSubtotal}</span>
                  <span className="font-mono">{format(subtotal)}</span>
                </div>
                {discountValue > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>{t.prDiscount}{discount?.code ? ` (${discount.code})` : ""}</span>
                    <span className="font-mono">−{format(discountValue)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>{t.prShipping}</span>
                  <span className="font-mono">{shipping === 0 ? t.prFree : format(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-medium">
                  <span>{t.prTotal}</span>
                  <span className="font-mono">{format(total)}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 px-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              {t.prShipsFooter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}
