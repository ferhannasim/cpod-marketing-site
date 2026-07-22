# DropShipPOD Shopify → Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the DropShipPOD marketing site as a static-first Next.js app in this repo, keeping all explainer content (scraped from the running Shopify site) and dropping all commerce.

**Architecture:** A Next.js 15 App Router site scaffolded at the repo root (the Shopify theme dirs stay in place as untouched reference until post-launch removal). One-time Node scripts scrape page bodies from the running Shopify site into in-repo MDX/JSON; images are downloaded from the Shopify CDN into `public/`. All routes are SSG; the contact form posts to a stub route handler.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 (+ typography plugin), MDX via `@next/mdx`, `@radix-ui/react-accordion`, `lucide-react`, `react-hook-form` + `zod`, Vitest + Testing Library, `cheerio` + `turndown` (scrape scripts), pnpm.

**Design spec:** `docs/superpowers/specs/2026-07-20-dropshippod-nextjs-migration-design.md` (approved). Deviation from spec §5: instead of the shadcn CLI, the few needed primitives are written directly in `components/ui/` (Accordion wraps Radix). Same result, no interactive CLI steps, less unused code. Tabs/NavigationMenu/Dialog are not needed by any task (YAGNI): the header uses a small hand-rolled dropdown/drawer, and size charts render both unit systems in one table.

## Global Constraints

- **Package manager:** pnpm 10 (installed: 10.22.0; Node v22.17.0). If `pnpm install` warns about ignored build scripts, run `pnpm approve-builds` and approve `esbuild`/`sharp`.
- **Versions:** `next@15`, `react@19`, `react-dom@19`, `tailwindcss@4`, `zod@3` (v3 API: `z.string().email()`).
- **Brand tokens (exact):** primary red `#cb1836`, red hover `#a31029`, ink navy `#1e2d7d`, soft navy `#144579`. Fonts: Manrope (body), Space Grotesk (display), both via `next/font/google`.
- **Canonical domain:** `https://dropshippod.ca`. Brand name: **DropShipPOD** (never "InstaCustoms" / "Cheapest Print on Demand" in UI copy).
- **English only (v1).** No i18n scaffolding.
- **No Shopify runtime dependency:** finished app code (`app/`, `components/`, `content/` except `content/raw/`) must contain no `cdn.shopify.com`, `myshopify.com`, or `shopify://` references.
- **No commerce UI:** no links to `/products/`, `/collections/`, `/cart`, `/account` anywhere in new code.
- **Internal links** use `next/link`. Every `<img>`/`Image` has `alt`; every iframe has `title`; icon-only buttons have `aria-label`.
- **Contact form is UI-only:** the API route validates, logs, returns success, with a `TODO` comment for Resend/Formspree.
- **All routes SSG** — no `dynamic = "force-dynamic"`, no request-time data.
- **Commits:** conventional commits (`feat:`, `chore:`, `test:`, `content:`, `docs:`), one commit per task minimum, exactly as written in each task's commit step.
- **Scrape sources:** prefer local Shopify dev server `http://127.0.0.1:9292`, automatic per-page fallback to `https://dropshippod.ca` (both verified reachable 2026-07-20; scripts must work with either down).
- **MDX hand-cleaning rules** (apply every time a `content/raw/*.md` file is turned into `content/pages/*.mdx`):
  1. Drop the frontmatter `source:` line; keep `title`.
  2. Remove links to `/products/*`, `/collections/*`, `/cart`, `/account`, `custydesignlab`, `check-order-status`; keep surrounding text (unlink, don't delete the sentence unless it is purely a store CTA like "click add to cart to checkout").
  3. Rewrite internal `/pages/<old-slug>` links to the new route (see route table in Captured Data).
  4. Images must already point at `/images/...` (done by `pnpm fetch-assets`); a leftover `cdn.shopify.com` URL is a bug — fix the asset pipeline, don't hand-download.
  5. Remove empty headings, `&nbsp;`, stray `<br>` runs, and Shopify app leftovers (`<div id="revy-...">` etc.).
  6. Keep wording otherwise verbatim — this is a migration, not a rewrite. Do not "improve" copy.
- **Placeholders in this plan:** none intentional. Where a step says "from `content/raw/<x>.md`", that file exists in-repo after Task 4 and *is* the content; the step is data entry following the rules above.

## Captured Data (verified 2026-07-20 — single source of truth for executors)

**Scraper selectors** (verified against the live theme):
- Content pages: root `section[data-section-type="page"]`; title `h1.page__title`; body `.page__content`.
- Policy pages: root `.shopify-policy__container`; title `.shopify-policy__title h1`; body `.shopify-policy__body`.
- Shopify CDN base: `https://cdn.shopify.com/s/files/1/0646/3881/2399/files/`.

**Route map (old → new).** `free-shipping-on-orders-over-100` is already a 404 on the live site; its copy lives in `templates/index.json` (shipping band, reproduced below). `custydesignlab` and `check-order-status` are dropped.

| Old (`/pages/…` unless noted) | New route |
|---|---|
| `how-it-works` | `/how-it-works` |
| `about-us` | `/about` |
| `contact` | `/contact` |
| `frequently-asked-questions-faqs` | `/faq` |
| `dtf-faq` | `/faq/dtf` |
| `sublimation-faq` | `/faq/sublimation` |
| `faq-print-on-your-own-item` | `/faq/print-on-your-own-item` |
| `delivery-speed` | `/delivery` |
| `billing-information` | `/billing` |
| `start-your-ecommerce-brand-without-tech-or-high-costs` | `/start-your-ecommerce-brand` |
| `launch-a-fully-automated-ecommerce-brand-no-tech-needed` | `/launch-automated-brand` |
| `⚠️-important-printing-notice` | `/printing-notice` |
| `sublimation-printing-notice` | `/sublimation-printing-notice` |
| `🎨-artwork-mockup-approval` | `/artwork-approval` |
| `measuring` | `/measuring` |
| `size-chart-<handle>` (47 pages) | `/size-charts/<handle>` |
| `/policies/privacy-policy` | `/policies/privacy` |
| `/policies/terms-of-service` | `/policies/terms` |
| `/policies/refund-policy` | `/policies/refund` |
| `/policies/shipping-policy` | `/policies/shipping` |

**47 size-chart handles** (old slug = `size-chart-` + handle; from the live pages sitemap):
`q-tees-q4350`, `q-tees-q2010`, `yp-classics-6506`, `valucap-vc300a`, `q-tees-q600`, `q-tees-qtb6000`, `q-tees-qtb`, `gildan-64800`, `gildan-8800`, `m-o-5540`, `jerzees-995mr`, `m-o-3590`, `m-o-4505`, `gildan-5200`, `gildan-5400b`, `gildan-5400`, `rabbit-skins-3317`, `gildan-18000b`, `independent-trading-co-ind5000c`, `gildan-12000`, `gildan-sf000`, `gildan-18000`, `rabbit-skins-3326`, `gildan-18600b`, `gildan-sf500b`, `gildan-18500b`, `independent-trading-co-afx64crp`, `independent-trading-co-ind5000p`, `independent-trading-co-ss4500z`, `independent-trading-co-ind4000`, `gildan-18600`, `gildan-12500`, `gildan-sf500`, `gildan-18500`, `rabbit-skins-4400`, `rabbit-skins-3322`, `gildan-5100p`, `gildan-5000b`, `gildan-8000b`, `gildan-64000l`, `gildan-64v00`, `comfort-colors-1717`, `bella-canvas-3001`, `american-apparel-1301`, `gildan-8000`, `gildan-64000`, `gildan-5000`

**Homepage YouTube videos** (id :: title, via oEmbed; first = featured):
- `Hz8PK6i8ZsE` :: Start Your Ecommerce Brand Without Tech or High Costs
- `YEj4ai8dLk0` :: Start an Ecommerce Business Without Tech Overwhelm
- `ZJUg0YhyIwU` :: Why Use 3 Companies for One Business? (Simple Solution)
- `upEzYyPL6mc` :: Build Your Own Print-on-Demand Business (Full Platform Setup)
- `fh0UNC947ms` :: Launch a Fully Automated Ecommerce Brand (No Tech Needed) | DropShipPOD.ca
- `FuunYt_DNfI` :: Stop Selling Merch Through DMs | Build a Real Brand Instead

**Supplier logos** (Shopify CDN filename key → local target under `public/images/logos/` → display name):

| CDN filename key | Target file | Name |
|---|---|---|
| `gildan_logo` | `gildan.png` | Gildan |
| `american-apparel-logo` | `american-apparel.png` | American Apparel |
| `bella-canvas` | `bella-canvas.png` | Bella + Canvas |
| `mando` | `m-o-knits.png` | M&O Knits |
| `champion-logo` | `champion.png` | Champion |
| `comfort-colors` | `comfort-colors.png` | Comfort Colors |
| `core365` | `core365.jpg` | CORE365 |
| `q-tees` | `q-tees.jpg` | Q-Tees |
| `valucap_logo` | `valucap.jpg` | Valucap |
| `rabbit_skins_logo` | `rabbit-skins.jpg` | Rabbit Skins |
| `jerzees_logo` | `jerzees.jpg` | Jerzees |
| `independent_trading_co` | `independent-trading-co.svg` | Independent Trading Co. |
| `nextlevel` | `next-level.jpg` | Next Level |
| `yp-classics` | `yp-classics.png` | YP Classics |

**Testimonials** (Google reviews, 5 stars each, verbatim from `templates/index.json`):
- **Nick M.** — "Unbeatable prices—almost half the cost compared to anywhere else! The quality is amazing, the colors are so vibrant, and the turnaround time is lightning fast. The customer service (from Matina) was top-notch too. This is a game-changing discovery, and I'm switching to this site for all my future orders!"
- **Judy M.** — "I couldn't believe the prices—almost half of what I was paying elsewhere! The quality is outstanding, the prints are vibrant, and my order arrived so quickly. Mitchell's customer service was fantastic!!. This site is now my go-to for prints, hands down!"
- **Tim P.** — "The prices here are almost half what I've been paying anywhere else! The quality, vibrancy, and fast shipping are unbelievable. Mitchell is incredible!! This is a game-changing discovery—I'll be switching all my print orders to this site!"

**Shipping band copy** (from `templates/index.json`, reused on homepage band and merged into `/delivery`):
- Free shipping on all orders over **$199**; optional pick-up at warehouse.
- Ground: ON/QC/NB 1–2 business days; MB/SK/NS/NL/PE 2–4; AB/BC 3–5.
- Express: all listed provinces 1–2 business days.

**Social links:** Facebook `https://www.facebook.com/CheapestPrintOnDemand/`, Instagram `https://www.instagram.com/cheapestprintondemand/`, TikTok `https://www.tiktok.com/@cheapest.print.on.demand`, YouTube `https://www.youtube.com/@DropShipPOD`.

**How-it-works 5 steps** (verbatim on `/how-it-works`; condensed labels used by the homepage teaser are defined in Task 6).

---
### Task 1: Scaffold — Next 15 + Tailwind v4 + fonts + tokens + Vitest

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `.gitignore`
- Create: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Create: `lib/utils.ts`
- Test: `lib/utils.test.ts`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `cn(...classes: Array<string | false | null | undefined>): string` from `lib/utils.ts`; Tailwind tokens `brand`, `brand-dark`, `ink`, `ink-soft`, `surface`, fonts `font-sans`/`font-display`; path alias `@/*` → repo root; scripts `pnpm dev|build|start|test|scrape|scrape:size-charts|fetch-assets`.

- [ ] **Step 1: Write `package.json`** (the theme dirs are not touched; this makes the repo root a Node project)

```json
{
  "name": "dropshippod-site",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest",
    "scrape": "node scripts/scrape.mjs",
    "scrape:size-charts": "node scripts/scrape-size-charts.mjs",
    "fetch-assets": "node scripts/fetch-assets.mjs"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
pnpm add next@15 react@19 react-dom@19 lucide-react
pnpm add -D typescript @types/node @types/react @types/react-dom \
  tailwindcss@4 @tailwindcss/postcss@4 @tailwindcss/typography \
  vitest @vitejs/plugin-react jsdom vite-tsconfig-paths \
  @testing-library/react @testing-library/jest-dom
```

Expected: `pnpm-lock.yaml` created; no peer-dependency errors. (If pnpm reports "Ignored build scripts", run `pnpm approve-builds` and approve them.)

- [ ] **Step 3: Write config files**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "app/**/*", "components/**/*", "content/**/*", "lib/**/*", "mdx-components.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts` (minimal now; Task 8 adds MDX, Task 13 adds redirects):
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

`postcss.config.mjs`:
```js
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
```

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}", "components/**/*.test.{ts,tsx}", "content/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}", "scripts/**/*.test.mjs"],
  },
});
```

`vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

`.gitignore`:
```
node_modules/
.next/
out/
*.tsbuildinfo
.env*
.DS_Store
.idea/
```

- [ ] **Step 4: Write `app/globals.css`** (Tailwind v4 CSS-first tokens)

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), var(--font-manrope), ui-sans-serif, sans-serif;

  --color-brand: #cb1836;
  --color-brand-dark: #a31029;
  --color-ink: #1e2d7d;
  --color-ink-soft: #144579;
  --color-surface: #f7f7f8;
}
```

- [ ] **Step 5: Write `app/layout.tsx` and placeholder `app/page.tsx`**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL("https://dropshippod.ca"),
  title: {
    default: "DropShipPOD — Print-on-Demand Dropshipping in Canada",
    template: "%s | DropShipPOD",
  },
  description:
    "DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app. We print, pack and ship your custom apparel — no inventory, no tech headaches.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white font-sans text-zinc-900 antialiased">{children}</body>
    </html>
  );
}
```

`app/page.tsx` (placeholder, replaced in Task 7):
```tsx
export default function HomePage() {
  return <h1 className="p-8 font-display text-4xl font-bold text-ink">DropShipPOD</h1>;
}
```

- [ ] **Step 6: Write the failing test** — `lib/utils.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins truthy class names with spaces", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("drops falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `pnpm test`
Expected: FAIL — cannot resolve `./utils`.

- [ ] **Step 8: Write `lib/utils.ts`**

```ts
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 9: Run tests and build**

Run: `pnpm test` → Expected: PASS (2 tests).
Run: `pnpm build` → Expected: compiles; static route `/` in output. (First build creates `next-env.d.ts` — commit it.)

- [ ] **Step 10: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json next.config.ts postcss.config.mjs \
  vitest.config.ts vitest.setup.ts .gitignore next-env.d.ts app/ lib/
git commit -m "feat: scaffold Next.js 15 app with Tailwind v4 tokens, fonts, and Vitest"
```

---

### Task 2: UI primitives — Button, Container, Section, Card, Prose

**Files:**
- Create: `components/ui/button.tsx`, `components/ui/container.tsx`, `components/ui/section.tsx`, `components/ui/card.tsx`, `components/ui/prose.tsx`
- Test: `components/ui/primitives.test.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`.
- Produces: `Button` (props: `React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" }`), `ButtonLink` (`{ href: string; variant?: ButtonVariant; className?: string; children: React.ReactNode }`), `buttonClasses(variant?, className?)`; `Container`/`Card`/`Prose` (`{ className?: string; children: React.ReactNode }`); `Section` (`{ id?: string; className?: string; children }`); `SectionHeading` (`{ eyebrow?: string; title: string; className?: string }`).

- [ ] **Step 1: Write the failing tests** — `components/ui/primitives.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, ButtonLink } from "./button";
import { Container } from "./container";
import { Section, SectionHeading } from "./section";
import { Card } from "./card";
import { Prose } from "./prose";

describe("Button", () => {
  it("renders a primary button by default", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" }).className).toContain("bg-brand");
  });
  it("renders variants", () => {
    render(<Button variant="outline">Alt</Button>);
    expect(screen.getByRole("button", { name: "Alt" }).className).toContain("border");
  });
  it("ButtonLink renders an anchor with the same styling", () => {
    render(<ButtonLink href="/contact">Contact</ButtonLink>);
    const link = screen.getByRole("link", { name: "Contact" });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link.className).toContain("bg-brand");
  });
});

describe("layout primitives", () => {
  it("Container centers content", () => {
    const { container } = render(<Container>x</Container>);
    expect((container.firstChild as HTMLElement).className).toContain("max-w-6xl");
  });
  it("Section renders a section element with an id", () => {
    const { container } = render(<Section id="s1">x</Section>);
    expect(container.querySelector("section#s1")).not.toBeNull();
  });
  it("SectionHeading renders eyebrow and title", () => {
    render(<SectionHeading eyebrow="Why us" title="Printing methods" />);
    expect(screen.getByText("Why us")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Printing methods" })).toBeInTheDocument();
  });
  it("Card and Prose render children", () => {
    render(
      <Card>
        <Prose>
          <p>body</p>
        </Prose>
      </Card>,
    );
    expect(screen.getByText("body")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test` → Expected: FAIL — cannot resolve `./button` etc.

- [ ] **Step 3: Implement the primitives**

`components/ui/button.tsx`:
```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900",
};

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button {...rest} className={buttonClasses(variant, className)} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}
```

`components/ui/container.tsx`:
```tsx
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
```

`components/ui/section.tsx`:
```tsx
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
    </div>
  );
}
```

`components/ui/card.tsx`:
```tsx
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm", className)}>{children}</div>;
}
```

`components/ui/prose.tsx`:
```tsx
import { cn } from "@/lib/utils";

export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test` → Expected: PASS (all suites).

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI primitives (Button, Container, Section, Card, Prose)"
```

---

### Task 3: Site chrome — nav data, Header, Footer

**Files:**
- Create: `lib/nav.ts`, `components/header.tsx`, `components/footer.tsx`
- Modify: `app/layout.tsx` (wrap children with Header/Footer)
- Test: `lib/nav.test.ts`, `components/header.test.tsx`

**Interfaces:**
- Consumes: `cn`, UI primitives.
- Produces: from `lib/nav.ts` — `type NavLink = { label: string; href: string }`, `type NavGroup = { label: string; links: NavLink[] }`, `type NavEntry = NavLink | NavGroup`, `isGroup(e: NavEntry): e is NavGroup`, `primaryNav: NavEntry[]`, `footerColumns: NavGroup[]`, `socialLinks: NavLink[]`. Components `Header`, `Footer` (no props).

- [ ] **Step 1: Write the failing tests**

`lib/nav.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { footerColumns, isGroup, primaryNav, socialLinks } from "./nav";

function allLinks() {
  const fromPrimary = primaryNav.flatMap((e) => (isGroup(e) ? e.links : [e]));
  const fromFooter = footerColumns.flatMap((c) => c.links);
  return [...fromPrimary, ...fromFooter];
}

describe("nav data", () => {
  it("every link has a label and an internal href", () => {
    for (const link of allLinks()) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.href).toMatch(/^\//);
    }
  });
  it("contains no Shopify-era paths", () => {
    for (const link of allLinks()) {
      expect(link.href).not.toMatch(/\/(pages|products|collections|cart|account)(\/|$)/);
    }
  });
  it("footer includes all four policy pages", () => {
    const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    for (const p of ["/policies/privacy", "/policies/terms", "/policies/refund", "/policies/shipping"]) {
      expect(hrefs).toContain(p);
    }
  });
  it("social links are the four known profiles", () => {
    expect(socialLinks.map((s) => s.label).sort()).toEqual(["Facebook", "Instagram", "TikTok", "YouTube"]);
    for (const s of socialLinks) expect(s.href).toMatch(/^https:\/\//);
  });
});
```

`components/header.test.tsx`:
```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("renders the wordmark linking home", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /dropshippod/i })).toHaveAttribute("href", "/");
  });
  it("opens a dropdown group on click", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Help & FAQs" }));
    expect(screen.getByRole("link", { name: "DTF FAQ" })).toHaveAttribute("href", "/faq/dtf");
  });
  it("mobile menu toggle exposes all top-level entries", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByRole("link", { name: "How it works" }).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test` → Expected: FAIL — cannot resolve `./nav` / `./header`.

- [ ] **Step 3: Write `lib/nav.ts`**

```ts
export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export function isGroup(entry: NavEntry): entry is NavGroup {
  return "links" in entry;
}

export const primaryNav: NavEntry[] = [
  { label: "How it works", href: "/how-it-works" },
  {
    label: "Start a brand",
    links: [
      { label: "Start your ecommerce brand", href: "/start-your-ecommerce-brand" },
      { label: "Launch an automated brand", href: "/launch-automated-brand" },
    ],
  },
  {
    label: "Help & FAQs",
    links: [
      { label: "General FAQ", href: "/faq" },
      { label: "DTF FAQ", href: "/faq/dtf" },
      { label: "Sublimation FAQ", href: "/faq/sublimation" },
      { label: "Print on your own item", href: "/faq/print-on-your-own-item" },
      { label: "Delivery speed", href: "/delivery" },
      { label: "Billing information", href: "/billing" },
    ],
  },
  {
    label: "Sizing",
    links: [
      { label: "Size charts", href: "/size-charts" },
      { label: "How to measure", href: "/measuring" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: NavGroup[] = [
  {
    label: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Start your ecommerce brand", href: "/start-your-ecommerce-brand" },
      { label: "Launch an automated brand", href: "/launch-automated-brand" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "DTF FAQ", href: "/faq/dtf" },
      { label: "Sublimation FAQ", href: "/faq/sublimation" },
      { label: "Print on your own item", href: "/faq/print-on-your-own-item" },
      { label: "Delivery speed", href: "/delivery" },
      { label: "Billing information", href: "/billing" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Printing notice", href: "/printing-notice" },
      { label: "Sublimation printing notice", href: "/sublimation-printing-notice" },
      { label: "Artwork & mockup approval", href: "/artwork-approval" },
      { label: "Size charts", href: "/size-charts" },
      { label: "How to measure", href: "/measuring" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy policy", href: "/policies/privacy" },
      { label: "Terms of service", href: "/policies/terms" },
      { label: "Refund policy", href: "/policies/refund" },
      { label: "Shipping policy", href: "/policies/shipping" },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/CheapestPrintOnDemand/" },
  { label: "Instagram", href: "https://www.instagram.com/cheapestprintondemand/" },
  { label: "TikTok", href: "https://www.tiktok.com/@cheapest.print.on.demand" },
  { label: "YouTube", href: "https://www.youtube.com/@DropShipPOD" },
];
```

- [ ] **Step 4: Write `components/header.tsx`** (client component: dropdowns + mobile drawer)

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { isGroup, primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

function Wordmark() {
  return (
    <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
      DropShip<span className="text-brand">POD</span>
    </Link>
  );
}

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((entry) =>
            isGroup(entry) ? (
              <div
                key={entry.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(entry.label)}
                onMouseLeave={() => setOpenGroup((g) => (g === entry.label ? null : g))}
              >
                <button
                  type="button"
                  aria-expanded={openGroup === entry.label}
                  onClick={() => setOpenGroup((g) => (g === entry.label ? null : entry.label))}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:text-ink"
                >
                  {entry.label}
                  <ChevronDown aria-hidden className="h-4 w-4" />
                </button>
                {openGroup === entry.label ? (
                  <div className="absolute left-0 top-full w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
                    {entry.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenGroup(null)}
                        className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-surface hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:text-ink"
              >
                {entry.label}
              </Link>
            ),
          )}
          <ButtonLink href="/contact" className="ml-3 px-4 py-2">
            Get started
          </ButtonLink>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-zinc-700 lg:hidden"
        >
          {mobileOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn("border-t border-zinc-200 bg-white lg:hidden", mobileOpen ? "block" : "hidden")}>
        <nav aria-label="Mobile" className="space-y-1 px-4 py-4">
          {primaryNav.map((entry) =>
            isGroup(entry) ? (
              <div key={entry.label} className="py-1">
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {entry.label}
                </p>
                {entry.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-surface"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Write `components/footer.tsx`**

```tsx
import Link from "next/link";
import { footerColumns, socialLinks } from "@/lib/nav";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-surface">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <p className="text-sm font-semibold text-ink">{column.label}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-zinc-600 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} DropShipPOD. All rights reserved.</p>
          <ul className="flex gap-5">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-zinc-600 hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 6: Wire into `app/layout.tsx`** — replace the `<body>` line so children are framed by the chrome:

```tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
```
```tsx
      <body className="bg-white font-sans text-zinc-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
```

- [ ] **Step 7: Run tests and build**

Run: `pnpm test` → Expected: PASS.
Run: `pnpm build` → Expected: compiles. (Nav links point at routes that don't exist yet — that's fine; Next does not validate link targets.)

- [ ] **Step 8: Commit**

```bash
git add lib/nav.ts lib/nav.test.ts components/header.tsx components/header.test.tsx components/footer.tsx app/layout.tsx
git commit -m "feat: add site chrome — nav data, header with dropdowns/mobile drawer, footer"
```

---
### Task 4: Scrape pipeline — page bodies → `content/raw/*.md`

**Files:**
- Create: `scripts/lib/extract.mjs`, `scripts/scrape.mjs`
- Create (by running the script): `content/raw/*.md` (19 files)
- Test: `scripts/lib/extract.test.mjs`

**Interfaces:**
- Consumes: nothing in-app (standalone Node scripts; Node 22 global `fetch`).
- Produces: `extractPage(html: string): { title, bodyHtml }`, `extractPolicy(html: string): { title, bodyHtml }`, `toMarkdown(html: string): string` from `scripts/lib/extract.mjs`; raw content files `content/raw/<out>.md` with `title`/`source` frontmatter for outs: `how-it-works`, `about`, `contact`, `faq-general`, `faq-dtf`, `faq-sublimation`, `faq-print-on-your-own-item`, `delivery`, `billing`, `start-your-ecommerce-brand`, `launch-automated-brand`, `printing-notice`, `sublimation-printing-notice`, `artwork-approval`, `measuring`, `policy-privacy`, `policy-terms`, `policy-refund`, `policy-shipping`.

- [ ] **Step 1: Install scraper dependencies**

```bash
pnpm add -D cheerio turndown turndown-plugin-gfm
```

- [ ] **Step 2: Write the failing test** — `scripts/lib/extract.test.mjs`

```js
import { describe, expect, it } from "vitest";
import { extractPage, extractPolicy, toMarkdown } from "./extract.mjs";

const PAGE_HTML = `<html><body>
<section data-section-id="x" data-section-type="page">
  <div class="container">
    <header class="page__header"><h1 class="page__title heading h1">Test Page</h1></header>
    <div class="page__content rte">
      <p>Hello <strong>world</strong></p>
      <ul><li>One</li><li>Two</li></ul>
      <table><thead><tr><th>Size</th><th>Chest</th></tr></thead>
        <tbody><tr><td>S</td><td>18</td></tr></tbody></table>
      <script>evil()</script>
    </div>
  </div>
</section>
</body></html>`;

const POLICY_HTML = `<html><body>
<div class="shopify-policy__container">
  <div class="shopify-policy__title"><h1>Privacy Policy</h1></div>
  <div class="shopify-policy__body"><p>We respect privacy.</p></div>
</div>
</body></html>`;

describe("extractPage", () => {
  it("pulls the title and body, stripping scripts", () => {
    const { title, bodyHtml } = extractPage(PAGE_HTML);
    expect(title).toBe("Test Page");
    expect(bodyHtml).toContain("Hello");
    expect(bodyHtml).not.toContain("evil()");
  });
  it("throws when the page section is missing", () => {
    expect(() => extractPage("<html><body><p>nope</p></body></html>")).toThrow();
  });
});

describe("extractPolicy", () => {
  it("pulls title and body from the policy wrapper", () => {
    const { title, bodyHtml } = extractPolicy(POLICY_HTML);
    expect(title).toBe("Privacy Policy");
    expect(bodyHtml).toContain("We respect privacy.");
  });
});

describe("toMarkdown", () => {
  it("converts emphasis, lists and tables to GFM", () => {
    const md = toMarkdown(extractPage(PAGE_HTML).bodyHtml);
    expect(md).toContain("**world**");
    expect(md).toContain("- One");
    expect(md).toContain("| Size | Chest |");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test scripts` → Expected: FAIL — cannot resolve `./extract.mjs`.

- [ ] **Step 4: Write `scripts/lib/extract.mjs`**

```js
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

function cleanBody($, body) {
  body.find("script, style, noscript").remove();
  return body.html() ?? "";
}

export function extractPage(html) {
  const $ = cheerio.load(html);
  const root = $('[data-section-type="page"]').first();
  const title = root.find("h1.page__title").first().text().trim();
  const body = root.find(".page__content").first();
  if (!title || body.length === 0) throw new Error("page structure not found");
  return { title, bodyHtml: cleanBody($, body) };
}

export function extractPolicy(html) {
  const $ = cheerio.load(html);
  const root = $(".shopify-policy__container").first();
  const title = root.find(".shopify-policy__title h1").first().text().trim();
  const body = root.find(".shopify-policy__body").first();
  if (!title || body.length === 0) throw new Error("policy structure not found");
  return { title, bodyHtml: cleanBody($, body) };
}

export function toMarkdown(html) {
  const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-" });
  turndown.use(gfm);
  turndown.keep(["iframe"]);
  return turndown.turndown(html);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test scripts` → Expected: PASS.

- [ ] **Step 6: Write `scripts/scrape.mjs`** (thin fetch/IO wrapper — covered by running it, not unit tests)

```js
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { extractPage, extractPolicy, toMarkdown } from "./lib/extract.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "http://127.0.0.1:9292";
const LIVE = "https://dropshippod.ca";

const PAGES = [
  { slug: "how-it-works", out: "how-it-works" },
  { slug: "about-us", out: "about" },
  { slug: "contact", out: "contact" },
  { slug: "frequently-asked-questions-faqs", out: "faq-general" },
  { slug: "dtf-faq", out: "faq-dtf" },
  { slug: "sublimation-faq", out: "faq-sublimation" },
  { slug: "faq-print-on-your-own-item", out: "faq-print-on-your-own-item" },
  { slug: "delivery-speed", out: "delivery" },
  { slug: "billing-information", out: "billing" },
  { slug: "start-your-ecommerce-brand-without-tech-or-high-costs", out: "start-your-ecommerce-brand" },
  { slug: "launch-a-fully-automated-ecommerce-brand-no-tech-needed", out: "launch-automated-brand" },
  { slug: "⚠️-important-printing-notice", out: "printing-notice" },
  { slug: "sublimation-printing-notice", out: "sublimation-printing-notice" },
  { slug: "🎨-artwork-mockup-approval", out: "artwork-approval" },
  { slug: "measuring", out: "measuring" },
];

const POLICIES = [
  { slug: "privacy-policy", out: "policy-privacy" },
  { slug: "terms-of-service", out: "policy-terms" },
  { slug: "refund-policy", out: "policy-refund" },
  { slug: "shipping-policy", out: "policy-shipping" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchHtml(pathname) {
  for (const base of [LOCAL, LIVE]) {
    try {
      const res = await fetch(base + encodeURI(pathname), { redirect: "follow" });
      if (res.ok) return await res.text();
    } catch {
      // base unreachable — try the next one
    }
  }
  throw new Error(`could not fetch ${pathname} from ${LOCAL} or ${LIVE}`);
}

const outDir = path.join(process.cwd(), "content", "raw");
await mkdir(outDir, { recursive: true });
const failures = [];

async function scrapeOne(pathname, out, extract) {
  try {
    const html = await fetchHtml(pathname);
    const { title, bodyHtml } = extract(html);
    const md = toMarkdown(bodyHtml);
    const frontmatter = `---\ntitle: "${title.replaceAll('"', '\\"')}"\nsource: ${pathname}\n---\n\n`;
    await writeFile(path.join(outDir, `${out}.md`), frontmatter + md + "\n");
    console.log(`ok  ${pathname} -> content/raw/${out}.md`);
  } catch (error) {
    failures.push(`${pathname}: ${error.message}`);
    console.error(`FAIL ${pathname}: ${error.message}`);
  }
  await sleep(300);
}

for (const { slug, out } of PAGES) await scrapeOne(`/pages/${slug}`, out, extractPage);
for (const { slug, out } of POLICIES) await scrapeOne(`/policies/${slug}`, out, extractPolicy);

console.log(`\n${PAGES.length + POLICIES.length - failures.length} ok, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
```

- [ ] **Step 7: Run the scraper and verify output**

Run: `pnpm scrape`
Expected: `19 ok, 0 failed`; `ls content/raw | wc -l` → `19`. Spot-check `content/raw/how-it-works.md` — it must contain the 5 steps text ("Step 1: Select the product…"). If a page fails on both sources, stop and report; do not stub content.

- [ ] **Step 8: Commit** (raw content is committed — it is the one-time extraction record that later tasks hand-clean)

```bash
git add scripts/ content/raw/
git commit -m "feat: add one-time scrape pipeline and raw page content"
```

---

### Task 5: Asset pipeline — Shopify CDN images + video posters → `public/`

**Files:**
- Create: `scripts/lib/assets.mjs`, `scripts/fetch-assets.mjs`
- Create (by running the script): `public/images/logos/*` (14), `public/images/videos/*.jpg` (6), `public/images/steps.png`, `public/images/shipping.webp`, `public/images/content/*` (whatever the raw pages reference)
- Modify (by running the script): `content/raw/*.md` (CDN URLs rewritten to `/images/content/...`)
- Test: `scripts/lib/assets.test.mjs`

**Interfaces:**
- Consumes: `content/raw/*.md` from Task 4.
- Produces: helpers `normalizeCdnUrl(url: string): string`, `collectCdnImageUrls(html: string): string[]`, `matchAsset(urls: string[], key: string): string | undefined`, `rewriteCdnUrls(text: string, mapping: Record<string, string>): string`; the `public/images/` tree above (paths used by Tasks 6–9).

- [ ] **Step 1: Write the failing test** — `scripts/lib/assets.test.mjs`

```js
import { describe, expect, it } from "vitest";
import { collectCdnImageUrls, matchAsset, normalizeCdnUrl, rewriteCdnUrls } from "./assets.mjs";

const CDN = "https://cdn.shopify.com/s/files/1/0646/3881/2399/files";

describe("normalizeCdnUrl", () => {
  it("strips query strings and size-variant infixes before the extension", () => {
    expect(normalizeCdnUrl(`${CDN}/gildan_logo_160x.png?v=123`)).toBe(`${CDN}/gildan_logo.png`);
  });
  it("keeps size-looking tokens that are part of the original filename", () => {
    expect(normalizeCdnUrl(`${CDN}/shipping_logo_900x_d5c2a14a-f84f.webp?v=1`)).toBe(
      `${CDN}/shipping_logo_900x_d5c2a14a-f84f.webp`,
    );
  });
});

describe("collectCdnImageUrls", () => {
  it("collects src and srcset URLs, normalizing protocol-relative ones", () => {
    const html = `
      <img src="//cdn.shopify.com/s/files/1/0646/3881/2399/files/a.png?v=1">
      <img srcset="${CDN}/b_160x.png 160w, ${CDN}/b_320x.png 320w">
      <img src="/local/ignore.png">`;
    const urls = collectCdnImageUrls(html);
    expect(urls).toContain(`${CDN}/a.png?v=1`);
    expect(urls.some((u) => u.includes("/b_160x.png"))).toBe(true);
    expect(urls.some((u) => u.includes("ignore"))).toBe(false);
  });
});

describe("matchAsset", () => {
  const urls = [`${CDN}/Rabbit_Skins_Logo.jpg`, `${CDN}/NextLevel.jpg`];
  it("matches case-insensitively on the basename", () => {
    expect(matchAsset(urls, "rabbit_skins_logo")).toBe(`${CDN}/Rabbit_Skins_Logo.jpg`);
    expect(matchAsset(urls, "nextlevel")).toBe(`${CDN}/NextLevel.jpg`);
  });
  it("returns undefined when nothing matches", () => {
    expect(matchAsset(urls, "gildan")).toBeUndefined();
  });
});

describe("rewriteCdnUrls", () => {
  it("replaces mapped URLs and leaves other text alone", () => {
    const text = `![img](${CDN}/a.png?v=1) and plain text`;
    const out = rewriteCdnUrls(text, { [`${CDN}/a.png?v=1`]: "/images/content/a.png" });
    expect(out).toBe("![img](/images/content/a.png) and plain text");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test scripts` → Expected: FAIL — cannot resolve `./assets.mjs`.

- [ ] **Step 3: Write `scripts/lib/assets.mjs`**

```js
import * as cheerio from "cheerio";

export function normalizeCdnUrl(url) {
  const noQuery = url.split("?")[0];
  // strip _<width>x or _<width>x<height> ONLY when directly before the extension
  return noQuery.replace(/_\d+x\d*(?=\.[a-z0-9]+$)/i, "");
}

export function collectCdnImageUrls(html) {
  const $ = cheerio.load(html);
  const urls = new Set();
  const add = (raw) => {
    if (!raw) return;
    const url = raw.startsWith("//") ? `https:${raw}` : raw;
    if (url.includes("cdn.shopify.com")) urls.add(url);
  };
  $("img, source").each((_, el) => {
    add($(el).attr("src"));
    const srcset = $(el).attr("srcset");
    if (srcset) for (const part of srcset.split(",")) add(part.trim().split(/\s+/)[0]);
  });
  return [...urls];
}

export function matchAsset(urls, key) {
  const needle = key.toLowerCase();
  return urls.find((url) => {
    const basename = decodeURIComponent(url.split("/").pop() ?? "").toLowerCase();
    return basename.includes(needle);
  });
}

export function rewriteCdnUrls(text, mapping) {
  let out = text;
  for (const [from, to] of Object.entries(mapping)) out = out.replaceAll(from, to);
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test scripts` → Expected: PASS.

- [ ] **Step 5: Write `scripts/fetch-assets.mjs`**

```js
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { collectCdnImageUrls, matchAsset, normalizeCdnUrl, rewriteCdnUrls } from "./lib/assets.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "http://127.0.0.1:9292";
const LIVE = "https://dropshippod.ca";
const CDN = "https://cdn.shopify.com/s/files/1/0646/3881/2399/files";
const PUBLIC = path.join(process.cwd(), "public", "images");

const LOGO_SEEDS = [
  { key: "gildan_logo", out: "gildan.png" },
  { key: "american-apparel-logo", out: "american-apparel.png" },
  { key: "bella-canvas", out: "bella-canvas.png" },
  { key: "mando", out: "m-o-knits.png" },
  { key: "champion-logo", out: "champion.png" },
  { key: "comfort-colors", out: "comfort-colors.png" },
  { key: "core365", out: "core365.jpg" },
  { key: "q-tees", out: "q-tees.jpg" },
  { key: "valucap_logo", out: "valucap.jpg" },
  { key: "rabbit_skins_logo", out: "rabbit-skins.jpg" },
  { key: "jerzees_logo", out: "jerzees.jpg" },
  { key: "independent_trading_co", out: "independent-trading-co.svg" },
  { key: "nextlevel", out: "next-level.jpg" },
  { key: "yp-classics", out: "yp-classics.png" },
];

const VIDEO_IDS = ["Hz8PK6i8ZsE", "YEj4ai8dLk0", "ZJUg0YhyIwU", "upEzYyPL6mc", "fh0UNC947ms", "FuunYt_DNfI"];

const failures = [];

async function fetchHtml(pathname) {
  for (const base of [LOCAL, LIVE]) {
    try {
      const res = await fetch(base + pathname, { redirect: "follow" });
      if (res.ok) return await res.text();
    } catch {
      // try next base
    }
  }
  throw new Error(`could not fetch ${pathname}`);
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`ok  ${url} -> ${path.relative(process.cwd(), dest)}`);
}

async function tryDownload(url, dest, label) {
  try {
    await download(url, dest);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

// 1. Supplier logos + shipping badge, located by scanning the homepage's CDN images
const homeHtml = await fetchHtml("/");
const homeUrls = collectCdnImageUrls(homeHtml).map(normalizeCdnUrl);

for (const seed of LOGO_SEEDS) {
  const url = matchAsset(homeUrls, seed.key);
  if (!url) {
    failures.push(`logo not found on homepage: ${seed.key}`);
    continue;
  }
  await tryDownload(url, path.join(PUBLIC, "logos", seed.out), seed.key);
}
const shippingUrl = matchAsset(homeUrls, "shipping_logo");
if (shippingUrl) await tryDownload(shippingUrl, path.join(PUBLIC, "shipping.webp"), "shipping_logo");
else failures.push("shipping_logo not found on homepage");

// 2. Known standalone assets
await tryDownload(`${CDN}/steps.png`, path.join(PUBLIC, "steps.png"), "steps.png");

// 3. YouTube poster frames (self-hosted so the facade loads nothing from YouTube until click)
for (const id of VIDEO_IDS) {
  await tryDownload(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, path.join(PUBLIC, "videos", `${id}.jpg`), `poster ${id}`);
}

// 4. Images referenced inside scraped content — download and rewrite in place
const rawDir = path.join(process.cwd(), "content", "raw");
for (const file of (await readdir(rawDir)).filter((f) => f.endsWith(".md"))) {
  const filePath = path.join(rawDir, file);
  const text = await readFile(filePath, "utf8");
  const refs = [...new Set(text.match(/https?:\/\/cdn\.shopify\.com\/[^\s)"']+/g) ?? [])];
  const mapping = {};
  for (const ref of refs) {
    const clean = normalizeCdnUrl(ref);
    const basename = decodeURIComponent(clean.split("/").pop());
    await tryDownload(clean, path.join(PUBLIC, "content", basename), `${file}: ${basename}`);
    mapping[ref] = `/images/content/${basename}`;
  }
  if (refs.length > 0) await writeFile(filePath, rewriteCdnUrls(text, mapping));
}

console.log(`\ndone, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
```

- [ ] **Step 6: Run the pipeline and verify**

Run: `pnpm fetch-assets`
Expected: `done, 0 failed`. Verify:
```bash
ls public/images/logos | wc -l        # 14
ls public/images/videos | wc -l       # 6
grep -rl "cdn.shopify.com" content/raw | wc -l   # 0
```
If a logo key fails to match, check the actual filename on the homepage (`curl -s https://dropshippod.ca | grep -o 'cdn.shopify.com[^"]*'`) and adjust that seed's `key` — do not skip the logo.

- [ ] **Step 7: Commit**

```bash
git add scripts/ content/raw/ public/images/
git commit -m "feat: add asset pipeline; self-host CDN images and video posters"
```

---

### Task 6: Homepage data files + media components

**Files:**
- Create: `content/videos.ts`, `content/logos.ts`, `content/testimonials.ts`, `content/steps.ts`
- Create: `components/video-embed.tsx`, `components/logo-wall.tsx`, `components/testimonial-list.tsx`, `components/step-list.tsx`
- Test: `components/media.test.tsx`

**Interfaces:**
- Consumes: `public/images/` assets from Task 5; UI primitives.
- Produces: `Video = { id: string; title: string }`, `featuredVideo: Video`, `moreVideos: Video[]` (5); `Logo = { name: string; src: string }`, `logos: Logo[]` (14); `Testimonial = { name: string; quote: string }`, `testimonials: Testimonial[]` (3); `Step = { label: string; detail: string }`, `steps: Step[]` (5). Components: `VideoEmbed({ id, title, priority? })`, `LogoWall()` (renders `logos`), `TestimonialList()`, `StepList()`.

- [ ] **Step 1: Write the data files** (values verbatim from Captured Data)

`content/videos.ts`:
```ts
export type Video = { id: string; title: string };

export const featuredVideo: Video = {
  id: "Hz8PK6i8ZsE",
  title: "Start Your Ecommerce Brand Without Tech or High Costs",
};

export const moreVideos: Video[] = [
  { id: "YEj4ai8dLk0", title: "Start an Ecommerce Business Without Tech Overwhelm" },
  { id: "ZJUg0YhyIwU", title: "Why Use 3 Companies for One Business? (Simple Solution)" },
  { id: "upEzYyPL6mc", title: "Build Your Own Print-on-Demand Business (Full Platform Setup)" },
  { id: "fh0UNC947ms", title: "Launch a Fully Automated Ecommerce Brand (No Tech Needed)" },
  { id: "FuunYt_DNfI", title: "Stop Selling Merch Through DMs | Build a Real Brand Instead" },
];
```

`content/logos.ts`:
```ts
export type Logo = { name: string; src: string };

export const logos: Logo[] = [
  { name: "Gildan", src: "/images/logos/gildan.png" },
  { name: "American Apparel", src: "/images/logos/american-apparel.png" },
  { name: "Bella + Canvas", src: "/images/logos/bella-canvas.png" },
  { name: "M&O Knits", src: "/images/logos/m-o-knits.png" },
  { name: "Champion", src: "/images/logos/champion.png" },
  { name: "Comfort Colors", src: "/images/logos/comfort-colors.png" },
  { name: "CORE365", src: "/images/logos/core365.jpg" },
  { name: "Q-Tees", src: "/images/logos/q-tees.jpg" },
  { name: "Valucap", src: "/images/logos/valucap.jpg" },
  { name: "Rabbit Skins", src: "/images/logos/rabbit-skins.jpg" },
  { name: "Jerzees", src: "/images/logos/jerzees.jpg" },
  { name: "Independent Trading Co.", src: "/images/logos/independent-trading-co.svg" },
  { name: "Next Level", src: "/images/logos/next-level.jpg" },
  { name: "YP Classics", src: "/images/logos/yp-classics.png" },
];
```

`content/testimonials.ts` (quotes verbatim — including the double punctuation):
```ts
export type Testimonial = { name: string; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Nick M.",
    quote:
      "Unbeatable prices—almost half the cost compared to anywhere else! The quality is amazing, the colors are so vibrant, and the turnaround time is lightning fast. The customer service (from Matina) was top-notch too. This is a game-changing discovery, and I'm switching to this site for all my future orders!",
  },
  {
    name: "Judy M.",
    quote:
      "I couldn't believe the prices—almost half of what I was paying elsewhere! The quality is outstanding, the prints are vibrant, and my order arrived so quickly. Mitchell's customer service was fantastic!!. This site is now my go-to for prints, hands down!",
  },
  {
    name: "Tim P.",
    quote:
      "The prices here are almost half what I've been paying anywhere else! The quality, vibrancy, and fast shipping are unbelievable. Mitchell is incredible!! This is a game-changing discovery—I'll be switching all my print orders to this site!",
  },
];
```

`content/steps.ts` (homepage teaser labels; `/how-it-works` keeps the verbatim scraped text):
```ts
export type Step = { label: string; detail: string };

export const steps: Step[] = [
  { label: "Pick a product", detail: "Choose from our vast selection of blanks from top brands." },
  { label: "Choose your colors", detail: "Pick the product colors that fit your brand." },
  { label: "Upload your design", detail: "Use your own artwork or pick from thousands of ready designs." },
  { label: "Pick sizes & quantities", detail: "Order exactly what you need — no minimums." },
  { label: "We print, pack & ship", detail: "Your order is produced in Canada and shipped straight to your customer." },
];
```

- [ ] **Step 2: Write the failing component tests** — `components/media.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { VideoEmbed } from "./video-embed";
import { LogoWall } from "./logo-wall";
import { TestimonialList } from "./testimonial-list";
import { StepList } from "./step-list";
import { logos } from "@/content/logos";
import { testimonials } from "@/content/testimonials";
import { steps } from "@/content/steps";

describe("VideoEmbed", () => {
  it("renders a poster button and no iframe before click", () => {
    const { container } = render(<VideoEmbed id="Hz8PK6i8ZsE" title="Intro" />);
    expect(screen.getByRole("button", { name: "Play video: Intro" })).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
  });
  it("swaps to a titled YouTube iframe on click", () => {
    const { container } = render(<VideoEmbed id="Hz8PK6i8ZsE" title="Intro" />);
    fireEvent.click(screen.getByRole("button", { name: "Play video: Intro" }));
    const iframe = container.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("youtube-nocookie.com/embed/Hz8PK6i8ZsE");
    expect(iframe?.getAttribute("title")).toBe("Intro");
  });
});

describe("LogoWall", () => {
  it("renders all 14 supplier logos with alt text and no links", () => {
    const { container } = render(<LogoWall />);
    expect(logos).toHaveLength(14);
    for (const logo of logos) expect(screen.getByAltText(logo.name)).toBeInTheDocument();
    expect(container.querySelector("a")).toBeNull();
  });
});

describe("TestimonialList", () => {
  it("renders the 3 reviews with 5-star ratings", () => {
    render(<TestimonialList />);
    expect(testimonials).toHaveLength(3);
    for (const t of testimonials) expect(screen.getByText(t.name)).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "5 out of 5 stars" })).toHaveLength(3);
  });
});

describe("StepList", () => {
  it("renders the 5 steps as an ordered list", () => {
    render(<StepList />);
    expect(steps).toHaveLength(5);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent("Pick a product");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test components` → Expected: FAIL — missing component modules.

- [ ] **Step 4: Implement the components**

`components/video-embed.tsx`:
```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export function VideoEmbed({ id, title, priority = false }: { id: string; title: string; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl"
    >
      <Image
        src={`/images/videos/${id}.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/30">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-lg">
          <Play aria-hidden className="h-7 w-7 translate-x-0.5" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
```

`components/logo-wall.tsx` (display-only — no catalog to link to):
```tsx
import Image from "next/image";
import { logos } from "@/content/logos";

export function LogoWall() {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
      {logos.map((logo) => (
        <li key={logo.name} className="flex items-center justify-center">
          <span className="relative h-12 w-32">
            <Image src={logo.src} alt={logo.name} fill sizes="128px" className="object-contain" />
          </span>
        </li>
      ))}
    </ul>
  );
}
```

`components/testimonial-list.tsx`:
```tsx
import { Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { Card } from "@/components/ui/card";

function Stars() {
  return (
    <div role="img" aria-label="5 out of 5 stars" className="flex gap-1 text-brand">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className="h-5 w-5" fill="currentColor" />
      ))}
    </div>
  );
}

export function TestimonialList() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name} className="flex flex-col gap-4">
          <Stars />
          <blockquote className="text-sm leading-relaxed text-zinc-600">“{testimonial.quote}”</blockquote>
          <p className="mt-auto font-semibold text-ink">{testimonial.name}</p>
        </Card>
      ))}
    </div>
  );
}
```

`components/step-list.tsx`:
```tsx
import { steps } from "@/content/steps";

export function StepList() {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step.label} className="relative rounded-2xl border border-zinc-200 bg-white p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
            {index + 1}
          </span>
          <p className="mt-3 font-semibold text-ink">{step.label}</p>
          <p className="mt-1 text-sm text-zinc-600">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test` → Expected: PASS (all suites).

- [ ] **Step 6: Commit**

```bash
git add content/videos.ts content/logos.ts content/testimonials.ts content/steps.ts \
  components/video-embed.tsx components/logo-wall.tsx components/testimonial-list.tsx \
  components/step-list.tsx components/media.test.tsx
git commit -m "feat: add homepage data files and media components"
```

---
### Task 7: Homepage assembly

**Files:**
- Create: `components/sections/hero.tsx`, `components/sections/printing-methods.tsx`, `components/sections/dropship-pitch.tsx`, `components/sections/shipping-band.tsx`, `components/sections/final-cta.tsx`
- Modify: `app/page.tsx` (replace placeholder)
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: `VideoEmbed`, `LogoWall`, `TestimonialList`, `StepList`, `featuredVideo`/`moreVideos`, UI primitives.
- Produces: section components `Hero`, `PrintingMethods`, `DropshipPitch`, `ShippingBand`, `FinalCta` (no props); the finished `/` page (spec §7 order).

- [ ] **Step 1: Write the failing test** — `app/page.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the hero headline as the only h1", () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/print-on-demand brand/i);
  });
  it("renders every homepage section in spec order", () => {
    render(<HomePage />);
    for (const heading of [
      "How it works",
      "Printing methods",
      "Top Selling Brands",
      "What sellers say",
      "Built for dropshipping",
      "Ready to launch your brand?",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getByText(/free shipping on all orders over \$199/i)).toBeInTheDocument();
  });
  it("renders the featured video facade plus the 5-video strip", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("button", { name: /^Play video:/ })).toHaveLength(6);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test app` → Expected: FAIL — sections don't exist / placeholder page has wrong content.

- [ ] **Step 3: Implement the sections**

`components/sections/hero.tsx`:
```tsx
import { VideoEmbed } from "@/components/video-embed";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuredVideo, moreVideos } from "@/content/videos";

export function Hero() {
  return (
    <div className="bg-surface">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 sm:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Print-on-demand dropshipping · Canada
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Launch your print-on-demand brand. We print, pack &amp; ship.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600">
            DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app — no
            inventory, no tech headaches, wholesale pricing on t-shirts, hoodies, DTF and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Get started</ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline">
              See how it works
            </ButtonLink>
          </div>
        </div>
        <VideoEmbed id={featuredVideo.id} title={featuredVideo.title} priority />
      </Container>
      <Container className="pb-16">
        <h2 className="sr-only">More from DropShipPOD</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {moreVideos.map((video) => (
            <li key={video.id}>
              <VideoEmbed id={video.id} title={video.title} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
```

`components/sections/printing-methods.tsx`:
```tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

const methods = [
  {
    name: "DTG",
    description:
      "Direct-to-garment printing lays ink straight into the fabric for soft, detailed, full-colour prints — ideal for cotton tees and hoodies.",
    href: "/faq",
    linkLabel: "Read the general FAQ",
  },
  {
    name: "DTF",
    description:
      "Direct-to-film transfers press onto almost any fabric or colour with bold colour and excellent durability.",
    href: "/faq/dtf",
    linkLabel: "Read the DTF FAQ",
  },
  {
    name: "Sublimation",
    description:
      "Dye-sublimation bonds ink into polyester for vivid, edge-to-edge prints that never crack or peel.",
    href: "/faq/sublimation",
    linkLabel: "Read the sublimation FAQ",
  },
];

export function PrintingMethods() {
  return (
    <Section id="printing-methods">
      <Container>
        <SectionHeading eyebrow="What we print" title="Printing methods" />
        <div className="grid gap-6 md:grid-cols-3">
          {methods.map((method) => (
            <Card key={method.name}>
              <h3 className="font-display text-xl font-bold text-ink">{method.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{method.description}</p>
              <Link href={method.href} className="mt-4 inline-block text-sm font-semibold text-brand hover:text-brand-dark">
                {method.linkLabel} →
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Before ordering, please read our{" "}
          <Link href="/printing-notice" className="font-medium text-brand hover:text-brand-dark">
            important printing notice
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
```

`components/sections/dropship-pitch.tsx`:
```tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

const landers = [
  {
    title: "Start Your Ecommerce Brand Without Tech or High Costs",
    description:
      "Skip the upfront inventory and the tech stack. We handle printing, packing and shipping while you focus on your brand.",
    href: "/start-your-ecommerce-brand",
  },
  {
    title: "Launch a Fully Automated Ecommerce Brand (No Tech Needed)",
    description:
      "Connect our Shopify app and orders flow straight to production — fully automated, printed in Canada.",
    href: "/launch-automated-brand",
  },
];

export function DropshipPitch() {
  return (
    <Section id="dropship" className="bg-surface">
      <Container>
        <SectionHeading eyebrow="Dropship + Shopify app" title="Built for dropshipping" />
        <div className="grid gap-6 md:grid-cols-2">
          {landers.map((lander) => (
            <Card key={lander.href} className="flex flex-col">
              <h3 className="font-display text-xl font-bold text-ink">{lander.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{lander.description}</p>
              <Link
                href={lander.href}
                className="mt-4 inline-block text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

`components/sections/shipping-band.tsx` (copy from Captured Data):
```tsx
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function ShippingBand() {
  return (
    <Section id="shipping" className="border-y border-zinc-200">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl font-bold text-ink">
            Free shipping on all orders over $199
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Ground shipping in 1–5 business days across Canada · Express in 1–2 · Optional pick-up at
            our warehouse.
          </p>
        </div>
        <ButtonLink href="/delivery" variant="secondary">
          Delivery details
        </ButtonLink>
      </Container>
    </Section>
  );
}
```

`components/sections/final-cta.tsx`:
```tsx
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCta() {
  return (
    <div className="bg-ink">
      <Container className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Ready to launch your brand?
          </h2>
          <p className="mt-2 max-w-xl text-zinc-300">
            Tell us what you want to build — we&apos;ll get you printing, packing and shipping.
          </p>
        </div>
        <ButtonLink href="/contact">Contact us</ButtonLink>
      </Container>
    </div>
  );
}
```

- [ ] **Step 4: Assemble `app/page.tsx`** (spec §7 order: hero → steps → methods → logos → testimonials → pitch → shipping → CTA)

```tsx
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { PrintingMethods } from "@/components/sections/printing-methods";
import { DropshipPitch } from "@/components/sections/dropship-pitch";
import { ShippingBand } from "@/components/sections/shipping-band";
import { FinalCta } from "@/components/sections/final-cta";
import { LogoWall } from "@/components/logo-wall";
import { TestimonialList } from "@/components/testimonial-list";
import { StepList } from "@/components/step-list";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section id="how-it-works">
        <Container>
          <SectionHeading eyebrow="5 easy steps" title="How it works" />
          <StepList />
          <Link
            href="/how-it-works"
            className="mt-6 inline-block text-sm font-semibold text-brand hover:text-brand-dark"
          >
            See the full walkthrough →
          </Link>
        </Container>
      </Section>
      <PrintingMethods />
      <Section id="brands" className="bg-surface">
        <Container>
          <SectionHeading eyebrow="Blanks we stock" title="Top Selling Brands" />
          <LogoWall />
        </Container>
      </Section>
      <Section id="reviews">
        <Container>
          <SectionHeading eyebrow="Reviews" title="What sellers say" />
          <TestimonialList />
        </Container>
      </Section>
      <DropshipPitch />
      <ShippingBand />
      <FinalCta />
    </>
  );
}
```

- [ ] **Step 5: Run tests and build**

Run: `pnpm test` → Expected: PASS.
Run: `pnpm build` → Expected: `/` prerendered as static.
Run: `pnpm dev` and eyeball `http://localhost:3000` — posters load from `/images/videos/`, click swaps to YouTube iframe, logo wall shows 14 logos.

- [ ] **Step 6: Commit**

```bash
git add components/sections/ app/page.tsx app/page.test.tsx
git commit -m "feat: assemble modernized homepage"
```

---

### Task 8: MDX pipeline + first two content pages (how-it-works, about)

**Files:**
- Create: `mdx-components.tsx`, `components/page-shell.tsx`, `content/pages/how-it-works.mdx`, `content/pages/about.mdx`
- Create: `app/(marketing)/how-it-works/page.tsx`, `app/(marketing)/about/page.tsx`
- Modify: `next.config.ts` (MDX support), `tsconfig.json` (nothing — already includes `mdx-components.tsx`)
- Test: `components/page-shell.test.tsx`

**Interfaces:**
- Consumes: `Prose`, `Container`; `content/raw/how-it-works.md`, `content/raw/about.md` from Tasks 4–5.
- Produces: `PageShell({ title, lede?, children })` — the wrapper every MDX content route uses; the route-file pattern all Task 9 pages copy; MDX imports working app-wide (`.mdx` files under `content/pages/` imported as components).

- [ ] **Step 1: Install MDX packages**

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
pnpm add -D @types/mdx
```

- [ ] **Step 2: Enable MDX in `next.config.ts`** (full new file contents)

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

- [ ] **Step 3: Write `mdx-components.tsx`** (repo root — required by `@next/mdx`)

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
```

- [ ] **Step 4: Write the failing test** — `components/page-shell.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageShell } from "./page-shell";

describe("PageShell", () => {
  it("renders the h1 title, optional lede, and prose body", () => {
    render(
      <PageShell title="How It Works" lede="From blank to shipped.">
        <p>Body copy</p>
      </PageShell>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "How It Works" })).toBeInTheDocument();
    expect(screen.getByText("From blank to shipped.")).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `pnpm test components` → Expected: FAIL — cannot resolve `./page-shell`.

- [ ] **Step 6: Write `components/page-shell.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";

export function PageShell({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-lg text-zinc-600">{lede}</p> : null}
      <Prose className="mt-8">{children}</Prose>
    </Container>
  );
}
```

Run: `pnpm test components` → Expected: PASS.

- [ ] **Step 7: Hand-clean the first two MDX files**

Create `content/pages/how-it-works.mdx` from `content/raw/how-it-works.md` and `content/pages/about.mdx` from `content/raw/about.md`, applying the Global-Constraints hand-cleaning rules. For how-it-works specifically: keep the 5 steps text verbatim, keep the steps image as `![The 5 easy steps](/images/steps.png)`, and delete the trailing store-checkout sentence fragment only if it is a bare "add to cart" CTA (the support sentence "If you are having any difficulty… give us a call" stays). MDX files contain **body only** — no frontmatter (titles live in the route files).

- [ ] **Step 8: Create the two routes**

`app/(marketing)/how-it-works/page.tsx`:
```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/how-it-works.mdx";

export const metadata: Metadata = {
  title: "How It Works",
  description: "The 5 easy steps to ordering custom-printed products from DropShipPOD.",
};

export default function Page() {
  return (
    <PageShell title="How It Works">
      <Body />
    </PageShell>
  );
}
```

`app/(marketing)/about/page.tsx`:
```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/about.mdx";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who DropShipPOD is: Canadian print-on-demand production and dropshipping.",
};

export default function Page() {
  return (
    <PageShell title="About Us">
      <Body />
    </PageShell>
  );
}
```

- [ ] **Step 9: Build and verify**

Run: `pnpm build` → Expected: `/how-it-works` and `/about` prerendered as static, no MDX loader errors.
Run: `grep -r "cdn.shopify.com" content/pages/` → Expected: no matches.

- [ ] **Step 10: Commit**

```bash
git add next.config.ts mdx-components.tsx components/page-shell.tsx components/page-shell.test.tsx \
  content/pages/ "app/(marketing)/" package.json pnpm-lock.yaml
git commit -m "feat: add MDX pipeline with how-it-works and about pages"
```

---

### Task 9: Remaining MDX content pages (8 marketing + 4 policies)

**Files:**
- Create: `content/pages/{delivery,billing,start-your-ecommerce-brand,launch-automated-brand,printing-notice,sublimation-printing-notice,artwork-approval,measuring}.mdx`
- Create: `content/pages/policies/{privacy,terms,refund,shipping}.mdx`
- Create: `app/(marketing)/{delivery,billing,start-your-ecommerce-brand,launch-automated-brand,printing-notice,sublimation-printing-notice,artwork-approval,measuring}/page.tsx`
- Create: `app/policies/{privacy,terms,refund,shipping}/page.tsx`
- Test: build verification (MDX pages are validated by `pnpm build`; no unit tests for pure content)

**Interfaces:**
- Consumes: `PageShell`, MDX pipeline from Task 8; `content/raw/*.md` from Tasks 4–5.
- Produces: the 12 remaining static content routes.

- [ ] **Step 1: Hand-clean the 12 MDX files** from their raw sources (Global-Constraints rules), per this table. Every row's raw file exists after Task 4; policies raws are `policy-*.md`.

| MDX file | Raw source |
|---|---|
| `delivery.mdx` | `delivery.md` |
| `billing.mdx` | `billing.md` |
| `start-your-ecommerce-brand.mdx` | `start-your-ecommerce-brand.md` |
| `launch-automated-brand.mdx` | `launch-automated-brand.md` |
| `printing-notice.mdx` | `printing-notice.md` |
| `sublimation-printing-notice.mdx` | `sublimation-printing-notice.md` |
| `artwork-approval.mdx` | `artwork-approval.md` |
| `measuring.mdx` | `measuring.md` |
| `policies/privacy.mdx` | `policy-privacy.md` |
| `policies/terms.mdx` | `policy-terms.md` |
| `policies/refund.mdx` | `policy-refund.md` |
| `policies/shipping.mdx` | `policy-shipping.md` |

**`delivery.mdx` additionally** appends this section at the end (the retired `free-shipping-on-orders-over-100` page's info, per spec §6 — copy from Captured Data):

```md
## Free shipping over $199

- **Free shipping on all orders over $199**
- Optional pick-up at our warehouse

## Ground shipping

- ON, QC, NB: 1–2 business days
- MB, SK, NS, NL, PE: 2–4 business days
- AB, BC: 3–5 business days

## Express shipping

- ON, QC, NB, MB, SK, NS, NL, PE, AB, BC: 1–2 business days
```

- [ ] **Step 2: Create the 12 route files.** Each file is exactly this template with `<MDX-PATH>`, `<TITLE>`, `<DESCRIPTION>` substituted from the table below (this substitution table + template is the complete code for all 12 files):

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/<MDX-PATH>";

export const metadata: Metadata = {
  title: "<TITLE>",
  description: "<DESCRIPTION>",
};

export default function Page() {
  return (
    <PageShell title="<TITLE>">
      <Body />
    </PageShell>
  );
}
```

| Route file | `<MDX-PATH>` | `<TITLE>` | `<DESCRIPTION>` |
|---|---|---|---|
| `app/(marketing)/delivery/page.tsx` | `delivery.mdx` | Delivery Speed | Production and shipping times across Canada, plus free shipping over $199. |
| `app/(marketing)/billing/page.tsx` | `billing.mdx` | Billing Information | How DropShipPOD billing works for dropship orders. |
| `app/(marketing)/start-your-ecommerce-brand/page.tsx` | `start-your-ecommerce-brand.mdx` | Start Your Ecommerce Brand Without Tech or High Costs | Launch a print-on-demand brand without inventory, tech skills, or upfront costs. |
| `app/(marketing)/launch-automated-brand/page.tsx` | `launch-automated-brand.mdx` | Launch a Fully Automated Ecommerce Brand | Connect the DropShipPOD Shopify app and automate order fulfilment end to end. |
| `app/(marketing)/printing-notice/page.tsx` | `printing-notice.mdx` | Important Printing Notice | What to know about print results before placing an order. |
| `app/(marketing)/sublimation-printing-notice/page.tsx` | `sublimation-printing-notice.mdx` | Sublimation Printing Notice | What to know about sublimation printing before placing an order. |
| `app/(marketing)/artwork-approval/page.tsx` | `artwork-approval.mdx` | Artwork & Mockup Approval | How artwork and mockup approval works for your orders. |
| `app/(marketing)/measuring/page.tsx` | `measuring.mdx` | How to Measure | How to measure garments to pick the right size. |
| `app/policies/privacy/page.tsx` | `policies/privacy.mdx` | Privacy Policy | How DropShipPOD collects, uses, and protects your information. |
| `app/policies/terms/page.tsx` | `policies/terms.mdx` | Terms of Service | The terms that govern use of DropShipPOD's site and services. |
| `app/policies/refund/page.tsx` | `policies/refund.mdx` | Refund Policy | When and how refunds apply to custom-printed orders. |
| `app/policies/shipping/page.tsx` | `policies/shipping.mdx` | Shipping Policy | DropShipPOD's shipping terms, timelines, and coverage. |

- [ ] **Step 3: Build and verify all routes**

Run: `pnpm build`
Expected: all 12 new routes listed as static. Then:
```bash
grep -rE "cdn.shopify.com|myshopify.com|shopify://" content/pages/ && echo LEAK || echo CLEAN   # CLEAN
grep -rE "\]\(/(pages|products|collections|cart)/" content/pages/ && echo LEAK || echo CLEAN     # CLEAN
```

- [ ] **Step 4: Commit**

```bash
git add content/pages/ "app/(marketing)/" app/policies/
git commit -m "content: add remaining marketing and policy pages"
```

---

### Task 10: FAQ pages with accordion

**Files:**
- Create: `components/ui/accordion.tsx`, `components/faq-page.tsx`
- Create: `content/faqs/types.ts`, `content/faqs/general.tsx`, `content/faqs/dtf.tsx`, `content/faqs/sublimation.tsx`, `content/faqs/print-on-your-own-item.tsx`
- Create: `app/(marketing)/faq/page.tsx`, `app/(marketing)/faq/dtf/page.tsx`, `app/(marketing)/faq/sublimation/page.tsx`, `app/(marketing)/faq/print-on-your-own-item/page.tsx`
- Test: `components/faq-page.test.tsx`, `content/faqs/faqs.test.ts`

**Interfaces:**
- Consumes: raw FAQ content `content/raw/faq-{general,dtf,sublimation,print-on-your-own-item}.md`; `Container`; Radix accordion.
- Produces: `type FaqItem = { question: string; answer: React.ReactNode }` from `content/faqs/types.ts`; arrays `generalFaq`, `dtfFaq`, `sublimationFaq`, `printOnYourOwnItemFaq`; `Accordion({ items: FaqItem[] })` (single-open, collapsible); `FaqPage({ title, lede?, items, related })` where `related: { label: string; href: string }[]`.

- [ ] **Step 1: Install the accordion primitive**

```bash
pnpm add @radix-ui/react-accordion
```

- [ ] **Step 2: Write the failing tests**

`content/faqs/faqs.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { generalFaq } from "./general";
import { dtfFaq } from "./dtf";
import { sublimationFaq } from "./sublimation";
import { printOnYourOwnItemFaq } from "./print-on-your-own-item";

const sets = { generalFaq, dtfFaq, sublimationFaq, printOnYourOwnItemFaq };

describe("FAQ data", () => {
  for (const [name, items] of Object.entries(sets)) {
    it(`${name} has at least 3 items with unique, non-empty questions`, () => {
      expect(items.length).toBeGreaterThanOrEqual(3);
      const questions = items.map((i) => i.question.trim());
      expect(questions.every((q) => q.length > 0)).toBe(true);
      expect(new Set(questions).size).toBe(questions.length);
    });
  }
});
```

`components/faq-page.test.tsx`:
```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FaqPage } from "./faq-page";

const items = [
  { question: "What is DTF?", answer: <p>Direct to film.</p> },
  { question: "Does it last?", answer: <p>Yes.</p> },
];

describe("FaqPage", () => {
  it("renders the title and every question, with answers collapsed", () => {
    render(<FaqPage title="DTF FAQ" items={items} related={[]} />);
    expect(screen.getByRole("heading", { level: 1, name: "DTF FAQ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "What is DTF?" })).toBeInTheDocument();
    expect(screen.queryByText("Direct to film.")).not.toBeInTheDocument();
  });
  it("expands an answer on click", () => {
    render(<FaqPage title="DTF FAQ" items={items} related={[]} />);
    fireEvent.click(screen.getByRole("button", { name: "What is DTF?" }));
    expect(screen.getByText("Direct to film.")).toBeVisible();
  });
  it("lists related FAQ links", () => {
    render(<FaqPage title="DTF FAQ" items={items} related={[{ label: "General FAQ", href: "/faq" }]} />);
    expect(screen.getByRole("link", { name: "General FAQ" })).toHaveAttribute("href", "/faq");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test` → Expected: FAIL — missing modules.

- [ ] **Step 4: Write `content/faqs/types.ts`**

```ts
import type { ReactNode } from "react";

export type FaqItem = { question: string; answer: ReactNode };
```

- [ ] **Step 5: Write `components/ui/accordion.tsx`**

```tsx
"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faqs/types";

export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="divide-y divide-zinc-200">
      {items.map((item, index) => (
        <AccordionPrimitive.Item key={index} value={`item-${index}`}>
          <AccordionPrimitive.Header asChild>
            <h3>
              <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-semibold text-ink">
                {item.question}
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-data-[state=open]:rotate-180"
                />
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="prose prose-zinc max-w-none pb-4 text-sm">
            {item.answer}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
```

- [ ] **Step 6: Write `components/faq-page.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import type { FaqItem } from "@/content/faqs/types";

export function FaqPage({
  title,
  lede,
  items,
  related,
}: {
  title: string;
  lede?: string;
  items: FaqItem[];
  related: { label: string; href: string }[];
}) {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-lg text-zinc-600">{lede}</p> : null}
      <div className="mt-8 max-w-3xl">
        <Accordion items={items} />
      </div>
      {related.length > 0 ? (
        <nav aria-label="Related FAQs" className="mt-10">
          <p className="text-sm font-semibold text-ink">More FAQs</p>
          <ul className="mt-2 flex flex-wrap gap-4">
            {related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-medium text-brand hover:text-brand-dark">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </Container>
  );
}
```

- [ ] **Step 7: Write the four FAQ data files** from raw content. Pattern (repeat for each raw file; each Q&A pair in the raw markdown becomes one item — do not drop any):

`content/faqs/general.tsx` (structure; question/answer text comes verbatim from `content/raw/faq-general.md`, where questions are the bold/heading lines):
```tsx
import type { FaqItem } from "./types";

export const generalFaq: FaqItem[] = [
  {
    question: "«first question line from faq-general.md»",
    answer: (
      <>
        <p>«answer paragraph(s) for that question»</p>
      </>
    ),
  },
  // …one entry per remaining Q&A pair in faq-general.md
];
```

Same shape for `content/faqs/dtf.tsx` (`export const dtfFaq` from `faq-dtf.md`), `content/faqs/sublimation.tsx` (`export const sublimationFaq` from `faq-sublimation.md`), and `content/faqs/print-on-your-own-item.tsx` (`export const printOnYourOwnItemFaq` from `faq-print-on-your-own-item.md`). Answers use `<p>`, `<ul>/<li>`, `<strong>`, and `next/link` for internal links (hand-cleaning rules apply).

- [ ] **Step 8: Create the four routes.** Template with the table below (complete code for all 4 files):

```tsx
import type { Metadata } from "next";
import { FaqPage } from "@/components/faq-page";
import { <ITEMS> } from "@/content/faqs/<DATA>";

export const metadata: Metadata = {
  title: "<TITLE>",
  description: "<DESCRIPTION>",
};

const related = [<RELATED>];

export default function Page() {
  return <FaqPage title="<TITLE>" items={<ITEMS>} related={related} />;
}
```

| Route file | `<DATA>` | `<ITEMS>` | `<TITLE>` | `<DESCRIPTION>` | `<RELATED>` (the other three) |
|---|---|---|---|---|---|
| `app/(marketing)/faq/page.tsx` | `general` | `generalFaq` | Frequently Asked Questions | Answers to common questions about DropShipPOD printing and dropshipping. | `{ label: "DTF FAQ", href: "/faq/dtf" }, { label: "Sublimation FAQ", href: "/faq/sublimation" }, { label: "Print on your own item", href: "/faq/print-on-your-own-item" }` |
| `app/(marketing)/faq/dtf/page.tsx` | `dtf` | `dtfFaq` | DTF FAQ | Answers about direct-to-film (DTF) printing and transfers. | `{ label: "General FAQ", href: "/faq" }, { label: "Sublimation FAQ", href: "/faq/sublimation" }, { label: "Print on your own item", href: "/faq/print-on-your-own-item" }` |
| `app/(marketing)/faq/sublimation/page.tsx` | `sublimation` | `sublimationFaq` | Sublimation FAQ | Answers about dye-sublimation printing. | `{ label: "General FAQ", href: "/faq" }, { label: "DTF FAQ", href: "/faq/dtf" }, { label: "Print on your own item", href: "/faq/print-on-your-own-item" }` |
| `app/(marketing)/faq/print-on-your-own-item/page.tsx` | `print-on-your-own-item` | `printOnYourOwnItemFaq` | Print on Your Own Item FAQ | Answers about sending in your own garments for printing. | `{ label: "General FAQ", href: "/faq" }, { label: "DTF FAQ", href: "/faq/dtf" }, { label: "Sublimation FAQ", href: "/faq/sublimation" }` |

- [ ] **Step 9: Run tests and build**

Run: `pnpm test` → Expected: PASS (accordion interaction + data integrity).
Run: `pnpm build` → Expected: 4 FAQ routes static.

- [ ] **Step 10: Commit**

```bash
git add components/ui/accordion.tsx components/faq-page.tsx components/faq-page.test.tsx \
  content/faqs/ "app/(marketing)/faq" package.json pnpm-lock.yaml
git commit -m "feat: add FAQ pages with accessible accordion"
```

---
### Task 11: Size charts — extraction script, data, hub + detail routes

**Files:**
- Create: `scripts/lib/size-chart.mjs`, `scripts/scrape-size-charts.mjs`
- Create (by running the script): `content/size-charts/*.json` (47 files)
- Create: `lib/size-charts.ts`, `components/size-chart-table.tsx`
- Create: `app/(marketing)/size-charts/page.tsx`, `app/(marketing)/size-charts/[handle]/page.tsx`
- Test: `scripts/lib/size-chart.test.mjs`, `lib/size-charts.test.ts`, `components/size-chart-table.test.tsx`

**Interfaces:**
- Consumes: `extractPage` idea does NOT apply here — size-chart pages are still `[data-section-type="page"]` pages, so `scripts/lib/size-chart.mjs` reuses the same selectors; scrape fallback logic mirrors `scripts/scrape.mjs`.
- Produces: `SIZE_CHART_HANDLES: string[]` (47), `parseHandle(handle): { brand, model }`, `extractSizeChart(html, handle): { handle, brand, model, title, columns, rows, notes }` from `scripts/lib/size-chart.mjs`; from `lib/size-charts.ts` — `sizeChartSchema` (zod), `type SizeChart`, `getAllSizeCharts(): SizeChart[]`, `getSizeChart(handle): SizeChart | undefined`, `chartsByBrand(): [string, SizeChart[]][]`; component `SizeChartTable({ chart: SizeChart })`.

- [ ] **Step 1: Install zod** (also used by Task 12)

```bash
pnpm add zod@3
```

- [ ] **Step 2: Write the failing script-helper tests** — `scripts/lib/size-chart.test.mjs`

```js
import { describe, expect, it } from "vitest";
import { SIZE_CHART_HANDLES, extractSizeChart, parseHandle } from "./size-chart.mjs";

describe("SIZE_CHART_HANDLES", () => {
  it("contains all 47 unique handles", () => {
    expect(SIZE_CHART_HANDLES).toHaveLength(47);
    expect(new Set(SIZE_CHART_HANDLES).size).toBe(47);
  });
});

describe("parseHandle", () => {
  it.each([
    ["gildan-5000", "Gildan", "5000"],
    ["gildan-5400b", "Gildan", "5400B"],
    ["independent-trading-co-ind5000c", "Independent Trading Co.", "IND5000C"],
    ["m-o-5540", "M&O", "5540"],
    ["q-tees-qtb6000", "Q-Tees", "QTB6000"],
    ["yp-classics-6506", "YP Classics", "6506"],
    ["american-apparel-1301", "American Apparel", "1301"],
    ["bella-canvas-3001", "Bella + Canvas", "3001"],
  ])("%s -> %s %s", (handle, brand, model) => {
    expect(parseHandle(handle)).toEqual({ brand, model });
  });
  it("throws on an unknown brand prefix", () => {
    expect(() => parseHandle("unknown-brand-123")).toThrow();
  });
});

describe("extractSizeChart", () => {
  const HTML = `<html><body>
  <section data-section-type="page">
    <header class="page__header"><h1 class="page__title">Gildan 5000 Size Chart</h1></header>
    <div class="page__content rte">
      <p>All measurements in inches.</p>
      <table>
        <thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead>
        <tbody>
          <tr><td>S</td><td>18</td><td>28</td></tr>
          <tr><td>M</td><td>20</td><td>29</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  </body></html>`;

  it("extracts title, header row, body rows, and surrounding notes", () => {
    const chart = extractSizeChart(HTML, "gildan-5000");
    expect(chart).toEqual({
      handle: "gildan-5000",
      brand: "Gildan",
      model: "5000",
      title: "Gildan 5000 Size Chart",
      columns: ["Size", "Chest", "Length"],
      rows: [
        ["S", "18", "28"],
        ["M", "20", "29"],
      ],
      notes: ["All measurements in inches."],
    });
  });
  it("throws when the page has no table", () => {
    const noTable = HTML.replace(/<table>[\s\S]*<\/table>/, "");
    expect(() => extractSizeChart(noTable, "gildan-5000")).toThrow();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test scripts` → Expected: FAIL — cannot resolve `./size-chart.mjs`.

- [ ] **Step 4: Write `scripts/lib/size-chart.mjs`**

```js
import * as cheerio from "cheerio";

export const SIZE_CHART_HANDLES = [
  "q-tees-q4350", "q-tees-q2010", "yp-classics-6506", "valucap-vc300a", "q-tees-q600",
  "q-tees-qtb6000", "q-tees-qtb", "gildan-64800", "gildan-8800", "m-o-5540",
  "jerzees-995mr", "m-o-3590", "m-o-4505", "gildan-5200", "gildan-5400b",
  "gildan-5400", "rabbit-skins-3317", "gildan-18000b", "independent-trading-co-ind5000c",
  "gildan-12000", "gildan-sf000", "gildan-18000", "rabbit-skins-3326", "gildan-18600b",
  "gildan-sf500b", "gildan-18500b", "independent-trading-co-afx64crp",
  "independent-trading-co-ind5000p", "independent-trading-co-ss4500z",
  "independent-trading-co-ind4000", "gildan-18600", "gildan-12500", "gildan-sf500",
  "gildan-18500", "rabbit-skins-4400", "rabbit-skins-3322", "gildan-5100p",
  "gildan-5000b", "gildan-8000b", "gildan-64000l", "gildan-64v00", "comfort-colors-1717",
  "bella-canvas-3001", "american-apparel-1301", "gildan-8000", "gildan-64000", "gildan-5000",
];

// Longest prefixes first so e.g. "independent-trading-co" wins before any shorter match.
const BRANDS = [
  ["independent-trading-co", "Independent Trading Co."],
  ["american-apparel", "American Apparel"],
  ["comfort-colors", "Comfort Colors"],
  ["bella-canvas", "Bella + Canvas"],
  ["rabbit-skins", "Rabbit Skins"],
  ["yp-classics", "YP Classics"],
  ["q-tees", "Q-Tees"],
  ["valucap", "Valucap"],
  ["jerzees", "Jerzees"],
  ["gildan", "Gildan"],
  ["m-o", "M&O"],
];

export function parseHandle(handle) {
  for (const [prefix, brand] of BRANDS) {
    if (handle.startsWith(`${prefix}-`)) {
      return { brand, model: handle.slice(prefix.length + 1).toUpperCase() };
    }
  }
  throw new Error(`unknown brand in handle: ${handle}`);
}

export function extractSizeChart(html, handle) {
  const $ = cheerio.load(html);
  const root = $('[data-section-type="page"]').first();
  const title = root.find("h1.page__title").first().text().trim();
  const table = root.find(".page__content table").first();
  if (!title || table.length === 0) throw new Error(`no size-chart table for ${handle}`);

  const readRow = (row) =>
    $(row)
      .find("th, td")
      .map((_, cell) => $(cell).text().replace(/ /g, " ").trim())
      .get();

  const allRows = table.find("tr").get();
  const columns = readRow(allRows[0]);
  const rows = allRows.slice(1).map(readRow).filter((cells) => cells.some((c) => c.length > 0));
  if (columns.length < 2 || rows.length === 0) throw new Error(`degenerate table for ${handle}`);

  const notes = root
    .find(".page__content p")
    .map((_, p) => $(p).text().replace(/ /g, " ").trim())
    .get()
    .filter((text) => text.length > 0);

  const { brand, model } = parseHandle(handle);
  return { handle, brand, model, title, columns, rows, notes };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test scripts` → Expected: PASS.

- [ ] **Step 6: Write `scripts/scrape-size-charts.mjs`**

```js
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { SIZE_CHART_HANDLES, extractSizeChart } from "./lib/size-chart.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "http://127.0.0.1:9292";
const LIVE = "https://dropshippod.ca";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchHtml(pathname) {
  for (const base of [LOCAL, LIVE]) {
    try {
      const res = await fetch(base + pathname, { redirect: "follow" });
      if (res.ok) return await res.text();
    } catch {
      // try next base
    }
  }
  throw new Error(`could not fetch ${pathname}`);
}

const outDir = path.join(process.cwd(), "content", "size-charts");
await mkdir(outDir, { recursive: true });
const failures = [];

for (const handle of SIZE_CHART_HANDLES) {
  try {
    const html = await fetchHtml(`/pages/size-chart-${handle}`);
    const chart = extractSizeChart(html, handle);
    await writeFile(path.join(outDir, `${handle}.json`), JSON.stringify(chart, null, 2) + "\n");
    console.log(`ok  ${handle}`);
  } catch (error) {
    failures.push(`${handle}: ${error.message}`);
    console.error(`FAIL ${handle}: ${error.message}`);
  }
  await sleep(250);
}

console.log(`\n${SIZE_CHART_HANDLES.length - failures.length} ok, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
```

- [ ] **Step 7: Run the script**

Run: `pnpm scrape:size-charts`
Expected: `47 ok, 0 failed`; `ls content/size-charts | wc -l` → `47`. If any chart fails (unexpected markup), inspect that page's HTML and extend `extractSizeChart` — do not hand-write the JSON.

- [ ] **Step 8: Write the failing app-side tests**

`lib/size-charts.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { chartsByBrand, getAllSizeCharts, getSizeChart } from "./size-charts";

describe("size chart data", () => {
  it("loads and validates all 47 charts", () => {
    expect(getAllSizeCharts()).toHaveLength(47);
  });
  it("finds a chart by handle and returns undefined for unknown", () => {
    expect(getSizeChart("gildan-5000")?.brand).toBe("Gildan");
    expect(getSizeChart("nope")).toBeUndefined();
  });
  it("groups charts by brand with stable brand order", () => {
    const groups = chartsByBrand();
    const brands = groups.map(([brand]) => brand);
    expect(brands).toEqual([...brands].sort());
    expect(groups.flatMap(([, charts]) => charts)).toHaveLength(47);
  });
  it("every row has the same cell count as its header", () => {
    for (const chart of getAllSizeCharts()) {
      for (const row of chart.rows) expect(row).toHaveLength(chart.columns.length);
    }
  });
});
```

`components/size-chart-table.test.tsx`:
```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SizeChartTable } from "./size-chart-table";

const chart = {
  handle: "gildan-5000",
  brand: "Gildan",
  model: "5000",
  title: "Gildan 5000 Size Chart",
  columns: ["Size", "Chest"],
  rows: [["S", "18"]],
  notes: ["Inches."],
};

describe("SizeChartTable", () => {
  it("renders a semantic table with caption, headers, and notes", () => {
    render(<SizeChartTable chart={chart} />);
    expect(screen.getByRole("table", { name: "Gildan 5000 Size Chart" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Chest" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "18" })).toBeInTheDocument();
    expect(screen.getByText("Inches.")).toBeInTheDocument();
  });
});
```

Run: `pnpm test` → Expected: FAIL — missing `lib/size-charts.ts` / component.

**Note:** the row/header cell-count test may expose ragged tables (colspan headers on some SKUs). If it fails for a chart, fix `extractSizeChart` to expand `colspan` cells (repeat the cell text `colspan` times) and re-run the scrape — don't weaken the test.

- [ ] **Step 9: Write `lib/size-charts.ts`**

```ts
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

export const sizeChartSchema = z.object({
  handle: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  title: z.string().min(1),
  columns: z.array(z.string().min(1)).min(2),
  rows: z.array(z.array(z.string())).min(1),
  notes: z.array(z.string()),
});

export type SizeChart = z.infer<typeof sizeChartSchema>;

const DIR = path.join(process.cwd(), "content", "size-charts");
let cache: SizeChart[] | undefined;

export function getAllSizeCharts(): SizeChart[] {
  cache ??= fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => sizeChartSchema.parse(JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"))));
  return cache;
}

export function getSizeChart(handle: string): SizeChart | undefined {
  return getAllSizeCharts().find((chart) => chart.handle === handle);
}

export function chartsByBrand(): [string, SizeChart[]][] {
  const groups = new Map<string, SizeChart[]>();
  for (const chart of getAllSizeCharts()) {
    groups.set(chart.brand, [...(groups.get(chart.brand) ?? []), chart]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}
```

- [ ] **Step 10: Write `components/size-chart-table.tsx`**

```tsx
import type { SizeChart } from "@/lib/size-charts";

export function SizeChartTable({ chart }: { chart: SizeChart }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full text-sm">
          <caption className="sr-only">{chart.title}</caption>
          <thead>
            <tr className="bg-surface text-left">
              {chart.columns.map((column, i) => (
                <th key={i} scope="col" className="px-4 py-3 font-semibold text-ink">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {chart.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-zinc-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {chart.notes.map((note, i) => (
        <p key={i} className="mt-3 text-sm text-zinc-500">
          {note}
        </p>
      ))}
    </div>
  );
}
```

- [ ] **Step 11: Run tests to verify they pass**

Run: `pnpm test` → Expected: PASS (including the 47-chart validation).

- [ ] **Step 12: Create the hub and detail routes**

`app/(marketing)/size-charts/page.tsx`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { chartsByBrand } from "@/lib/size-charts";

export const metadata: Metadata = {
  title: "Size Charts",
  description: "Size charts for every blank we print on, grouped by brand.",
};

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Size Charts</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Find the measurements for your product, or read{" "}
        <Link href="/measuring" className="font-medium text-brand hover:text-brand-dark">
          how to measure
        </Link>
        .
      </p>
      {chartsByBrand().map(([brand, charts]) => (
        <section key={brand} className="mt-10">
          <h2 className="font-display text-2xl font-bold text-ink">{brand}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {charts.map((chart) => (
              <li key={chart.handle}>
                <Link
                  href={`/size-charts/${chart.handle}`}
                  className="block rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:border-ink hover:text-ink"
                >
                  {chart.brand} {chart.model}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}
```

`app/(marketing)/size-charts/[handle]/page.tsx`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SizeChartTable } from "@/components/size-chart-table";
import { getAllSizeCharts, getSizeChart } from "@/lib/size-charts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSizeCharts().map((chart) => ({ handle: chart.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const chart = getSizeChart(handle);
  if (!chart) return {};
  return {
    title: `${chart.brand} ${chart.model} Size Chart`,
    description: `Measurements and sizing for the ${chart.brand} ${chart.model}.`,
  };
}

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const chart = getSizeChart(handle);
  if (!chart) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/size-charts" className="font-medium text-brand hover:text-brand-dark">
          ← All size charts
        </Link>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
        {chart.brand} {chart.model} Size Chart
      </h1>
      <div className="mt-8 max-w-3xl">
        <SizeChartTable chart={chart} />
      </div>
      <p className="mt-6 text-sm text-zinc-500">
        Not sure how to measure?{" "}
        <Link href="/measuring" className="font-medium text-brand hover:text-brand-dark">
          Read the measuring guide
        </Link>
        .
      </p>
    </Container>
  );
}
```

- [ ] **Step 13: Build and verify**

Run: `pnpm build`
Expected: `/size-charts` static and `/size-charts/[handle]` shows **47** prerendered paths.

- [ ] **Step 14: Commit**

```bash
git add scripts/ content/size-charts/ lib/size-charts.ts lib/size-charts.test.ts \
  components/size-chart-table.tsx components/size-chart-table.test.tsx \
  "app/(marketing)/size-charts" package.json pnpm-lock.yaml
git commit -m "feat: add data-driven size charts (47 SKUs) with hub and detail pages"
```

---

### Task 12: Contact page — form UI + stub API

**Files:**
- Create: `lib/contact-schema.ts`, `app/api/contact/route.ts`, `components/contact-form.tsx`, `content/pages/contact-info.mdx`
- Create: `app/(marketing)/contact/page.tsx`
- Test: `lib/contact-schema.test.ts`, `app/api/contact/route.test.ts`, `components/contact-form.test.tsx`

**Interfaces:**
- Consumes: `PageShell` not used here (custom two-column layout); `Container`, `Button`; `content/raw/contact.md`.
- Produces: `contactSchema` (zod object: `name` min 1, `email` valid email, `subject` min 1, `message` min 10), `type ContactInput = z.infer<typeof contactSchema>`; `POST /api/contact` (400 invalid / 200 `{ ok: true }`); `ContactForm()` client component.

- [ ] **Step 1: Install form dependencies**

```bash
pnpm add react-hook-form @hookform/resolvers
```

- [ ] **Step 2: Write the failing tests**

`lib/contact-schema.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = { name: "Sam", email: "sam@example.com", subject: "Hi", message: "I want to start a brand." };

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it.each([
    ["name", ""],
    ["email", "not-an-email"],
    ["subject", ""],
    ["message", "short"],
  ])("rejects invalid %s", (field, value) => {
    expect(contactSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
  });
});
```

`app/api/contact/route.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { POST } from "./route";

function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("returns 200 ok for a valid submission", async () => {
    const res = await POST(
      request({ name: "Sam", email: "sam@example.com", subject: "Hi", message: "I want to start a brand." }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
  it("returns 400 with field errors for an invalid submission", async () => {
    const res = await POST(request({ name: "", email: "bad", subject: "", message: "x" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors).toHaveProperty("email");
  });
  it("returns 400 for a non-JSON body", async () => {
    const res = await POST(new Request("http://localhost/api/contact", { method: "POST", body: "not json" }));
    expect(res.status).toBe(400);
  });
});
```

`components/contact-form.test.tsx`:
```tsx
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "./contact-form";

afterEach(() => vi.restoreAllMocks());

function fill() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Sam" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "sam@example.com" } });
  fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hi" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "I want to start a brand." } });
}

describe("ContactForm", () => {
  it("shows validation errors and does not submit an empty form", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findAllByRole("alert")).not.toHaveLength(0);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
  it("submits valid data and shows the success state", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(screen.getByText(/thanks/i)).toBeInTheDocument());
  });
  it("shows an error state when the API fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 500 }));
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test` → Expected: FAIL — missing modules.

- [ ] **Step 4: Write `lib/contact-schema.ts`**

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please enter a subject."),
  message: z.string().min(10, "Please tell us a little more (at least 10 characters)."),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 5: Write `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  // TODO: wire a real provider here (Resend or Formspree) — this stub only logs.
  console.log("[contact] submission", parsed.data);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 6: Write `components/contact-form.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";

const inputClasses =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-ink focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldError = (message?: string) =>
    message ? (
      <p role="alert" className="mt-1 text-sm text-brand">
        {message}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-800">
          Name
        </label>
        <input id="name" {...register("name")} aria-invalid={!!errors.name} className={inputClasses} />
        {fieldError(errors.name?.message)}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-800">
          Email
        </label>
        <input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} className={inputClasses} />
        {fieldError(errors.email?.message)}
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-zinc-800">
          Subject
        </label>
        <input id="subject" {...register("subject")} aria-invalid={!!errors.subject} className={inputClasses} />
        {fieldError(errors.subject?.message)}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-zinc-800">
          Message
        </label>
        <textarea id="message" rows={6} {...register("message")} aria-invalid={!!errors.message} className={inputClasses} />
        {fieldError(errors.message?.message)}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
      {status === "sent" ? (
        <p role="status" className="text-sm font-medium text-green-700">
          Thanks — your message has been sent. We&apos;ll get back to you shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-brand">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      ) : null}
    </form>
  );
}
```

- [ ] **Step 7: Write the contact info + page**

Create `content/pages/contact-info.mdx` from `content/raw/contact.md` (hand-cleaning rules; keep phone numbers, email addresses, address, and hours — drop any order-status widget or store links).

`app/(marketing)/contact/page.tsx`:
```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { ContactForm } from "@/components/contact-form";
import ContactInfo from "@/content/pages/contact-info.mdx";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with DropShipPOD — questions, quotes, and support.",
};

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Contact Us</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Send us a message</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Reach us directly</h2>
          <Prose className="mt-4">
            <ContactInfo />
          </Prose>
        </div>
      </div>
    </Container>
  );
}
```

- [ ] **Step 8: Run tests and build**

Run: `pnpm test` → Expected: PASS.
Run: `pnpm build` → Expected: `/contact` static; `/api/contact` listed as a dynamic (ƒ) route — the only one.

- [ ] **Step 9: Commit**

```bash
git add lib/contact-schema.ts lib/contact-schema.test.ts app/api/ components/contact-form.tsx \
  components/contact-form.test.tsx content/pages/contact-info.mdx "app/(marketing)/contact" \
  package.json pnpm-lock.yaml
git commit -m "feat: add contact page with validated form and stub API"
```

---
### Task 13: SEO — redirects, sitemap, robots, JSON-LD, 404

**Files:**
- Create: `lib/routes.ts`, `lib/redirects.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`
- Modify: `next.config.ts` (wire redirects), `app/layout.tsx` (Organization JSON-LD)
- Test: `lib/redirects.test.ts`, `app/sitemap.test.ts`

**Interfaces:**
- Consumes: `getAllSizeCharts` from `@/lib/size-charts`.
- Produces: `STATIC_ROUTES: string[]` (21 entries) from `lib/routes.ts`; `redirectList: { source: string; destination: string; permanent: true }[]` from `lib/redirects.ts`; `/sitemap.xml`, `/robots.txt`, custom 404.

- [ ] **Step 1: Write the failing tests**

`lib/redirects.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { redirectList } from "./redirects";
import { STATIC_ROUTES } from "./routes";

const sources = redirectList.map((r) => r.source);

describe("redirectList", () => {
  it("covers every migrated /pages/* slug", () => {
    for (const source of [
      "/pages/how-it-works",
      "/pages/about-us",
      "/pages/contact",
      "/pages/frequently-asked-questions-faqs",
      "/pages/dtf-faq",
      "/pages/sublimation-faq",
      "/pages/faq-print-on-your-own-item",
      "/pages/delivery-speed",
      "/pages/free-shipping-on-orders-over-100",
      "/pages/billing-information",
      "/pages/start-your-ecommerce-brand-without-tech-or-high-costs",
      "/pages/launch-a-fully-automated-ecommerce-brand-no-tech-needed",
      "/pages/sublimation-printing-notice",
      "/pages/measuring",
      "/pages/size-chart-:handle",
      "/pages/check-order-status",
      "/pages/custydesignlab",
    ]) {
      expect(sources).toContain(source);
    }
  });
  it("covers the emoji slugs in raw and percent-encoded forms", () => {
    expect(sources).toContain("/pages/⚠️-important-printing-notice");
    expect(sources).toContain("/pages/%E2%9A%A0%EF%B8%8F-important-printing-notice");
    expect(sources).toContain("/pages/🎨-artwork-mockup-approval");
    expect(sources).toContain("/pages/%F0%9F%8E%A8-artwork-mockup-approval");
  });
  it("covers old policy URLs and dropped commerce trees", () => {
    for (const source of [
      "/policies/privacy-policy",
      "/policies/terms-of-service",
      "/policies/refund-policy",
      "/policies/shipping-policy",
      "/products/:path*",
      "/collections/:path*",
      "/cart",
      "/account/:path*",
      "/blogs/:path*",
    ]) {
      expect(sources).toContain(source);
    }
  });
  it("is all-301 and every static destination exists", () => {
    for (const redirect of redirectList) {
      expect(redirect.permanent).toBe(true);
      if (!redirect.destination.includes(":")) {
        expect(STATIC_ROUTES).toContain(redirect.destination);
      }
    }
  });
});
```

`app/sitemap.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { STATIC_ROUTES } from "@/lib/routes";

describe("sitemap", () => {
  const entries = sitemap();
  it("contains every static route and all 47 size charts on the canonical domain", () => {
    expect(entries).toHaveLength(STATIC_ROUTES.length + 47);
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/dropshippod\.ca(\/|$)/);
    }
    expect(entries.map((e) => e.url)).toContain("https://dropshippod.ca/size-charts/gildan-5000");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test lib app` → Expected: FAIL — missing modules.

- [ ] **Step 3: Write `lib/routes.ts`**

```ts
export const STATIC_ROUTES = [
  "/",
  "/how-it-works",
  "/about",
  "/contact",
  "/faq",
  "/faq/dtf",
  "/faq/sublimation",
  "/faq/print-on-your-own-item",
  "/delivery",
  "/billing",
  "/start-your-ecommerce-brand",
  "/launch-automated-brand",
  "/printing-notice",
  "/sublimation-printing-notice",
  "/artwork-approval",
  "/size-charts",
  "/measuring",
  "/policies/privacy",
  "/policies/terms",
  "/policies/refund",
  "/policies/shipping",
];
```

- [ ] **Step 4: Write `lib/redirects.ts`**

```ts
type Redirect = { source: string; destination: string; permanent: true };

const to = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

export const redirectList: Redirect[] = [
  // migrated pages
  to("/pages/how-it-works", "/how-it-works"),
  to("/pages/about-us", "/about"),
  to("/pages/contact", "/contact"),
  to("/pages/frequently-asked-questions-faqs", "/faq"),
  to("/pages/dtf-faq", "/faq/dtf"),
  to("/pages/sublimation-faq", "/faq/sublimation"),
  to("/pages/faq-print-on-your-own-item", "/faq/print-on-your-own-item"),
  to("/pages/delivery-speed", "/delivery"),
  to("/pages/free-shipping-on-orders-over-100", "/delivery"),
  to("/pages/billing-information", "/billing"),
  to("/pages/start-your-ecommerce-brand-without-tech-or-high-costs", "/start-your-ecommerce-brand"),
  to("/pages/launch-a-fully-automated-ecommerce-brand-no-tech-needed", "/launch-automated-brand"),
  to("/pages/⚠️-important-printing-notice", "/printing-notice"),
  to("/pages/%E2%9A%A0%EF%B8%8F-important-printing-notice", "/printing-notice"),
  to("/pages/sublimation-printing-notice", "/sublimation-printing-notice"),
  to("/pages/🎨-artwork-mockup-approval", "/artwork-approval"),
  to("/pages/%F0%9F%8E%A8-artwork-mockup-approval", "/artwork-approval"),
  to("/pages/measuring", "/measuring"),
  to("/pages/size-chart-:handle", "/size-charts/:handle"),
  // migrated policies
  to("/policies/privacy-policy", "/policies/privacy"),
  to("/policies/terms-of-service", "/policies/terms"),
  to("/policies/refund-policy", "/policies/refund"),
  to("/policies/shipping-policy", "/policies/shipping"),
  // dropped pages with a sensible home
  to("/pages/check-order-status", "/contact"),
  to("/pages/custydesignlab", "/"),
  // dropped commerce trees
  to("/products/:path*", "/"),
  to("/collections/:path*", "/"),
  to("/cart", "/"),
  to("/account/:path*", "/"),
  to("/blogs/:path*", "/"),
];
```

- [ ] **Step 5: Wire redirects into `next.config.ts`** (full new file contents)

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

If `next build` rejects the raw-unicode emoji sources (path-to-regexp parse error), delete the two raw-unicode entries and keep the percent-encoded ones (browsers always send the encoded form), updating the redirect test to match.

- [ ] **Step 6: Write `app/sitemap.ts` and `app/robots.ts`**

`app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { STATIC_ROUTES } from "@/lib/routes";
import { getAllSizeCharts } from "@/lib/size-charts";

const BASE = "https://dropshippod.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${BASE}${route}` })),
    ...getAllSizeCharts().map((chart) => ({ url: `${BASE}/size-charts/${chart.handle}` })),
  ];
}
```

`app/robots.ts`:
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://dropshippod.ca/sitemap.xml",
  };
}
```

- [ ] **Step 7: Add Organization JSON-LD to `app/layout.tsx`** (replaces the old InstaCustoms block from `layout/theme.liquid`; the old signage `<title>` hacks are shop-specific and intentionally dropped). Add inside `<body>`, before `<Header />`:

```tsx
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DropShipPOD",
  url: "https://dropshippod.ca",
  sameAs: [
    "https://www.facebook.com/CheapestPrintOnDemand/",
    "https://www.instagram.com/cheapestprintondemand/",
    "https://www.tiktok.com/@cheapest.print.on.demand",
    "https://www.youtube.com/@DropShipPOD",
  ],
};
```
```tsx
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
```

- [ ] **Step 8: Write `app/not-found.tsx`**

```tsx
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-zinc-600">
        The page you&apos;re looking for doesn&apos;t exist — it may have moved when we rebuilt the site.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
```

- [ ] **Step 9: Run tests and build**

Run: `pnpm test` → Expected: PASS.
Run: `pnpm build` → Expected: build succeeds and prints the redirect count; `/sitemap.xml` and `/robots.txt` appear in the route list.

- [ ] **Step 10: Commit**

```bash
git add lib/routes.ts lib/redirects.ts lib/redirects.test.ts app/sitemap.ts app/sitemap.test.ts \
  app/robots.ts app/not-found.tsx app/layout.tsx next.config.ts
git commit -m "feat: add SEO layer — 301 redirects, sitemap, robots, JSON-LD, 404"
```

---

### Task 14: Final verification, polish, and docs

**Files:**
- Create: `README.md`
- Modify: `CLAUDE.md` (repo-status note at top)
- Test: full suite + build + manual redirect/a11y checklist

**Interfaces:**
- Consumes: everything.
- Produces: verified, documented, launch-ready site. Deploy itself (Vercel project + domain cutover) needs merchant credentials and is a human step — the README documents it.

- [ ] **Step 1: Full automated verification**

```bash
pnpm test          # all suites PASS
pnpm build         # all routes static except /api/contact; 47 size-chart paths
```
Then the no-Shopify-leak sweep (Global Constraint):
```bash
grep -rE "cdn.shopify.com|myshopify.com|shopify://" app/ components/ lib/ content/pages/ content/faqs/ content/size-charts/ content/*.ts && echo LEAK || echo CLEAN
```
Expected: `CLEAN`.

- [ ] **Step 2: Redirect spot-checks against the production build**

```bash
pnpm start &
sleep 2
curl -sI http://localhost:3000/pages/how-it-works | head -3            # 308/301 -> /how-it-works
curl -sI http://localhost:3000/pages/size-chart-gildan-5000 | head -3  # -> /size-charts/gildan-5000
curl -sI "http://localhost:3000/pages/%E2%9A%A0%EF%B8%8F-important-printing-notice" | head -3  # -> /printing-notice
curl -sI http://localhost:3000/products/anything | head -3             # -> /
curl -sI http://localhost:3000/policies/privacy-policy | head -3       # -> /policies/privacy
kill %1
```
Expected: each returns a permanent redirect (Next emits 308) to the listed destination.

- [ ] **Step 3: Manual browser checklist** (run `pnpm start`, check on desktop + a ~375px viewport)

- [ ] Homepage: all 8 sections render in order; video facades show posters; clicking loads YouTube; no layout shift from fonts.
- [ ] Header: dropdowns open on hover and click; mobile drawer opens/closes; every link lands on a real page (no 404s from the chrome).
- [ ] Keyboard: tab through header, open a dropdown with Enter, operate the FAQ accordion with Enter/Space, submit the contact form empty and hear/see the errors (`role="alert"`).
- [ ] `/size-charts` hub groups all brands; a Gildan and an Independent Trading Co. chart render correct tables on mobile (horizontal scroll inside the card, no page overflow).
- [ ] `/contact` form: invalid → inline errors; valid → success message (check the dev-server log shows the stub `[contact] submission`).
- [ ] Fix anything found; re-run `pnpm test && pnpm build` after fixes.

- [ ] **Step 4: Write `README.md`**

```md
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
```

- [ ] **Step 5: Prepend a status note to `CLAUDE.md`** (keep the rest of the file; it documents the legacy theme dirs). Add directly under the `# CLAUDE.md` heading:

```md
> **Repo status (2026-07):** This repo now contains TWO things: (1) the **Next.js marketing
> site** at the repo root (`app/`, `components/`, `content/`, `lib/`, `public/`, `scripts/`) —
> this is the active codebase; see `README.md` — and (2) the **legacy Shopify theme**
> (`assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`),
> retained as reference until post-launch removal. Everything below this note describes the
> legacy theme only.
```

- [ ] **Step 6: Final commit**

```bash
git add README.md CLAUDE.md
git commit -m "docs: add README and CLAUDE.md status note for the Next.js site"
```

- [ ] **Step 7: Human handoff items** (cannot be automated from this repo — list them in the completion report)

1. Create the Vercel project, connect the repo, verify the preview deployment.
2. Cut `dropshippod.ca` DNS over to Vercel; confirm the old Shopify URLs 301 correctly in production.
3. Decide the Shopify store's fate (keep for the app backend / close the storefront) — outside this repo.
4. Choose and wire the contact-form provider (Resend or Formspree) in `app/api/contact/route.ts`.
5. Post-launch: delete the legacy theme dirs and the migration scripts in a cleanup PR.

---

## Self-Review (performed while writing this plan)

- **Spec coverage:** §5 stack → Tasks 1, 8, 10, 12 (shadcn CLI deviation documented in the header); §6 route map → Tasks 8, 9, 10, 11, 13 (every row appears in a task; dropped routes redirect in Task 13); §7 homepage order → Task 7; §8 pipeline → Tasks 4, 5, 11; §9 design system → Tasks 1–3, 6 (spec leaves the display face open — Space Grotesk chosen); §10 contact → Task 12; §12 SEO → Task 13; §13 phases 0–6 → Tasks 1–14; phase 7 deploy → Task 14 handoff (needs merchant credentials). i18n/FR, order-status lookup, commerce, customizer apps: excluded per spec §3.
- **Placeholder scan:** the only unwritten content is scraped page text that does not exist until Task 4 runs (FAQ answers, MDX bodies, contact info). Each such step names its exact source file, the transformation rules (Global Constraints), and a test or grep acceptance check. No TBDs; all code steps show complete code.
- **Type consistency:** `cn`, `ButtonVariant`, `NavEntry`/`isGroup`, `FaqItem`, `SizeChart`/`getAllSizeCharts`/`getSizeChart`/`chartsByBrand`, `contactSchema`/`ContactInput`, `STATIC_ROUTES`, `redirectList` — checked against every consuming task; names and signatures match. Test counts (14 logos, 3 testimonials, 5 steps, 6 videos, 47 charts, 21 static routes) match the data defined in the same plan.
