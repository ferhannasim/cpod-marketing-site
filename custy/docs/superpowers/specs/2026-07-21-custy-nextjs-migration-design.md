# Custy Next.js migration — design

**Date:** 2026-07-21 · **Status:** approved · **Branch:** `nextjs-migration`

Migrate the Custy marketing store ([custyapp.com](https://custyapp.com), Shopify Horizon
3.5.1 theme, live pull in `custy/`) to a static-first Next.js marketing site, replicating
the approach used for `dropship/`.

## Goals & scope

- **Pure marketing site.** No commerce: no product pages, cart, checkout, search, or
  collections. "Try the app" CTAs link to the Shopify app listing
  (<https://apps.shopify.com/custy>).
- **Faithful port** of the current Horizon design — same layout, colors, typography.
  A visual refresh is explicitly out of scope.
- **Pages migrated:** Home, Features, How it works, Pricing, About us, Support, Contact,
  Blog index + 3 posts, 404.
- **Dropped:** all 15 demo products, `/collections/*`, `/cart`, `/search`, and
  `/pages/custydesignlab` (the product-editor iframe page — confirmed nothing depends on
  it). All dropped URLs get permanent redirects (see Redirects).

## Architecture

**Stack** (mirrors dropship): Next.js 15 App Router, fully static (SSG), React 19,
TypeScript, Tailwind CSS v4, MDX via `@next/mdx`, react-hook-form + zod, Vitest +
Testing Library, pnpm.

**Layout:** the app lives at the `custy/` root — `app/`, `components/`, `content/`,
`lib/`, `public/`, `scripts/`. The Shopify theme dirs (`assets/`, `blocks/`, `config/`,
`layout/`, `locales/`, `sections/`, `snippets/`, `templates/`) are removed from git
(`git rm --cached`) and gitignored, kept on disk as local reference until post-launch
removal — same convention as `dropship/`.

## Design tokens (from `config/settings_data.json`)

- **Type:** Inter throughout — body 400, subheadings 500, headings/accent 700 — loaded
  with `next/font`. h1–h4 use heading weight, h5–h6 subheading weight.
- **Color schemes** (section backgrounds): scheme-1 white `#ffffff`, scheme-2 gray
  `#f5f5f5`, scheme-3 sage `#eef1ea`, scheme-4 ice blue `#e1edf5`, scheme-5 dark `#333333`
  (white foreground). Foreground: `#000000` headings, `#000000cf` body. Primary buttons:
  black bg, pill radius 25px, no border. Secondary: 1px border, radius 14px. Inputs:
  1px border, radius 4px. Cards: radius 4px.
- **Container:** narrow page width (Horizon "narrow" ≈ 1000–1100px content column).
- Encoded as Tailwind v4 theme variables in `app/globals.css`.

## Content pipeline

One-time scrape scripts in `scripts/` (adapted from dropship's, pointed at
`custyapp.com`, `SCRAPE_BASE` overridable):

- Marketing pages → `content/pages/*.mdx` (body) + titles/descriptions in each
  `app/**/page.tsx`.
- Blog posts → `content/posts/*.mdx` with frontmatter (title, description, date, image).
- Images → `public/images/`, referenced with `next/image`.
- Homepage structured data (hero copy, feature cards, blog teasers) → `content/*.ts`.
- `content/raw/` holds the untouched scrape record — never edited or rendered.

## Routes

| Route | Source |
|---|---|
| `/` | rebuild of `templates/index.json` sections |
| `/features` `/how-it-works` `/pricing` `/about-us` `/support` `/contact` | `/pages/*` MDX |
| `/blog` | blog index (`/blogs/custy-blog`) |
| `/blog/<slug>` | 3 articles |
| `not-found.tsx` | static 404 |

## Redirects (permanent 308, `lib/redirects.ts` → `next.config.ts`)

- `/pages/<slug>` → `/<slug>` for the six migrated pages.
- `/blogs/custy-blog` → `/blog`; `/blogs/custy-blog/:slug` → `/blog/:slug`.
- `/products/:path*` → `https://apps.shopify.com/custy`.
- `/collections/:path*`, `/cart`, `/search`, `/pages/custydesignlab` → `/`.

## Components

Built fresh to match Horizon (near-zero visual overlap with dropship): `Header` (logo,
nav, "Install app" CTA, mobile drawer), `Footer` (menus, policy links, social icons),
`Hero`, `Section` wrapper carrying the color-scheme backgrounds, `FeatureCard`,
`MediaWithContent` (image/text split rows), `BlogPostCard`, `Button` (pill primary /
outline secondary), MDX prose styling. No cart, search, or product components.

## Contact form

Same pattern as dropship: client form with react-hook-form + zod;
`app/api/contact/route.ts` validates with the shared schema, logs, returns success.
Real provider (Resend/Formspree) wired later.

## SEO

Per-page `metadata` mirroring live titles/descriptions, OG image, `app/sitemap.ts`,
`app/robots.ts`, Organization JSON-LD sitewide + Blog/Article JSON-LD on posts.

## Testing

Vitest + Testing Library (config copied from dropship): contact schema tests,
redirect-map tests, render smoke tests per route, content emoji-guard test.

## Deploy

Vercel project with root directory `custy`, build `pnpm build`. Launch = point
`custyapp.com` DNS at Vercel; until then the live Shopify store is untouched.

## Error handling

- Scrape scripts fail loudly on non-200s and write nothing partial.
- Contact API returns 400 with field errors on invalid payloads (shared zod schema).
- Unknown routes render the ported 404 page.
