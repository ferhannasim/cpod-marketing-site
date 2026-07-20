# CLAUDE.md

> **Repo status (2026-07):** This repo now contains TWO things: (1) the **Next.js marketing
> site** at the repo root (`app/`, `components/`, `content/`, `lib/`, `public/`, `scripts/`) —
> this is the active codebase; see `README.md` — and (2) the **legacy Shopify theme**
> (`assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`),
> present in this working copy only (untracked, git-ignored) — not in git history or fresh
> clones; retained locally as reference until post-launch removal. Everything below this note
> describes the legacy theme only.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Shopify Online Store 2.0 theme powering a **print-on-demand / custom-printing storefront** (brand "InstaCustoms", instacustoms.com; repo name `cpod-marketing-site`). It is built on the **Warehouse** theme by **Maestrooo, v2.8.2** (see `config/settings_schema.json` → `theme_info`), heavily extended for product customization (design tools, DTG/DTF/sublimation printing, banners/signage).

There is **no build system** — no `package.json`, bundler, or task runner. The repo *is* the deployable theme. Standard Shopify directory layout: `layout/`, `sections/`, `snippets/`, `templates/`, `assets/`, `config/`, `locales/`.

## Commands

Work is done with the **Shopify CLI** (the canonical tool for OS 2.0 themes); the store connection is not committed, so pass it explicitly the first time:

```bash
shopify theme dev --store <your-store>.myshopify.com   # local dev server + hot reload
shopify theme check                                     # lint Liquid/JSON (Theme Check; no config committed, uses defaults)
shopify theme pull                                      # pull editor-side changes (settings_data.json, etc.) back down
shopify theme push --unpublished                        # push to a new unpublished theme to preview safely
shopify theme push --theme <id>                         # push to a specific existing theme
```

There are no automated tests. Verification is manual in the browser / theme preview.

## Architecture

### Vendored bundle vs. your code — this is the most important distinction
- `assets/theme.js` (~640KB, minified, ~18.7k lines) and `assets/theme.css` (~320KB) are the **compiled Maestrooo theme**. Treat them as vendored: do not hand-edit them to add features — edits are unmaintainable and lost on any theme update.
- `assets/custom.js` is the **intended entry point for all site-specific JavaScript**. Its header documents the theme's public event API. Add behavior here.

### JS extension API (how to hook the theme instead of forking it)
The theme dispatches/accepts DOM CustomEvents on `document` / `document.documentElement`:
- `variant:changed` — fires on product variant change; `event.detail.variant` is the full variant. (`custom.js` already listens to this to drive per-color/size metafield display.)
- `product:added` — dispatch with `detail.quantity` after an app adds to cart, to make the theme re-render the mini-cart.
- `cart:refresh` — dispatch to force a mini-cart refresh without adding anything.

Globals exposed from `layout/theme.liquid` for scripts: `window.theme` (pageType, cartCount, money formats, cart/search settings), `window.routes` (cart/search/recommendation URLs), `window.languages` (translated UI strings).

### Section hydration pattern
Sections render a root element with `data-section-type="<name>"` and a `data-section-settings='{...json...}'` attribute (see `sections/main-product.liquid`). `theme.js` registers a JS controller per section type and hydrates matching elements on load. 48 of 57 sections use this. To attach JS behavior to a section, key off its `data-section-type`.

### Templates & template suffixes
OS 2.0 `templates/*.json` map a page to a section + block tree (editable in the theme editor). **Template suffixes are the primary mechanism for special-behavior pages** and drive the POD flows below. Notable suffixes: `product.pre-order`, `product.quick-view`, `product.contact`, `product.drinkware`, `product.sublimation-product`, `collection.brand`, `collection.poc`, `page.design-panel`, `page.size-chart`. Some suffix templates are raw `.liquid` (not JSON) specifically to inject third-party scripts.

### Product customization & apps (the domain core)
Customization is delivered through **custom `.liquid` suffix templates and third-party apps**, not native theme UI:
- **ImprintNext** designer — `templates/product.imprint_designer.liquid` / `product.imprint_redirect.liquid` load the designer from `cloud.imprintnext.io` with separate mobile/desktop asset sets and an embedded token; they rewrite the URL with `?id=<product.id>&key=<token>`.
- **All-in-One Designer (aiod) / csapps** — `templates/cart.aiod_proxy.liquid` uses `{% layout none %}` to return a JS payload that populates `window.csapps`. `snippets/cscode_discount.liquid` and `revy-discounts-script.liquid` build the full `window.csapps` context (cart/product/collection) for a **Revy discounts** app.
- **InkyBay** product designer — `assets/inkybay_designPanel.css`; `snippets/mini-cart.liquid` detects customized line items by variant title containing `customization_id` / `inkybay_option_id` and locks their quantity controls.
- Other integrated apps via suffix templates: `product.simplyInsurance` (shipping insurance), `page.flashify_flashsale` (flash sale), plus an upsell popup (`assets/upsell_pupop.css`).
- Printing-domain snippets carry the business logic: `available-printing-methods-productpage`, `printing-method-rating`, `printing-faq-popup`, `dtf-sheet-features-icons` (DTF), `popups-simon-dtg` (DTG), `product-file-prep`, `product-attribute-gauges`.

### i18n
9 locales in `locales/`; `en.default.json` is the source of truth. All Liquid uses the `| t` translation filter — add UI strings to the locale files, not inline. `fr.json` is much larger because it carries extra custom French content.

### Config files (mind which are machine-owned)
- `config/settings_schema.json` — theme setting definitions, including **custom business fields** the merchant added (e.g. `aframe_banners_title/_desc`, `rollupbanner_title/_desc` for signage SEO).
- `config/settings_data.json` — current setting values; **managed by the theme editor**. Prefer `shopify theme pull` over hand-editing.
- `config/markets.json` — **auto-generated**; do not hand-edit (header says so).

## Conventions & gotchas
- **Custom SEO/business hacks live in `layout/theme.liquid`**: a hardcoded Organization JSON-LD block for InstaCustoms; special `<title>`/meta-description overrides for `signage` collections tagged `aframe_banners` or `Roll Up Banners` (values pulled from the custom theme settings above); and a jQuery `$(document).ready` hack rewriting `/fr#` anchor hrefs. Check here before debugging unexpected head/SEO output.
- **jQuery 3.7.1 (blocking, in `<head>`) and Font Awesome 4.7 are added from CDNs** on top of the base theme. The base Maestrooo theme is vanilla JS — jQuery exists only for the custom additions.
- `snippets/product-design-buttons.liquid` (links to a `custydesignlab` page by product id) is **not rendered anywhere** in the theme — it's injected by an app or manual edit; treat it as orphaned unless you find the injection point.
- `layout/theme.bak1.liquid` is a **stale backup**, not a real alternate layout. Only `theme.liquid`, `password.liquid`, and `gift-card.liquid` are active layouts.
- The theme was committed as a single initial import; most files are still untracked in git. Expect a large first diff and no meaningful history to lean on.
