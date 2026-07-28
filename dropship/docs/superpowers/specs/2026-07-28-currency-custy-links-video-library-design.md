# Currency labels, Custy cross-links, video library

**Date:** 2026-07-28
**Status:** Approved
**Scope:** `dropship/` only

## Goal

Deliver the three client-assigned items that need no further client input:

1. Label every money figure with its currency, and fix a live contradiction in the
   free-shipping threshold.
2. Make Custy reachable from the DropShipPOD site (nav, footer, homepage section).
3. Publish a video library page.

Five further client asks are **out of scope here** and remain blocked on client data —
see [Deferred](#deferred).

## Background: the currency finding

The client reported "Shopify listing says charges are in USD; all documents say CAD —
needs fixing." Investigation shows nothing needs converting. Two different currencies are
both correct, for two different things:

| Thing | Currency | Current state |
| --- | --- | --- |
| Shipping and storefront figures | **CAD** | Unlabelled — bare `$` everywhere |
| App / service charges on the Shopify listing | **USD** | Correct on the listing |

Confirmed against the live storefront <https://cheapestprintondemand.ca/>: `$199` free
shipping, a Dollard QC warehouse, Canadian provincial shipping zones, and no explicit
currency label on any figure.

The defect is therefore **missing labels, not wrong numbers**. A merchant reads `$199`,
is later charged in USD, and has no way to reconcile the two. The fix is to label both
sides. No figure changes value.

**Separately, a real bug:** `content/faqs/general.tsx:613` states free shipping over
`$150`, contradicting the `$199` stated in ten other places across six files. This is
drift caused by the same number being copy-pasted; it is fixed as part of this work.

## 1. Currency labels

### `content/shipping.ts` (new)

Single source of truth for the five distinct shipping figures.

```ts
export const SHIPPING_CURRENCY = "CAD";
export const FREE_SHIPPING_THRESHOLD = 199;
export const SECURE_SHIPPING_FEE = 5.99;

export type ShippingRate = { provinces: string[]; amount: number };
export const shippingRates: ShippingRate[] = [
  { provinces: ["ON", "QC", "NB", "NS", "NL", "PE"], amount: 14.99 },
  { provinces: ["AB", "SK", "MB"], amount: 19.99 },
  { provinces: ["BC"], amount: 24.99 },
];

export function money(amount: number): string;
```

`money()` renders `$199 CAD` for whole numbers and `$14.99 CAD` for fractional ones — no
`$199.00 CAD`.

The constant is named `SHIPPING_CURRENCY`, not `CURRENCY`, so that app pricing (USD)
cannot later be rendered through it by mistake. This naming is the guard against
re-creating the exact confusion this work exists to fix.

### Call sites rendered from `shipping.ts`

These are already code, so they read the module directly:

| File | Change |
| --- | --- |
| `content/faqs/general.tsx` ~574–595 | "How much does shipping cost?" renders threshold + `shippingRates` |
| `content/faqs/general.tsx:613` | "Do you offer free shipping?" — `$150` replaced by `FREE_SHIPPING_THRESHOLD` |
| `content/faqs/general.tsx:912` | `$5.99` becomes `money(SECURE_SHIPPING_FEE)` |
| `components/sections/shipping-band.tsx:17` | `money(FREE_SHIPPING_THRESHOLD)` |
| `app/(marketing)/delivery/page.tsx:7` | metadata description interpolates the threshold |
| `app/page.test.tsx:28` | assertion updated to expect the CAD label |

### Files left as prose

`content/pages/policies/shipping.mdx` (6 figures) and `content/pages/delivery.mdx`
(2 figures) stay plain MDX with `CAD` written inline. No `import` is added to either.

Rationale: these are client-editable copy. MDX v3 would support importing
`shipping.ts`, but that trades the client's ability to edit prose for a guarantee the
guard test below provides more cheaply.

### `content/shipping.test.ts` (new)

Scans the two MDX files above and fails when either invariant breaks:

- Every `$<number>` found is a value declared in `shipping.ts` — that is, the threshold,
  the secure-shipping fee, or one of the three provincial rates. Catches a stray `$150`
  reappearing.
- Every `$<number>` is immediately followed by `CAD` — catches an unlabelled figure.

This keeps the MDX ignorant of the TS module while still catching drift in CI rather
than by a customer.

## 2. Custy cross-links

### Constraint discovered

`lib/site-audit.test.ts:42` asserts *"every nav and footer href is a known static
route"*, and dropship's `NavLink` type has no `external` flag — unlike Custy's own
`lib/nav.ts`, which does. An outbound link in the nav fails this test today.

### Changes

- **`lib/nav.ts`** — add `external?: boolean` to `NavLink`, matching Custy's shape. Add a
  `Custy` entry to `primaryNav` and to the footer **Company** column, both pointing at
  `CUSTY_SITE_URL`.
- **`lib/site.ts`** — add `CUSTY_SITE_URL = "https://custyapp.com"` and
  `CUSTY_APP_URL = "https://apps.shopify.com/custy"`.
- **`components/header.tsx`, `components/footer.tsx`** — render entries with
  `external: true` as `<a target="_blank" rel="noopener noreferrer">` instead of
  `next/link`.
- **`lib/site-audit.test.ts`** — the known-route assertion skips external links. Route
  count is untouched by this section; no new route is added.
- **`components/sections/custy-pitch.tsx`** (new) — homepage section, placed in
  `app/page.tsx` between `DropshipPitch` and `ShippingBand`. It rides the existing
  "here's the wider platform" beat rather than interrupting the primary funnel.
  Primary CTA → `CUSTY_APP_URL`; secondary link → `CUSTY_SITE_URL`.

Link targets follow the agreed split: nav and footer point at the marketing site, the
homepage section's CTA points at the app listing.

Copy is written fresh for this section and must stay emoji-free — `lib/no-emoji.test.ts`
covers `components/**/*.tsx`. Icons come from `lucide-react`, as elsewhere in the site.

`lib/redirects.ts:33` (`/pages/custydesignlab` → `/`) is **left unchanged**, per decision.

## 3. Video library

A plain responsive grid at `/videos`. No search: the library holds six videos, and search
over six items is friction, not help. Revisit if the client supplies a substantially
longer list.

- **`app/(marketing)/videos/page.tsx`** (new) — grid reusing `components/video-embed.tsx`
  unchanged. All six thumbnails already exist in `public/images/videos/`.
- **`content/videos.ts`** — add an `allVideos` export combining `featuredVideo` and
  `moreVideos`. Existing exports stay, so `components/sections/hero.tsx` is untouched and
  the page and hero cannot drift apart.
- **`lib/routes.ts`** — add `/videos`, taking `STATIC_ROUTES` from 21 to 22.
- **`lib/site-audit.test.ts:25`** — inventory assertion bumped 21 → 22.
- **`lib/nav.ts`** — link added to the footer **Resources** column and the **Help & FAQs**
  nav group, which is where how-to content already lives. Required regardless: the audit
  test forbids orphan routes.

## Deferred

Blocked on client answers, not started here:

| Item | Blocker |
| --- | --- |
| Product catalogue with base costs | No catalogue data exists in the repo. Needs source data and a static-vs-live decision. |
| Production / turnaround times | Only a vague "24-72 hours" in `about.mdx`. Needs real per-method or per-product numbers. |
| `billing.mdx` currency labels | The page lists "Shipping cost" as a merchant charge, and shipping is the one figure quoted in CAD. Client must say whether a merchant's shipping charge is billed CAD or converted to USD. A partially-correct currency statement on a billing page is worse than none, so the file is untouched. |
| "Start Here" page, three paths | The three paths are undefined. Guessing wastes the page. |
| Searchable video library | Superseded by the simple grid above unless a longer video list arrives. |

Not repo work at all, and owned by the client or the account holder:

- Editing the DropShipPOD Shopify App Store listing to state USD explicitly.
- Custy's App Store listing and its discoverability (title, keywords, category). Copy can
  be drafted here; publishing happens in the Shopify Partner dashboard.

## Verification

- `pnpm test` — existing suite plus the new `content/shipping.test.ts`; the site audit
  must pass with the updated route count and external-link handling.
- `pnpm build` — clean.
- Manual: `/videos` renders and each video opens its lightbox; the Custy nav, footer, and
  homepage links open the right targets in a new tab; no bare `$` figure remains on `/faq`,
  `/delivery`, `/policies/shipping`, or the homepage shipping band.
