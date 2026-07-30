"use client";

import { createContext, useContext } from "react";

// The storefront locale, provided once at the site layout from the `site-locale`
// cookie (read server-side). Client components read it synchronously here, so
// they render the right language on the first paint — no flash of English.
const LocaleContext = createContext("en");

export function LocaleProvider({ locale, children }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
