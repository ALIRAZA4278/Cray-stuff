import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { mockProducts } from "@/lib/mock-products";

// Maps a Supabase products row (snake_case) to the shape the UI expects.
function mapRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    price: Number(row.price),
    minOffer: row.min_offer != null ? Number(row.min_offer) : null,
    tags: row.tags || [],
    fireCount: row.fire_count || 0,
    category: row.category,
    size: row.size,
    condition: row.condition,
    measurements: row.measurements,
    description: row.description,
    sold: row.sold || false,
    images: row.images || [],
  };
}

// Reads the catalog from Supabase. Falls back to the seed catalog if the
// products table doesn't exist yet or is empty, so the storefront never breaks
// before docs/supabase-schema.sql has been run.
export async function getAllProducts() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (error || !data || data.length === 0) return mockProducts;
    return data.map(mapRow);
  } catch {
    return mockProducts;
  }
}

export async function getProductBySlug(slug) {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) || null;
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find((product) => String(product.id) === String(id)) || null;
}
