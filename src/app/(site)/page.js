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
  // Wiktor's hand-picked Latest Drop line-up, in his exact ranked order. Any slug
  // that isn't live just drops out. Falls back to newest if none resolve.
  const featuredDropSlugs = [
    "heavy-y2k-abercrombie-fitch-zip-hoodie",
    "y2k-true-religion-jeans-jacket-women-fit-made-in-mexico",
    "vintage-ed-hardy-fade-tee-y2k-crazy-women-t-shirt",
    "retro-checkered-boxy-skate-hoodie",
    "heavy-gray-distressed-zip-flag-usa-uk-hoodie",
    "rocawear-crazy-hides-2000s-baggy-shorts",
    "baggy-rockawear-2000sjeans-shorts",
    "classic-ecko-untld-skate-baggy-2000s-shorts",
    "crazy-no-faith-studios-flared-heavy-baggy-pants-distressed",
  ];
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
  const featured = featuredDropSlugs.map((s) => bySlug[s]).filter(Boolean);
  // The other rail stays capped so the homepage hydration stays light.
  const latest = featured.length ? featured : products.slice(0, 12);
  const popular = mostPopular.slice(0, 12);
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
        products={latest}
      />
      <ProductGrid
        eyebrow={t.hmCommunityFavorites}
        title={t.hmMostPopular}
        viewAllHref="/shop?sort=popular"
        viewAllLabel={t.hmShopMostPopular}
        products={popular}
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
