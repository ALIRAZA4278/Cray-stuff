"use client";

import { useCurrency } from "@/lib/CurrencyContext";

// Renders a price in the visitor's chosen currency. `amount` is the base (USD)
// number stored on the product/order. Works as a client leaf inside server
// components, so catalog cards and pages don't have to become client components.
export default function Price({ amount }) {
  const { format } = useCurrency();
  return <>{format(amount)}</>;
}
