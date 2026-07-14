import Hero from "@/components/home/Hero";
import BrandTicker from "@/components/home/BrandTicker";
import TrustBar from "@/components/home/TrustBar";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import CollectionBanner from "@/components/home/CollectionBanner";
import ProductGrid from "@/components/home/ProductGrid";
import PromoBanner from "@/components/home/PromoBanner";
import ShopByStyle from "@/components/home/ShopByStyle";
import Curtains from "@/components/home/Curtains";
import Reviews from "@/components/home/Reviews";
import Community from "@/components/home/Community";
import ValueProps from "@/components/home/ValueProps";
import PhilosophyAndDrop from "@/components/home/PhilosophyAndDrop";
import { getAllProducts } from "@/lib/products";

// Storefront reads the live catalog; refresh at most every 60s (plus instant
// on-demand refresh when admin saves via revalidatePath).
export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  const mostPopular = [...products].sort((a, b) => b.fireCount - a.fireCount);
  // Unisex pieces belong in both edits, so they surface under Men's and Women's.
  const mensProducts = products.filter((p) => p.category === "mens" || p.category === "unisex");
  const womensProducts = products.filter((p) => p.category === "womens" || p.category === "unisex");
  const dropTarget = Date.now() + 1000 * 60 * 60 * 24 * 7;

  return (
    <>
      <Hero />
      <TrustBar />
      <BrowseByCategory />
      <ProductGrid
        eyebrow="New this week"
        title="Latest Drop"
        viewAllHref="/shop"
        viewAllLabel="Shop new arrivals"
        products={products}
      />
      <ProductGrid
        eyebrow="Community favorites"
        title="Most Popular"
        viewAllHref="/shop?sort=popular"
        viewAllLabel="Shop most popular"
        products={mostPopular}
      />
      <BrandTicker />
      {mensProducts.length > 0 && (
        <>
          <CollectionBanner
            eyebrow="Men's vintage"
            title="Men's Collection"
            href="/shop?category=mens"
            cta="Shop men's"
            seed="cray-banner-mens"
          />
          <ProductGrid plain viewAllHref="/shop?category=mens" products={mensProducts} />
        </>
      )}
      {womensProducts.length > 0 && (
        <>
          <CollectionBanner
            eyebrow="Women's vintage"
            title="Women's Collection"
            href="/shop?category=womens"
            cta="Shop women's"
            seed="cray-banner-womens"
          />
          <ProductGrid plain viewAllHref="/shop?category=womens" products={womensProducts} />
        </>
      )}
      <Curtains />
      <PromoBanner />
      <ShopByStyle />
      <Reviews />
      <Community />
      <ValueProps />
      <PhilosophyAndDrop dropTarget={dropTarget} />
    </>
  );
}
