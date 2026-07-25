// Admin panel translations. The admin is one person's tool, so this is a small
// hand-kept dictionary rather than a full i18n framework. Locale lives in the
// `admin-locale` cookie so both server and client parts can read it.
// NOTE: Polish strings are a best effort — worth a quick review by a native
// speaker (Wiktor) to fine-tune wording.

const en = {
  // nav
  dashboard: "Dashboard", products: "Products", orders: "Orders", offers: "Offers",
  discounts: "Discounts", messages: "Messages", categories: "Categories", guide: "Guide",
  backToStore: "← Back to store", signOut: "Sign out", language: "Language",
  // product page headers
  catalog: "Catalog", addProduct: "Add product", addProductDesc: "List a new one-of-one piece.",
  edit: "Edit",
  // product form
  photos: "Photos", uploadPhotos: "Upload photos", uploading: "Uploading…",
  photosHint: "Upload from your device, or paste image links below — one per line. The first is the main photo.",
  uploadsNote: "Uploads are stored on Cloudinary and served fast, auto-optimised worldwide.",
  uploadFailedPrefix: "Upload failed", mainBadge: "Main",
  productName: "Product name", brand: "Brand", fit: "Fit", fitHint: "how it actually fits, e.g. M/L",
  currency: "Currency", price: "Price", minOffer: "Min. offer", minOfferHint: "hidden from customers",
  condition: "Condition", category: "Category", measurements: "Measurements",
  flaws: "Flaws", flawsHint: "be honest, it builds trust", description: "Description",
  type: "Type", typeHint: "What the piece is — powers the Shorts / Hoodies / T-Shirts sections.",
  styleTags: "Style tags", markAs: "Mark as", soldOut: "Sold Out",
  soldHint: "stays visible, removed from Buy Now / offers",
  createProduct: "Create product", saveChanges: "Save changes", saving: "Saving…", cancel: "Cancel", del: "Delete",
};

const pl = {
  dashboard: "Panel", products: "Produkty", orders: "Zamówienia", offers: "Oferty",
  discounts: "Rabaty", messages: "Wiadomości", categories: "Kategorie", guide: "Poradnik",
  backToStore: "← Wróć do sklepu", signOut: "Wyloguj", language: "Język",
  catalog: "Katalog", addProduct: "Dodaj produkt", addProductDesc: "Wystaw nową rzecz jedyną w swoim rodzaju.",
  edit: "Edytuj",
  photos: "Zdjęcia", uploadPhotos: "Dodaj zdjęcia", uploading: "Przesyłanie…",
  photosHint: "Prześlij z urządzenia lub wklej linki do zdjęć poniżej — po jednym w linii. Pierwsze jest głównym zdjęciem.",
  uploadsNote: "Zdjęcia są przechowywane w Cloudinary i szybko serwowane, automatycznie zoptymalizowane.",
  uploadFailedPrefix: "Błąd przesyłania", mainBadge: "Główne",
  productName: "Nazwa produktu", brand: "Marka", fit: "Krój", fitHint: "jak faktycznie leży, np. M/L",
  currency: "Waluta", price: "Cena", minOffer: "Min. oferta", minOfferHint: "ukryte przed klientami",
  condition: "Stan", category: "Kategoria", measurements: "Wymiary",
  flaws: "Wady", flawsHint: "bądź szczery, to buduje zaufanie", description: "Opis",
  type: "Typ", typeHint: "Czym jest rzecz — zasila sekcje Szorty / Bluzy / Koszulki.",
  styleTags: "Style", markAs: "Oznacz jako", soldOut: "Sprzedane",
  soldHint: "pozostaje widoczne, usunięte z Kup teraz / ofert",
  createProduct: "Dodaj produkt", saveChanges: "Zapisz zmiany", saving: "Zapisywanie…", cancel: "Anuluj", del: "Usuń",
};

export const ADMIN_LOCALES = ["en", "pl"];

// Returns a plain object of strings; Polish falls back to English per-key.
export function getAdminDict(locale) {
  return locale === "pl" ? { ...en, ...pl } : en;
}
