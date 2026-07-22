# DropShipPOD — Brand Refresh, CTA Rewiring & Page Audit (Design)

- **Date:** 2026-07-20
- **Status:** Approved design → ready for implementation plan
- **Branch:** `nextjs-migration` (follows the completed Shopify→Next.js migration, final review passed)
- **Requested by:** site owner — (1) all "Get started" CTAs → Shopify app listing, (2) real logo + favicon, (3) brand-forward visual refresh of the homepage **and every other page**, (4) audit that no page was missed.

## 1. Goals

1. Every **primary CTA** links to the Shopify app listing `https://apps.shopify.com/dropshippod` (new tab).
2. The **real brand logo** (from the live site) appears in header + footer; the emblem becomes the **favicon** and the logo becomes the **OG/Twitter share image**.
3. **Brand-forward redesign**: navy/red identity applied to the homepage and — via upgraded shared shells plus per-template treatments — to **every inner page**.
4. **Completeness audit**: machine-checked proof that every in-scope page from the migration exists, is reachable from the UI (no orphans), and that nav/footer/sitemap/redirects stay mutually consistent.
5. All existing tests stay green; new behavior gets new tests.

## 2. Non-goals

- No copy rewrites beyond CTA labels (the queued content-owner questions stay queued).
- No "full Canadian identity" motif pass (declined) — the maple leaf appears only inside the logo artwork and one "Printed in Canada" trust marker.
- No new pages beyond gaps the audit uncovers; no i18n; no CMS.

## 3. CTA map (decision)

Constant `SHOPIFY_APP_URL = "https://apps.shopify.com/dropshippod"` in a new `lib/site.ts` (also exports `SITE_NAME`, `TAGLINE = "Your Brand. Your Platform."`).

| Location | Label | Target |
|---|---|---|
| Header CTA | Get started | app listing (new tab) |
| Hero primary | Get started | app listing (new tab) |
| Hero secondary | See how it works | `/how-it-works` (unchanged) |
| Dropship-pitch cards: button | Get the app | app listing (new tab) |
| Dropship-pitch cards: text link | Learn more → | lander page (kept — landers not orphaned) |
| Final CTA primary | Install the Shopify app | app listing (new tab) |
| Final CTA secondary | Contact us | `/contact` |
| New `AppCta` band on both lander pages | Install the Shopify app | app listing (new tab) |

**`ButtonLink` external handling:** when `href` starts with `http`, render a plain `<a target="_blank" rel="noopener noreferrer">` with the same classes; internal hrefs keep `next/link`. Covered by unit test.

## 4. Logo & favicon (decision)

- Source of truth: `https://dropshippod.ca/cdn/shop/files/ChatGPT-Image-Mar-1_-2026_-03_54_51-PM.png` (1188×359 RGBA, transparent; navy/red matches existing tokens) → committed as `public/images/logo.png`.
- **Header:** logo image replaces the text wordmark, `alt="DropShipPOD"` (keeps existing test contract), rendered ~200×60 max, links `/`.
- **Footer:** logo (smaller) + tagline "Your Brand. Your Platform." above the link columns.
- **Favicon:** square crop of the left emblem (t-shirt/maple-leaf/package mark, ≈ x 0–390 of the PNG) via macOS `sips` → `app/icon.png` (512×512) + `app/apple-icon.png` (180×180); replaces the placeholder `app/icon.svg`. Fallback if the crop renders poorly at 16–32px: keep the monogram SVG and note it for the owner.
- **OG image:** `openGraph.images = ["/images/logo.png"]` + `twitter.card = "summary_large_image"` in the root layout metadata.

## 5. Design tokens (added to `app/globals.css` `@theme`)

- `--color-ink-deep: #141f56` (hero/final-CTA gradient end)
- `--color-brand-tint: #fdf1f3` (red-tinted chip/callout background)
- `--color-ink-tint: #eef1f9` (navy-tinted chip/section background)
- Everything else reuses existing tokens; components are restyled **in place** (no renames, no file moves — test suite keeps its targets).

## 6. Page-by-page treatment matrix

**Homepage (per approved design):** navy gradient hero (white display type, red eyebrow, trust-marker row "Printed in Canada · No minimums · Ground shipping in 1–5 days", ring-framed featured video, dark video-strip cards) → steps with red number chips + hover lift → printing-method cards with lucide icons (Shirt/Film/Droplets) in tinted chips → logo wall as white tiles on surface band → testimonials with oversized red quote glyph + shadowed cards → dropship pitch as navy band with white cards → shipping band as bordered card with Truck icon → final CTA on the ink→ink-deep gradient.

**Shared shells (upgrade once, every page benefits):**
- `PageShell`: page-hero band — soft `ink-tint`→white gradient, optional red uppercase eyebrow, navy display h1, lede; content below on white.
- `Prose`: styled tables (bordered, striped header), rounded images with border, brand blockquote bar, tighter list rhythm, red links with hover underline.

**Per-template treatments:**
- **Content/MDX pages** (`how-it-works`, `about`, `delivery`, `billing`, `measuring`, notices): PageShell band with per-page eyebrow (e.g. "Help & info", "Printing notice"); notices additionally open with an amber alert callout strip so warnings read as warnings.
- **Landers** (2): PageShell band with eyebrow "Start a brand" + closing `AppCta` band (navy gradient, app button + contact link).
- **FAQ pages** (4): band + eyebrow "FAQs"; accordion rows get hover background, red focus ring, roomier spacing; related-FAQ links become pill buttons.
- **Size charts:** hub — band + brand sections with tile cards (hover border-brand, chart count per brand); detail — band, styled table (striped, sticky first column on mobile scroll), measuring-guide callout.
- **Contact:** band + form card (white, shadow, brand focus rings) beside info card on `surface`; success/error states restyled to match.
- **Policies** (4): quieter PageShell variant (smaller title, "Legal" eyebrow) — legal text stays sober.
- **404:** navy gradient treatment matching final CTA.
- **Header/Footer:** logo integration (above); dropdown panels get shadow-lg + rounded-xl polish; footer gets logo row + tagline over the existing columns and social row.

## 7. Completeness audit (new, machine-checked)

A new test file `lib/site-audit.test.ts` that fails if any page goes missing or unreachable:

1. **Route inventory:** every route in `STATIC_ROUTES` has a corresponding `app/**/page.tsx` (filesystem check), and `STATIC_ROUTES` still exactly matches the migration plan's 21 routes.
2. **No orphans:** every route in `STATIC_ROUTES` is reachable from the UI graph — member of `primaryNav`/`footerColumns` links, or linked from the homepage sections, or a policy page (footer Legal column). Size-chart details reachable via `/size-charts` hub (loader count = 47 = sitemap).
3. **Nav integrity hardening:** every nav/footer href ∈ `STATIC_ROUTES` (closes a final-review minor).
4. **Redirect destinations:** re-assert every static redirect destination ∈ `STATIC_ROUTES` (existing test, kept).
5. One-time manual sweep during implementation: old-site sitemap (64 pages) vs route map — confirm every in-scope page is present and each out-of-scope page has a redirect; record the resulting table in the implementation report.

## 8. Testing

- `ButtonLink`: external href renders `<a target="_blank" rel="noopener noreferrer">`; internal unchanged.
- Header/hero/final-CTA/pitch cards point at `SHOPIFY_APP_URL` (assert via imported constant, not string literals).
- Header renders the logo image with `alt="DropShipPOD"` linking `/`.
- `AppCta` renders on both lander pages.
- Site-audit suite (§7).
- Full existing suite stays green; `pnpm build` stays all-static except `/api/contact`.

## 9. Build order (for the implementation plan)

1. `lib/site.ts` + `ButtonLink` external support + CTA rewiring (+ tests)
2. Logo/favicon/OG assets + header/footer integration (+ tests)
3. Tokens + homepage section restyle
4. Shared shells (`PageShell`, `Prose`) + per-template treatments + `AppCta` on landers
5. Completeness audit suite + manual sweep table
6. Full verification (tests, build, visual pass)
