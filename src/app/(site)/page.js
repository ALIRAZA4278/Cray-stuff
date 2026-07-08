import Hero from "@/components/home/Hero";
import BrandTicker from "@/components/home/BrandTicker";
import TrustBar from "@/components/home/TrustBar";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import CollectionBanner from "@/components/home/CollectionBanner";
import ProductGrid from "@/components/home/ProductGrid";
import PromoBanner from "@/components/home/PromoBanner";
import ShopByStyle from "@/components/home/ShopByStyle";
import Community from "@/components/home/Community";
import ValueProps from "@/components/home/ValueProps";
import PhilosophyAndDrop from "@/components/home/PhilosophyAndDrop";
import { mockProducts } from "@/lib/mock-products";

const mostPopular = [...mockProducts].sort((a, b) => b.fireCount - a.fireCount);
const mensProducts = mockProducts.filter((product) => product.category === "mens");
const womensProducts = mockProducts.filter((product) => product.category === "womens");
const dropTarget = Date.now() + 1000 * 60 * 60 * 24 * 7;

export default function HomePage() {
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
        products={mockProducts}
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
      <PromoBanner />
      <ShopByStyle />
      <Community />
      <ValueProps />
      <PhilosophyAndDrop dropTarget={dropTarget} />
    </>
  );
}
