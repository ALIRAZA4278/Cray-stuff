import { Space_Grotesk, JetBrains_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Display font — Archivo Black (square, bold, industrial). Client's pick.
const displayFont = Archivo_Black({
  variable: "--font-display-src",
  subsets: ["latin"],
  weight: "400",
});

// metadataBase lets pages below declare canonical/OG URLs as relative paths.
// Next throws at build time on a relative URL-based metadata field without it.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cray-stuff.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  // No `template` here on purpose — every page below already spells out its own
  // "… — CRAY STUFF" title, and a template would double the suffix.
  title: "CRAY STUFF — Vintage, Y2K & Streetwear",
  description: "Curated vintage, Y2K, Japanese, skate and streetwear — one-of-one pieces.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "CRAY STUFF",
    url: "/",
    title: "CRAY STUFF — Vintage, Y2K & Streetwear",
    description: "Curated vintage, Y2K, Japanese, skate and streetwear — one-of-one pieces.",
  },
  robots: { index: true, follow: true },
};

// Runs before paint so the correct theme is applied with no flash.
// Defaults to dark (the confirmed brand direction); the header toggle lets
// customers switch to light and remembers their choice.
const themeScript = `(function(){try{var t=localStorage.getItem('cray-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
