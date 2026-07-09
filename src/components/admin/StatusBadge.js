// Colour-coded status pill shared across admin tables.
const tones = {
  green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  violet: "border-accent/40 bg-accent/15 text-accent",
  red: "border-red-500/40 bg-red-500/10 text-red-300",
  grey: "border-border bg-surface text-muted",
};

const statusTone = {
  // orders
  New: "amber",
  Paid: "violet",
  Shipped: "violet",
  Delivered: "green",
  Cancelled: "red",
  // offers
  Pending: "amber",
  "Auto-accepted": "green",
  Countered: "violet",
  Declined: "red",
  // messages
  new: "amber",
  replied: "green",
  archived: "grey",
  // products
  Live: "green",
  "Sold Out": "grey",
};

export default function StatusBadge({ status, tone }) {
  const resolved = tones[tone || statusTone[status] || "grey"];
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${resolved}`}>
      {status}
    </span>
  );
}
