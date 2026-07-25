"use client";

import { useEffect, useState } from "react";

// Reads the admin locale from the `admin-locale` cookie on the client. Used by
// admin pages that are Client Components (they can't read cookies server-side).
export function useAdminLocale() {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )admin-locale=(en|pl)/);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (match && match[1] !== "en") setLocale(match[1]);
  }, []);

  return locale;
}
