import { cookies } from "next/headers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountPopup from "@/components/layout/DiscountPopup";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { CartProvider } from "@/lib/CartContext";
import { FireListProvider } from "@/lib/FireListContext";
import { AuthProvider } from "@/lib/AuthContext";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import { LocaleProvider } from "@/lib/LocaleContext";

export default async function SiteLayout({ children }) {
  const locale = (await cookies()).get("site-locale")?.value || "en";

  return (
    <LocaleProvider locale={locale}>
      <AuthProvider>
        <CurrencyProvider>
        <FireListProvider>
          <CartProvider>
            <SmoothScroll />
            <ScrollProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <DiscountPopup />
          </CartProvider>
        </FireListProvider>
        </CurrencyProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
