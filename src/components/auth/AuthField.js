import PasswordInput from "@/components/auth/PasswordInput";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

export function AuthField({ label, name, type = "text", autoComplete, required = true, placeholder }) {
  const commonProps = { name, autoComplete, required, placeholder };
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {type === "password" ? (
        <PasswordInput {...commonProps} className={inputClass} />
      ) : (
        <input {...commonProps} type={type} className={inputClass} />
      )}
    </label>
  );
}

export function SubmitButton({ pending, children }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "One sec…" : children}
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-border" />
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
