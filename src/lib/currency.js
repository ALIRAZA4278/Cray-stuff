// Storefront display currencies. Prices are stored in the base currency (USD)
// as plain numbers; these rates convert them for DISPLAY only. They're a simple
// hardcoded table, not a live feed — update the rates here when they drift.
export const BASE_CURRENCY = "USD";

export const CURRENCIES = {
  USD: { code: "USD", label: "USD $", symbol: "$", rate: 1, suffix: false },
  PLN: { code: "PLN", label: "PLN zł", symbol: "zł", rate: 4, suffix: true },
  EUR: { code: "EUR", label: "EUR €", symbol: "€", rate: 0.92, suffix: false },
};

export const CURRENCY_CODES = Object.keys(CURRENCIES);

export function convertPrice(amount, code) {
  const c = CURRENCIES[code] || CURRENCIES[BASE_CURRENCY];
  return Math.round((Number(amount) || 0) * c.rate);
}

// e.g. formatPrice(75, "PLN") -> "300 zł", formatPrice(75, "USD") -> "$75"
export function formatPrice(amount, code) {
  const c = CURRENCIES[code] || CURRENCIES[BASE_CURRENCY];
  const value = convertPrice(amount, code);
  return c.suffix ? `${value} ${c.symbol}` : `${c.symbol}${value}`;
}
