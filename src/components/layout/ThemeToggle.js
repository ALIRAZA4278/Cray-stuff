"use client";

import { useEffect, useState } from "react";

// Flips the site between light and dark by setting data-theme on <html> and
// remembering the choice. Renders a neutral placeholder until mounted so the
// server and client markup match.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("cray-theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      className="flex h-5 w-5 items-center justify-center text-muted transition-colors hover:text-foreground"
    >
      {theme === "dark" ? <SunIcon /> : theme === "light" ? <MoonIcon /> : <span className="h-5 w-5" />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
