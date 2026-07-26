"use client";

import { useCurrency } from "@/lib/CurrencyContext";
import { CURRENCIES, CURRENCY_CODES } from "@/lib/currency";

// Currency switcher for the header. Prices are stored in PLN and converted to
// the chosen currency for display. The choice is remembered for next time.
export default function CurrencySelector({ className = "" }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      aria-label="Currency"
      className={`cursor-pointer rounded-md border border-border bg-transparent px-2 py-1.5 font-mono text-xs uppercase tracking-widest text-muted outline-none transition-colors hover:text-foreground focus:border-accent ${className}`}
    >
      {CURRENCY_CODES.map((code) => (
        <option key={code} value={code} className="bg-background text-foreground">
          {CURRENCIES[code].label}
        </option>
      ))}
    </select>
  );
}
