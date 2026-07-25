import Link from "next/link";
import { cookies } from "next/headers";

export const metadata = { title: "Guide — Admin" };

function Step({ n, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent font-mono text-xs text-accent">
        {n}
      </span>
      <div className="pb-1">
        <p className="text-sm font-medium">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>
      </div>
    </li>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function AdminHelpPage() {
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const pl = locale === "pl";

  const c = pl
    ? {
        eyebrow: "Pierwsze kroki",
        title: "Jak prowadzić swój sklep",
        intro:
          "Wszystko, czego potrzebujesz, aby samodzielnie zarządzać CRAY STUFF. Nie trzeba wiedzy technicznej — jeśli potrafisz wypełnić formularz, poradzisz sobie z prowadzeniem sklepu.",

        halvesTitle: "Dwie części",
        halvesStore: "Sklep",
        halvesStoreBody:
          " — to, co widzą klienci: strona główna, sklep, strony produktów, koszyk, płatność, Fire List, opinie.",
        halvesAdmin: "Ten panel administracyjny",
        halvesAdminBody:
          " — tylko dla Ciebie. Dodawaj produkty, obsługuj zamówienia, przyjmuj lub odrzucaj oferty, czytaj wiadomości. Wszystko, co robią klienci, trafia tutaj automatycznie.",

        addTitle: "Dodaj produkt",
        step1Title: "Wejdź w Produkty → + Dodaj produkt",
        step1Body: "Otworzy się pusty formularz. Nic nie pojawia się w sklepie, dopóki nie klikniesz Utwórz.",
        step2Title: "Wgraj zdjęcia",
        step2BodyA: "Kliknij ",
        step2BodyUpload: "Wgraj zdjęcia",
        step2BodyB:
          " i wybierz je prosto z telefonu lub komputera — wgrają się i zoptymalizują automatycznie. Możesz też zamiast tego wkleić linki do zdjęć. Pierwsze zdjęcie jest tym głównym, które widzą klienci.",
        step3Title: "Uzupełnij szczegóły",
        step3Body:
          "Nazwa, marka, cena, rozmiar, stan i wymiary. W opisie uczciwie podawaj wady — to buduje zaufanie i ogranicza zwroty.",
        step4Title: "Wybierz tagi Typ i Styl",
        step4BodyType: "Typ",
        step4BodyIs: " to, czym dana rzecz ",
        step4BodyIsEm: "jest",
        step4BodyMid: " (Bluzy, Spodnie, Szorty…) — to zasila te sekcje. ",
        step4BodyStyle: "Styl",
        step4BodyEnd: " to jej klimat (Y2K, Vintage, Skate…). Rzecz może mieć oba.",
        step5Title: "Ustaw min. ofertę (opcjonalnie)",
        step5Body:
          "Klienci nigdy tego nie widzą. Każda oferta równa jej lub wyższa jest przyjmowana natychmiast; niższa dostaje uprzejmą automatyczną kontrofertę. Dobrym punktem wyjścia jest około 80% Twojej ceny.",
        step6Title: "Kliknij Utwórz produkt",
        step6Body: "Od razu jest widoczny w sklepie. Otwórz go na stronie, aby sprawdzić, czy wygląda dobrze.",

        soldTitle: "Gdy coś się sprzeda",
        soldBodyA: "Otwórz daną rzecz w ",
        soldBodyEdit: "Produkty → Edytuj",
        soldBodyB: " i zaznacz ",
        soldBodyMark: "Oznacz jako Wyprzedane",
        soldBodyC: ". Pozostaje widoczna (z plakietką SOLD) i trafia do archiwum ",
        soldLink: "Ostatnio sprzedane",
        soldBodyD: " — co świetnie pokazuje, że rzeczy naprawdę się sprzedają.",

        dailyTitle: "Na co dzień",
        dailyOrders: "Zamówienia",
        dailyOrdersBody:
          " — każda finalizacja zakupu pojawia się tutaj. Zmieniaj status na bieżąco: Nowe → Opłacone → Wysłane → Dostarczone. Klient widzi to w śledzeniu swojego zamówienia.",
        dailyOffers: "Oferty",
        dailyOffersBody:
          " — większość jest obsługiwana automatycznie przez Twoją min. ofertę. Tylko te wymagające decyzji pojawiają się, abyś je Przyjął lub Odrzucił.",
        dailyMessages: "Wiadomości",
        dailyMessagesBody:
          " — wiadomości z formularza kontaktowego i pytania, które klienci zadają przy produkcie. Publiczne odpowiadanie na pytania o produkt pomaga też przyszłym kupującym.",

        tipsTitle: "Kilka wskazówek",
        tip1: "• Fotografuj każdą rzecz na tym samym tle — dzięki temu cały sklep wygląda profesjonalnie.",
        tip2: "• Fotografuj wady celowo. Uczciwość sprzedaje lepiej niż idealne zdjęcia.",
        tip3: "• Dodawaj po kilka rzeczy naraz, zamiast trzymać wszystkie na jeden duży drop.",
        tip4: "• Przy vintage wymiary liczą się bardziej niż metki z rozmiarem — zawsze je podawaj.",

        closing: "Utknąłeś na czymś? Napisz do mnie, a to ogarnę — albo przeprowadzę Cię przez to na żywo.",
      }
    : {
        eyebrow: "Getting started",
        title: "How to run your store",
        intro:
          "Everything you need to manage CRAY STUFF yourself. No technical knowledge needed — if you can fill in a form, you can run the shop.",

        halvesTitle: "The two halves",
        halvesStore: "The store",
        halvesStoreBody:
          " — what customers see: homepage, shop, product pages, cart, checkout, Fire List, reviews.",
        halvesAdmin: "This admin panel",
        halvesAdminBody:
          " — only you. Add products, handle orders, accept or decline offers, read messages. Everything customers do lands here automatically.",

        addTitle: "Add a product",
        step1Title: "Go to Products → + Add product",
        step1Body: "You'll get an empty form. Nothing goes live until you hit Create.",
        step2Title: "Upload the photos",
        step2BodyA: "Hit ",
        step2BodyUpload: "Upload photos",
        step2BodyB:
          " and pick them straight off your phone or computer — they upload and optimise automatically. You can also paste image links instead. The first photo is the main one customers see.",
        step3Title: "Fill in the details",
        step3Body:
          "Name, brand, price, size, condition and measurements. Be honest about flaws in the description — it builds trust and cuts returns.",
        step4Title: "Pick Type and Style tags",
        step4BodyType: "Type",
        step4BodyIs: " is what the piece ",
        step4BodyIsEm: "is",
        step4BodyMid: " (Hoodies, Pants, Shorts…) — this powers those sections. ",
        step4BodyStyle: "Style",
        step4BodyEnd: " is its vibe (Y2K, Vintage, Skate…). A piece can have both.",
        step5Title: "Set a min. offer (optional)",
        step5Body:
          "Customers never see this. Any offer at or above it is accepted instantly; anything below gets a polite automatic counter. Roughly 80% of your price is a good starting point.",
        step6Title: "Hit Create product",
        step6Body: "It's live on the store immediately. Open it on the site to check it looks right.",

        soldTitle: "When something sells",
        soldBodyA: "Open the piece in ",
        soldBodyEdit: "Products → Edit",
        soldBodyB: " and tick ",
        soldBodyMark: "Mark as Sold Out",
        soldBodyC: ". It stays visible (with a SOLD badge) and moves into the ",
        soldLink: "Recently Sold",
        soldBodyD: " archive — which is great proof that pieces really do go.",

        dailyTitle: "Day to day",
        dailyOrders: "Orders",
        dailyOrdersBody:
          " — every checkout appears here. Change the status as you go: New → Paid → Shipped → Delivered. The customer sees this in their order tracking.",
        dailyOffers: "Offers",
        dailyOffersBody:
          " — most are handled automatically by your min. offer. Only the ones needing a decision show up for you to Accept or Decline.",
        dailyMessages: "Messages",
        dailyMessagesBody:
          " — contact-form messages and questions customers ask on a product. Answering product questions publicly helps future buyers too.",

        tipsTitle: "A few tips",
        tip1: "• Shoot every piece against the same background — it makes the whole shop look professional.",
        tip2: "• Photograph flaws on purpose. Honesty sells better than perfect photos.",
        tip3: "• Add a few pieces at a time rather than saving them all for one big drop.",
        tip4: "• Measurements matter more than size labels on vintage — always include them.",

        closing: "Stuck on anything? Message me and I'll sort it — or walk you through it live.",
      };

  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{c.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight">{c.title}</h1>
      <p className="mt-2 text-sm text-muted">{c.intro}</p>

      <div className="mt-8 space-y-6">
        <Card title={c.halvesTitle}>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-foreground">{c.halvesStore}</span>{c.halvesStoreBody}
            </li>
            <li>
              <span className="text-foreground">{c.halvesAdmin}</span>{c.halvesAdminBody}
            </li>
          </ul>
        </Card>

        <Card title={c.addTitle}>
          <ol className="space-y-5">
            <Step n="1" title={c.step1Title}>
              {c.step1Body}
            </Step>
            <Step n="2" title={c.step2Title}>
              {c.step2BodyA}<span className="text-foreground">{c.step2BodyUpload}</span>{c.step2BodyB}
            </Step>
            <Step n="3" title={c.step3Title}>
              {c.step3Body}
            </Step>
            <Step n="4" title={c.step4Title}>
              <span className="text-foreground">{c.step4BodyType}</span>{c.step4BodyIs}<em>{c.step4BodyIsEm}</em>
              {c.step4BodyMid}<span className="text-foreground">{c.step4BodyStyle}</span>{c.step4BodyEnd}
            </Step>
            <Step n="5" title={c.step5Title}>
              {c.step5Body}
            </Step>
            <Step n="6" title={c.step6Title}>
              {c.step6Body}
            </Step>
          </ol>
        </Card>

        <Card title={c.soldTitle}>
          <p className="text-sm leading-relaxed text-muted">
            {c.soldBodyA}<span className="text-foreground">{c.soldBodyEdit}</span>{c.soldBodyB}
            <span className="text-foreground">{c.soldBodyMark}</span>{c.soldBodyC}
            <Link href="/sold" className="text-accent hover:opacity-80">{c.soldLink}</Link>{c.soldBodyD}
          </p>
        </Card>

        <Card title={c.dailyTitle}>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-foreground">{c.dailyOrders}</span>{c.dailyOrdersBody}
            </li>
            <li>
              <span className="text-foreground">{c.dailyOffers}</span>{c.dailyOffersBody}
            </li>
            <li>
              <span className="text-foreground">{c.dailyMessages}</span>{c.dailyMessagesBody}
            </li>
          </ul>
        </Card>

        <Card title={c.tipsTitle}>
          <ul className="space-y-2 text-sm leading-relaxed text-muted">
            <li>{c.tip1}</li>
            <li>{c.tip2}</li>
            <li>{c.tip3}</li>
            <li>{c.tip4}</li>
          </ul>
        </Card>
      </div>

      <p className="mt-8 text-sm text-muted">{c.closing}</p>
    </div>
  );
}
