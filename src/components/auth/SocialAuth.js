"use client";

import { signInWithProvider } from "@/lib/actions/auth";

// Social sign-in buttons. Each submits a form bound to the OAuth server action
// and only works once the matching provider is enabled in the Supabase
// dashboard (Authentication → Providers). Google is live; Apple is deferred
// (needs a paid Apple Developer account) — to re-enable it, restore the Apple
// <form> block below and switch the wrapper back to `grid grid-cols-2`.
export default function SocialAuth() {
  return (
    <div className="grid gap-3">
      <form action={signInWithProvider.bind(null, "google")}>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm transition-colors hover:border-accent"
        >
          <GoogleMark />
          Continue with Google
        </button>
      </form>
      {/* Apple sign-in — deferred until an Apple Developer account is set up:
      <form action={signInWithProvider.bind(null, "apple")}>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm transition-colors hover:border-accent"
        >
          <AppleMark />
          Apple
        </button>
      </form>
      */}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.65 4.1-5.5 4.1a6.2 6.2 0 0 1 0-12.4c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.9 14.7 2 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4.1 9.6-9.9 0-.66-.07-1.17-.16-1.68H12z"
      />
    </svg>
  );
}

// Apple logo — restore alongside the Apple <form> above when Apple sign-in is enabled.
// function AppleMark() {
//   return (
//     <svg viewBox="0 0 24 24" className="h-4 w-4 text-foreground" fill="currentColor" aria-hidden>
//       <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85-.72 0-1.86-.83-3.06-.8-1.57.02-3.02.91-3.83 2.32-1.64 2.84-.42 7.05 1.17 9.36.78 1.13 1.7 2.4 2.92 2.35 1.17-.05 1.61-.76 3.03-.76 1.4 0 1.8.76 3.04.73 1.26-.02 2.05-1.15 2.82-2.29.89-1.31 1.25-2.58 1.27-2.64-.03-.01-2.44-.94-2.47-3.71zM14.1 5.9c.64-.78 1.07-1.86.95-2.94-.92.04-2.04.61-2.7 1.39-.6.69-1.11 1.79-.97 2.85 1.02.08 2.07-.52 2.72-1.3z" />
//     </svg>
//   );
// }
