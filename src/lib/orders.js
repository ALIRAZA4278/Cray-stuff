import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { sampleOrders } from "@/lib/admin-data";

function mapRow(row) {
  const items = Array.isArray(row.items) ? row.items : [];
  return {
    id: row.id,
    customer: row.customer_name,
    email: row.email,
    product: items.map((i) => i.name).join(", ") || "—",
    itemCount: items.length,
    date: row.created_at ? new Date(row.created_at).toISOString().slice(0, 10) : "—",
    total: Number(row.total),
    status: row.status || "New",
    carrier: row.carrier || "—",
    tracking: "—",
  };
}

// Full order rows for the customer's own order history (keeps the line items).
function mapCustomerRow(row) {
  return {
    id: row.id,
    date: row.created_at || null,
    items: Array.isArray(row.items) ? row.items : [],
    total: Number(row.total),
    status: row.status || "New",
    carrier: row.carrier || null,
  };
}

// Orders belonging to one customer (matched by the email used at checkout).
export async function getOrdersByEmail(email) {
  if (!email) return [];
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data || []).map(mapCustomerRow);
  } catch {
    return [];
  }
}

// Reads real orders from Supabase. Falls back to sample data only if the orders
// table doesn't exist yet (keeps the admin populated pre-setup); once the table
// exists, shows real orders (empty array until customers check out).
export async function getAllOrders() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return sampleOrders;
    return (data || []).map(mapRow);
  } catch {
    return sampleOrders;
  }
}
