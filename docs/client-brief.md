# CRAY STUFF — Client Brief & Feature Notes

Client: Wiktor (CRAY STUFF)
Source: WhatsApp/email conversation with client, consolidated for build reference.

## Commitment

All features listed in this brief will be built — nothing here is optional or
"maybe later." Use the checklist below to track build status feature by feature.

## Full feature checklist

- [ ] Home page with hero, Latest Drop, Most Popular, Shop by Style, Brand story, Drop countdown, Newsletter, Footer
- [ ] Shop page with categories (Men's, Women's, clothing type, style)
- [ ] Product Details page (photos gallery, brand, size, condition, measurements, description, price, tags)
- [ ] Framed / slightly 3D product card design
- [ ] Login / Register (Email, Google, Apple via Supabase Auth)
- [ ] Customer Dashboard (profile, order history, order tracking)
- [ ] Fire List (custom wishlist)
- [ ] Price drop notifications for saved Fire List items
- [ ] Make an Offer (customer submits price, admin accepts/declines)
- [ ] Product Q&A (customer asks on product page, admin replies, notification on reply)
- [ ] Advanced filtering (style tag, category, size, brand, price, condition)
- [ ] Search
- [ ] Cart
- [ ] Checkout with Stripe payments
- [ ] Free shipping rule (configurable threshold, Poland-first)
- [ ] Contact page
- [ ] FAQ page
- [ ] Admin Dashboard: add/edit/delete products, upload images, set prices, tags & descriptions, manage inventory
- [ ] Admin Dashboard: accept/decline offers
- [ ] Admin Dashboard: reply to customer messages
- [ ] Admin Dashboard: manage orders & shipping
- [ ] Admin Dashboard: manage categories/style tags
- [ ] Fully responsive (desktop, tablet, mobile)
- [ ] Basic on-page SEO (URLs, titles, meta, alt text, performance)
- [ ] Framer Motion animations / premium UI polish (scroll: fade-in + slide-up, kept subtle)
- [ ] English + Polish language support (bilingual)
- [ ] Logo refinement (T-shirt graphic concept → professional logo)
- [ ] Staging environment deploy, then live domain connection at launch

## What it is

A curated online store for vintage, Y2K, Japanese, skate and streetwear clothing.
Not a clothing brand — a marketplace-style store where the owner personally sources,
photographs and lists every item. Every product is **one-of-one**: once sold, it's
removed from the store (no restock, no variants of the same item).

**Vibe**: premium, minimal, dark, editorial. Inspired by SSENSE, Grailed, END
Clothing, COS, and vintage boutiques in Tokyo/Copenhagen — NOT a typical
Shopify/WordPress-looking store. Client explicitly wants it to feel trustworthy
and experienced despite being a new site (they have ~1,000 positive reviews from
other platforms to lean on for social proof).

Target market: **Poland first**, but built with expansion to all of Europe in
mind (client undecided on domain name for this reason — see Open Questions).

## Tech stack (client-specified)

- Frontend: Next.js + React + Tailwind CSS
- Backend: Next.js API Routes or NestJS
- Database: PostgreSQL
- Auth: Supabase Auth (Google, Apple, Email)
- Storage: Cloudinary (product images)
- Payments: Stripe
- Hosting: Vercel
- Admin panel: custom-built (not a page builder / template)
- Animations: Framer Motion
- Localization: English + Polish (i18n)

## Site structure / pages

Keep it lean — client explicitly dislikes bloated menus/pages.

- Home
- Shop (categories: Men's, Women's, clothing type, style)
- Product Details
- Login / Register
- Customer Dashboard (profile, order history, order tracking, Fire List)
- Fire List (custom wishlist)
- Cart
- Checkout
- Contact
- FAQ
- Admin Dashboard — built as a protected `/admin` section inside this same
  Next.js app (not a separate standalone project/app, not in public nav).
  Note: if the client later wants the admin panel as a fully separate
  project/app, that's a different scope and priced separately.

## Homepage sections

- Premium hero banner, editorial layout
- Latest Drop section
- Most Popular products (ranked by Fire List "fire" likes)
- Shop by Style (Vintage, Y2K, Japanese, Skate, Archive, Gorpcore)
- Brand story / About section (trust-building — mention track record)
- Upcoming Drop countdown timer
- Newsletter signup
- Footer with key links

## Product data model

Each product needs:

- Photos (7–25 per product, ~15 typical, client-supplied — no photo editing service needed)
- Brand
- Size
- Condition
- Measurements
- Short description
- Price
- Style tags (Vintage, Y2K, Skate, Japanese, Gorpcore, Archive, etc. — multi-select, extensible)

Initial catalog: ~25–50 products.

### Product card design note

Client wants product cards with a **framed, slightly 3D look** — images should
feel premium/elevated, not flat thumbnails. This is a specific visual requirement,
worth prototyping early.

## Core custom features (the differentiators — do not treat as generic e-commerce)

1. **Fire List** — custom wishlist (not called "wishlist" anywhere in UI/copy).
   Users save products they like/want to revisit.
2. **Price drop notifications** — notify a user if a product on their Fire List
   gets a price reduction.
3. **Make an Offer** — buyer submits their own price on a product; admin can
   accept or decline from the dashboard. (Client also described this loosely as
   "negotiate prices through a built-in chat" — clarify whether offers are a
   simple form + accept/decline, or a full back-and-forth chat thread. Current
   spec language leans toward structured offer + admin response, not free-form chat.)
4. **Product Q&A** — customers can ask questions directly on a product page;
   admin replies; customer gets notified on reply.
5. **Advanced filtering** — by style tag, category, size, brand, price, condition.
6. **Search**.
7. **Order tracking** in customer account.
8. **Upcoming drop countdown**.

## Customer accounts

- Sign up / login via Email, Google, or Apple (Supabase Auth).
- Dashboard: profile, order history + tracking, Fire List.

## Admin dashboard

Owner needs to:

- Add / edit / delete products
- Upload images
- Set prices
- Add tags & descriptions
- Manage inventory
- Accept / decline price offers
- Reply to customer questions
- Manage orders & shipping
- Manage categories/style tags

## Shipping

Free shipping within Poland on orders over 250 PLN. (Rule should be
configurable, not hardcoded — likely to expand to other countries/thresholds
later given EU expansion plans.)

## Content & branding

- Copy: written generically for launch (by the agency), refined together later.
  Client was advised to eventually use a professional copywriter (not AI content)
  for SEO/trust reasons — **do the initial buildout copy assuming it'll be
  replaced**, don't over-invest in final wording.
- Logo: client already has a logo concept — a T-shirt graphic with the brand
  name on it — but wants it refined into a proper professional logo. Logo
  refinement is part of scope.

## SEO & domain strategy (agreed approach)

- Build first on a **staging environment**, no live domain needed to start.
  Client is deliberately delaying the domain decision because they're weighing
  a Europe-wide brand name.
- SEO comes **after** the site is fully built, tested, and running — do it
  against final structure + professionally written content, not mid-build.
- Target keywords mentioned by client: "vintage clothing", "Y2K", "vintage
  hoodie", specific brand names.

## Deal/scope terms mentioned

- Deployment on client's own domain when ready (agency helps with domain purchase if needed).
- Support window mentioned inconsistently across messages: one message says
  "3 months of support", another says "1 month of free support" — **needs
  confirmation with client before finalizing contract/quote.**

## Open questions for client (not yet answered)

- Final domain name / brand name for EU-wide positioning — still undecided.
- Exact mechanics of "Make an Offer": simple accept/decline vs. live negotiation chat.
- Support period: 1 month or 3 months — conflicting statements.
- Budget/price range — was discussed live, not finalized in writing here.
- Marketing budget split: client asked whether to prioritize SEO over other
  marketing spend — worth a follow-up recommendation once site scope is locked.

## Ready-to-send replies to client's questions (short & direct)

**Poland first, or all of Europe from day one?**
Build for Poland first, structure for Europe. Same codebase, PLN + one more
currency ready (e.g. EUR), address/shipping fields generic from the start.
Don't launch multi-country marketing until Poland is proven.

**How will SEO work for "vintage clothing", "Y2K", brand names, etc.?**
Basic on-page SEO (URLs, titles, meta, image alt text, fast load) goes in
during build. Real keyword-targeted SEO (content, backlinks, rankings) starts
after launch, once real content and products are live — doing it earlier
wastes effort on pages that will still change.

**Do we need to buy the domain before starting?**
No. We build on a staging URL first. Buy the domain whenever you decide the
final brand name — we connect it at launch.

**Rough price range for the website?**
[Insert your actual number here — not something I can quote on your behalf.]
Frame it as: base build (all listed features) + optional add-ons (logo
refinement, copywriting, extra languages).

**Monthly maintenance cost?**
[Insert your number.] Typically covers hosting (Vercel), database, image
storage (Cloudinary), and a support/bugfix allowance after the free period ends.

**Can this design work for the European market, not just Asian-style sites?**
Yes — the dark/minimal/editorial direction (SSENSE, Grailed, END, COS
references) is a European premium-fashion look, not an Asian-market style.
Portfolio examples were just prior client projects; the design system for
CRAY STUFF will be built specifically around your references.

**Invest more in SEO or other marketing?**
For a new store with no domain history, SEO takes months to pay off. Short
term, paid social/influencer marketing (fits vintage/streetwear audience)
drives faster traffic. Recommendation: launch with light SEO foundations +
social marketing, shift budget toward SEO once you have traffic data and
reviews on the new domain.

**What are the next steps? Anything else needed from you?**
Nothing blocking — enough info to start. We'll confirm the logo direction,
finalize the offer/negotiation flow, and lock the support period (1 vs 3
months) as we go. You'll review progress on the staging site as we build.

## Round 2 — design & technical clarifications from client's partner

New questions came from the client + partner before committing to the
proposal. They want confidence this isn't a templated build.

**Base framework — free template or fully custom?**
Fully custom. No Shopify/WooCommerce/theme-store template. Every layout,
component, and animation is coded from scratch on Next.js.

**Platform & tech stack?**
Next.js (React) frontend, Node-based backend (Next.js API routes),
PostgreSQL database supabase — not Shopify, not WordPress/WooCommerce, not PHP.
Custom-coded end to end.

**Animations & micro-interactions without hurting speed?**
Framer Motion for scroll/hover animations, GPU-accelerated CSS transforms,
lazy-loaded/off-screen animations deferred until they scroll into view — so
motion doesn't block initial page load.

**Site speed / performance target?**
Target Google PageSpeed 90+ (mobile and desktop). Achieved via image
optimization (Cloudinary + Next.js Image), code-splitting, and testing
PageSpeed after every major revision, not just at the end.

**Mobile review without Figma?**
Live staging URL — every revision is viewable directly on your own phone/
tablet in real time, no design-file handoff needed. You test the actual site,
not a mockup. We'll share a live preview link (Vercel deployment) as we build,
so the client can open it directly and review design/progress themselves —
no local setup needed on their end.

**Timeline for prototype and launch?**
[Insert your actual estimate — depends on final scope/feature list agreed above.]

## Round 2 — new design/product decisions from client

- **No single inspiration site** — client wants CRAY STUFF to feel like its
  own thing, built around their taste, not a copy of SSENSE/Grailed/etc.
  Treat earlier references as a starting point only, not the target look.
- **Dark theme concern** — client is unsure if the previous dark mock-up is
  too dark. Revisit contrast/brightness balance in next design pass; don't
  lock in max-dark as final.
- **Typography** — wants a more square, modern-looking font (not a soft/
  rounded or classic serif look).
- **Payments** — wants as many methods as possible: Stripe, Shopify
  Payments, and specifically **BLIK** (very popular in Poland — must be
  supported, not optional). Client will handle payment provider account
  setup themselves.
- **Shipping/logistics** — must integrate **InPost** (top priority, popular
  in Poland and expanding across Europe), plus **DHL**, **DPD**, and
  **Orlen Paczka**. Also wants worldwide shipping support, kept simple for
  both admin and customer. Shipping needs to support multiple carriers, not
  just one flat "free over 250 PLN" rule from earlier.
- **Business bank account** — client is opening a new business account
  themselves for this project; not something we need to set up.
- Client's general stance: don't over-plan every detail now — align on
  direction first, refine specifics as we build.

## Round 3 — animation preference & new requirements

**Animations/transitions — client's actual preference** (they weren't sure
what "transitions" meant at first, clarified via follow-up):

- Scroll animations: elements should gently **fade in and slide up from the
  bottom** as they scroll into view (standard scroll-reveal pattern).
- Keep it subtle — client explicitly does **not** want heavy/overdone
  effects. Priority order: modern, clean, elegant first; motion second.
- Client trusts our judgment on exact implementation. Wants to review the
  first built version together and refine from there — doesn't need it
  perfect upfront.

- **Language support** — site must support **English + Polish** (bilingual
  from launch, not Polish-only). Add i18n/localization to scope and tech
  stack.
- **Review counters** — any review-count/social-proof numbers shown on the
  site must be based on **client-provided real data** (their ~1,000 existing
  reviews from other platforms), never placeholder or fabricated numbers.

**Reference sites client sent for design/animation/layout ideas** (not to be
copied 1:1 — client wants CRAY STUFF to feel like its own thing):

- beyondretro.com — bright yellow/white, playful mainstream vintage-retailer
  look. Does not match our dark/premium/editorial direction — only useful as
  a "what we're not doing" contrast.
- studiovi.com — turned out to be an unrelated B2B software company site, not
  fashion. Likely a wrong link from the client — worth double-checking with
  them.
- waveclothes.pl — Polish vintage/Y2K/streetwear store, dark hero imagery,
  bold white uppercase condensed typography, minimal nav. Closest match to
  our intended vibe and directly relevant (same Poland market).
