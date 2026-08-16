// Legal page content (privacy / terms / returns), EN + PL. These are clear,
// good-faith starting templates for a small EU vintage store — Wiktor should
// review them (and ideally have them checked) and fill in the company details
// marked [in brackets] before launch.

const EMAIL = "hello@craystuff.com";
const UPDATED_EN = "Last updated: August 2026";
const UPDATED_PL = "Ostatnia aktualizacja: sierpień 2026";

const en = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: UPDATED_EN,
    sections: [
      { h: "Who we are", body: `CRAY STUFF is a curated vintage & streetwear store based in Warsaw, Poland [company name / registration details]. For any privacy question, contact us at ${EMAIL}.` },
      { h: "What we collect", body: "When you place an order, sign up to the newsletter, make an offer or message us, we collect the details you provide — your name, email, delivery address and order information. We also store basic technical data needed to run the site." },
      { h: "How we use it", body: "We use your data only to process and ship your orders, reply to your messages and offers, and — if you opt in — send you newsletter and new-drop emails. We never sell your data." },
      { h: "Who we share it with", body: "We use trusted providers to run the store: Supabase and Vercel (hosting and database), Cloudinary (image delivery), our payment provider for checkout, our email provider for confirmations and newsletters, and shipping carriers (InPost, Orlen Paczka, GLS, DPD) to deliver your order. They only receive what they need to provide their service." },
      { h: "Your rights", body: `Under EU GDPR you can request access to, correction of, or deletion of your personal data, and you can unsubscribe from marketing emails at any time. Just email ${EMAIL} and we'll take care of it.` },
      { h: "Cookies", body: "We use only the cookies needed to keep the site working (such as your language and cart). We don't use third-party advertising cookies." },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    updated: UPDATED_EN,
    sections: [
      { h: "About the store", body: "CRAY STUFF sells curated vintage, Y2K, skate and selected designer pieces. Almost every item is one-of-one — hand-picked and checked before it's listed. Condition and any flaws are described honestly on each listing." },
      { h: "Prices & orders", body: "Prices are shown in PLN (with USD/EUR shown for reference) and include applicable taxes where required. An order is confirmed once payment is completed. Because pieces are one-of-one, an item may sell out at any time before your order is completed." },
      { h: "Make an Offer", body: "You can submit an offer on any piece. Submitting an offer doesn't reserve the item and doesn't oblige you to buy. We review offers by hand and reply with a decision or a personalized discount." },
      { h: "Payment", body: "Payments are handled securely by our payment provider. We never see or store your full card details." },
      { h: "Shipping", body: "Orders are packed and shipped within 24 hours via InPost, Orlen Paczka, GLS or DPD. Free shipping on orders of 3 items or more; otherwise shipping is shown at checkout. International options are available at checkout." },
      { h: "Returns", body: "You have the right to return items in line with EU consumer law — see our Returns page for the full details." },
      { h: "Liability & law", body: "We describe every piece as accurately as we can. Vintage means character — natural wear is part of it and is described honestly. These terms are governed by Polish and EU law." },
    ],
  },
  returns: {
    eyebrow: "Legal",
    title: "Returns & Refunds",
    updated: UPDATED_EN,
    sections: [
      { h: "14-day right of withdrawal", body: "In line with EU consumer regulations, you have 14 days from receiving your order to withdraw and return it, no reason needed." },
      { h: "Condition", body: "Please return items unworn and in the same condition you received them, with any tags attached. Vintage pieces are one-of-one, so we ask that they come back the way they left us." },
      { h: "How to start a return", body: `Message us at ${EMAIL} within 14 days of delivery and we'll guide you through it.` },
      { h: "Who pays return shipping", body: "For standard returns the customer covers return shipping. If an item arrives not as described, or the mistake was ours, we cover the return cost — just message us within 48 hours of delivery." },
      { h: "Refunds", body: "Once we receive and check the returned item, we refund you to your original payment method, usually within a few business days." },
    ],
  },
};

const pl = {
  privacy: {
    eyebrow: "Informacje prawne",
    title: "Polityka prywatności",
    updated: UPDATED_PL,
    sections: [
      { h: "Kim jesteśmy", body: `CRAY STUFF to sklep z wyselekcjonowanym vintage i streetwearem z siedzibą w Warszawie [dane firmy / rejestracyjne]. W sprawach prywatności pisz na ${EMAIL}.` },
      { h: "Jakie dane zbieramy", body: "Gdy składasz zamówienie, zapisujesz się do newslettera, składasz ofertę lub piszesz do nas, zbieramy podane przez Ciebie dane — imię, e-mail, adres dostawy i informacje o zamówieniu. Przechowujemy też podstawowe dane techniczne potrzebne do działania strony." },
      { h: "Jak je wykorzystujemy", body: "Używamy Twoich danych wyłącznie do realizacji i wysyłki zamówień, odpowiadania na wiadomości i oferty oraz — jeśli wyrazisz zgodę — do wysyłania newslettera i informacji o dropach. Nigdy nie sprzedajemy Twoich danych." },
      { h: "Komu je udostępniamy", body: "Korzystamy z zaufanych dostawców: Supabase i Vercel (hosting i baza danych), Cloudinary (zdjęcia), dostawca płatności (kasa), dostawca poczty (potwierdzenia i newsletter) oraz przewoźnicy (InPost, Orlen Paczka, GLS, DPD). Otrzymują oni tylko to, co niezbędne." },
      { h: "Twoje prawa", body: `Zgodnie z RODO możesz zażądać dostępu do swoich danych, ich poprawienia lub usunięcia, a także w każdej chwili wypisać się z maili marketingowych. Napisz na ${EMAIL}.` },
      { h: "Pliki cookie", body: "Używamy tylko plików cookie niezbędnych do działania strony (np. język i koszyk). Nie stosujemy reklamowych cookie stron trzecich." },
    ],
  },
  terms: {
    eyebrow: "Informacje prawne",
    title: "Regulamin",
    updated: UPDATED_PL,
    sections: [
      { h: "O sklepie", body: "CRAY STUFF sprzedaje wyselekcjonowane vintage, Y2K, skate i wybrane rzeczy designerskie. Niemal każda sztuka jest jedyna w swoim rodzaju — ręcznie wybrana i sprawdzona przed wystawieniem. Stan i ewentualne wady opisujemy uczciwie." },
      { h: "Ceny i zamówienia", body: "Ceny podane są w PLN (USD/EUR poglądowo) i zawierają należne podatki tam, gdzie są wymagane. Zamówienie jest potwierdzone po opłaceniu. Ponieważ sztuki są jedyne w swoim rodzaju, mogą się wyprzedać zanim zakończysz zamówienie." },
      { h: "Złóż ofertę", body: "Możesz złożyć ofertę na każdą sztukę. Złożenie oferty nie rezerwuje przedmiotu ani nie zobowiązuje do zakupu. Oferty sprawdzamy ręcznie i odpowiadamy decyzją lub spersonalizowaną zniżką." },
      { h: "Płatności", body: "Płatności obsługuje bezpiecznie nasz dostawca płatności. Nigdy nie widzimy ani nie przechowujemy pełnych danych Twojej karty." },
      { h: "Wysyłka", body: "Zamówienia pakujemy i wysyłamy w 24 godziny przez InPost, Orlen Paczka, GLS lub DPD. Darmowa wysyłka od 3 sztuk; w innym przypadku koszt widać w kasie. Opcje międzynarodowe dostępne w kasie." },
      { h: "Zwroty", body: "Masz prawo do zwrotu zgodnie z prawem konsumenckim UE — szczegóły na stronie Zwroty." },
      { h: "Odpowiedzialność i prawo", body: "Każdą sztukę opisujemy tak dokładnie, jak potrafimy. Vintage ma charakter — naturalne ślady użytkowania są opisywane uczciwie. Regulamin podlega prawu polskiemu i UE." },
    ],
  },
  returns: {
    eyebrow: "Informacje prawne",
    title: "Zwroty i reklamacje",
    updated: UPDATED_PL,
    sections: [
      { h: "14 dni na odstąpienie", body: "Zgodnie z przepisami konsumenckimi UE masz 14 dni od otrzymania zamówienia na odstąpienie i zwrot, bez podawania przyczyny." },
      { h: "Stan", body: "Prosimy o zwrot nienoszonych rzeczy w stanie, w jakim je otrzymałeś/aś, z metkami. Sztuki vintage są jedyne w swoim rodzaju, więc prosimy, by wróciły takie, jakie wyszły." },
      { h: "Jak rozpocząć zwrot", body: `Napisz na ${EMAIL} w ciągu 14 dni od dostawy, a przeprowadzimy Cię przez proces.` },
      { h: "Kto płaci za zwrot", body: "Przy standardowych zwrotach koszt zwrotu pokrywa kupujący. Jeśli rzecz dotrze niezgodna z opisem lub błąd był po naszej stronie, koszt zwrotu pokrywamy my — napisz w ciągu 48 godzin od dostawy." },
      { h: "Zwrot pieniędzy", body: "Po otrzymaniu i sprawdzeniu zwrotu oddajemy pieniądze tą samą metodą płatności, zwykle w ciągu kilku dni roboczych." },
    ],
  },
};

export function legalDoc(locale, which) {
  const set = locale === "pl" ? pl : en;
  return set[which];
}
