// Page header for admin screens — title, optional description, optional action
// slot on the right (e.g. an "Add product" button).
export default function AdminHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div>
        {eyebrow && <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h1 className="mt-1 text-2xl font-semibold uppercase tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
