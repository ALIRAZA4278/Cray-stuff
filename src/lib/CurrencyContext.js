"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { formatPrice, BASE_CURRENCY, CURRENCIES } from "@/lib/currency";

const CurrencyContext = createContext(null);

const STORAGE_KEY = "cray-currency";

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(BASE_CURRENCY);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved && CURRENCIES[saved] && saved !== BASE_CURRENCY) setCurrencyState(saved);
  }, []);

  function setCurrency(code) {
    if (!CURRENCIES[code]) return;
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore storage failures (private mode etc.)
    }
  }

  const format = (amount) => formatPrice(amount, currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return (
    useContext(CurrencyContext) || {
      currency: BASE_CURRENCY,
      setCurrency: () => {},
      format: (amount) => formatPrice(amount, BASE_CURRENCY),
    }
  );
}
