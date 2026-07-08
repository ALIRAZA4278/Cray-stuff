const items = [
  "1000+ positive reviews",
  "Worldwide shipping",
  "Secure payments",
  "One-of-one pieces",
];

export default function TrustBar() {
  return (
    <section className="border-b border-border px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-xs uppercase tracking-wide text-muted">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-2">
            <CheckIcon />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-accent">
      <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
