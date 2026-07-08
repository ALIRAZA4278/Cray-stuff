const phrases = ["Cray Stuff", "One of one", "Cray Stuff", "Never restocked"];

export default function BrandTicker() {
  return (
    <div className="overflow-hidden border-b border-border py-6">
      <div className="flex w-max items-center gap-10 animate-marquee">
        {[...phrases, ...phrases].map((phrase, index) => (
          <span key={`${phrase}-${index}`} className="flex items-center gap-10 whitespace-nowrap">
            <span
              className={`font-display text-5xl font-semibold uppercase sm:text-6xl ${
                index % 2 === 1 ? "text-outline" : ""
              }`}
            >
              {phrase}
            </span>
            <span className="text-2xl text-accent">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
