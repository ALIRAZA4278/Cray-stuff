import Hero from "@/components/home/Hero";
import BrandTicker from "@/components/home/BrandTicker";
import TrustBar from "@/components/home/TrustBar";
import BrowseByCategory from "@/components/home/BrowseByCategory";
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
      <BrowseByCategory />
      {mensProducts.length > 0 && (
        <ProductGrid
          eyebrow="Men's vintage"
          title="Men's Collection"
          viewAllHref="/shop?category=mens"
          viewAllLabel="Shop men's"
          products={mensProducts}
        />
      )}
      {womensProducts.length > 0 && (
        <ProductGrid
          eyebrow="Women's vintage"
          title="Women's Collection"
          viewAllHref="/shop?category=womens"
          viewAllLabel="Shop women's"
          products={womensProducts}
        />
      )}
      <PromoBanner />
      <ShopByStyle />
      <Community />
      <ValueProps />
      <PhilosophyAndDrop dropTarget={dropTarget} />
    </>
  );
}
