# DropShipPOD marketing site

Static-first Next.js 15 marketing site for [dropshippod.ca](https://dropshippod.ca) — the
DropShipPOD print-on-demand dropshipping service and Shopify app. Migrated from a Shopify
Online Store 2.0 theme (design spec: `docs/superpowers/specs/`, plan: `docs/superpowers/plans/`).

## Stack

Next.js 15 (App Router, SSG) · React 19 · TypeScript · Tailwind CSS v4 · MDX (`@next/mdx`) ·
Radix Accordion · react-hook-form + zod · Vitest + Testing Library · pnpm.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm test` — Vitest suite
- `pnpm scrape`, `pnpm scrape:size-charts`, `pnpm fetch-assets` — **one-time** migration
  scripts that pulled content from the running Shopify site into `content/` and `public/images/`.
  They are kept for reference and re-runs against `SCRAPE_BASE` (default `http://127.0.0.1:9292`,
  falls back to the live site).

## Content editing

- Page bodies: `content/pages/*.mdx` (titles/descriptions in the matching `app/**/page.tsx`).
- FAQs: `content/faqs/*.tsx` · Size charts: `content/size-charts/*.json` (rendered by one template).
- Homepage data: `content/{videos,logos,testimonials,steps}.ts`.
- `content/raw/` is the untouched scrape record — don't edit or render it.

## Contact form

UI + validation are live; `app/api/contact/route.ts` is a stub that logs and returns success.
Wire Resend/Formspree there when ready (schema already shared between client and server).

## Deploy

Import the repo into Vercel (defaults work; build = `pnpm build`). Point the `dropshippod.ca`
domain at the Vercel project. 301 redirects from every old Shopify URL ship in
`next.config.ts` (`lib/redirects.ts`).

## Legacy Shopify theme

`assets/ config/ layout/ locales/ sections/ snippets/ templates/` are the old Shopify theme,
kept as reference until after launch. Do not develop against them; see `CLAUDE.md`.
