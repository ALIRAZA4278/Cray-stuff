// Display-only rename: the "Archive" category is shown as "Designer" across the
// UI, while the underlying tag and /shop/archive slug stay put — so no product
// data or links have to change. Swap here if more categories get renamed.
export function categoryLabel(tag) {
  return tag === "Archive" ? "Designer" : tag;
}
