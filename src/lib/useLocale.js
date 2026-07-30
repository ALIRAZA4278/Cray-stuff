"use client";

// Storefront locale for Client Components. Backed by LocaleContext, which the
// site layout seeds from the `site-locale` cookie — so the value is correct on
// the first render. Server Components read the cookie directly via next/headers.
export { useLocale } from "@/lib/LocaleContext";
