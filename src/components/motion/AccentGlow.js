// The hero's soft purple glow, reusable across sections for a consistent look.
// Matches the hero's intensity (bg-accent/25, heavy blur). Drop inside a
// `relative overflow-hidden` section and keep content wrapped in `relative`.
export default function AccentGlow({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-[-80px] h-[480px] w-[560px] -translate-x-1/2 rounded-full bg-[#8b5cf6]/30 blur-[130px] ${className}`}
    />
  );
}
