import Hero from "@/components/home/Hero";
import QuickStyleTabs from "@/components/home/QuickStyleTabs";
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
      <QuickStyleTabs />
      <TrustBar />
      <BrowseByCategory />
      <ProductGrid eyebrow="New this week" title="Latest Drop" viewAllHref="/shop" products={mockProducts} />
      <ProductGrid eyebrow="Community favorites" title="Most Popular" viewAllHref="/shop" products={mostPopular} />
      {mensProducts.length > 0 && (
        <ProductGrid
          eyebrow="Men's vintage"
          title="Men's Collection"
          viewAllHref="/shop?category=mens"
          products={mensProducts}
        />
      )}
      {womensProducts.length > 0 && (
        <ProductGrid
          eyebrow="Women's vintage"
          title="Women's Collection"
          viewAllHref="/shop?category=womens"
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
