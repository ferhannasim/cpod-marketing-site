# Custy professionalize pass — design

**Date:** 2026-07-21 · **Status:** approved · **Branch:** `nextjs-migration`
**Follows:** `2026-07-21-custy-nextjs-migration-design.md` (faithful port, complete). The
faithful-port constraint is now lifted by the owner: same brand/theme, professional
proportions and composition.

## Goals

1. Site-wide: the ported design's type and spacing read oversized; tighten to a
   professional SaaS scale while keeping the brand (Inter, white/black + gray schemes,
   accent blue `#17b6f4` / pink `#ec008c` / yellow `#ffd400`, rainbow bar, pill CTAs).
2. Homepage: remove the demo-product grid; recompose with useful sections (features,
   how-it-works teaser, pricing teaser, FAQ, CTA band).
3. Per-page: how-it-works and pricing read "too big / too much"; condense without
   dropping any feature, claim, or price.
4. Copy: **polish + fix errors** license — fix typos (nav "How it Work" → "How it
   Works"), tighten long/repetitive paragraphs; every claim, feature, price, and
   message stays. No invented facts.

## Non-goals

- No brand change (colors, font family, logo, button shapes stay).
- No route/redirect changes; no new pages.
- No commerce; contact API stays a stub.

## Part 1 — Site-wide scale (design-system-first)

Change at the source so every page inherits:

- **Type scale (desktop / mobile):** page h1 `clamp(1.875rem, 4vw, 2.375rem)` (30→38px);
  section h2 26–28px; card/step h3 17px; body 15px; lander lead 16–17px; prose 15.5px;
  eyebrow 12px uppercase. Line-heights tightened accordingly (h1 ~1.15, body 1.6).
- **Density:** `Lander` max width 1450→1200px; section vertical padding ~halved to
  56–72px; card padding reduced; `--radius-lander` 24→16px; icon tiles 58→44px;
  pricing price type 44→32px; pill buttons one size down (`px-5 py-2.5 text-sm`).
- **Header:** slimmer bar, logo rendered ~44px tall, 14px nav links, CTA small pill.
- **Footer:** tighter spacing, 14px links.
- **Nav labels:** "How it Work" → "How it Works" (header + footer; routes unchanged).
- Token changes live in `app/globals.css`; component changes in `components/lander/*`,
  `components/{header,footer,button,container,prose}.tsx`, section components.

## Part 2 — Pages

### Homepage (recomposed; demo grid removed)

Order: 1) tight hero — existing h1 "Powerful Product Customization for Shopify POD
Stores", lead trimmed, Install CTA + secondary; 2) **Feature highlights** — the first 6
key-feature cards from `content/features.ts` in source order (icons kept), link →
`/features`; 3) **How-it-works
teaser** — first 4 steps compact strip, link → `/how-it-works`; 4) media-with-content
kept, copy trimmed; 5) **Pricing teaser** — 4 mini plan cards (name, price/period,
one-line pitch from each plan's existing copy), link → `/pricing`; 6) **FAQ** — the 4
real Q&As from `content/pricing.ts`, native `<details>` accordion (no client JS);
7) blog teasers kept; 8) **CTA band** (existing closing copy tightened).
`content/home.ts` gains typed slices for the new sections (sourced from existing
content files — import, don't duplicate, where practical); demo slice deleted.

### How-it-works

Compact hero; 7 steps as denser numbered rows (smaller numerals, reduced padding);
5 why-cards in a tighter grid; slim CTA band. Longest step paragraphs tightened.

### Pricing

Slim header; condensed plan cards (32px price, tighter feature-list line-height —
all 45 features and all prices kept); FAQ tightened; bottom disclaimer kept.

### Features / About

Inherit the new scale automatically; trim the longest paragraphs; no structural change.

### Blog, policies, support, contact

Inherit Prose/header/footer changes only.

## Testing

- Copy-pinning assertions updated in lockstep where copy is polished (same files, same
  test intent); structural, a11y, link-integrity, JSON-LD, sitemap, and emoji-guard
  tests unchanged and must stay green.
- Homepage test updated for the new composition: asserts h1, one feature-card title, a
  step title, a plan name + price, an FAQ question, blog teasers, CTA band — and that
  the demo grid is gone (no "Test Our App on Demo Product").
- `pnpm build` stays fully static (except `/api/contact`).

## Error handling

No new runtime surfaces. FAQ uses native `<details>` — no JS failure modes.
