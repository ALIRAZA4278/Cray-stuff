const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cray-stuff.vercel.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing behind a login or tied to a single customer belongs in an index.
      disallow: ["/admin", "/admin/", "/account", "/account/", "/checkout", "/cart", "/auth/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
