import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ProductCard from "@/components/product/ProductCard";

export default function ShopResults({ products, clearHref }) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center text-muted">
        <p>No pieces match those filters right now.</p>
        <Link href={clearHref} className="mt-3 inline-block text-sm text-accent hover:opacity-80">
          Clear filters
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 0.05}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
