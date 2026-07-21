# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
directory.

## Repo status

This directory contains TWO things: (1) the **Next.js marketing site** (`app/`,
`components/`, `content/`, `lib/`, `public/`, `scripts/`) — this is the active codebase; see
`README.md` — and (2) a **live pull of the Shopify Horizon theme** (`assets/`, `blocks/`,
`config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`), present in this
working copy only (untracked, git-ignored — see `.gitignore`; not in git history or fresh
clones), retained locally as design/content reference until post-launch removal. Do not
develop against the theme dirs; everything below describes the Next.js app only.

## What this is

A static-first Next.js 15 marketing site for [custyapp.com](https://custyapp.com), a
faithful port of the live Shopify Horizon theme (design spec:
`docs/superpowers/specs/2026-07-21-custy-nextjs-migration-design.md`, plan:
`docs/superpowers/plans/2026-07-21-custy-nextjs-migration.md`). It's a sibling site to
`../dropship/` in this same repo, built the same way.

## No-commerce rule

This is a **pure marketing site** — no product pages, cart, checkout, search, or
collections. "Try the app" / "Install Now" CTAs link out to the Shopify app listing
(`https://apps.shopify.com/custy`, see `lib/site.ts`'s `APP_URL`). Do not add commerce
routes or components; if a page needs a storefront action, link to the app listing instead.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm test` / `pnpm test:watch` — Vitest suite
- `pnpm scrape`, `pnpm fetch-assets` — one-time migration scripts, re-runnable against
  `SCRAPE_BASE`. See `README.md`.

## Where content lives

- `content/pages/*.mdx` — support/contact page bodies (currently empty prose).
- `content/policies/*.mdx` — privacy, terms.
- `content/posts/*.mdx` + `content/posts/index.ts` — blog post bodies and registry.
- `content/{home,features,pricing,how-it-works,about}.ts` — structured lander/page data,
  including decorative `icon:` emoji fields (exempt from the no-emoji guard, see below).
- `content/raw/` — untouched scrape record. Never edit or render it directly.

## No-emoji guard

`lib/no-emoji.test.ts` fails the suite if pictographic emoji show up in rendered copy
under `content/**/*.{mdx,ts}` (excluding `content/raw/`), `components/**/*.tsx`, or
`app/**/*.tsx`. The `icon:` fields in the content data files above are exempt (decorative
gradient icon tiles ported from the live site), as are `*.test.tsx` assertions that merely
check one of those glyphs renders. All other copy — headings, body text, alt text — must
stay emoji-free; `©`/`®`/`™` are allowlisted.

## Redirects

Permanent (308) redirects from every old Shopify URL (`/pages/*`, `/policies/*`,
`/blogs/*`, dropped commerce trees like `/products/*` and `/collections/*`) are defined in
`lib/redirects.ts` and wired into `next.config.ts`.
