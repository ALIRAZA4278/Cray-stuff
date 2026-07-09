/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // Allow admin-provided product image URLs from any https host.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
