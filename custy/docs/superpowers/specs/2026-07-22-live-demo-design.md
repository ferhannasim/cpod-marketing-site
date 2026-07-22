# Live Demo — homepage section + `/live-demo` page

**Date:** 2026-07-22
**Status:** Approved

## Goal

Let visitors try the Custy product editor without installing the app: a "demo
products" band on the homepage and a `/live-demo` page that embeds the hosted
editor in an iframe with a product switcher.

## Demo products

Three products, each with a name, a hosted-editor URL, and a product image
(downloaded once from the Shopify CDN `_430x` variants to `public/images/demo/`):

| Slug | Name | Editor URL |
| --- | --- | --- |
| `apron-full-length-no-pockets` | Apron Full Lengh No Pockets | `https://product-editor-app-393012399860.us-central1.run.app/customize/11083839111204` |
| `hoodies-70-30-cotton-polyester` | Hoodies 70/30 Cotton-Polyester 22.5 oz | `https://product-editor-app-393012399860.us-central1.run.app/customize/11083861360676` |
| `long-sleeve-t-shirt-midweight-cotton` | Long Sleeve T-shirt Midweight Cotton 8.8 oz | `https://product-editor-app-393012399860.us-central1.run.app/customize/11083917918244` |

Product names are kept verbatim from the source data (including "Lengh").
Slug order above is display order; the apron is the default product.

## Architecture

### `content/demo-products.ts` (new)

Single registry both surfaces read:

```ts
export type DemoProduct = {
  slug: string;
  name: string;
  editorUrl: string;
  image: ImageField; // local /images/demo/* asset, real intrinsic dimensions
};
export const demoProducts: DemoProduct[]; // display order, [0] is the default
```

`ImageField` is reused from `content/home.ts`. Adding a product later is one
entry here plus one image file.

### Homepage section — `components/sections/demo-products.tsx` (new)

Follows the `BlogTeasers` band pattern: `<section className={scheme}>` +
`Container`, centered header (tri-dot `Eyebrow` "Live demo", h2 "Try Custy on
real products"), then a 3-up card grid (`sm:grid-cols-3`). Each card: product
image (`next/image`), product name, and a "Try it live" pill CTA linking to
`/live-demo?product=<slug>`. The whole card is clickable; no external links
from the homepage.

Placement in `app/page.tsx`: after `StepsTeaser` (what it is → features → how
it works → try it yourself). Scheme alternation re-flipped downstream so no two
adjacent bands share a background:

intro `1` → features `2` → steps `1` → **demo `2`** → why-custy `1` →
pricing `2` → trust `1` → faq `2` → blog `1` → closing CTA container.

### Live Demo page — `app/live-demo/page.tsx` (new)

Server component: exports `metadata` (title "Live Demo — try the Custy product
customizer"), awaits Next 15's `searchParams` promise, resolves
`?product=<slug>` against the registry (missing/unknown slug → first product),
and renders header copy plus the client explorer.

### `components/live-demo/demo-explorer.tsx` (new, `"use client"`)

Props: `initialSlug`. State: selected slug, picker-modal open flag.

*(Amended 2026-07-22, same day: the original right-sidebar layout was replaced
so the editor gets the full width — the iframe now spans a dedicated
`max-w-[1440px]` wrapper outside the 1100px `Container`.)*

- **Editor:** the iframe fills the explorer's full width — `src` is the
  selected product's `editorUrl`, `title` is the product name, ~`70vh` tall,
  rounded border consistent with existing panels, `allow="fullscreen"`.
  Keyed by slug so switching products remounts the frame cleanly.
- **Switcher (md+):** a centered strip above the iframe — one button per
  product, thumbnail + name, active product highlighted (ink border,
  `aria-pressed`). Clicking selects the product and syncs the URL via
  `window.history.replaceState` (shallow update) so links stay shareable.
- **Switcher (mobile):** the strip collapses to a bar showing the selected
  product's name plus a "Choose a product" button that opens a full-screen
  picker modal (same overlay pattern as the header's mobile menu) listing the
  same product buttons; picking one selects it and closes the modal, and an X
  button closes without changing anything.
- Under the iframe: an "Open in a new tab" external link to the raw editor URL.

### Wiring

- `lib/nav.ts`: "Live Demo" (`/live-demo`) added to `headerNav` after
  Features, and to the footer Explore column.
- `app/sitemap.ts`: `/live-demo` entry added.
- No redirects change (no old Shopify URL maps to this page).

## Error handling

- Unknown or absent `?product=` falls back to the first product — the page
  never 404s on a bad slug.
- If the hosted editor is down the iframe shows the provider's error; the
  "Open in a new tab" link remains as an escape hatch. No custom error UI.

## Testing

Vitest + Testing Library, matching repo convention:

- `components/sections/demo-products` renders three cards, each linking to
  `/live-demo?product=<slug>`, plus the section heading.
- `app/live-demo/page` defaults to the first product with no/unknown query,
  honors a valid `?product=`, and renders the switcher; clicking a switcher
  button swaps the iframe `src` to that product's editor URL.
- Homepage test updated for the new section; header/footer nav tests updated
  for the new link.
- The existing no-emoji guard already covers all new files.
