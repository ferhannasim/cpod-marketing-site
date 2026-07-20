# DropShipPOD — Shopify → Next.js Marketing Site Migration (Design)

- **Date:** 2026-07-20
- **Status:** Approved design → ready for implementation plan
- **Owner:** (agency) / DropShipPOD
- **Repo:** `cpod-marketing-site` (currently the Shopify "Warehouse"/Maestrooo theme)

---

## 1. Background & problem

The existing repo is a **Shopify Online Store 2.0 theme** (Warehouse by Maestrooo v2.8.2), heavily
extended into a **print-on-demand / dropship storefront** with product-customizer apps
(ImprintNext, InkyBay, Revy discounts, aiod). The business, however, wants this site to be a
**marketing / explainer website** for its **dropship service and Shopify app** — *not* a store.

We are rebuilding it as a **static-first Next.js site**. All *informational / explainer* content is
kept (it explains the service to users). All *transactional Shopify commerce* is dropped: cart,
checkout, product pages, collection pages, customer accounts, and the customization apps.

### What the current repo does and does not contain
- **Contains:** layout/section/snippet/template structure, theme settings values
  (`config/settings_data.json`), and homepage section content (`templates/index.json`).
- **Does NOT contain:** page bodies (Privacy, Terms, How-It-Works, FAQ, Contact, etc.), the policy
  texts, and the navigation menus — Shopify stores those in its **admin database**. Media
  (images/videos) is **externally hosted**: homepage videos are **YouTube** embeds; images are
  **Shopify CDN** (`shopify://shop_images/...`). Only 8 real files live in `assets/`.

**Consequence:** page copy must be **extracted (scraped) from the running site** — either the live
site `https://dropshippod.ca` or the local Shopify dev server `http://127.0.0.1:9292` (both
confirmed reachable) — and re-authored as in-repo content.

## 2. Goals

1. A modern, fast, **static-first marketing site** in Next.js that keeps DropShipPOD branding and
   reuses existing videos and copy.
2. Preserve all **explainer/informational** pages (service, dropship, app, printing methods,
   FAQs, notices, sizing, delivery, billing, legal).
3. **Shopify-independent**: self-host images; no runtime dependency on Shopify.
4. SEO continuity on the same domain (metadata + 301 redirects from old URLs).
5. Maintainable by developers via **in-repo MDX/data + git**.

## 3. Non-goals (explicitly out of scope)

- Cart, checkout, product pages, collection/catalog pages, customer accounts/login.
- Product customizer / designer apps (ImprintNext, InkyBay, ImprintNext redirect, `custydesignlab`).
- Revy discounts, All-in-One Designer (aiod), Simply Insurance, Flashify, upsell popups.
- Live **order-status lookup** (`check-order-status`) — needs Shopify backend; drop or external link.
- **French / i18n** — deferred to phase 2. Content is structured so FR can be layered on later.
- A functioning contact-form backend — **form is UI-only for v1**; API wired later.

## 4. Key decisions (with rationale)

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| 1 | Canonical brand & domain | **DropShipPOD — dropshippod.ca** | User selected; matches homepage mosaic links + `@DropShipPOD` YouTube. (Repo also references "InstaCustoms" and "Cheapest Print on Demand"; those are superseded.) |
| 2 | Design fidelity | **Modernize, keep brand** | Current theme is a dated, heavily-patched Shopify template. Keep content/feel, refresh layout + typography. |
| 3 | Languages | **English only (v1)** | Faster launch; FR is phase 2. Canadian/QC market means FR is likely eventually needed. |
| 4 | Content source | **Scrape live/local site** | Page bodies + menus + policies are not in the repo. Both `dropshippod.ca` and `127.0.0.1:9292` are reachable. |
| 5 | Content management | **In-repo MDX + data files** | Zero cost, simplest for mostly-static marketing content; CMS deferred. |
| 6 | Scope | **All explainer content kept** | Site markets the dropship service + Shopify app; only transactional commerce dropped. |
| 7 | Hosting / contact form | **Static-capable Next app; form UI + stub API** | "Integrate API later." Keep a normal Next.js app so a route handler can be added without restructuring. |
| 8 | Fonts | **Free modern substitute** | Avenir Next is paid. Use Manrope (body) + a geometric display for headings via `next/font`. |

## 5. Architecture & stack

- **Next.js 15 (App Router), React 19, TypeScript.**
- **Tailwind CSS v4** with a brand-token layer (colors, radius, spacing).
- **shadcn/ui** (Radix primitives) for Accordion (FAQ), Tabs, NavigationMenu, Dialog, etc.
- **lucide-react** icons (replaces Font Awesome 4).
- **MDX** for long-form pages (`@next/mdx` or `content-collections`); typed **TS/JSON data** for
  homepage sections and size charts.
- **next/font** (self-hosted free fonts, no layout shift); **next/image** (self-hosted images).
- **react-hook-form + zod** for the contact form.
- Rendering: standard **SSG**. Deploy target Vercel (or `output: 'export'` for pure static if the
  form stays third-party). Not locked into static-export so the contact API is a small later add.

## 6. Route map (old Shopify URL → new route)

| New route | Source (`/pages/…` unless noted) | Notes |
|---|---|---|
| `/` | `index.json` | Modernized homepage (§7) |
| `/how-it-works` | `how-it-works` | |
| `/about` | `about-us` | |
| `/contact` | `contact` | Form UI + stub `/api/contact` |
| `/faq` | `frequently-asked-questions-faqs` | Accordion |
| `/faq/dtf` | `dtf-faq` | |
| `/faq/sublimation` | `sublimation-faq` | |
| `/faq/print-on-your-own-item` | `faq-print-on-your-own-item` | |
| `/delivery` | `delivery-speed` (+ `free-shipping-on-orders-over-100`) | Merge free-shipping info here |
| `/billing` | `billing-information` | |
| `/start-your-ecommerce-brand` | `start-your-ecommerce-brand-without-tech-or-high-costs` | Dropship/app lander |
| `/launch-automated-brand` | `launch-a-fully-automated-ecommerce-brand-no-tech-needed` | Dropship/app lander |
| `/printing-notice` | `⚠️-important-printing-notice` | |
| `/sublimation-printing-notice` | `sublimation-printing-notice` | |
| `/artwork-approval` | `🎨-artwork-mockup-approval` | |
| `/size-charts` | (index/hub) | Product selector |
| `/size-charts/[handle]` | `size-chart-*` (50+) | **Data-driven: one template + JSON per SKU** |
| `/measuring` | `measuring` | |
| `/policies/privacy` | `/policies/privacy-policy` | |
| `/policies/terms` | `/policies/terms-of-service` | |
| `/policies/refund` | `/policies/refund-policy` | |
| `/policies/shipping` | `/policies/shipping-policy` | |
| `/404` | — | Custom not-found |

- **301 redirects** from every old `/pages/*` (and old `/policies/*`) slug → new path, in
  `next.config.ts`, for SEO continuity on the same domain.
- **Dropped routes:** `/products/*`, `/collections/*`, `/cart`, `/checkout`, `/account/*`,
  `custydesignlab`, `check-order-status`, and all app/customizer templates.

## 7. Homepage composition (modernized; same content + brand)

Order, top → bottom:
1. **Hero** — featured YouTube video (facade: poster → click-to-load iframe) + headline + primary
   CTA. The remaining homepage videos become a "watch more" gallery/strip in/under the hero.
   (Original videos had no text overlay; add brand messaging.)
2. **How-it-works teaser** — the "5 easy steps" → modern step list → `/how-it-works`.
3. **Printing methods** — DTG / DTF / sublimation explainer cards → relevant FAQ/notice pages.
4. **Supplier logo wall** — 14 brand logos, **display-only** (no shop to link to).
5. **Testimonials** — the 3 Google reviews as star-rated cards.
6. **Dropship + Shopify-app pitch** — the core marketing message → the two landers.
7. **Shipping / free-shipping band** — concise, → `/delivery`.
8. **Final CTA** — Contact / get started.

## 8. Content extraction pipeline (one-time)

- `scripts/scrape.mjs` — reads a **manifest** of in-scope URLs; fetches each from `127.0.0.1:9292`
  (preferred) or `dropshippod.ca`; extracts the main content region (Shopify page/section body,
  stripping header/footer/cart/scripts) with **cheerio**; converts HTML→MDX with **turndown**;
  writes first-pass files to `content/`. Each is then **hand-cleaned**.
- `scripts/fetch-assets.mjs` — collects all referenced Shopify-CDN image URLs, downloads them into
  `public/images/…`, and rewrites references. Removes Shopify runtime dependency.
- **Size charts** — extract each `size-chart-*` page's table into `content/size-charts/<handle>.json`
  (`{ brand, model, name, columns, rows, units }`), rendered by one `SizeChartTable` component and a
  `generateStaticParams` over the JSON files.

## 9. Design system

- **Fonts:** **Manrope** (body) + a geometric display face for headings (finalized in build),
  self-hosted via `next/font`.
- **Color tokens (derived from brand):** primary red `#cb1836`, ink navy `#1e2d7d`, a neutral
  ramp, one accent; exposed as Tailwind theme tokens + CSS variables.
- **Components:** `Button`, `Container`, `Section`, `Card`, `Accordion`, `Tabs`, `Header`/`MegaNav`,
  `Footer`, `VideoEmbed` (YouTube facade), `LogoWall`, `Testimonial`, `StepList`, `SizeChartTable`,
  MDX `Prose` wrapper.
- **Nav/footer** rebuilt from the live header/footer link set (below), grouped modern mega-menu +
  footer columns (About/Help, Info, Legal, Social).

## 10. Contact form

`react-hook-form` + `zod` (name, email, subject, message). Submit → **stub `app/api/contact/route.ts`**
that validates and returns success while logging (with a `TODO` to wire Resend/Formspree). Client
shows success/error states. Wiring the real provider later is a few lines.

## 11. Project structure

```
app/
  (marketing)/{how-it-works,about,contact,faq,faq/*,delivery,billing,
               start-your-ecommerce-brand,launch-automated-brand,
               printing-notice,sublimation-printing-notice,artwork-approval,
               size-charts,size-charts/[handle],measuring}/page.tsx
  policies/{privacy,terms,refund,shipping}/page.tsx
  api/contact/route.ts          # stub
  layout.tsx  page.tsx  not-found.tsx  sitemap.ts  robots.ts
components/ui/…  components/sections/…
content/                        # *.mdx + homepage.ts, videos.ts, logos.ts,
                                #   testimonials.ts, size-charts/*.json
lib/                            # mdx, metadata, utils
public/images/…                 # downloaded assets
scripts/{scrape.mjs,fetch-assets.mjs}
next.config.ts (redirects)  tailwind + tokens  tsconfig  package.json
```

## 12. SEO

- Per-page `metadata` (title/description) via the Next Metadata API.
- **DropShipPOD** Organization JSON-LD (updated from the old InstaCustoms block in
  `layout/theme.liquid`). The signage/banner `<title>` hacks are shop-specific → drop.
- `sitemap.ts` + `robots.ts`; **301 redirects** from old slugs.

## 13. Build phases (expanded in the implementation plan)

0. **Scaffold** — Next.js + TS + Tailwind + tokens + fonts + `Header`/`Footer` + UI primitives.
1. **Content pipeline** — `scrape.mjs` + `fetch-assets.mjs`; land raw content + assets in repo.
2. **Homepage** — modernized sections (§7).
3. **Content pages** — MDX: how-it-works, about, faq (+3 sub), delivery, billing, 2 landers,
   3 notices, 4 legal.
4. **Size charts** — data-driven template + `content/size-charts/*.json`; measuring guide.
5. **Contact form** — UI + stub API.
6. **SEO & polish** — metadata, JSON-LD, sitemap/robots, redirects, 404, responsive + a11y pass.
7. **Deploy** — Vercel (or static export).

## 14. Risks / open questions

- **Scrape fidelity:** some pages embed Shopify Liquid/app widgets; hand-cleaning required. Local
  dev server (`:9292`) is the more reliable source.
- **Size-chart volume:** 50+ SKUs. Data-driven approach keeps it to one template; confirm the hub UX
  (searchable list vs. grouped by brand).
- **Logo wall links:** originally linked to `/collections/vendors?q=…`; now **display-only** (or link
  to an explainer) since there is no catalog.
- **Contact backend + hosting** deferred; final provider (Resend/Formspree) and deploy target chosen
  at API-integration time.
- **Fonts:** exact display face for headings finalized during the design-system build.

## Appendix A — Concrete data captured from the current site

- **Homepage YouTube video IDs (order):** `Hz8PK6i8ZsE`, `YEj4ai8dLk0`, `ZJUg0YhyIwU`,
  `upEzYyPL6mc`, `fh0UNC947ms`, `FuunYt_DNfI`.
- **Supplier logos (14):** Gildan, American Apparel, Bella+Canvas, M&O Knits, Champion,
  Comfort Colors, CORE365, Q-Tees, Valucap, Rabbit Skins, Jerzees, Independent Trading Co.,
  Next Level, YP Classics.
- **Testimonials (3):** Nick M., Judy M., Tim P. (5-star; text in `templates/index.json`
  Google-Reviews custom-html block).
- **Social:** Facebook `facebook.com/CheapestPrintOnDemand`, Instagram
  `instagram.com/cheapestprintondemand`, TikTok `@cheapest.print.on.demand`, YouTube `@DropShipPOD`.
- **Live nav (non-shop) links:** about-us, billing-information, check-order-status (drop), contact,
  delivery-speed, dtf-faq, free-shipping-on-orders-over-100, frequently-asked-questions-faqs,
  how-it-works, sublimation-faq; policies: privacy-policy, refund-policy, shipping-policy,
  terms-of-service.
- **Brand color seeds:** red `#cf0e0e`/`#cb1836`, navy `#1e2d7d`/`#144579`.

## Appendix B — In-scope page inventory (source URLs)

Core: `contact`, `about-us`, `how-it-works`, `delivery-speed`, `billing-information`,
`free-shipping-on-orders-over-100`.
FAQs: `frequently-asked-questions-faqs`, `dtf-faq`, `sublimation-faq`, `faq-print-on-your-own-item`.
Landers: `start-your-ecommerce-brand-without-tech-or-high-costs`,
`launch-a-fully-automated-ecommerce-brand-no-tech-needed`.
Notices: `⚠️-important-printing-notice`, `sublimation-printing-notice`, `🎨-artwork-mockup-approval`.
Sizing: `measuring` + 50+ `size-chart-*` (Gildan, Bella+Canvas, American Apparel, Comfort Colors,
Q-Tees, YP Classics, Valucap, Rabbit Skins, Jerzees, M&O, Independent Trading Co.).
Legal (`/policies/*`): `privacy-policy`, `terms-of-service`, `refund-policy`, `shipping-policy`.
