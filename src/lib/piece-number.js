// Every piece is one-of-one, so it carries a short "N° 000/1" stamp. Ids can be
// numeric (seed data) or UUIDs (Supabase), so take the first digits and fall
// back to a stable hash for ids that have none.
export function pieceNumber(id) {
  const digits = String(id).replace(/\D/g, "");
  if (digits) return digits.slice(0, 3).padStart(3, "0");

  let hash = 0;
  for (const char of String(id)) hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  return String(hash).padStart(3, "0");
}
