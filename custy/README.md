# Custy marketing site

Static-first Next.js 15 marketing site for [custyapp.com](https://custyapp.com) — the Custy
Shopify product customizer app. Migrated from a Shopify Online Store 2.0 theme (Horizon;
design spec: `docs/superpowers/specs/`, plan: `docs/superpowers/plans/`).

## Stack

Next.js 15 (App Router, SSG) · React 19 · TypeScript · Tailwind CSS v4 · MDX (`@next/mdx`) ·
Radix Dialog (mobile nav drawer) · react-hook-form + zod · Vitest + Testing Library · pnpm.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm test` / `pnpm test:watch` — Vitest suite
- `pnpm scrape`, `pnpm fetch-assets` — **one-time** migration scripts that pulled content
  from the running Shopify site into `content/` and `public/images/`. Kept for reference
  and re-runs against `SCRAPE_BASE` (default falls back to `https://custyapp.com`).

## Content editing

- Page bodies (support/contact): `content/pages/*.mdx` — currently empty prose; the live
  pages render only the contact form (`components/contact-form.tsx`) plus a heading.
- Policies: `content/policies/*.mdx` (privacy, terms).
- Blog posts: `content/posts/*.mdx` (bodies) + `content/posts/index.ts` (title/date/image
  registry consumed by `/blog` and `/blog/[slug]`).
- Structured lander/page data: `content/{home,features,pricing,how-it-works,about}.ts`.
  The `icon:` fields on card items are decorative emoji glyphs transcribed verbatim from
  the live site's gradient icon tiles — they're intentionally exempt from the no-emoji
  guard (`lib/no-emoji.test.ts`); everything else in `content/` must stay emoji-free.
- `content/raw/` is the untouched scrape record — don't edit or render it.

## Contact form

UI + validation are live; `app/api/contact/route.ts` is a stub that logs and returns success.
Wire Resend/Formspree there when ready (schema already shared between client and server via
`lib/contact-schema.ts`).

## Deploy

Import the repo into Vercel with **root directory set to `custy`** (build = `pnpm build`).
Point the `custyapp.com` domain at the Vercel project to launch. Permanent (308) redirects
from every old Shopify URL ship in `next.config.ts` (`lib/redirects.ts`).

## Legacy Shopify theme

`assets/ blocks/ config/ layout/ locales/ sections/ snippets/ templates/` are the old
Shopify Horizon theme, present in this working copy only (untracked, git-ignored) — not in
git history or fresh clones; retained locally as reference until post-launch removal. Do
not develop against them; see `CLAUDE.md`.
