import Reveal from "@/components/motion/Reveal";

const props = [
  {
    title: "Hand-picked & authenticated",
    desc: "Every piece is personally sourced and checked before it's listed — no dropshipping, no guesswork.",
  },
  {
    title: "One-of-one, never restocked",
    desc: "Once a piece sells, it's gone for good. What you see is the only one that will ever exist.",
  },
  {
    title: "Poland-first, worldwide shipping",
    desc: "Fast local delivery via InPost, Orlen Paczka, GLS and DPD — with shipping available globally too.",
  },
];

export default function ValueProps() {
  return (
    <section className="border-b border-border px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {props.map((prop, index) => (
          <Reveal key={prop.title} delay={index * 0.08}>
            <p className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-base font-semibold uppercase tracking-tight">{prop.title}</h3>
            <p className="mt-2 text-sm text-muted">{prop.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
