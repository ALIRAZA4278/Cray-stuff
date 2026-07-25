import { formatPrice } from "@/lib/currency";

// Renders a price in the product's own currency (set in the admin when the
// price is entered). Falls back to the base currency if none is set.
export default function Price({ amount, currency }) {
  return <>{formatPrice(amount, currency)}</>;
}
