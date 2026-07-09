export default function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
