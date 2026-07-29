# Both-sites professional upgrade — design

**Date:** 2026-07-29
**Scope:** `custy/` and `dropship/` marketing sites in this repo.
**Client ask:** make both sites more professional and beautiful; add more pages and more
content; drive new content from what the real Shopify apps
(`../CPOD-DropShip-APP/CustyApp`, `../CPOD-DropShip-APP/DropShipPOD`) actually do; richer
homepages on both sites.

## Decision summary

Approved approach: **one design system, two phases**. Dropship adopts custy's proven
"process-ink" layout architecture with its own brand identity (Phase 1 — biggest visual
gap); custy gets content expansion and homepage depth (Phase 2). Components are
copy-adapted per site — **no shared package**; the sites stay independently deployable.

## Source of truth for feature claims

Every feature/pricing claim on either site must be true of the app code:

- **Custy app** (`CPOD-DropShip-APP/CustyApp`): shopper "Customize It" button (theme app
  extension) → storefront Design Lab → custom designs become Shopify products → merchant
  reviews orders and downloads print-ready files (vector SVG/PDF, raster PNG/JPG at a
  required DPI). Features: multi-side printing (front, back, neck tag, sleeves), per-side
  and per-part print areas, DTG/DTF/embroidery printing types with per-color-count and
  per-size-range pricing, quantity discounts (percent/fixed), color sets & size sets,
  clipart + font libraries, inventory mode (SKU/track/stop-sell), approval/disclaimer
  modal, low-DPI and out-of-bounds warnings, quote emails, "buy blank", white label + API
  access + location pricing + bulk order tools on Pro. Plans (from
  `app/config/plans.ts`, already mirrored by `custy/content/pricing.ts`): Free $0 /
  Starter $12.99 / Growth $39.99 / Pro $79.99 monthly, annual saves 20%, 30-day trial.
- **DropShipPOD app** (`CPOD-DropShip-APP/DropShipPOD`): merchant imports from a 100+ item
  supplier catalog (tees, hoodies, mugs) → sets markup % (retail = base cost + markup) →
  bulk-publishes to their Shopify store → on customer payment the order is charged to the
  merchant's saved card (Stripe) and forwarded to the supplier → tracking syncs back
  automatically. Auto vs manual-review fulfillment modes; per-order P&L (merchant total,
  CPOD cost, profit); real-time inventory sync; supplier dashboard with print-ready ZIP
  exports (DPI 72/96/150/300, SVG/PDF/PNG/JPG, shipping CSV); **no subscription — $0
  monthly, revenue is per-order base cost**; niche taxonomy in code: Athletic/College/
  Greek, Weddings & Events, Military, Sports & Teams, Religious, Fundraising & Charity,
  First Responders, Holidays; Custy cross-sell handoff ("Install Custy Free").

No invented stats, customer counts, or testimonials. Existing scraped testimonials stay.

## Phase 1 — dropship

### Visual system

Adopt the custy layout architecture, keep DropShipPOD's identity:

- Full-bleed alternating bands (white / `--color-surface` `#f7f7f8`), no boxed panels.
- Lucide icon tiles resolved from a semantic-name registry (new
  `dropship/components/icons.tsx` mirroring `custy/components/lander/icons.tsx`);
  content files hold `icon: "truck"`-style names, never inline imports, never emoji.
- Eyebrow marks and one signature hairline per page (hero): **crimson→navy duotone**
  (the analogue of custy's RainbowBar), using existing tokens `--color-brand` `#cb1836`
  and `--color-ink-deep` `#141f56`.
- Pill buttons; primary solid deep navy, accent crimson. Header/footer refreshed to match.

### Page work

| Page | Status | Content |
| --- | --- | --- |
| `/` | rebuild | Hero; import→markup→publish→auto-fulfill steps; catalog band (100+ blanks); "$0 subscription — pay per order, keep the markup" band; print-quality band (300 DPI, DTG/DTF/embroidery, vector exports); auto vs manual fulfillment; per-order profit view; Custy cross-sell; testimonials; videos; FAQ teaser; final CTA |
| `/features` | new | Feature tour: catalog import & markup engine, bulk publish, fulfillment modes, per-order P&L, tracking + inventory sync, print-ready file exports, saved-card payments |
| `/catalog` | new | Product categories (tees, hoodies, mugs, …) + the eight-niche grid from the app taxonomy |
| `/pricing` | new | The no-subscription model with a worked markup example. **Structured TS content, not MDX** (currency guard) |
| `/suppliers` | new | For print shops: dual-role app, incoming order queue, print-file ZIP exports (DPI/format options), status workflow |
| `/custy` | new | Personalization cross-sell page → custyapp.com / apps.shopify.com/custy |
| `/blog`, `/blog/[slug]` | new | Blog infra ported from custy; 4 launch posts |
| delivery, launch-automated-brand, start-your-ecommerce-brand, printing-notice, about | fill | Real prose replacing the 10–20-line stubs |

Launch blog posts (4): DTF vs DTG vs sublimation — choosing a print method; How markup
pricing works in POD dropshipping; Launching a Canadian POD brand on Shopify; Automatic vs
manual fulfillment — which to choose.

## Phase 2 — custy

### Page work

| Page | Status | Content |
| --- | --- | --- |
| `/` | expand | Add bands: print methods (DTG/DTF/embroidery), Design Lab teaser, plan highlights, DropShipPOD tie-in, FAQ |
| `/design-lab` | new | Tour of the shopper designer: multi-side printing, clipart & font libraries, DPI/out-of-bounds warnings, approval modal, quote emails, buy blank |
| `/use-cases` | new | POD stores, apparel brands, team & event merch, promo products + niche grid |
| `/dropshipping` | new | Custy × DropShipPOD integration story (supplier catalogs, imported products, merchant/supplier roles) |
| `/features` | expand | Per-method pricing (color count, size ranges), quantity discounts, inventory mode, white label + API |
| `/pricing` | expand | Full plan-comparison table + pricing FAQ (plan data already truthful — keep in lockstep with `plans.ts`) |
| support, contact MDX | fill | Real prose (currently 0 lines): how to get help, response expectations, support@custyapp.com |
| blog | expand | 3 more posts (6 total) |

New blog posts (3): How product personalization lifts average order value; Setting up
print pricing by color count and size; A merchant's guide to multi-side printing.

## Content rules (guards)

- **No emoji anywhere** — both sites already carry a `lib/no-emoji.test.ts` guard with
  no exemptions (custy's was adapted from dropship's); all new content must pass it.
- **Icons** — semantic names in content, resolved by each site's icon registry; tests
  assert `[data-icon="…"]`, never glyph text.
- **Currency (dropship)** — `content/shipping.test.ts` walks all `content/pages/*.mdx`:
  every `$` figure must be an amount declared in `content/shipping.ts` and labelled CAD
  (`billing.mdx` excluded — its currency is a deferred client question; leave untouched).
  Pricing-flavoured pages are structured TS content instead.
- **Custy no-commerce rule** — CTAs link to the Shopify app listing; no commerce routes.
- **Imagery** — reuse existing `public/` assets and CSS-built illustration; no stock-photo
  fakery, no fabricated screenshots.
- **Redirect hygiene** — custy's `lib/redirects.ts` covers old Shopify URLs; new routes
  must not collide with redirect sources on either site.

## Testing

Vitest, matching each site's existing per-component/per-page style: render tests for new
pages/components, content-integrity tests (icon names registered, plan data consistent,
niche grid complete), and all existing guards stay green and extend to new content.
TDD per the executing-plans workflow.

## Out of scope

- No commerce features, cart, or checkout on either site.
- No backend work — dropship's contact API stub stays a stub.
- No i18n.
- No shared component package between the sites.
- No changes to the legacy Shopify theme directories or to the apps themselves.
- `dropship/content/pages/billing.mdx` stays untouched (deferred currency question).
