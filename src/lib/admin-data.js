// Sample operational data for the admin dashboard (orders + offers). Products
// come from the real mock catalog. This renders realistic admin screens now;
// swap these arrays for Supabase queries once the orders/offers tables are live
// (see docs/supabase-schema.sql for the pattern).

export const sampleOrders = [
  { id: "CRAY-1048", customer: "Jan Kowalski", email: "jan.k@example.com", product: "Vintage Denim Jacket", date: "2026-07-08", total: 149, status: "Shipped", carrier: "InPost", tracking: "INP-4820193" },
  { id: "CRAY-1047", customer: "Zofia Nowak", email: "zofia@example.com", product: "Workwear Chore Coat", date: "2026-07-07", total: 189, status: "Paid", carrier: "Orlen Paczka", tracking: "—" },
  { id: "CRAY-1046", customer: "Marek Wiśniewski", email: "marek.w@example.com", product: "Y2K Track Jacket", date: "2026-07-06", total: 99, status: "Delivered", carrier: "DPD", tracking: "DPD-99120384" },
  { id: "CRAY-1045", customer: "Anna Lewandowska", email: "anna.l@example.com", product: "Workwear Hoodie", date: "2026-07-05", total: 129, status: "New", carrier: "—", tracking: "—" },
  { id: "CRAY-1044", customer: "Piotr Kamiński", email: "piotr.k@example.com", product: "Archive Cargo Pants", date: "2026-07-03", total: 119, status: "Delivered", carrier: "GLS", tracking: "GLS-77410025" },
  { id: "CRAY-1043", customer: "Katarzyna Zając", email: "kasia.z@example.com", product: "Retro Skate Hoodie", date: "2026-07-01", total: 70, status: "Cancelled", carrier: "—", tracking: "—" },
];

export const sampleOffers = [
  { id: "OF-231", product: "Workwear Chore Coat", slug: "workwear-chore-coat", customer: "Tomasz Król", email: "tomek@example.com", offer: 165, listPrice: 189, minOffer: 160, status: "Auto-accepted", date: "2026-07-08" },
  { id: "OF-230", product: "Vintage Denim Jacket", slug: "vintage-denim-jacket", customer: "Julia Mazur", email: "julia.m@example.com", offer: 110, listPrice: 149, minOffer: 125, status: "Countered", date: "2026-07-08" },
  { id: "OF-229", product: "Archive Cargo Pants", slug: "archive-cargo-pants", customer: "Michał Duda", email: "michal.d@example.com", offer: 100, listPrice: 119, minOffer: 95, status: "Pending", date: "2026-07-07" },
  { id: "OF-228", product: "Y2K Track Jacket", slug: "y2k-track-jacket", customer: "Ola Sikora", email: "ola.s@example.com", offer: 60, listPrice: 99, minOffer: 80, status: "Declined", date: "2026-07-06" },
];

export const orderStatuses = ["New", "Paid", "Shipped", "Delivered", "Cancelled"];
export const offerStatuses = ["Pending", "Auto-accepted", "Countered", "Declined"];
