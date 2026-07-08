import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Marquee from "@/components/home/Marquee";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import ProductGrid from "@/components/home/ProductGrid";
import PromoBanner from "@/components/home/PromoBanner";
import ShopByStyle from "@/components/home/ShopByStyle";
import Community from "@/components/home/Community";
import ValueProps from "@/components/home/ValueProps";
import PhilosophyAndDrop from "@/components/home/PhilosophyAndDrop";
import { mockProducts } from "@/lib/mock-products";

const mostPopular = [...mockProducts].sort((a, b) => b.fireCount - a.fireCount);
const dropTarget = Date.now() + 1000 * 60 * 60 * 24 * 7;

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Marquee />
      <BrowseByCategory />
      <ProductGrid eyebrow="New this week" title="Latest Drop" viewAllHref="/shop" products={mockProducts} />
      <ProductGrid eyebrow="Community favorites" title="Most Popular" viewAllHref="/shop" products={mostPopular} />
      <PromoBanner />
      <ShopByStyle />
      <Community />
      <ValueProps />
      <PhilosophyAndDrop dropTarget={dropTarget} />
    </>
  );
}
