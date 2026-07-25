import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountPopup from "@/components/layout/DiscountPopup";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { CartProvider } from "@/lib/CartContext";
import { FireListProvider } from "@/lib/FireListContext";
import { AuthProvider } from "@/lib/AuthContext";

export default function SiteLayout({ children }) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
