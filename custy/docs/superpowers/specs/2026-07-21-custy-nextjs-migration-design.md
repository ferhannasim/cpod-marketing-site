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
  Blog index + 3 posts, policies (Privacy, Terms — both footer-linked), 404.
- **Dropped:** all 15 demo products, `/collections/*`, `/cart`, `/search`,
  `/pages/custydesignlab` (the product-editor iframe page — confirmed nothing depends on
  it), and `/policies/contact-information` (unlinked; redirects to `/contact`). All
  dropped URLs get permanent redirects (see Redirects).

### Page kinds (discovered from the live site)

Features, Pricing, How-it-works, and About-us are **hand-built HTML landing pages**: each
page body is a `div.custy-*-page` root (`custy-features-page`, `custy-pricing-page`,
`custy-how-page`, `custy-about-page`) inside a `.shopify-block.rte`, with one scoped
`<style>` block per page defining a shared design language (`--custy-blue: #17b6f4`,
`--custy-pink: #ec008c`, `--custy-yellow: #ffd400`, `--custy-dark: #1c1c1c`,
`--custy-text: #4b4b4b`, `--custy-light: #f8fafc`, `--custy-border: #eceff3`,
`--custy-radius: 24px`). Per the dropship playbook these are **rebuilt as React/Tailwind
components** with per-page structured content data — not shipped as raw HTML — matching
the current look (faithful port). Support, Contact, policies, and blog posts are prose →
MDX via the scrape pipeline.

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
- **Accent palette** (from the lander pages' shared scoped CSS): blue `#17b6f4`, pink
  `#ec008c`, yellow `#ffd400`, dark `#1c1c1c`, text gray `#4b4b4b`, light `#f8fafc`,
  border `#eceff3`, lander card radius 24px.
- **Container:** narrow page width (Horizon "narrow" ≈ 1000–1100px content column);
  landers use their own 1450px max width.
- Encoded as Tailwind v4 theme variables in `app/globals.css`.

## Content pipeline

One-time scrape scripts in `scripts/` (adapted from dropship's, pointed at
`custyapp.com`, `SCRAPE_BASE` overridable):

- Landers (features, pricing, how-it-works, about-us) → raw HTML + scoped CSS captured
  to `content/raw/<slug>.html`, then hand-rebuilt as components + per-page content data
  in `content/*.ts`.
- Prose pages (support, contact) → `content/pages/*.mdx`; policies →
  `content/policies/*.mdx` (Horizon text-block / `shopify-policy__body` extraction).
- Blog posts → `content/posts/*.mdx` with frontmatter (title, description, date, image)
  from `h1`, `<time datetime>`, and `.blog-post-content.rte`.
- Live `<title>`/meta-description per page → `content/raw/meta.json` (source for each
  route's `metadata`).
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
| `/policies/privacy` `/policies/terms` | `/policies/privacy-policy`, `/policies/terms-of-service` MDX |
| `not-found.tsx` | static 404 |

## Redirects (permanent 308, `lib/redirects.ts` → `next.config.ts`)

- `/pages/<slug>` → `/<slug>` for the six migrated pages.
- `/policies/privacy-policy` → `/policies/privacy`; `/policies/terms-of-service` →
  `/policies/terms`; `/policies/contact-information` → `/contact`.
- `/blogs/custy-blog` → `/blog`; `/blogs/custy-blog/:slug` → `/blog/:slug`.
- `/products/:path*` → `https://apps.shopify.com/custy`.
- `/collections/:path*`, `/cart`, `/search`, `/pages/custydesignlab` → `/`.

## Components

Built fresh to match Horizon (near-zero visual overlap with dropship): `Header` (logo,
nav, "Install Now on Shopify" CTA, mobile drawer), `Footer` (menus, policy links, social
icons), `Hero`, `Section` wrapper carrying the color-scheme backgrounds,
`MediaWithContent` (image/text split rows), `BlogPostCard`, `Button` (pill primary /
outline secondary), MDX prose styling — plus a **lander component family** replicating
the shared `custy-*` design language of the four landing pages (hero with rainbow accent
bar, eyebrow label, highlight/feature cards, section headings, step rows, pricing table,
CTA band). No cart, search, or product components.

## Navigation (captured from the live site)

- **Header:** How it Work · Pricing · Features + CTA "Install Now on Shopify" →
  <https://apps.shopify.com/custy>. (Login/"Continue shopping" links dropped.)
- **Footer:** Privacy Policy, Terms of Service · How it Work, Pricing, Features,
  Install Now on Shopify · About Us, Contact Us. (Search link and "Powered by Shopify"
  dropped; dead `#` FAQ link dropped.)
- **Social:** facebook.com/CustyAPP, instagram.com/CustyAPP, youtube.com/@CustyAPP,
  tiktok.com/CustyAPP, x.com/CustyAPP.

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
