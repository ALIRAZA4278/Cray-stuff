import Link from "next/link";

// Filter + sort bar above the admin catalog. Server-rendered links rather than
// client state, so a filtered view is a shareable URL and survives a reload
// after an edit.
function Pill({ href, active, children }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
        active ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

function Group({ label, options, param, current, params }) {
  const hrefFor = (value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(param, value);
    else next.delete(param);
    const qs = next.toString();
    return qs ? `/admin/products?${qs}` : "/admin/products";
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
      {options.map((o) => (
        <Pill key={o.value ?? "all"} href={hrefFor(o.value)} active={current === o.value}>
          {o.label}
        </Pill>
      ))}
    </div>
  );
}

export default function ProductCatalogFilters({ params, status, category, density, labels }) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5">
      <Group
        label={labels.status}
        param="status"
        current={status}
        params={params}
        options={[
          { value: null, label: labels.all },
          { value: "available", label: labels.available },
          { value: "sold", label: labels.sold },
        ]}
      />
      <Group
        label={labels.category}
        param="category"
        current={category}
        params={params}
        options={[
          { value: null, label: labels.all },
          { value: "mens", label: labels.mens },
          { value: "womens", label: labels.womens },
          { value: "unisex", label: labels.unisex },
        ]}
      />
      <Group
        label={labels.density}
        param="density"
        current={density}
        params={params}
        options={[
          { value: null, label: labels.compact },
          { value: "large", label: labels.large },
        ]}
      />
    </div>
  );
}
