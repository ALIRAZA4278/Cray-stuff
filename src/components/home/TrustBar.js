const items = [
  "1000+ positive reviews",
  "Worldwide shipping",
  "Secure payments",
  "One-of-one pieces",
];

export default function TrustBar() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center gap-2 px-4 py-5 text-center font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
          >
            <CheckIcon />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0 text-accent">
      <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
