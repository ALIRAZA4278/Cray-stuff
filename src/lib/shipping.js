// Zone- and size-based shipping. Rates are in the store's base currency (PLN)
// and are meant to be edited freely as real courier costs firm up — this is the
// one place to change them. Domestic stays cheap, international pays its true
// cost, so shipping never loses money and Polish buyers never overpay.
//
// resolveZone(country) + packageSize(itemCount) -> shippingCost(country, count).

export const EU_COUNTRIES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
  "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Portugal",
  "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
];

export const ZONES = {
  PL: { id: "PL", label: "Poland" },
  EU: { id: "EU", label: "Europe" },
  INTL: { id: "INTL", label: "International" },
};

// zone -> package size -> price in PLN. EDIT THESE to your real courier prices.
export const SHIPPING_RATES = {
  PL: { S: 20, M: 25, L: 30 },
  EU: { S: 60, M: 80, L: 110 },
  INTL: { S: 150, M: 250, L: 400 },
};

// Package size is derived from how many one-of-one pieces are in the order.
export function packageSize(itemCount) {
  if (itemCount <= 1) return "S";
  if (itemCount === 2) return "M";
  return "L";
}

export const PACKAGE_LABELS = { S: "Small", M: "Medium", L: "Large" };

// Carriers offered per zone — InPost/Orlen are domestic, DHL/UPS cover abroad.
export const ZONE_CARRIERS = {
  PL: ["inpost", "dpd", "orlen", "dhl"],
  EU: ["dpd", "dhl", "gls", "ups"],
  INTL: ["dhl", "ups"],
};

// Country options for the checkout dropdown. Anything not Poland/EU falls into
// International, so this list can grow without touching the zone logic.
export const SHIP_COUNTRIES = [
  "Poland",
  "Germany", "France", "Netherlands", "Italy", "Spain", "Czechia", "Slovakia",
  "Austria", "Belgium", "Sweden", "Denmark", "Ireland", "Portugal", "Romania",
  "Hungary", "Lithuania", "Latvia", "Estonia", "Finland", "Greece", "Croatia",
  "Bulgaria", "Luxembourg", "Slovenia", "Cyprus", "Malta",
  "United Kingdom", "United States", "Canada", "Australia", "Switzerland",
  "Norway", "Other (International)",
];

export function resolveZone(country) {
  if (!country) return null;
  const c = country.trim().toLowerCase();
  if (["poland", "polska", "pl"].includes(c)) return "PL";
  if (EU_COUNTRIES.some((x) => x.toLowerCase() === c)) return "EU";
  return "INTL";
}

// Client-side: null until the customer picks a country, so the UI can prompt.
export function shippingCost(country, itemCount) {
  const zone = resolveZone(country);
  if (!zone || itemCount <= 0) return null;
  return SHIPPING_RATES[zone]?.[packageSize(itemCount)] ?? null;
}

// Server-side: never returns null — an unknown/blank country defaults to the
// International rate so we never undercharge on a real order.
export function serverShippingCost(country, itemCount) {
  if (itemCount <= 0) return 0;
  const zone = resolveZone(country) || "INTL";
  return SHIPPING_RATES[zone]?.[packageSize(itemCount)] ?? SHIPPING_RATES.INTL[packageSize(itemCount)];
}
