import {
  Oswald,
  Anton,
  Archivo_Black,
  Space_Grotesk,
  Unbounded,
  Bricolage_Grotesque,
} from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"] });
const anton = Anton({ subsets: ["latin"], weight: "400" });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });
const unbounded = Unbounded({ subsets: ["latin"], weight: ["600", "800"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "800"] });

export const metadata = { title: "Font options — CRAY STUFF" };

const options = [
  { n: 1, name: "Oswald", note: "Current — tall & condensed", font: oswald, current: true },
  { n: 2, name: "Anton", note: "Heavy, condensed, high-impact", font: anton },
  { n: 3, name: "Archivo Black", note: "Bold, square, industrial grotesque", font: archivoBlack },
  { n: 4, name: "Space Grotesk", note: "Geometric & squarish (bold)", font: spaceGrotesk },
  { n: 5, name: "Unbounded", note: "Very square, modern, distinctive", font: unbounded },
  { n: 6, name: "Bricolage Grotesque", note: "Modern editorial, chunky", font: bricolage },
];

export default function FontOptionsPage() {
  return (
    <div className="min-h-screen bg-[#1f1f1e] px-6 py-16 text-[#f2f0ea]">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-400">CRAY STUFF · Typography</p>
        <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight">Font options — pick your favourite</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/60">
          Same CRAY STUFF headlines in six display fonts. They&apos;re all square / bold / industrial (no soft or serif
          looks). Tell me the option number you like and I&apos;ll roll it out across every heading on the site. The
          body text stays as-is.
        </p>

        <div className="mt-12 space-y-14">
          {options.map((opt) => (
            <section key={opt.n} className="border-t border-white/10 pt-8">
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-widest text-violet-400">
                  Option {opt.n} — {opt.name}
                  {opt.current && <span className="ml-2 rounded-full border border-white/20 px-2 py-0.5 text-[10px] text-white/50">current</span>}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-white/40">{opt.note}</p>
              </div>

              <div className={opt.font.className}>
                <p className="text-2xl uppercase leading-none tracking-tight sm:text-3xl">
                  Cray <span className="text-violet-400">Stuff</span>
                </p>
                <p className="mt-4 text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
                  We don&apos;t follow trends.
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/70">
                  Shop · Vintage · Y2K · Japanese · Skate · Gorpcore
                </p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xl uppercase tracking-tight sm:text-2xl">
                  <span>Name your price</span>
                  <span>Men&apos;s Collection</span>
                  <span>Vintage Denim Jacket</span>
                </div>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-white/10 pt-8 font-mono text-xs uppercase tracking-widest text-white/40">
          Just reply with the option number →
        </p>
      </div>
    </div>
  );
}
