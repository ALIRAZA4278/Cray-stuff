// Admin panel translations. The admin is one person's tool, so this is a small
// hand-kept dictionary rather than a full i18n framework. Locale lives in the
// `admin-locale` cookie so both server and client parts can read it.
// NOTE: Polish strings are a best effort — worth a quick review by a native
// speaker (Wiktor) to fine-tune wording.

const en = {
  // ── nav / chrome ──
  dashboard: "Dashboard", products: "Products", orders: "Orders", offers: "Offers",
  discounts: "Discounts", messages: "Messages", categories: "Categories", guide: "Guide",
  backToStore: "← Back to store", signOut: "Sign out", language: "Language",
  viewAll: "View all", status: "Status", piece: "Piece", customer: "Customer",

  // ── product page headers ──
  catalog: "Catalog", addProduct: "Add product", addProductDesc: "List a new one-of-one piece.",
  addProductBtn: "+ Add product", edit: "Edit", piecesInCatalog: "pieces in the catalog", fires: "Fires",

  // ── product form ──
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
  accept: "Accept", decline: "Decline", writeAnswer: "Write an answer…", posting: "Posting…", reply: "Reply",
  dragToReorder: "Drag photos to reorder — the first one is the main image.",
  deleteConfirm: "Delete this product? This can't be undone.",
  save: "Save", reviewCountTitle: "Reviews count",
  reviewCountDesc: "The total shown across the site (home, trust bar, reviews page). Bump it as it grows.",
  reviewCountSaved: "Saved — live across the site.",

  // ── dashboard ──
  overview: "Overview", dashboardDesc: "Everything happening across CRAY STUFF at a glance.",
  livePieces: "Live pieces", ordersToShip: "Orders to ship", offersToReview: "Offers to review", revenue: "Revenue",
  soldOutLower: "sold out", ordersTotal: "orders total", restAuto: "Rest auto-handled", excludesCancelled: "Excludes cancelled",
  recentOrders: "Recent orders", noOrders: "No orders yet.", nothingWaiting: "Nothing waiting — all offers auto-handled.",
  list: "list", inInbox: "in the inbox →", customerMessages: "customer messages",

  // ── orders ──
  fulfilment: "Fulfilment", ordersDesc: "Manage orders and shipping.",
  totalOrders: "Total orders", toShip: "To ship", toShipHint: "Paid or new — awaiting dispatch",
  noOrdersTitle: "No orders yet", noOrdersBody: "When a customer checks out, their order shows up here.",
  thOrder: "Order", thDate: "Date", thTotal: "Total", thCarrier: "Carrier",
  deleteOrder: "Delete order", deleteOrderConfirm: "Delete this order? This can't be undone.", confirmDelete: "Confirm",

  // ── offers ──
  makeAnOffer: "Make an Offer",
  offersDesc: "Offers auto-accept at/above the min price and auto-counter below it. Review anything without a min set here.",
  needReview: "offers need your review.", handledAuto: "Everything else was handled automatically by the min-price rule.",
  noOffersTitle: "No offers yet", noOffersBody: "When a customer makes an offer on a piece, it shows up here.",
  thOffer: "Offer", thListPrice: "List", thMin: "Min", autoHandled: "Auto-handled",

  // ── messages ──
  inbox: "Inbox", messagesDesc: "Product questions and contact-form messages.",
  productQuestions: "Product questions", noQuestions: "No product questions yet.", answerColon: "Answer:",
  contactMessagesTitle: "Contact messages", setupNeeded: "Setup needed",
  setupRun: "Run", setupToEnable: "to enable the contact inbox.",
  noContactMessages: "No contact messages yet.", replyByEmail: "Reply by email",

  // ── categories ──
  taxonomy: "Taxonomy", categoriesTitle: "Categories & tags",
  categoriesDesc: "Manage the style tags and categories shoppers filter by.",
  styleTagsHint: "Multi-select tags on every product (Vintage, Y2K, Skate…).",
  categoriesHint: "Top-level buckets used in Shop navigation.",
  addNew: "Add new…", add: "Add",
  taxonomyNote: "Changes here are live in the editor — persistence connects to Supabase once the taxonomy table is added.",

  // ── discounts ──
  marketing: "Marketing", discountCodes: "Discount codes",
  discountsDesc: "Create codes customers type in at checkout. Great for launch promos and newsletter offers.",
  newDiscountCode: "New discount code", code: "Code",
  percentOff: "Percentage off", fixedOff: "Fixed amount off ($)", bogoOff: "Buy one, get % off the 2nd", amountLabel: "Amount ($)", percentageLabel: "Percentage (%)",
  firstOrderOnly: "First order only", oncePerCustomer: "One use per customer",
  minItems: "Min. items", minItemsHint: "e.g. 2 for buy-more deals", maxUses: "Max uses", maxUsesHint: "leave empty for unlimited",
  unlimited: "Unlimited", expires: "Expires", optional: "optional",
  activeLine: "Active (customers can use it right away)", createCode: "Create code",
  yourCodes: "Your codes", noCodesYet: "No codes yet. Create your first one above.",
  discountCol: "Discount", usedCol: "Used",
  stActive: "Active", stInactive: "Inactive", stExpired: "Expired", stUsedUp: "Used up",
};

const pl = {
  dashboard: "Panel", products: "Produkty", orders: "Zamówienia", offers: "Oferty",
  discounts: "Rabaty", messages: "Wiadomości", categories: "Kategorie", guide: "Poradnik",
  backToStore: "← Wróć do sklepu", signOut: "Wyloguj", language: "Język",
  viewAll: "Zobacz wszystkie", status: "Status", piece: "Produkt", customer: "Klient",

  catalog: "Katalog", addProduct: "Dodaj produkt", addProductDesc: "Wystaw nową rzecz jedyną w swoim rodzaju.",
  addProductBtn: "+ Dodaj produkt", edit: "Edytuj", piecesInCatalog: "produktów w katalogu", fires: "Ognie",

  photos: "Zdjęcia", uploadPhotos: "Dodaj zdjęcia", uploading: "Przesyłanie…",
  photosHint: "Prześlij z urządzenia lub wklej linki do zdjęć poniżej — po jednym w linii. Pierwsze jest głównym zdjęciem.",
  uploadsNote: "Zdjęcia są przechowywane w Cloudinary i szybko serwowane, automatycznie zoptymalizowane.",
  uploadFailedPrefix: "Błąd przesyłania", mainBadge: "Główne",
  productName: "Nazwa produktu", brand: "Marka", fit: "Fit", fitHint: "jak faktycznie leży, np. M/L",
  currency: "Waluta", price: "Cena", minOffer: "Min. oferta", minOfferHint: "ukryte przed klientami",
  condition: "Stan", category: "Kategoria", measurements: "Wymiary",
  flaws: "Wady", flawsHint: "bądź szczery, to buduje zaufanie", description: "Opis",
  type: "Typ", typeHint: "Czym jest rzecz — zasila sekcje Szorty / Bluzy / Koszulki.",
  styleTags: "Style", markAs: "Oznacz jako", soldOut: "Sprzedane",
  soldHint: "pozostaje widoczne, usunięte z Kup teraz / ofert",
  createProduct: "Dodaj produkt", saveChanges: "Zapisz zmiany", saving: "Zapisywanie…", cancel: "Anuluj", del: "Usuń",
  accept: "Akceptuj", decline: "Odrzuć", writeAnswer: "Napisz odpowiedź…", posting: "Wysyłanie…", reply: "Odpowiedz",
  dragToReorder: "Przeciągnij zdjęcia, aby zmienić kolejność — pierwsze jest głównym.",
  deleteConfirm: "Usunąć ten produkt? Tej operacji nie można cofnąć.",
  save: "Zapisz", reviewCountTitle: "Liczba opinii",
  reviewCountDesc: "Łączna liczba pokazywana na stronie (główna, pasek zaufania, opinie). Zwiększaj, gdy rośnie.",
  reviewCountSaved: "Zapisano — widoczne na całej stronie.",

  overview: "Przegląd", dashboardDesc: "Wszystko, co dzieje się w CRAY STUFF, w jednym miejscu.",
  livePieces: "Aktywne produkty", ordersToShip: "Zamówienia do wysyłki", offersToReview: "Oferty do sprawdzenia", revenue: "Przychód",
  soldOutLower: "sprzedane", ordersTotal: "zamówień łącznie", restAuto: "Reszta obsłużona automatycznie", excludesCancelled: "Bez anulowanych",
  recentOrders: "Ostatnie zamówienia", noOrders: "Brak zamówień.", nothingWaiting: "Nic nie czeka — wszystkie oferty obsłużone automatycznie.",
  list: "cena", inInbox: "w skrzynce →", customerMessages: "wiadomości od klientów",

  fulfilment: "Realizacja", ordersDesc: "Zarządzaj zamówieniami i wysyłką.",
  totalOrders: "Wszystkie zamówienia", toShip: "Do wysyłki", toShipHint: "Opłacone lub nowe — oczekują na wysyłkę",
  noOrdersTitle: "Brak zamówień", noOrdersBody: "Gdy klient złoży zamówienie, pojawi się ono tutaj.",
  thOrder: "Zamówienie", thDate: "Data", thTotal: "Suma", thCarrier: "Przewoźnik",
  deleteOrder: "Usuń zamówienie", deleteOrderConfirm: "Usunąć to zamówienie? Tej operacji nie można cofnąć.", confirmDelete: "Potwierdź",

  makeAnOffer: "Złóż ofertę",
  offersDesc: "Oferty są automatycznie akceptowane przy cenie minimalnej lub wyższej i kontrowane poniżej. Sprawdź te bez ustawionej ceny minimalnej.",
  needReview: "oferty do sprawdzenia.", handledAuto: "Reszta została obsłużona automatycznie przez regułę ceny minimalnej.",
  noOffersTitle: "Brak ofert", noOffersBody: "Gdy klient złoży ofertę na produkt, pojawi się tutaj.",
  thOffer: "Oferta", thListPrice: "Cena", thMin: "Min", autoHandled: "Automatyczne",

  inbox: "Skrzynka", messagesDesc: "Pytania o produkty i wiadomości z formularza kontaktowego.",
  productQuestions: "Pytania o produkty", noQuestions: "Brak pytań o produkty.", answerColon: "Odpowiedź:",
  contactMessagesTitle: "Wiadomości kontaktowe", setupNeeded: "Wymagana konfiguracja",
  setupRun: "Uruchom", setupToEnable: "aby włączyć skrzynkę kontaktową.",
  noContactMessages: "Brak wiadomości kontaktowych.", replyByEmail: "Odpowiedz e-mailem",

  taxonomy: "Taksonomia", categoriesTitle: "Kategorie i tagi",
  categoriesDesc: "Zarządzaj tagami stylów i kategoriami, po których filtrują klienci.",
  styleTagsHint: "Tagi wielokrotnego wyboru na każdym produkcie (Vintage, Y2K, Skate…).",
  categoriesHint: "Główne grupy używane w nawigacji sklepu.",
  addNew: "Dodaj nowy…", add: "Dodaj",
  taxonomyNote: "Zmiany są widoczne w edytorze — zapis do Supabase po dodaniu tabeli taksonomii.",

  marketing: "Marketing", discountCodes: "Kody rabatowe",
  discountsDesc: "Twórz kody, które klienci wpisują przy kasie. Świetne na promocje startowe i oferty newslettera.",
  newDiscountCode: "Nowy kod rabatowy", code: "Kod",
  percentOff: "Procent zniżki", fixedOff: "Kwota zniżki ($)", bogoOff: "Kup jeden, % taniej drugi", amountLabel: "Kwota ($)", percentageLabel: "Procent (%)",
  firstOrderOnly: "Tylko pierwsze zamówienie", oncePerCustomer: "Jedno użycie na klienta",
  minItems: "Min. produktów", minItemsHint: "np. 2 dla ofert wieloproduktowych", maxUses: "Maks. użyć", maxUsesHint: "puste = bez limitu",
  unlimited: "Bez limitu", expires: "Wygasa", optional: "opcjonalnie",
  activeLine: "Aktywny (klienci mogą go od razu użyć)", createCode: "Utwórz kod",
  yourCodes: "Twoje kody", noCodesYet: "Brak kodów. Utwórz pierwszy powyżej.",
  discountCol: "Zniżka", usedCol: "Użyto",
  stActive: "Aktywny", stInactive: "Nieaktywny", stExpired: "Wygasł", stUsedUp: "Wyczerpany",
};

// Order / offer / message status labels. Color mapping stays keyed on the raw
// English status elsewhere — only the displayed text is translated here.
const statusPl = {
  New: "Nowe", Paid: "Opłacone", Shipped: "Wysłane", Delivered: "Dostarczone", Cancelled: "Anulowane",
  Pending: "Oczekujące", "Auto-accepted": "Auto-akceptacja", Accepted: "Zaakceptowane",
  Countered: "Kontroferta", Declined: "Odrzucone",
  new: "Nowe", replied: "Odpowiedziano", answered: "Odpowiedziano", archived: "Zarchiwizowane",
  Live: "Aktywne", "Sold Out": "Sprzedane",
};

// Translate a status for display; unknown statuses (or English locale) pass through.
export function getStatusLabel(locale, status) {
  return locale === "pl" && statusPl[status] ? statusPl[status] : status;
}

export const ADMIN_LOCALES = ["en", "pl"];

// Returns a plain object of strings; Polish falls back to English per-key.
export function getAdminDict(locale) {
  return locale === "pl" ? { ...en, ...pl } : en;
}
