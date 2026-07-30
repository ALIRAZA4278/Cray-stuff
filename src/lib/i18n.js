// Storefront translations. Locale lives in the `site-locale` cookie so both
// server and client parts can read it (server via next/headers, client via
// useLocale). Polish is a best effort — worth a native-speaker review by Wiktor.
// Product content (names, descriptions) is data, not translated here.
//
// Strings are split into area modules (layout / home / product / pages / shop)
// so they stay manageable; this barrel merges them into one flat dictionary.

import { en as layoutEn, pl as layoutPl } from "./i18n-layout";
import { en as homeEn, pl as homePl } from "./i18n-home";
import { en as productEn, pl as productPl } from "./i18n-product";
import { en as pagesEn, pl as pagesPl } from "./i18n-pages";
import { en as shopEn, pl as shopPl } from "./i18n-shop";

const en = { ...layoutEn, ...homeEn, ...productEn, ...pagesEn, ...shopEn };
const pl = { ...layoutPl, ...homePl, ...productPl, ...pagesPl, ...shopPl };

export const SITE_LOCALES = ["en", "pl"];

// Returns a flat strings object; Polish falls back to English per missing key.
export function getDict(locale) {
  return locale === "pl" ? { ...en, ...pl } : en;
}
