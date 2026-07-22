# Custy Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild custyapp.com (Shopify Horizon theme) as a static-first Next.js marketing site in `custy/`, faithful to the current design, with all commerce dropped.

**Architecture:** Next.js 15 App Router, fully static. Scrape scripts pull live content into `content/` (raw record + hand-cleaned MDX/TS data); four hand-built HTML landers are re-componentized from their scraped HTML; prose pages/policies/blog become MDX; old Shopify URLs 308-redirect to clean routes.

**Tech Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · MDX (`@next/mdx`) · react-hook-form + zod · cheerio + turndown (scrape) · Vitest + Testing Library · pnpm.

**Spec:** `custy/docs/superpowers/specs/2026-07-21-custy-nextjs-migration-design.md`

## Global Constraints

- All commands run from `custy/` (the site root). Never touch `dropship/` except to read/copy reference files.
- The Shopify theme dirs in `custy/` (`assets/ blocks/ config/ layout/ locales/ sections/ snippets/ templates/`) are local reference only after Task 1 unracks them — never import from them at runtime.
- Site URL `https://custyapp.com` · Site name `Custy` · Shopify app listing `https://apps.shopify.com/custy`.
- Scrape sources: `SCRAPE_BASE` env override, else live `https://custyapp.com`.
- No commerce: no cart, product, collection, search, or account routes/components.
- Faithful port: match the live Horizon design (Inter, monochrome + scheme backgrounds, pill buttons) and the landers' `custy-*` design language; do not redesign.
- Dependency versions: copy exactly from `../dropship/package.json` (Next `^15.5.20`, React `^19.2.7`, Tailwind `^4.3.3`, zod `^3.25.76`, vitest `^4.1.10`, etc.).
- Every commit message ends with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Content rule (from dropship): no pictographic emoji in site copy.
- Every test file begins with explicit vitest imports (`import { describe, expect, it } from "vitest";` — plus `vi` where used). Vitest globals are NOT enabled, and `next build` type-checks test files. Plan snippets that omit the import line are shorthand; add it.

---

### Task 1: Scaffold the app + git hygiene

**Files:**
- Create: `custy/package.json`, `custy/pnpm-workspace.yaml`, `custy/tsconfig.json`, `custy/next.config.ts`, `custy/postcss.config.mjs`, `custy/vitest.config.ts`, `custy/vitest.setup.ts`, `custy/mdx-components.tsx`, `custy/.gitignore`, `custy/app/globals.css`, `custy/app/layout.tsx`, `custy/app/page.tsx`, `custy/app/page.test.tsx`, `custy/lib/redirects.ts` (stub — filled in Task 2)
- Modify: git index — untrack theme dirs.

**Interfaces:**
- Produces: working `pnpm dev` / `pnpm build` / `pnpm test`; Tailwind theme tokens (`--color-scheme1-bg`…`--color-scheme5-bg`, `--color-accent-blue/pink/yellow`, `--color-ink`, `--color-body`, `--font-sans`); `RootLayout` with Inter font and site metadata. Later tasks import `@/lib/redirects` (`redirectList`).

- [ ] **Step 1: Untrack the Shopify theme dirs, keep on disk**

```bash
cd custy
git rm -r --cached assets blocks config layout locales sections snippets templates
```

- [ ] **Step 2: Write `.gitignore`**

```gitignore
node_modules/
.next/
out/
*.tsbuildinfo
.env*
.DS_Store

# Live Shopify theme pull — working-copy reference only, never committed (post-launch: delete)
/assets/
/blocks/
/config/
/layout/
/locales/
/sections/
/snippets/
/templates/
```

- [ ] **Step 3: Write `package.json`** (versions verbatim from `../dropship/package.json`; sharp added for the OG-card script in Task 15)

```json
{
  "name": "custy-site",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest",
    "scrape": "node scripts/scrape.mjs",
    "fetch-assets": "node scripts/fetch-assets.mjs"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@mdx-js/loader": "^3.1.1",
    "@mdx-js/react": "^3.1.1",
    "@mdx-js/rollup": "^3.1.1",
    "@next/mdx": "^15.5.20",
    "@radix-ui/react-dialog": "^1.1.20",
    "lucide-react": "^1.25.0",
    "next": "^15.5.20",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-hook-form": "^7.82.0",
    "tailwind-merge": "^3.6.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@tailwindcss/typography": "^0.5.20",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/mdx": "^2.0.14",
    "@types/node": "^26.1.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "cheerio": "^1.2.0",
    "jsdom": "^29.1.1",
    "sharp": "^0.34.5",
    "tailwindcss": "^4.3.3",
    "turndown": "^7.2.4",
    "turndown-plugin-gfm": "^1.0.2",
    "typescript": "5.8.2",
    "vitest": "^4.1.10"
  }
}
```

- [ ] **Step 4: Copy the small configs from dropship, adjusting nothing but names**

`pnpm-workspace.yaml`:
```yaml
onlyBuiltDependencies:
  - sharp
```

`postcss.config.mjs`:
```js
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
```

`tsconfig.json` — copy `../dropship/tsconfig.json` verbatim (paths `@/*` → `./*`, strict, bundler resolution).

`vitest.config.ts` — dropship's config plus an MDX plugin so route tests can render MDX-backed pages (dropship lacks this and simply never tests those pages; the spec here requires per-route smoke tests):
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [{ enforce: "pre", ...mdx() }, react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}", "components/**/*.test.{ts,tsx}", "content/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}", "scripts/**/*.test.mjs"],
  },
});
```

`vitest.setup.ts` — copy `../dropship/vitest.setup.ts` verbatim (jest-dom + `cleanup()` in `afterEach`).

`mdx-components.tsx`:
```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
```

- [ ] **Step 5: Write `next.config.ts` and the redirects stub**

`next.config.ts`:
```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { redirectList } from "./lib/redirects";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return redirectList;
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

`lib/redirects.ts` (stub; Task 2 fills it):
```ts
type Redirect = { source: string; destination: string; permanent: true };

export const redirectList: Redirect[] = [];
```

- [ ] **Step 6: Write `app/globals.css` with the design tokens from the spec**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* Horizon color schemes (config/settings_data.json) */
  --color-scheme1-bg: #ffffff;
  --color-scheme2-bg: #f5f5f5;
  --color-scheme3-bg: #eef1ea;
  --color-scheme4-bg: #e1edf5;
  --color-scheme5-bg: #333333;

  --color-ink: #000000;      /* headings */
  --color-body: #000000cf;   /* body text */
  --color-line: #0000000f;   /* borders */

  /* Lander accent palette (scoped CSS on features/pricing/how/about pages) */
  --color-accent-blue: #17b6f4;
  --color-accent-pink: #ec008c;
  --color-accent-yellow: #ffd400;
  --color-lander-dark: #1c1c1c;
  --color-lander-text: #4b4b4b;
  --color-lander-light: #f8fafc;
  --color-lander-border: #eceff3;

  --radius-lander: 24px;
  --radius-pill: 25px;
  --radius-secondary: 14px;
  --radius-card: 4px;
}

body {
  @apply bg-scheme1-bg text-body font-sans antialiased;
}
h1, h2, h3, h4 {
  @apply text-ink font-bold;
}
h5, h6 {
  @apply text-ink font-medium;
}
```

- [ ] **Step 7: Write `app/layout.tsx`** (Header/Footer are added in Task 3; metadata title from the live `<title>`; live site has no meta description — this one is authored from the homepage intro copy)

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://custyapp.com"),
  title: {
    default: "Custy | Best Shopify POD Customizer App for T-Shirts, Caps & Apparel",
    template: "%s | Custy",
  },
  description:
    "Custy is a next-generation Shopify product customizer built for print-on-demand businesses. Let customers personalize t-shirts, caps and apparel in real time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Write the placeholder home page and its failing test**

`app/page.tsx`:
```tsx
export default function HomePage() {
  return <main><h1>Custy</h1></main>;
}
```

`app/page.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders the homepage heading", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});
```

- [ ] **Step 9: Install and verify**

Run: `pnpm install && pnpm test`
Expected: 1 test passes.

Run: `pnpm build`
Expected: build succeeds; `/` prerendered as static.

- [ ] **Step 10: Commit**

```bash
git add .gitignore package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json next.config.ts postcss.config.mjs vitest.config.ts vitest.setup.ts mdx-components.tsx app lib next-env.d.ts
git commit -m "feat(custy): scaffold Next.js app; untrack Shopify theme reference"
```

---

### Task 2: lib foundations — site constants, cn, nav, redirects

**Files:**
- Create: `custy/lib/site.ts`, `custy/lib/utils.ts`, `custy/lib/utils.test.ts`, `custy/lib/nav.ts`, `custy/lib/nav.test.ts`
- Modify: `custy/lib/redirects.ts` (replace stub) · Create: `custy/lib/redirects.test.ts`

**Interfaces:**
- Produces: `SITE_URL`, `SITE_NAME`, `APP_URL` (lib/site.ts); `cn(...classes)` (lib/utils.ts); `headerNav: NavLink[]`, `footerColumns: FooterColumn[]`, `socialLinks: SocialLink[]` with types `NavLink = { label: string; href: string; external?: boolean }`, `FooterColumn = { title: string; links: NavLink[] }`, `SocialLink = { label: string; href: string }`; `redirectList` (lib/redirects.ts).

- [ ] **Step 1: Write failing tests**

`lib/utils.test.ts`:
```ts
import { cn } from "./utils";

it("joins truthy classes and merges tailwind conflicts", () => {
  expect(cn("p-2", false, "text-sm", "p-4")).toBe("text-sm p-4");
});
```

`lib/nav.test.ts`:
```ts
import { headerNav, footerColumns, socialLinks } from "./nav";
import { APP_URL } from "./site";

it("header nav has the three live links plus the app CTA target", () => {
  expect(headerNav.map((l) => l.href)).toEqual(["/how-it-works", "/pricing", "/features"]);
});

it("footer links only point at migrated routes or the app listing", () => {
  const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
  for (const href of hrefs) {
    expect(href === APP_URL || href.startsWith("/")).toBe(true);
    expect(href).not.toMatch(/\/(pages|products|collections|cart|search)\b/);
  }
});

it("has the five social profiles", () => {
  expect(socialLinks).toHaveLength(5);
});
```

`lib/redirects.test.ts`:
```ts
import { redirectList } from "./redirects";

const dest = (source: string) => redirectList.find((r) => r.source === source)?.destination;

it("redirects every old page slug to its new route", () => {
  expect(dest("/pages/features")).toBe("/features");
  expect(dest("/pages/pricing")).toBe("/pricing");
  expect(dest("/pages/how-it-works")).toBe("/how-it-works");
  expect(dest("/pages/about-us")).toBe("/about-us");
  expect(dest("/pages/support")).toBe("/support");
  expect(dest("/pages/contact")).toBe("/contact");
  expect(dest("/pages/custydesignlab")).toBe("/");
});

it("redirects policies and blog paths", () => {
  expect(dest("/policies/privacy-policy")).toBe("/policies/privacy");
  expect(dest("/policies/terms-of-service")).toBe("/policies/terms");
  expect(dest("/policies/contact-information")).toBe("/contact");
  expect(dest("/blogs/custy-blog")).toBe("/blog");
  expect(dest("/blogs/custy-blog/:slug")).toBe("/blog/:slug");
});

it("sends commerce trees away and products to the app listing", () => {
  expect(dest("/products/:path*")).toBe("https://apps.shopify.com/custy");
  expect(dest("/collections/:path*")).toBe("/");
  expect(dest("/cart")).toBe("/");
  expect(dest("/search")).toBe("/");
});

it("every redirect is permanent", () => {
  expect(redirectList.every((r) => r.permanent === true)).toBe(true);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run lib`
Expected: FAIL (`./site`, `./utils`, `./nav` unresolved; redirect assertions fail on empty list).

- [ ] **Step 3: Implement**

`lib/site.ts`:
```ts
export const SITE_URL = "https://custyapp.com";
export const SITE_NAME = "Custy";
export const APP_URL = "https://apps.shopify.com/custy";
```

`lib/utils.ts` (copy from dropship):
```ts
import { twMerge } from "tailwind-merge";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
```

`lib/nav.ts` (link sets captured from the live header/footer; labels verbatim — "How it Work" is the live spelling):
```ts
import { APP_URL } from "./site";

export type NavLink = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: NavLink[] };
export type SocialLink = { label: string; href: string };

export const headerNav: NavLink[] = [
  { label: "How it Work", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Features", href: "/features" },
];

export const headerCta: NavLink = { label: "Install Now on Shopify", href: APP_URL, external: true };

// Live footer: Search + "Powered by Shopify" + dead "#" FAQ link dropped (no commerce).
export const footerColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "How it Work", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Features", href: "/features" },
      { label: "Install Now on Shopify", href: APP_URL, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/CustyAPP" },
  { label: "Instagram", href: "https://www.instagram.com/CustyAPP" },
  { label: "YouTube", href: "https://www.youtube.com/@CustyAPP" },
  { label: "TikTok", href: "https://www.tiktok.com/CustyAPP" },
  { label: "Twitter", href: "https://x.com/CustyAPP" },
];
```

`lib/redirects.ts` (replace the stub's empty list; keep the `Redirect` type and add the `to` helper):
```ts
type Redirect = { source: string; destination: string; permanent: true };

const to = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

export const redirectList: Redirect[] = [
  // migrated pages
  to("/pages/features", "/features"),
  to("/pages/pricing", "/pricing"),
  to("/pages/how-it-works", "/how-it-works"),
  to("/pages/about-us", "/about-us"),
  to("/pages/support", "/support"),
  to("/pages/contact", "/contact"),
  // dropped pages
  to("/pages/custydesignlab", "/"),
  // policies
  to("/policies/privacy-policy", "/policies/privacy"),
  to("/policies/terms-of-service", "/policies/terms"),
  to("/policies/contact-information", "/contact"),
  // blog
  to("/blogs/custy-blog", "/blog"),
  to("/blogs/custy-blog/:slug", "/blog/:slug"),
  to("/blogs/:path*", "/blog"),
  // dropped commerce trees
  to("/products/:path*", "https://apps.shopify.com/custy"),
  to("/collections/:path*", "/"),
  to("/cart", "/"),
  to("/cart/:path*", "/"),
  to("/search", "/"),
  to("/account/:path*", "/"),
];
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run lib`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add lib
git commit -m "feat(custy): site constants, nav data, redirect map"
```

---

### Task 3: Header, Footer, Button, layout shell

**Files:**
- Create: `custy/components/button.tsx`, `custy/components/container.tsx`, `custy/components/header.tsx`, `custy/components/header.test.tsx`, `custy/components/footer.tsx`, `custy/components/footer.test.tsx`
- Modify: `custy/app/layout.tsx` (mount Header/Footer)

**Interfaces:**
- Consumes: `headerNav`, `headerCta`, `footerColumns`, `socialLinks` from `@/lib/nav`; `cn` from `@/lib/utils`; `SITE_NAME` from `@/lib/site`.
- Produces: `<Button href variant="primary"|"secondary">` (renders `next/link` or `<a>` for external); `<Container>` (max-w wrapper); `<Header />`; `<Footer />`. Logo file `public/images/logo.png` arrives in Task 5 — until then Header falls back to the `SITE_NAME` wordmark if the file is missing; Task 5 flips it to the image.

Visual reference: live `custyapp.com` header (logo left, three links center, black pill CTA right, hamburger → drawer on mobile) and footer (link columns, social icon row, copyright line).

- [ ] **Step 1: Write failing tests**

`components/header.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

it("renders nav links and the install CTA", () => {
  render(<Header />);
  expect(screen.getAllByRole("link", { name: "How it Work" }).length).toBeGreaterThan(0);
  const cta = screen.getAllByRole("link", { name: "Install Now on Shopify" })[0];
  expect(cta).toHaveAttribute("href", "https://apps.shopify.com/custy");
  expect(cta).toHaveAttribute("target", "_blank");
});

it("has a mobile menu toggle", () => {
  render(<Header />);
  expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
});
```

`components/footer.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

it("renders footer columns, socials, and copyright", () => {
  render(<Footer />);
  expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/policies/privacy");
  expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://www.facebook.com/CustyAPP");
  expect(screen.getByText(/©/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run components`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement the components**

`components/button.tsx`:
```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", external, className, children }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors",
    variant === "primary" &&
      "rounded-pill bg-ink text-white hover:bg-black",
    variant === "secondary" &&
      "rounded-secondary border border-line text-ink hover:border-ink",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
```

`components/container.tsx`:
```tsx
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1100px] px-4 sm:px-6", className)}>{children}</div>;
}
```

`components/header.tsx` — client component. Desktop: logo (see Interfaces note) left, `headerNav` links, `Button` CTA (external). Mobile: hamburger `<button aria-label="Open menu">` toggling a full-width drawer (`useState`; plain conditional render, no Radix needed) listing the same links + CTA. Sticky top, `bg-scheme1-bg`, bottom `border-line`.

`components/footer.tsx` — server component. `bg-scheme2-bg`, `Container`, grid of `footerColumns` (external links get `target="_blank" rel="noopener noreferrer"`), social icon row using `lucide-react` icons (`Facebook`, `Instagram`, `Youtube`, `Music2` for TikTok, `Twitter`) each wrapped in `<a aria-label={label}>` with visible text in a `sr-only` span so the accessible name matches the test, and `<p>© {new Date().getFullYear()} Custy</p>`.

Mount both in `app/layout.tsx`:
```tsx
<body>
  <Header />
  {children}
  <Footer />
</body>
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run`
Expected: all PASS (home page test still green).

- [ ] **Step 5: Visual check**

Run: `pnpm dev` and compare `http://localhost:3000` header/footer against `https://custyapp.com` at desktop and 375px width.

- [ ] **Step 6: Commit**

```bash
git add components app/layout.tsx
git commit -m "feat(custy): header, footer, button, container matching Horizon layout"
```

---

### Task 4: Scrape scripts (extractors TDD)

**Files:**
- Create: `custy/scripts/lib/extract.mjs`, `custy/scripts/lib/extract.test.mjs`, `custy/scripts/scrape.mjs`, `custy/scripts/fetch-assets.mjs`
- Copy: `../dropship/scripts/lib/assets.mjs` → `custy/scripts/lib/assets.mjs`, `../dropship/scripts/lib/assets.test.mjs` → `custy/scripts/lib/assets.test.mjs`

**Interfaces:**
- Produces (from `extract.mjs`): `extractLander(html) -> { title, rootHtml, css }`, `extractProsePage(html) -> { title, bodyHtml }`, `extractPolicy(html) -> { title, bodyHtml }`, `extractArticle(html) -> { title, date, image, bodyHtml }`, `extractMeta(html) -> { title, description }`, `toMarkdown(html) -> string`.
- `scrape.mjs` writes: `content/raw/<slug>.html` (4 landers + `home.html`), `content/raw/<slug>.md` (prose/policies), `content/raw/posts/<slug>.md` (3 articles, frontmatter includes `date` and `image`), `content/raw/meta.json` (`{ [path]: { title, description } }`).
- `fetch-assets.mjs` downloads: `public/images/logo.png` (theme logo `custy_logo.png`), `public/images/favicon.png` (`custy.png`), article OG images → `public/images/blog/<slug>.jpg`, every `cdn.shopify.com` image referenced in `content/raw/**` → `public/images/content/<basename>`, rewriting references in the raw files to `/images/content/<basename>`.

Live-site markup facts (verified 2026-07-21):
- Landers: root is the first `div` whose class matches `custy-*-page` (`custy-features-page`, `custy-pricing-page`, `custy-how-page`, `custy-about-page`), inside `.shopify-block.rte`; exactly one `<style>` block per page contains `.custy-`.
- Prose pages (support/contact): content lives in `main` `.rte` text blocks; `h1` inside `main`.
- Policies: standard `shopify-policy__container` / `__title h1` / `__body` (same as dropship).
- Articles: `h1` title, `<time datetime="...">`, body `.blog-post-content.rte`, `og:image` present.
- Live pages have **no meta descriptions** — `extractMeta` returns `description: null`; new descriptions are authored by hand in page files.

- [ ] **Step 1: Write failing extractor tests with inline fixtures**

`scripts/lib/extract.test.mjs`:
```js
import { describe, expect, it } from "vitest";
import { extractArticle, extractLander, extractMeta, extractPolicy, extractProsePage, toMarkdown } from "./extract.mjs";

const landerHtml = `<html><head><style>.other{}</style><style>.custy-features-page{--custy-blue:#17b6f4}</style></head>
<body><main><div class="shopify-block rte"><div class="custy-features-page">
<h1>Powerful Product Customization</h1><section class="custy-hero">Hero</section>
</div></div></main></body></html>`;

const proseHtml = `<html><body><main><h1>Support</h1>
<div class="spacing-style text-block rte"><p>First block.</p></div>
<div class="text-block rte"><p>Second block.</p><script>evil()</script></div>
</main></body></html>`;

const policyHtml = `<html><body><div class="shopify-policy__container">
<div class="shopify-policy__title"><h1>Privacy policy</h1></div>
<div class="shopify-policy__body"><div class="rte"><p>Policy text.</p></div></div>
</div></body></html>`;

const articleHtml = `<html><head><meta property="og:image" content="https://cdn.shopify.com/img.jpg"></head>
<body><main><h1>7 Ways</h1><time datetime="2026-04-17T11:25:37Z">April 17</time>
<div class="blog-post-content rte"><p>Body.</p></div></main></body></html>`;

describe("extractLander", () => {
  it("returns the custy root html and its scoped css", () => {
    const { title, rootHtml, css } = extractLander(landerHtml);
    expect(title).toBe("Powerful Product Customization");
    expect(rootHtml).toContain('class="custy-features-page"');
    expect(css).toContain("--custy-blue");
    expect(css).not.toContain(".other");
  });
  it("throws when no custy root exists", () => {
    expect(() => extractLander("<html><body><p>nope</p></body></html>")).toThrow();
  });
});

describe("extractProsePage", () => {
  it("joins main rte blocks and strips scripts", () => {
    const { title, bodyHtml } = extractProsePage(proseHtml);
    expect(title).toBe("Support");
    expect(bodyHtml).toContain("First block.");
    expect(bodyHtml).toContain("Second block.");
    expect(bodyHtml).not.toContain("evil");
  });
});

describe("extractPolicy", () => {
  it("extracts title and body", () => {
    const { title, bodyHtml } = extractPolicy(policyHtml);
    expect(title).toBe("Privacy policy");
    expect(bodyHtml).toContain("Policy text.");
  });
});

describe("extractArticle", () => {
  it("extracts title, ISO date, og image, body", () => {
    const { title, date, image, bodyHtml } = extractArticle(articleHtml);
    expect(title).toBe("7 Ways");
    expect(date).toBe("2026-04-17");
    expect(image).toBe("https://cdn.shopify.com/img.jpg");
    expect(bodyHtml).toContain("Body.");
  });
});

describe("extractMeta", () => {
  it("reads title tag and returns null description when absent", () => {
    const meta = extractMeta("<html><head><title>\n  Pricing\n &ndash; Custy</title></head><body></body></html>");
    expect(meta.title).toBe("Pricing – Custy");
    expect(meta.description).toBeNull();
  });
});

describe("toMarkdown", () => {
  it("converts headings and tight list markers", () => {
    expect(toMarkdown("<h2>Hi</h2><ul><li>a</li></ul>")).toBe("## Hi\n\n- a");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run scripts`
Expected: FAIL (`extract.mjs` not found). The copied `assets.test.mjs` should PASS (it ships with its implementation).

- [ ] **Step 3: Implement `scripts/lib/extract.mjs`**

Start from `../dropship/scripts/lib/extract.mjs`: keep `cleanBody` and the whole `toMarkdown` function (turndown + gfm + single-space list markers) verbatim; keep `extractPolicy` verbatim. Replace the Warehouse-specific extractors with:

```js
export function extractLander(html) {
  const $ = cheerio.load(html);
  const root = $('div[class*="custy-"]').filter((_, el) =>
    /custy-[a-z]+-page/.test($(el).attr("class") ?? ""),
  ).first();
  if (root.length === 0) throw new Error("lander custy-*-page root not found");
  const css = $("style")
    .toArray()
    .map((el) => $(el).text())
    .filter((text) => text.includes(".custy-"))
    .join("\n");
  const title = root.find("h1").first().text().trim();
  root.find("script, noscript").remove();
  return { title, rootHtml: $.html(root), css };
}

export function extractProsePage(html) {
  const $ = cheerio.load(html);
  const title = $("main h1").first().text().trim();
  const blocks = $("main .rte");
  if (!title || blocks.length === 0) throw new Error("prose page structure not found");
  const root = $("<div></div>");
  blocks.each((_, el) => root.append($(el).clone()));
  return { title, bodyHtml: cleanBody($, root) };
}

export function extractArticle(html) {
  const $ = cheerio.load(html);
  const title = $("main h1").first().text().trim();
  const datetime = $("time[datetime]").first().attr("datetime") ?? "";
  const body = $(".blog-post-content.rte").first();
  if (!title || body.length === 0) throw new Error("article structure not found");
  return {
    title,
    date: datetime.slice(0, 10),
    image: $('meta[property="og:image"]').attr("content") ?? null,
    bodyHtml: cleanBody($, body),
  };
}

export function extractMeta(html) {
  const $ = cheerio.load(html);
  const title = $("title").first().text().replace(/\s+/g, " ").replace(/&ndash;|–/g, "–").trim();
  return { title, description: $('meta[name="description"]').attr("content") ?? null };
}
```

(`extractMeta` note: cheerio decodes entities itself — after `replace(/\s+/g, " ")` the fixture yields `Pricing – Custy`.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run scripts`
Expected: all PASS.

- [ ] **Step 5: Write `scripts/scrape.mjs`**

Keep dropship's structure (`SCRAPE_BASE` env, `fetchHtml` fallback loop, `sleep(300)`, failure collection, `process.exit(1)` on any failure). Replace the manifest and output logic:

```js
const LOCAL = process.env.SCRAPE_BASE ?? "https://custyapp.com";
const LIVE = "https://custyapp.com";

const LANDERS = ["features", "pricing", "how-it-works", "about-us"];
const PROSE_PAGES = [
  { slug: "support", out: "support" },
  { slug: "contact", out: "contact" },
];
const POLICIES = [
  { slug: "privacy-policy", out: "policy-privacy" },
  { slug: "terms-of-service", out: "policy-terms" },
];
const ARTICLES = [
  "why-product-customization-is-the-future-of-ecommerce-in-2026",
  "how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide",
  "7-ways-product-customization-increases-your-shopify-store-revenue",
];
```

Outputs:
- For each lander: fetch `/pages/<slug>`, `extractLander`, write `content/raw/<slug>.html` as `<style>\n{css}\n</style>\n{rootHtml}`.
- Fetch `/` and write the full response to `content/raw/home.html` (copy source for homepage data; no extraction).
- Prose pages → `extractProsePage` → `toMarkdown` → `content/raw/<out>.md` with dropship's frontmatter format.
- Policies → `extractPolicy` → `toMarkdown` → `content/raw/<out>.md`.
- Articles: fetch `/blogs/custy-blog/<slug>`, `extractArticle`, write `content/raw/posts/<slug>.md` with frontmatter `title`, `date`, `image`, `source`.
- Every fetched path (plus `/`) → `extractMeta` → accumulate and write `content/raw/meta.json`.

- [ ] **Step 6: Write `scripts/fetch-assets.mjs`**

Start from dropship's version; keep `download`/`tryDownload`/failure handling verbatim. Replace the seed sections with:
1. Theme images by known CDN filename, scanning `content/raw/home.html` with `collectCdnImageUrls`/`matchAsset` (from `./lib/assets.mjs`): `custy_logo` → `public/images/logo.png`, `custy` (favicon) → `public/images/favicon.png`.
2. Article images: read `content/raw/posts/*.md` frontmatter `image:` URLs → `public/images/blog/<slug>.jpg`.
3. All `cdn.shopify.com` URLs inside `content/raw/**/*.{md,html}` → download to `public/images/content/<basename>` and rewrite references in place (dropship's step 4, extended to also glob the lander `.html` files and `home.html`).

- [ ] **Step 7: Commit**

```bash
git add scripts
git commit -m "feat(custy): Horizon-aware scrape and asset pipeline"
```

---

### Task 5: Run the pipeline; land raw content and assets

**Files:**
- Create (generated): `custy/content/raw/**`, `custy/public/images/**`
- Create (hand-cleaned): `custy/content/pages/support.mdx`, `custy/content/pages/contact.mdx`, `custy/content/policies/privacy.mdx`, `custy/content/policies/terms.mdx`, `custy/content/posts/*.mdx` (3)
- Modify: `custy/components/header.tsx` (switch wordmark → `next/image` logo), `custy/app/layout.tsx` (favicon via `app/icon.png`)

**Interfaces:**
- Produces: the committed content record. MDX page files contain **body only** (no frontmatter — titles/descriptions live in the route files, dropship convention). Post MDX files keep frontmatter-free bodies too; their metadata goes into `content/posts/index.ts` in Task 14. Raw record under `content/raw/` is never edited after this task.

- [ ] **Step 1: Run the scrape**

Run: `pnpm scrape`
Expected: `ok` lines for 4 landers + home + 2 prose + 2 policies + 3 articles; `content/raw/meta.json` written; exit 0. If any FAIL line appears, fix the extractor (markup drift) before proceeding.

- [ ] **Step 2: Run asset fetch**

Run: `pnpm fetch-assets`
Expected: `logo.png`, `favicon.png`, 3 blog images, and every content-referenced CDN image land under `public/images/`; raw files now reference `/images/content/...`; exit 0.

- [ ] **Step 3: Hand-clean the prose/policy/post MDX**

For each of `support`, `contact`, `policy-privacy` → `content/policies/privacy.mdx`, `policy-terms` → `content/policies/terms.mdx`, and the three posts: copy the raw `.md` body (minus frontmatter) into the target `.mdx`, then fix conversion noise — stray `&nbsp;`, doubled blank lines, dead in-page anchors, any residual Shopify widget text. Do not rewrite copy; this is cleanup only.

- [ ] **Step 4: Wire the real logo + favicon**

- Copy `public/images/favicon.png` → `app/icon.png` (Next serves it as favicon automatically).
- In `components/header.tsx`, replace the wordmark fallback with `<Image src="/images/logo.png" alt="Custy" width={120} height={60} priority />` (measure the real intrinsic ratio with `sips -g pixelWidth -g pixelHeight public/images/logo.png` and use it; header height 60px per theme settings `logo_height`).

- [ ] **Step 5: Verify and commit**

Run: `pnpm test && pnpm build`
Expected: PASS / build OK.

```bash
git add content public/images app/icon.png components/header.tsx
git commit -m "content(custy): scraped pages, policies, posts, and self-hosted assets"
```

---

### Task 6: MDX rendering — support, policies pages

**Files:**
- Create: `custy/components/prose.tsx`, `custy/app/support/page.tsx`, `custy/app/support/page.test.tsx`, `custy/app/policies/privacy/page.tsx`, `custy/app/policies/terms/page.tsx`, `custy/app/policies/page.test.tsx`

**Interfaces:**
- Consumes: MDX files from Task 5; `Container` from Task 3.
- Produces: `<Prose>{children}</Prose>` (typography wrapper: `prose prose-neutral max-w-none` inside a `max-w-[720px]` column) used by every MDX-backed route and later by blog posts.

- [ ] **Step 1: Write failing route tests**

`app/support/page.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import SupportPage, { metadata } from "./page";

it("renders the support page with its h1 and metadata", () => {
  render(<SupportPage />);
  expect(screen.getByRole("heading", { level: 1, name: /support/i })).toBeInTheDocument();
  expect(metadata.title).toBeTruthy();
});
```

`app/policies/page.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import PrivacyPage from "./privacy/page";
import TermsPage from "./terms/page";

it("renders privacy policy", () => {
  render(<PrivacyPage />);
  expect(screen.getByRole("heading", { level: 1, name: /privacy/i })).toBeInTheDocument();
});

it("renders terms of service", () => {
  render(<TermsPage />);
  expect(screen.getByRole("heading", { level: 1, name: /terms/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run app/support app/policies`
Expected: FAIL (pages missing).

- [ ] **Step 3: Implement**

`components/prose.tsx`:
```tsx
import { Container } from "@/components/container";

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-12">
      <div className="prose prose-neutral mx-auto max-w-[720px]">{children}</div>
    </Container>
  );
}
```

Each page follows this pattern (title/h1 in the route file, body from MDX; description authored from the page's opening copy):

`app/support/page.tsx`:
```tsx
import type { Metadata } from "next";
import Body from "@/content/pages/support.mdx";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with the Custy Shopify product customizer app.",
};

export default function SupportPage() {
  return (
    <main>
      <Prose>
        <h1>Support</h1>
        <Body />
      </Prose>
    </main>
  );
}
```

`app/policies/privacy/page.tsx` and `app/policies/terms/page.tsx`: same shape with titles "Privacy Policy" / "Terms of Service" and the matching MDX import. (h1 text should match the scraped titles in `content/raw/meta.json`.)

MDX imports work in these tests because `vitest.config.ts` (Task 1) registers the `@mdx-js/rollup` plugin ahead of the react plugin.

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add components/prose.tsx app/support app/policies
git commit -m "feat(custy): support and policy pages from MDX"
```

---

### Task 7: Contact page — schema, form, stub API

**Files:**
- Create: `custy/lib/contact-schema.ts`, `custy/lib/contact-schema.test.ts`, `custy/app/api/contact/route.ts`, `custy/app/api/contact/route.test.ts`, `custy/components/contact-form.tsx`, `custy/components/contact-form.test.tsx`, `custy/app/contact/page.tsx`
- Modify: `custy/app/support/page.tsx` — the live `/pages/support` renders the Horizon contact-form section (verified 2026-07-21), so the faithful port mounts `<ContactForm />` under the Support h1 as well (its scraped prose is empty; the form IS the page content).

**Interfaces:**
- Consumes: `Prose`, `Container`, `Button` styles; `content/pages/contact.mdx` intro copy.
- Produces: `contactSchema` (zod: name/email/subject/message), `ContactInput`; POST `/api/contact` → `{ ok: true }` | 400 `{ ok: false, errors }`.

Copy `lib/contact-schema.ts`, `app/api/contact/route.ts` **verbatim from dropship** (they are custy-agnostic). Copy `../dropship/lib/contact-schema.test.ts` and `../dropship/app/api/contact/route.test.ts` as the tests. Build `components/contact-form.tsx` fresh with react-hook-form + `zodResolver(contactSchema)`: four labeled fields, inline field errors, pill submit button, success ("Thanks — we'll get back to you soon.") and failure states; test covers: renders all fields, shows validation error on empty submit, posts and shows success (mock `fetch`).

`app/contact/page.tsx`: `metadata.title = "Contact Us"`, description "Contact the Custy team about the Shopify product customizer app.", renders the contact MDX intro (if the scraped page had prose) above `<ContactForm />`.

- [ ] **Step 1: Copy schema + route + their tests; run**

Run: `pnpm vitest run lib/contact-schema.test.ts app/api`
Expected: PASS (copied together).

- [ ] **Step 2: Write failing form test → implement form → pass**

Run: `pnpm vitest run components/contact-form.test.tsx`
Expected: FAIL, then PASS after implementing.

- [ ] **Step 3: Create the page; verify build; commit**

Run: `pnpm build`
Expected: OK (route `/api/contact` is the only non-static entry).

```bash
git add lib/contact-schema* app/api app/contact components/contact-form*
git commit -m "feat(custy): contact page with validated form and stub API"
```

---

### Task 8: Homepage — faithful rebuild of index.json sections

**Files:**
- Create: `custy/content/home.ts`, `custy/components/sections/hero.tsx`, `custy/components/sections/rich-section.tsx`, `custy/components/sections/demo-showcase.tsx`, `custy/components/sections/media-with-content.tsx`, `custy/components/sections/blog-teasers.tsx`
- Modify: `custy/app/page.tsx`, `custy/app/page.test.tsx`

**Interfaces:**
- Consumes: `Button`, `Container`; images under `public/images/content/`; post metadata (inline here; Task 14's `content/posts/index.ts` replaces the inline list — see Step 4).
- Produces: `content/home.ts` exporting `home: { hero: {...}, intro: RichBlock, demo: {...}, media: {...}, closing: RichBlock }` (exact shape defined in Step 2).

Source of truth for copy/order: `custy/templates/index.json` (section order: rich `section` → `hero` → rich `section` → `product-list` → `media-with-content` → `featured-blog-posts` → `section`) plus rendered markup in `content/raw/home.html`. Known copy anchors: intro "Powerful Product Customization for Shopify POD Stores", "Custy is a next-generation Shopify product customizer…", demo heading "Test Our App on Demo Product", blog heading "Custy Blog".

- [ ] **Step 1: Write the failing homepage test** (replace the placeholder test)

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders hero, demo showcase, and blog teasers", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/test our app on demo product/i)).toBeInTheDocument();
  expect(screen.getByText(/custy blog/i)).toBeInTheDocument();
});

it("demo product cards link to the app listing, not product pages", () => {
  render(<HomePage />);
  for (const link of screen.getAllByRole("link")) {
    expect(link.getAttribute("href")).not.toMatch(/^\/products/);
  }
});
```

- [ ] **Step 2: Define `content/home.ts`** — fill values from `templates/index.json` + `content/raw/home.html`:

```ts
export type RichBlock = { heading?: string; html: string; ctas?: { label: string; href: string; external?: boolean }[] };
export type DemoProduct = { title: string; image: string };

export const home = {
  hero: {
    heading: "", // h1/first heading from the hero section in raw home.html
    text: "",
    image: "/images/content/<hero image basename>",
    ctas: [{ label: "Install Now on Shopify", href: "https://apps.shopify.com/custy", external: true }],
  },
  intro: { html: "" } as RichBlock,     // "Powerful Product Customization for Shopify POD Stores" block
  demo: {
    heading: "Test Our App on Demo Product",
    products: [] as DemoProduct[],      // title + local image per demo product card
  },
  media: { heading: "", text: "", image: "" }, // media-with-content section
  closing: { html: "" } as RichBlock,   // final rich section
};
```

- [ ] **Step 3: Build the section components** — each takes its `home` slice as props, uses `Container`, and applies the scheme background the live section uses (inspect the section's `color-scheme-N` class in `content/raw/home.html`; scheme classes map to the `--color-schemeN-bg` tokens). `DemoShowcase` renders the product grid as static cards (image + title) wrapped in `<a href={APP_URL} target="_blank" rel="noopener noreferrer">`.

- [ ] **Step 4: Assemble `app/page.tsx`** in live section order; blog teasers list the 3 posts (slug/title/image inline for now, marked with a comment `// replaced by content/posts/index.ts in blog task`).

- [ ] **Step 5: Run tests; visual parity check**

Run: `pnpm vitest run app/page.test.tsx`
Expected: PASS.
Run `pnpm dev`; compare with `https://custyapp.com` top-to-bottom at desktop + mobile.

- [ ] **Step 6: Commit**

```bash
git add content/home.ts components/sections app/page.tsx app/page.test.tsx
git commit -m "feat(custy): faithful homepage rebuild from index.json sections"
```

---

### Task 9: Lander component family

**Files:**
- Create: `custy/components/lander/index.ts`, `custy/components/lander/lander.tsx`, `custy/components/lander/hero.tsx`, `custy/components/lander/section.tsx`, `custy/components/lander/cards.tsx`, `custy/components/lander/steps.tsx`, `custy/components/lander/pricing-table.tsx`, `custy/components/lander/cta-band.tsx`, `custy/components/lander/lander.test.tsx`

**Interfaces:**
- Consumes: accent tokens from `globals.css` (`accent-blue/pink/yellow`, `lander-*`, `radius-lander`).
- Produces (exported from `components/lander/index.ts`):
  - `<Lander>` — page wrapper: `max-w-[1450px] mx-auto`, `text-lander-text`, vertical rhythm.
  - `<LanderHero eyebrow title lead ctas>` — with `<RainbowBar />` (the blue/pink/yellow gradient accent bar) and highlight-card slot.
  - `<LanderSection eyebrow title lead tone="light"|"white"|"dark">` — section shell with heading group.
  - `<CardGrid items columns>` where `CardItem = { icon?: string; title: string; text: string }` — the `custy-highlight-card` look (radius-lander, lander-border, hover lift).
  - `<Steps items>` where `StepItem = { number: number; title: string; text: string; image?: string }`.
  - `<PricingTable plans>` where `Plan = { name: string; price: string; period?: string; features: string[]; cta: { label: string; href: string }; featured?: boolean }`.
  - `<CtaBand title text cta>`.

The styling reference is the scoped CSS captured in `content/raw/features.html` (9.4KB — the richest), `pricing.html`, `how-it-works.html`, `about-us.html`. Port each rule group to Tailwind classes on the matching component; where the four pages' CSS differs, prefer the features-page variant and expose the difference as a prop (e.g. `tone`).

- [ ] **Step 1: Write failing smoke tests** (`lander.test.tsx`): render `LanderHero` (asserts eyebrow + h1 + CTA link), `CardGrid` with 3 items (asserts 3 titles), `PricingTable` with 2 plans (asserts plan names + features).

Run: `pnpm vitest run components/lander`
Expected: FAIL.

- [ ] **Step 2: Implement the components** from the scoped CSS as described above.

- [ ] **Step 3: Run tests to verify they pass**

Run: `pnpm vitest run components/lander`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/lander
git commit -m "feat(custy): lander component family from custy-* design language"
```

---

### Task 10: Features page

**Files:**
- Create: `custy/content/features.ts`, `custy/app/features/page.tsx`, `custy/app/features/page.test.tsx`

**Interfaces:**
- Consumes: everything exported from `@/components/lander`; source `content/raw/features.html`.
- Produces: `content/features.ts` exporting typed data (`hero`, `sections: Array<{ eyebrow?, title, lead?, cards?: CardItem[], steps?: StepItem[] }>`, `cta`) using the types from Task 9.

- [ ] **Step 1: Failing test** — renders page; asserts h1 equals the live title (`Powerful Product Customization for Modern Shopify Stores`), at least one card grid, and an app-listing CTA.
- [ ] **Step 2: Transcribe `content/raw/features.html`** section-by-section into `content/features.ts`. Copy text verbatim; images already rewritten to `/images/content/...`.
- [ ] **Step 3: Assemble `app/features/page.tsx`** from lander components in source order. `metadata`: title `Features`, description authored from the hero lead sentence.
- [ ] **Step 4: Run `pnpm vitest run app/features`** → PASS. Visual parity check against `https://custyapp.com/pages/features` (desktop + 375px).
- [ ] **Step 5: Commit** — `git add content/features.ts app/features && git commit -m "feat(custy): features lander"`

---

### Task 11: Pricing page

**Files:**
- Create: `custy/content/pricing.ts`, `custy/app/pricing/page.tsx`, `custy/app/pricing/page.test.tsx`

Same procedure as Task 10 against `content/raw/pricing.html`: failing test (h1 from live page, plan names rendered, features listed per plan, CTA links to the app listing) → transcribe plans/copy into `content/pricing.ts` (`Plan[]` from Task 9 + any surrounding sections) → assemble with `<PricingTable>` → parity check vs `https://custyapp.com/pages/pricing` → commit `feat(custy): pricing lander`.

---

### Task 12: How-it-works page

**Files:**
- Create: `custy/content/how-it-works.ts`, `custy/app/how-it-works/page.tsx`, `custy/app/how-it-works/page.test.tsx`

Same procedure against `content/raw/how-it-works.html`: failing test (h1, ordered step titles present in document order) → transcribe steps into `StepItem[]` → assemble with `<Steps>` + surrounding sections → parity check vs `https://custyapp.com/pages/how-it-works` → commit `feat(custy): how-it-works lander`.

---

### Task 13: About-us page

**Files:**
- Create: `custy/content/about.ts`, `custy/app/about-us/page.tsx`, `custy/app/about-us/page.test.tsx`

Same procedure against `content/raw/about-us.html` → commit `feat(custy): about-us lander`.

---

### Task 14: Blog — index and post pages

**Files:**
- Create: `custy/content/posts/index.ts`, `custy/components/blog-post-card.tsx`, `custy/app/blog/page.tsx`, `custy/app/blog/page.test.tsx`, `custy/app/blog/[slug]/page.tsx`, `custy/app/blog/[slug]/page.test.tsx`
- Modify: `custy/components/sections/blog-teasers.tsx` + `custy/app/page.tsx` (swap the inline post list for `posts` from the registry)

**Interfaces:**
- Consumes: post MDX bodies from Task 5; `Prose`; frontmatter values recorded in `content/raw/posts/*.md`.
- Produces: `content/posts/index.ts`:

```ts
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;       // YYYY-MM-DD from the scrape
  image: string;      // /images/blog/<slug>.jpg
  Body: React.ComponentType;
};
export const posts: Post[]; // newest first
```

built by importing the three MDX bodies statically (`import WhyBody from "./why-product-customization....mdx"` etc.). `description` is authored: the post's first sentence.

- [ ] **Step 1: Failing tests** — blog index renders 3 `BlogPostCard`s with links `/blog/<slug>`; post page is an async server component, so the test renders it with `render(await PostPage({ params: Promise.resolve({ slug }) }))` and asserts the h1 plus an `application/ld+json` script containing `"@type":"Article"` (dates from the registry).
- [ ] **Step 2: Implement** — `app/blog/page.tsx` (`metadata.title = "Custy Blog"`, card grid); `app/blog/[slug]/page.tsx` with `generateStaticParams` over `posts`, `generateMetadata` per post (title/description/OG image), hero image, date line, `<Prose><Body /></Prose>`, Article JSON-LD (`headline`, `datePublished`, `image`, `author: { "@type": "Organization", name: "Custy" }`). `notFound()` for unknown slugs.
- [ ] **Step 3: Run `pnpm vitest run app/blog`** → PASS. Update homepage teasers to use the registry; re-run `pnpm vitest run app/page.test.tsx` → PASS.
- [ ] **Step 4: Commit** — `git add content/posts components/blog-post-card.tsx app/blog components/sections/blog-teasers.tsx app/page.tsx && git commit -m "feat(custy): blog index and posts"`

---

### Task 15: SEO — sitemap, robots, 404, JSON-LD, OG card

**Files:**
- Create: `custy/app/sitemap.ts`, `custy/app/sitemap.test.ts`, `custy/app/robots.ts`, `custy/app/not-found.tsx`, `custy/scripts/make-og-card.mjs`, `custy/public/images/og-card.png` (generated)
- Modify: `custy/app/layout.tsx` (Organization JSON-LD + OG metadata)

**Interfaces:**
- Consumes: `posts` registry, `socialLinks`, `SITE_URL`.
- Produces: complete crawlable static site.

- [ ] **Step 1: Failing sitemap test** — `sitemap()` includes `/`, all six pages, both policies, `/blog`, and every `/blog/<slug>`; every URL starts with `https://custyapp.com`; no `/pages/`, `/products/`, or `/blogs/` entries.
- [ ] **Step 2: Implement** `app/sitemap.ts` (static list + posts map) and `app/robots.ts` (allow all, `sitemap: `${SITE_URL}/sitemap.xml``). PASS the test.
- [ ] **Step 3: `app/not-found.tsx`** — scheme-1 background, "Page not found" h1, pill Button home. Port copy from `custy/templates/404.json` if it has custom text; otherwise the standard Horizon copy ("The page you're looking for can't be found").
- [ ] **Step 4: OG card** — `scripts/make-og-card.mjs`: sharp composites `public/images/logo.png` centered on a 1200×630 white canvas → `public/images/og-card.png`. Run it once (`node scripts/make-og-card.mjs`); then in `app/layout.tsx` add `openGraph` (`siteName: "Custy"`, `images: [{ url: "/images/og-card.png", width: 1200, height: 630, alt: "Custy" }]`, `type: "website"`, `url: SITE_URL`) and `twitter: { card: "summary_large_image" }`.
- [ ] **Step 5: Organization JSON-LD in layout** — `name: "Custy"`, `url: SITE_URL`, `logo: `${SITE_URL}/images/logo.png``, `sameAs: socialLinks.map((s) => s.href)` — rendered in a `<script type="application/ld+json">` like dropship's `app/layout.tsx`.
- [ ] **Step 6: Full verify + commit**

Run: `pnpm test && pnpm build`
Expected: all PASS; every page static.

```bash
git add app/sitemap* app/robots.ts app/not-found.tsx app/layout.tsx scripts/make-og-card.mjs public/images/og-card.png
git commit -m "feat(custy): sitemap, robots, 404, JSON-LD, OG card"
```

---

### Task 16: Final QA, docs, repo bookkeeping

**Files:**
- Create: `custy/README.md`, `custy/CLAUDE.md`, `custy/lib/no-emoji.test.ts`
- Modify: repo-root `CLAUDE.md` (custy is no longer an "empty scaffold")

- [ ] **Step 0: Emoji guard (spec testing requirement)** — copy `../dropship/lib/no-emoji.test.ts` → `lib/no-emoji.test.ts` and adapt its source globs to custy's content sources (`content/**/*.{mdx,ts}`, `components/**/*.tsx`, `app/**/*.tsx`, excluding `content/raw/`). **Exemption (controller ruling, Task 10):** emoji glyphs in `icon:` fields of content data files are decorative design elements ported from the live landers (58px gradient icon tiles), not site copy — the guard must skip lines matching `icon:` (or equivalent) so those survive while prose stays emoji-free. Run `pnpm vitest run lib/no-emoji.test.ts`; if scraped *copy* contains pictographic emoji, remove it from the cleaned content files (never from `content/raw/`).

- [ ] **Step 1: Full test + build + route sweep**

Run: `pnpm test && pnpm build`
Expected: all tests pass; build output lists `/`, `/features`, `/pricing`, `/how-it-works`, `/about-us`, `/support`, `/contact`, `/policies/privacy`, `/policies/terms`, `/blog`, 3 × `/blog/[slug]` as static (○/●), `/api/contact` as dynamic (ƒ).

Then `pnpm start` and spot-check with curl: each route above returns 200; `/pages/features` returns 308 → `/features`; `/products/anything` returns 308 → the app listing.

- [ ] **Step 2: Visual parity pass** — side-by-side against custyapp.com: home, all four landers, support, contact, one policy, blog index, one post; desktop + 375px. Fix discrepancies before docs.

- [ ] **Step 3: Write `custy/README.md`** modeled on `dropship/README.md`: stack, commands, content-editing map (`content/pages/*.mdx`, `content/posts/`, `content/{home,features,pricing,how-it-works,about}.ts`, `content/raw/` untouched), contact-form stub note, deploy (Vercel root dir `custy`, point custyapp.com DNS), legacy-theme note.

- [ ] **Step 4: Write `custy/CLAUDE.md`**: repo status note (Next.js app is the active codebase; Shopify Horizon theme dirs are untracked local reference), commands, where content lives, no-commerce rule, redirect map location.

- [ ] **Step 5: Update root `CLAUDE.md`** — replace `**`custy/`** — the new "custy" site (empty scaffold for now).` with a line describing the Next.js marketing site + legacy Horizon theme reference, pointing at `custy/CLAUDE.md`.

- [ ] **Step 6: Commit**

```bash
git add custy/README.md custy/CLAUDE.md CLAUDE.md
git commit -m "docs(custy): README, CLAUDE.md, root repo map update"
```
