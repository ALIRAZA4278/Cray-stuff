// Storefront currencies. Prices are stored in the BASE currency (PLN) — Wiktor
// enters every price in PLN in the admin. These rates convert PLN → the shown
// currency for DISPLAY only (the switcher in the header). Simple hardcoded
// table, not a live feed — update the rates here when they drift.
// Rate = how much of the target currency equals 1 PLN.
export const BASE_CURRENCY = "PLN";

export const CURRENCIES = {
  PLN: { code: "PLN", label: "PLN zł", symbol: "zł", rate: 1, suffix: true },
  USD: { code: "USD", label: "USD $", symbol: "$", rate: 0.25, suffix: false }, // ~4 PLN = $1
  EUR: { code: "EUR", label: "EUR €", symbol: "€", rate: 0.23, suffix: false }, // ~4.3 PLN = €1
};

export const CURRENCY_CODES = Object.keys(CURRENCIES);

// amount is in the base currency (PLN).
export function convertPrice(amount, code) {
  const c = CURRENCIES[code] || CURRENCIES[BASE_CURRENCY];
  return Math.round((Number(amount) || 0) * c.rate);
}

// e.g. formatPrice(229, "PLN") -> "229 zł", formatPrice(229, "USD") -> "$57"
export function formatPrice(amount, code) {
  const c = CURRENCIES[code] || CURRENCIES[BASE_CURRENCY];
  const value = convertPrice(amount, code);
  return c.suffix ? `${value} ${c.symbol}` : `${c.symbol}${value}`;
}
