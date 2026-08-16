import Reveal from "@/components/motion/Reveal";

// Shared layout for the privacy / terms / returns pages.
export default function LegalPage({ doc }) {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{doc.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{doc.title}</h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">{doc.updated}</p>
        </Reveal>

        <div className="space-y-8">
          {doc.sections.map((s) => (
            <Reveal key={s.h}>
              <section>
                <h2 className="text-lg font-semibold uppercase tracking-tight">{s.h}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
