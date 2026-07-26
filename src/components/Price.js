"use client";

import { useCurrency } from "@/lib/CurrencyContext";

// Renders a price (stored in PLN) in the visitor's chosen currency. Any extra
// props like `currency` are ignored — the display currency comes from the
// header switcher, not the product.
export default function Price({ amount }) {
  const { format } = useCurrency();
  return <>{format(amount)}</>;
}
