"use client";

import { ADMIN_LOCALES } from "@/lib/admin-i18n";

// EN/PL switch for the admin. Stores the choice in a cookie and reloads so the
// server-rendered parts pick up the new language too.
export default function AdminLangToggle({ locale }) {
  function setLocale(next) {
    if (next === locale) return;
    document.cookie = `admin-locale=${next}; path=/; max-age=31536000`;
    window.location.reload();
  }

  return (
    <div className="flex gap-1 rounded-full border border-border p-0.5">
      {ADMIN_LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
            locale === code ? "bg-accent/15 text-foreground" : "text-muted hover:text-foreground"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
