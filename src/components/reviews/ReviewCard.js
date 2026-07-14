function Stars({ rating }) {
  return (
    <div aria-label={`${rating} out of 5`} className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
      <Stars rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{review.text}</blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-sm font-medium">{review.name}</p>
          {review.location && <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{review.location}</p>}
        </div>
        {review.source && (
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
            {review.source}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
