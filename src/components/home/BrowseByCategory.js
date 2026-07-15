import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

// Wiktor's own shots, one per tile. Swapping one is a single-line change — drop
// the new Cloudinary URL in and nothing else moves.
const tiles = [
  {
    label: "New Drop",
    cta: "Shop new drop",
    href: "/shop?sort=new",
    image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/new-drop-jeans.jpg",
  },
  {
    label: "Under €100",
    cta: "Shop under €100",
    href: "/shop?price=0-50,50-100",
    image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/true-religion-jeans.jpg",
  },
  {
    label: "The Archive",
    cta: "Shop archive",
    href: "/shop/archive",
    image: "https://res.cloudinary.com/wnbvtyon/image/upload/cray-stuff/products/dg-belt.jpg",
  },
];

const tileVariants = ["left", "up", "right"];

export default function BrowseByCategory() {
  return (
    <section className="border-b border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {tiles.map((tile, index) => (
          <Reveal key={tile.label} delay={index * 0.08} variant={tileVariants[index] ?? "up"}>
            <Link
              href={tile.href}
              className="group relative flex h-[420px] items-end overflow-hidden border-border sm:border-r last:border-r-0"
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover grayscale-[30%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
              <div className="relative z-10 p-6">
                <p className="text-2xl font-semibold uppercase tracking-tight text-white">{tile.label}</p>
                <span className="mt-1 inline-block text-sm text-accent">{tile.cta} &rarr;</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
