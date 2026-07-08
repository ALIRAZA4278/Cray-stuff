const items = [
  "Make an offer on every item",
  "New drops every week",
  "One-of-one — never restocked",
  "Free shipping over 250 PLN",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-b border-border bg-white/[0.02] py-3">
      <div className="flex w-max gap-12 animate-marquee">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted"
          >
            {item}
            <span className="text-accent">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
