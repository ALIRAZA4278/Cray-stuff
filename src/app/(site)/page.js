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
import { cookies } from "next/headers";
import { getDict } from "@/lib/i18n";

// Storefront reads the live catalog; refresh at most every 60s (plus instant
// on-demand refresh when admin saves via revalidatePath).
export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  const mostPopular = [...products].sort((a, b) => b.fireCount - a.fireCount);
  const dropTarget = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const t = getDict((await cookies()).get("site-locale")?.value || "en");

  return (
    <>
      <Hero />
      <TrustBar />
      <BrowseByCategory />
      <ProductGrid
        eyebrow={t.hmNewThisWeek}
        title={t.hmLatestDrop}
        viewAllHref="/shop"
        viewAllLabel={t.hmShopNewArrivals}
        products={products}
      />
      <ProductGrid
        eyebrow={t.hmCommunityFavorites}
        title={t.hmMostPopular}
        viewAllHref="/shop?sort=popular"
        viewAllLabel={t.hmShopMostPopular}
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
