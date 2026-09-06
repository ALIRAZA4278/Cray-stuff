import { getAllProducts } from "@/lib/products";
import { styleTags } from "@/lib/mock-products";
import { clothingTypes, slugify } from "@/lib/shop-filters";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cray-stuff.vercel.app";

// Every product is a one-of-one, so each product page is its own landing page —
// the whole point of the SEO work. They need to be in the sitemap individually
// or Google only ever finds the handful linked from the homepage rails.
export default async function sitemap() {
  const now = new Date();

  const staticPaths = ["", "/shop", "/sold", "/reviews", "/gallery", "/about", "/contact", "/faq", "/returns", "/terms", "/privacy"];

  const staticEntries = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/shop" ? "daily" : "monthly",
    priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.5,
  }));

  const styleEntries = [...styleTags, ...clothingTypes].map((tag) => ({
    url: `${siteUrl}/shop/${slugify(tag)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  let productEntries = [];
  try {
    const products = await getAllProducts();
    productEntries = products.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      // Sold pieces stay indexed — they still pull in searches for the brand and
      // show the shop is active — but they rank below what's actually buyable.
      priority: product.sold ? 0.4 : 0.8,
    }));
  } catch {
    // A catalog read failure shouldn't take the whole sitemap down with it.
  }

  return [...staticEntries, ...styleEntries, ...productEntries];
}
