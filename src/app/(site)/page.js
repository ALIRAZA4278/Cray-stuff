import Hero from "@/components/home/Hero";
import BrandTicker from "@/components/home/BrandTicker";
import TrustBar from "@/components/home/TrustBar";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import ChooseYourStyle from "@/components/home/ChooseYourStyle";
import ProductGrid from "@/components/home/ProductGrid";
import PromoBanner from "@/components/home/PromoBanner";
import HorizontalGallery from "@/components/home/HorizontalGallery";
import Curtains from "@/components/home/Curtains";
import Reviews from "@/components/home/Reviews";
import Community from "@/components/home/Community";
import PhilosophyAndDrop from "@/components/home/PhilosophyAndDrop";
import { getAllProducts } from "@/lib/products";

// Storefront reads the live catalog; refresh at most every 60s (plus instant
// on-demand refresh when admin saves via revalidatePath).
export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  const mostPopular = [...products].sort((a, b) => b.fireCount - a.fireCount);
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
      <ChooseYourStyle />
      <Curtains />
      <PromoBanner />
      <HorizontalGallery />
      <Reviews />
      <Community />
      <PhilosophyAndDrop dropTarget={dropTarget} />
    </>
  );
}
