# Custy Site Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the custy marketing site with `/design-lab`, `/use-cases`, and `/dropshipping` pages, three homepage bands, a pricing comparison table, feature-page depth, filled support/contact MDX, three new blog posts — and fix the trial-length copy to match the app.

**Architecture:** Custy's lander design system (`components/lander/`) already exists — every new page composes `LanderHero` / `LanderSection` / `CardGrid` / `Steps` / `CtaBand` with structured content in `content/*.ts`. No new design system work; one new component (`PlanCompare`). Homepage keeps its scheme1/scheme2 alternation (recompute after inserting bands).

**Tech Stack:** Next.js 15 App Router (SSG), React 19, Tailwind v4, lucide-react via `components/lander/icons.tsx` registry, MDX, Vitest + Testing Library, pnpm. Spec: `../../docs/superpowers/specs/2026-07-29-both-sites-professional-upgrade-design.md` (repo root).

## Global Constraints

- Run everything from `custy/` (`pnpm test`, `pnpm build`). TDD every task; commit per task as `ferhannasim`, **no Claude/AI co-author trailer**.
- **No-commerce rule**: "install" CTAs go to `APP_URL` (`lib/site.ts` → `https://apps.shopify.com/custy`); never add commerce routes.
- **No emoji** anywhere in `content/` (except `content/raw/`), `components/`, `app/` — `lib/no-emoji.test.ts`, zero exemptions (`© ® ™` allowed).
- **Icons**: semantic names resolved by `components/lander/icons.tsx`; register new names there, never inline lucide imports in content. Existing registry names: `palette, layers, circle-dollar-sign, printer, puzzle, blocks, zap, trending-up, shopping-bag, shirt, store, gift, chart-column, sparkles, server, monitor, file-check, eye, shield-check, calendar-check, badge-percent, undo, mail, phone`.
- **Source of truth**: every claim must be true of the Custy app (`../../../CPOD-DropShip-APP/CustyApp`). Plan quotas/prices come from its `app/config/plans.ts`: Free $0 (5 products / 20 orders/mo / 1 GB / 1 print side), Starter $12.99 (10 / 50 / 5 GB / 2 sides), Growth $39.99 (100 / 300 / 25 GB / 6 sides), Pro $79.99 (unlimited everything); annual saves 20%; `TRIAL_DAYS = 30`.
- **Brand tricolor discipline** (see memory + lander components): tricolor appears only as tri-dot Eyebrow, one RainbowBar per page (hero), featured-plan hairline, icon-tile tints. New pages: exactly one RainbowBar, via `LanderHero`.
- Check `lib/redirects.ts` before adding each route — no new route may equal a redirect **source**.
- All existing tests stay green after every task.

## File Structure (end state)

```
content/design-lab.ts               /design-lab data
content/use-cases.ts                /use-cases data
content/dropshipping.ts             /dropshipping data
content/features.ts                 + operations/pricing-controls section
content/pricing.ts                  + comparison rows, + 3 FAQ items, trial copy 30-day
content/home.ts                     + printMethods, designLabTeaser, dropshipTiein
content/posts/*.mdx + index.ts      + 3 posts (image now optional)
components/lander/plan-compare.tsx  responsive plan-comparison table
app/{design-lab,use-cases,dropshipping}/page.tsx (+ colocated tests)
app/page.tsx                        three inserted bands, re-alternated schemes
content/pages/{support,contact}.mdx real prose
lib/site.ts                         + DROPSHIP_SITE_URL, DROPSHIP_APP_URL
lib/nav.ts                          + Design Lab (header), + 3 links (footer Explore)
```

---

### Task 1: Fix trial-length copy (21-day → the app's real value)

**Files:**
- Create: `lib/trial-copy.test.ts`
- Modify: `content/home.ts`, `content/features.ts`, `content/how-it-works.ts`, `content/about.ts`, `content/pricing.ts`, `app/support/page.tsx`

- [ ] **Step 1: Verify the source of truth.** Read `../../../CPOD-DropShip-APP/CustyApp/app/config/plans.ts` and confirm `TRIAL_DAYS` (expected: 30). If it is not 30, use the actual value everywhere below.

- [ ] **Step 2: Write the failing test**

```ts
// lib/trial-copy.test.ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The Custy app's plans.ts defines TRIAL_DAYS = 30. The scraped site copy said
// "21-day" — this guard keeps site copy aligned with the app.
const ROOTS = ["content", "app", "components"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === "raw" || entry.name === "node_modules") continue;
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|mdx)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) out.push(full);
  }
  return out;
}

describe("trial-length copy", () => {
  it("never mentions the stale 21-day trial", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(path.join(process.cwd(), root))) {
        const text = fs.readFileSync(file, "utf8");
        if (/21[- ]day/i.test(text)) offenders.push(path.relative(process.cwd(), file));
      }
    }
    expect(offenders, offenders.join("\n")).toHaveLength(0);
  });
});
```

Run: `pnpm test -- lib/trial-copy.test.ts` — Expected: FAIL listing six files.

- [ ] **Step 3: Update the copy.** Replace every `21-Day` / `21-day` with `30-Day` / `30-day` in: `content/home.ts` (2 CTA labels), `content/features.ts` (hero CTA label + trial paragraph), `content/how-it-works.ts` (CTA label), `content/about.ts` (CTA label + nearby comment if it names the label), `content/pricing.ts` (header lead, note line, and each `trialNote: "21-day free trial"` → `"30-day free trial"`), `app/support/page.tsx` (helpTopics billing text). Do not change hrefs or any other copy.

- [ ] **Step 4: Run `pnpm test`** — Expected: green. Some content tests may pin exact CTA labels (check `components/lander/lander.test.tsx`, `lib/nav.test.ts`, section tests) — update pinned strings to the 30-day label, never delete assertions.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: align trial-length copy with the app's 30-day trial"
```

---

### Task 2: /design-lab page

**Files:**
- Create: `content/design-lab.ts`, `app/design-lab/page.tsx`, `app/design-lab/design-lab.test.tsx`
- Modify: `components/lander/icons.tsx` (register `type` → `Type` and `image` → `ImagePlus` from lucide-react), `lib/nav.ts` (headerNav + footer Explore)

**Interfaces:**
- Consumes: full lander barrel; `APP_URL` from `lib/site.ts`.
- Produces: `content/design-lab.ts` exports `designLabHero` (shape of `FeaturesHero` in `content/features.ts`: `{eyebrow, title, lead: string[], ctas: CtaLink[], highlight: {title, items}}`), `designTools: CardItem[]`, `safeguards: CardItem[]`, `designLabFlow: StepItem[]`, `designLabCta`.

- [ ] **Step 1: Check redirects.** `grep -n "design-lab\|custydesignlab" lib/redirects.ts` — `/design-lab` must not be a redirect source. If a legacy `/pages/custydesignlab*` source exists, its destination may be updated to `/design-lab` in this task.

- [ ] **Step 2: Write the failing test**

```tsx
// app/design-lab/design-lab.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import DesignLabPage from "./page";

describe("DesignLabPage", () => {
  it("tours the shopper designer and its safeguards", () => {
    render(<DesignLabPage />);
    expect(screen.getByRole("heading", { level: 1, name: /design lab/i })).toBeInTheDocument();
    for (const card of [
      "Text, exactly as they want it", "A clipart and font library", "Their own artwork",
      "Every printable side", "Low-resolution warnings", "Keep designs inside the lines",
      "Approval before checkout", "Quote requests by email",
    ]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
  });
});
```

Run: `pnpm test -- app/design-lab/design-lab.test.tsx` — Expected: FAIL.

- [ ] **Step 3: Write content + page**

```ts
// content/design-lab.ts
import type { CardItem, CtaLink, StepItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export const designLabHero = {
  eyebrow: "The shopper experience",
  title: "Inside the Design Lab",
  lead: [
    "When a shopper clicks Customize It on a product page, Custy opens the Design Lab — a live design surface where they build exactly what they want to buy.",
    "Everything they create becomes structured design data on the order, so what you print is precisely what they approved.",
  ],
  ctas: [
    { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" },
    { label: "Try the live demo", href: "/live-demo", variant: "secondary" },
  ],
  highlight: {
    title: "What shoppers can do",
    items: [
      "Add and style text with your font library",
      "Drop in cliparts from curated categories",
      "Upload their own images and artwork",
      "Design front, back, sleeves and neck tag",
      "See the finished product before they buy",
    ],
  },
};

export const designTools: CardItem[] = [
  {
    icon: "type",
    title: "Text, exactly as they want it",
    text: "Shoppers add names, numbers and messages, styled with the fonts you allow — from your font library with categories you control.",
  },
  {
    icon: "sparkles",
    title: "A clipart and font library",
    text: "Curate cliparts into categories so every niche gets relevant art, and keep brand-safe fonts one click away.",
  },
  {
    icon: "image",
    title: "Their own artwork",
    text: "Photo and artwork uploads land on the product with live preview, sized and positioned by the shopper.",
  },
  {
    icon: "layers",
    title: "Every printable side",
    text: "Front, back, left sleeve, right sleeve, neck tag — each side has its own print area and mockup you configure per product.",
  },
];

export const safeguards: CardItem[] = [
  {
    icon: "eye",
    title: "Low-resolution warnings",
    text: "Set a required DPI for raster uploads and the Design Lab warns shoppers before a blurry file ever reaches production.",
  },
  {
    icon: "shield-check",
    title: "Keep designs inside the lines",
    text: "Out-of-bounds warnings flag artwork that crosses the printable area, so surprises don't show up on the press.",
  },
  {
    icon: "file-check",
    title: "Approval before checkout",
    text: "An optional approval and disclaimer step makes shoppers confirm their design — fewer disputes, cleaner orders.",
  },
  {
    icon: "mail",
    title: "Quote requests by email",
    text: "For quote-first workflows, the Design Lab can send the design as a quote email instead of straight to cart.",
  },
];

export const designLabFlow: StepItem[] = [
  { number: 1, title: "Shopper designs", text: "Text, cliparts and uploads across the sides you enabled, with live preview." },
  { number: 2, title: "Design becomes an order", text: "The finished design is saved as a product and carries complete design data through checkout." },
  { number: 3, title: "You review and download", text: "Orders arrive with per-item design downloads — vector SVG/PDF or raster at your required DPI, background included or transparent." },
  { number: 4, title: "Production runs", text: "Print-ready files go to your press or print partner with nothing to rebuild by hand." },
];

export const designLabCta = {
  title: "Give shoppers the pen",
  text: "Stores sell more when customers design what they buy. Turn the Design Lab on for your first product today.",
  cta: { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" } as CtaLink,
  secondaryCta: { label: "See how it works", href: "/how-it-works", variant: "secondary" } as CtaLink,
};
```

```tsx
// app/design-lab/page.tsx
import type { Metadata } from "next";
import {
  CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection, Steps,
} from "@/components/lander";
import {
  designLabCta, designLabFlow, designLabHero, designTools, safeguards,
} from "@/content/design-lab";

export const metadata: Metadata = {
  title: "Design Lab",
  description:
    "Tour Custy's Design Lab: shoppers add text, cliparts and uploads across every printable side — with DPI checks, bounds warnings and approval before checkout.",
};

export default function DesignLabPage() {
  return (
    <main>
      <LanderHero
        eyebrow={designLabHero.eyebrow}
        title={designLabHero.title}
        lead={designLabHero.lead}
        ctas={designLabHero.ctas}
        highlight={<HighlightCard title={designLabHero.highlight.title} items={designLabHero.highlight.items} />}
      />
      <LanderSection eyebrow="Design tools" title="Everything a shopper needs to create"
        lead="The Design Lab keeps creativity open and production safe.">
        <CardGrid items={designTools} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Quality safeguards" title="Creative freedom that stays printable">
        <CardGrid items={safeguards} columns={4} />
      </LanderSection>
      <LanderSection eyebrow="From design to press" title="What happens after they click add to cart">
        <Steps items={designLabFlow} layout="rows" />
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...designLabCta} />
      </LanderSection>
    </main>
  );
}
```

Register the two new icons in `components/lander/icons.tsx` (`type: Type, image: ImagePlus`).

- [ ] **Step 4: Nav.** `lib/nav.ts`: headerNav add `{ label: "Design Lab", href: "/design-lab" }` after "Features"; footer Explore add same after "Features". Update `lib/nav.test.ts` if it pins counts/labels.

- [ ] **Step 5: Run `pnpm test` and `pnpm build`** — Expected: green.

- [ ] **Step 6: Commit**

```bash
git add content/design-lab.ts app/design-lab components/lander/icons.tsx lib/nav.ts lib/nav.test.ts
git commit -m "feat: add /design-lab tour page"
```

---

### Task 3: /use-cases page

**Files:**
- Create: `content/use-cases.ts`, `app/use-cases/page.tsx`, `app/use-cases/use-cases.test.tsx`
- Modify: `lib/nav.ts` (footer Explore)

**Interfaces:**
- Consumes: lander barrel; `APP_URL`.
- Produces: `content/use-cases.ts` exports `useCasesHero`, `audiences: CardItem[]` (4), `niches: CardItem[]` (8), `useCasesCta`.

**Framing rule:** the eight niches are presented as *merch niches where personalization wins* (marketing framing) — NOT as built-in Custy template categories. Do not claim Custy ships niche template packs.

- [ ] **Step 1: Write the failing test**

```tsx
// app/use-cases/use-cases.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { audiences, niches } from "@/content/use-cases";
import UseCasesPage from "./page";

describe("UseCasesPage", () => {
  it("renders four audiences and the eight-niche grid", () => {
    render(<UseCasesPage />);
    expect(screen.getByRole("heading", { level: 1, name: /who sells with custy/i })).toBeInTheDocument();
    expect(audiences).toHaveLength(4);
    expect(niches).toHaveLength(8);
    for (const audience of ["Print-on-demand stores", "Apparel brands", "Team & event merch", "Promo products"]) {
      expect(screen.getByRole("heading", { name: audience })).toBeInTheDocument();
    }
  });
});
```

Run — Expected: FAIL.

- [ ] **Step 2: Write content + page**

```ts
// content/use-cases.ts
import type { CardItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export const useCasesHero = {
  eyebrow: "Use cases",
  title: "Who sells with Custy",
  lead: [
    "Personalization isn't one niche — it's a capability that lifts stores across categories. If your customers would love a product with their name, their team, or their artwork on it, Custy fits.",
  ],
  ctas: [
    { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" as const },
    { label: "See the Design Lab", href: "/design-lab", variant: "secondary" as const },
  ],
};

export const audiences: CardItem[] = [
  {
    icon: "store",
    title: "Print-on-demand stores",
    text: "Let shoppers design t-shirts, hoodies and caps in real time, with dynamic pricing by print method, side count and product options.",
  },
  {
    icon: "shirt",
    title: "Apparel brands",
    text: "Offer names, numbers and monograms on your existing line without new SKUs — every design becomes structured order data.",
  },
  {
    icon: "trending-up",
    title: "Team & event merch",
    text: "Jerseys, tournament tees and event shirts with per-size pricing, quantity discounts and an approval step before anything prints.",
  },
  {
    icon: "gift",
    title: "Promo products",
    text: "Mugs, totes and giveaways with customer logos — quote-by-email workflows and buy-blank options included.",
  },
];

export const niches: CardItem[] = [
  { icon: "sparkles", title: "Athletic, College & Greek", text: "Spirit wear and chapter apparel shoppers proudly co-design." },
  { icon: "gift", title: "Weddings & Events", text: "Bachelorette crews, birthdays and reunions — one design, many names." },
  { icon: "shield-check", title: "Military", text: "Unit pride and homecoming pieces with details that matter." },
  { icon: "trending-up", title: "Sports & Teams", text: "Names and numbers on jerseys, priced per size range." },
  { icon: "calendar-check", title: "Religious & Community", text: "Youth groups and church events with easy group orders." },
  { icon: "circle-dollar-sign", title: "Fundraising & Charity", text: "Awareness merch where quantity discounts do the heavy lifting." },
  { icon: "zap", title: "First Responders", text: "Station wear and appreciation runs, customized per crew." },
  { icon: "calendar-check", title: "Holidays", text: "Seasonal personalization spikes — be ready before the rush." },
];

export const useCasesCta = {
  title: "Your store, their designs",
  text: "Whatever you sell, personalization raises engagement and order value. Flag your first product as customizable today.",
  cta: { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" as const },
  secondaryCta: { label: "View pricing", href: "/pricing", variant: "secondary" as const },
};
```

Wait — `niches` uses `calendar-check` twice; per `CardGrid` the `key` is `item.title` so duplicate icons are fine (titles differ). Keep as written.

```tsx
// app/use-cases/page.tsx
import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { audiences, niches, useCasesCta, useCasesHero } from "@/content/use-cases";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "POD stores, apparel brands, team merch and promo products — where Custy's product personalization lifts engagement and order value.",
};

export default function UseCasesPage() {
  return (
    <main>
      <LanderHero {...useCasesHero} />
      <LanderSection eyebrow="Built for" title="Four kinds of stores, one customizer">
        <CardGrid items={audiences} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Where personalization wins" title="Niches your customers already shop"
        lead="These are the audiences personalized merch is built around — and the Design Lab serves all of them.">
        <CardGrid items={niches} columns={4} align="center" />
      </LanderSection>
      <LanderSection>
        <CtaBand {...useCasesCta} />
      </LanderSection>
    </main>
  );
}
```

- [ ] **Step 3: Nav.** Footer Explore add `{ label: "Use Cases", href: "/use-cases" }` after "Design Lab". (Header stays at six items — use-cases is a footer/secondary page.)

- [ ] **Step 4: Run `pnpm test` and `pnpm build`** — Expected: green.

- [ ] **Step 5: Commit**

```bash
git add content/use-cases.ts app/use-cases lib/nav.ts
git commit -m "feat: add /use-cases page"
```

---

### Task 4: /dropshipping page

**Files:**
- Create: `content/dropshipping.ts`, `app/dropshipping/page.tsx`, `app/dropshipping/dropshipping.test.tsx`
- Modify: `lib/site.ts` (add `DROPSHIP_SITE_URL`, `DROPSHIP_APP_URL`), `lib/nav.ts` (footer Explore)

**Interfaces:**
- Consumes: lander barrel.
- Produces: `lib/site.ts` exports `export const DROPSHIP_SITE_URL = "https://dropshippod.ca";` and `export const DROPSHIP_APP_URL = "https://apps.shopify.com/dropshippod";` (mirrors dropship's `lib/site.ts` which already declares the Custy URLs). `content/dropshipping.ts` exports `dropshippingHero`, `combo: CardItem[]`, `dropshipFlow: StepItem[]`, `dropshippingCta`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/dropshipping/dropshipping.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DROPSHIP_APP_URL } from "@/lib/site";
import DropshippingPage from "./page";

describe("DropshippingPage", () => {
  it("tells the Custy + DropShipPOD story and links the sibling app", () => {
    render(<DropshippingPage />);
    expect(screen.getByRole("heading", { level: 1, name: /customization meets dropshipping/i })).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /get dropshippod/i });
    expect(links[0]).toHaveAttribute("href", DROPSHIP_APP_URL);
  });
});
```

Run — Expected: FAIL.

- [ ] **Step 2: Write content + page**

```ts
// content/dropshipping.ts
import type { CardItem, StepItem } from "@/components/lander";
import { APP_URL, DROPSHIP_APP_URL, DROPSHIP_SITE_URL } from "@/lib/site";

export const dropshippingHero = {
  eyebrow: "Custy + DropShipPOD",
  title: "Customization meets dropshipping",
  lead: [
    "Custy and DropShipPOD are sibling Shopify apps built on the same platform. DropShipPOD fills your store with print-on-demand products and fulfills the orders; Custy lets your customers personalize those products before they buy.",
    "Together they close the loop: import a blank, let the shopper design it, and the print-ready file lands with the supplier who produces it.",
  ],
  ctas: [
    { label: "Get DropShipPOD", href: DROPSHIP_APP_URL, variant: "primary" as const },
    { label: "Visit dropshippod.ca", href: DROPSHIP_SITE_URL, variant: "secondary" as const },
  ],
};

export const combo: CardItem[] = [
  {
    icon: "store",
    title: "One store, two roles",
    text: "Stores on the platform act as merchants or suppliers. Merchants sell and set markup; suppliers produce and ship — the apps route everything between them.",
  },
  {
    icon: "puzzle",
    title: "Dropshipped products, Custy-aware",
    text: "Products imported through DropShipPOD are tagged in Custy, and the supplier controls which of them can be customized — so nothing unprintable goes on sale.",
  },
  {
    icon: "file-check",
    title: "Print-ready hand-off",
    text: "A shopper's finished design travels with the order as vector or high-DPI raster files, straight to the supplier's download queue.",
  },
  {
    icon: "zap",
    title: "Free to start, on both sides",
    text: "DropShipPOD has no subscription, and Custy's Free plan activates automatically when installed from the DropShipPOD admin — no payment required.",
  },
];

export const dropshipFlow: StepItem[] = [
  { number: 1, title: "Import with DropShipPOD", text: "Pull blanks from the supplier catalog into your Shopify store and set your markup." },
  { number: 2, title: "Customers design with Custy", text: "The Customize It button opens the Design Lab on the products you flag as customizable." },
  { number: 3, title: "Orders carry the design", text: "Paid orders include complete design data and print-ready files." },
  { number: 4, title: "The supplier produces and ships", text: "Production runs from the same platform, and tracking flows back to your store." },
];

export const dropshippingCta = {
  title: "Run the full loop",
  text: "Start with either app — they're built to find each other. Add Custy to a DropShipPOD store, or DropShipPOD to a Custy store.",
  cta: { label: "Get DropShipPOD", href: DROPSHIP_APP_URL, variant: "primary" as const },
  secondaryCta: { label: "Install Custy", href: APP_URL, variant: "secondary" as const },
};
```

```tsx
// app/dropshipping/page.tsx
import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection, Steps } from "@/components/lander";
import { combo, dropshipFlow, dropshippingCta, dropshippingHero } from "@/content/dropshipping";

export const metadata: Metadata = {
  title: "Dropshipping",
  description:
    "How Custy pairs with DropShipPOD: import print-on-demand products, let shoppers personalize them, and hand print-ready files to the supplier automatically.",
};

export default function DropshippingPage() {
  return (
    <main>
      <LanderHero {...dropshippingHero} />
      <LanderSection eyebrow="Better together" title="What the pairing unlocks">
        <CardGrid items={combo} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="The loop" title="From catalog to customized doorstep">
        <Steps items={dropshipFlow} layout="rows" />
      </LanderSection>
      <LanderSection>
        <CtaBand {...dropshippingCta} />
      </LanderSection>
    </main>
  );
}
```

- [ ] **Step 3: Nav.** Footer Explore add `{ label: "Dropshipping", href: "/dropshipping" }` after "Use Cases".

- [ ] **Step 4: Run `pnpm test` and `pnpm build`** — Expected: green.

- [ ] **Step 5: Commit**

```bash
git add content/dropshipping.ts app/dropshipping lib/site.ts lib/nav.ts
git commit -m "feat: add /dropshipping page for the DropShipPOD pairing"
```

---

### Task 5: Homepage — three new bands

**Spec note:** the spec lists five homepage bands; plan highlights (`PricingTeaser`) and FAQ (`Faq`) already exist on the homepage, so only the three below are added.

**Files:**
- Create: `app/home-bands.test.tsx`
- Modify: `content/home.ts` (add `printMethods`, `designLabTeaser`, `dropshipTiein`), `app/page.tsx` (insert bands, recompute scheme alternation)

**Interfaces:**
- Consumes: `CardGrid`, `LanderSection`-equivalents — NOTE: homepage sections use the `scheme` prop pattern (`bg-scheme1-bg` / `bg-scheme2-bg`), not `LanderSection` tones. New bands follow the existing homepage pattern: `Container` + `Eyebrow` + heading, or reuse `RichSection`-style composition. Simplest consistent approach used below: a small inline band component in `app/page.tsx` is NOT allowed (content in content files) — instead compose with `Container`, `Eyebrow`, `CardGrid` directly as the existing sections do internally.
- Produces: `home.printMethods: CardItem[]`, `home.designLabTeaser: {eyebrow, title, text, cta, secondaryCta}`, `home.dropshipTiein: {eyebrow, title, text, cta, secondaryCta}`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/home-bands.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage new bands", () => {
  it("renders print methods, Design Lab teaser, and DropShipPOD tie-in", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Print methods that match your products" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Step inside the Design Lab" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pair it with DropShipPOD" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore the Design Lab" })).toHaveAttribute("href", "/design-lab");
    expect(screen.getByRole("link", { name: "How the pairing works" })).toHaveAttribute("href", "/dropshipping");
  });
});
```

Run — Expected: FAIL.

- [ ] **Step 2: Add content** to `content/home.ts` (append to the `home` object; import `CardItem` type):

```ts
  // Print methods band — DTG/DTF/embroidery are the printing types the app's
  // pricing engine models (per-color-count and per-size-range rules).
  printMethods: [
    {
      icon: "printer",
      title: "DTG printing",
      text: "Soft, detailed direct-to-garment prints with pricing rules that follow color count and size range.",
    },
    {
      icon: "layers",
      title: "DTF transfers",
      text: "Vivid film transfers for cotton, blends and dark garments — the apparel workhorse.",
    },
    {
      icon: "sparkles",
      title: "Embroidery",
      text: "Stitched personalization for caps, polos and premium pieces, priced by its own rules.",
    },
  ] as CardItem[],

  designLabTeaser: {
    eyebrow: "The shopper experience",
    title: "Step inside the Design Lab",
    text: "Text, cliparts, uploads and every printable side — with DPI checks, bounds warnings and approval before checkout. See exactly what your customers will see.",
    cta: { label: "Explore the Design Lab", href: "/design-lab" },
    secondaryCta: { label: "Try the live demo", href: "/live-demo" },
  },

  dropshipTiein: {
    eyebrow: "Custy + DropShipPOD",
    title: "Pair it with DropShipPOD",
    text: "Fill your store from a print-on-demand catalog, let customers personalize the products, and hand print-ready files to the supplier — two sibling apps, one loop.",
    cta: { label: "How the pairing works", href: "/dropshipping" },
    // No `external` flag — lander CtaLink has no such field; LanderCta auto-detects http(s) hrefs.
    secondaryCta: { label: "Visit dropshippod.ca", href: DROPSHIP_SITE_URL },
  },
```

(Add `import { DROPSHIP_SITE_URL } from "@/lib/site";` — created in Task 4.)

- [ ] **Step 3: Insert bands in `app/page.tsx`.** Composition (follow the file's existing import style; `Eyebrow`, `CardGrid`, `CtaBand` from `@/components/lander`, `Container` from `@/components/container`):

  - After `<DemoProducts …>`, insert the **print methods band**:

```tsx
      <section className="bg-scheme1-bg">
        <Container className="py-16 md:py-24">
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            <Eyebrow className="mb-4">Print methods</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              Print methods that match your products
            </h2>
          </div>
          <CardGrid items={home.printMethods} columns={3} align="center" />
        </Container>
      </section>
```

  - After `<WhyCusty …>`, insert the **Design Lab teaser** as a light `CtaBand`:

```tsx
      <section className="bg-scheme2-bg">
        <Container className="py-16 md:py-20">
          <CtaBand
            title={home.designLabTeaser.title}
            text={home.designLabTeaser.text}
            cta={home.designLabTeaser.cta}
            secondaryCta={home.designLabTeaser.secondaryCta}
            tone="light"
          />
        </Container>
      </section>
```

  - After `<TrustBand …>`, insert the **DropShipPOD tie-in** the same way (`home.dropshipTiein`, `tone="light"`).
  - **Recompute the scheme alternation** for the whole page top-to-bottom (the file's header comment documents the rule: no two adjacent sections share a background). Update every section's `scheme` prop so the alternation holds with the three insertions, and update the comment to name this task.

- [ ] **Step 4: Run `pnpm test`** — Expected: `app/home-bands.test.tsx` green; fix any scheme-pinning section tests by updating expected schemes.

- [ ] **Step 5: Run `pnpm build`**, then `pnpm start` and eyeball `/` for alternation breaks.

- [ ] **Step 6: Commit**

```bash
git add content/home.ts app/page.tsx app/home-bands.test.tsx
git commit -m "feat: add print-methods, Design Lab and DropShipPOD bands to the homepage"
```

---

### Task 6: Features page — operations & pricing-controls section

**Files:**
- Modify: `content/features.ts` (new section), `app/features/page.tsx` (render it — read the file first; it maps `features.sections`, so appending to the data may be enough)
- Test: extend the features page's existing test (find it via `grep -rln "features" app/features components/sections --include='*.test.tsx'`; if none exists, create `app/features/features-page.test.tsx`)

**Interfaces:**
- Consumes: existing `FeaturesSection` type (`{title, lead, cards?, steps?}`) in `content/features.ts`.

- [ ] **Step 1: Write the failing test** (in the existing test file, or new):

```tsx
// app/features/features-page.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturesPage from "./page";

describe("FeaturesPage operations section", () => {
  it("renders the merchant-controls cards", () => {
    render(<FeaturesPage />);
    for (const card of [
      "Pricing by print method", "Quantity discounts", "Tiered & location pricing",
      "Inventory mode", "White label & API", "Bulk order tools",
    ]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
  });
});
```

Run — Expected: FAIL.

- [ ] **Step 2: Append a section** to `features.sections` in `content/features.ts`, following the existing `FeaturesSection` shape exactly:

```ts
  {
    title: "Run the business side without spreadsheets",
    lead: "Beyond the Design Lab, Custy gives merchants the pricing and operations controls a personalization business actually needs.",
    cards: [
      {
        icon: "printer",
        title: "Pricing by print method",
        text: "DTG, DTF and embroidery each carry their own rules — price by printing colors, per color count, or per size range.",
      },
      {
        icon: "badge-percent",
        title: "Quantity discounts",
        text: "Percent or fixed discounts across quantity ranges you define — built for team and group orders.",
      },
      {
        icon: "circle-dollar-sign",
        title: "Tiered & location pricing",
        text: "Tiered pricing on Growth and location pricing on Pro keep margins right as you scale and expand.",
      },
      {
        icon: "chart-column",
        title: "Inventory mode",
        text: "Track stock per variant with SKUs and stop-sell rules, or run pure design-tool mode — per product, your call.",
      },
      {
        icon: "server",
        title: "White label & API",
        text: "On Pro, remove Custy branding and integrate through the API to fit the app into your own stack.",
      },
      {
        icon: "blocks",
        title: "Bulk order tools",
        text: "High-volume stores on Pro process custom orders in bulk — status updates and downloads without one-by-one clicking.",
      },
    ],
  },
```

- [ ] **Step 3: Verify rendering.** Read `app/features/page.tsx`; if it maps `features.sections`, the section renders automatically — confirm the alternating scheme still holds (the map likely alternates by index). If sections are hand-composed, add this one following the file's existing pattern.

- [ ] **Step 4: Run `pnpm test`** — Expected: green (plan-gating claims match the app: tiered pricing = Growth; location pricing, white label, API, bulk order tools = Pro).

- [ ] **Step 5: Commit**

```bash
git add content/features.ts app/features
git commit -m "feat: add operations and pricing-controls section to features page"
```

---

### Task 7: Pricing page — plan comparison table + FAQ depth

**Files:**
- Create: `components/lander/plan-compare.tsx`, `components/lander/plan-compare.test.tsx`
- Modify: `content/pricing.ts` (add `comparison`, extend `faq.items` by 3), `app/pricing/page.tsx` (render table between plans and FAQ), `components/lander/index.ts` (export)

**Interfaces:**
- Produces: `type CompareRow = { label: string; values: [string, string, string, string] }` and `PlanCompare({plans: string[], rows: CompareRow[]})` rendering a `<table>` inside an `overflow-x-auto` wrapper.
- Consumes: quotas from the app's `plans.ts` (see Global Constraints — copy those numbers exactly).

- [ ] **Step 1: Write the failing test**

```tsx
// components/lander/plan-compare.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlanCompare } from "./plan-compare";

describe("PlanCompare", () => {
  it("renders one column per plan and one row per limit", () => {
    render(
      <PlanCompare
        plans={["Free", "Starter", "Growth", "Pro"]}
        rows={[
          { label: "Custom products", values: ["5", "10", "100", "Unlimited"] },
          { label: "Orders per month", values: ["20", "50", "300", "Unlimited"] },
        ]}
      />,
    );
    expect(screen.getByRole("columnheader", { name: "Growth" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Custom products" })).toBeInTheDocument();
    expect(screen.getAllByRole("cell", { name: "Unlimited" })).toHaveLength(2);
  });
});
```

Run — Expected: FAIL.

- [ ] **Step 2: Implement `PlanCompare`**

```tsx
// components/lander/plan-compare.tsx
import { cn } from "@/lib/utils";

export type CompareRow = { label: string; values: [string, string, string, string] };

/** Responsive plan-comparison table: scrolls horizontally inside its own container on small screens. */
export function PlanCompare({
  plans,
  rows,
  className,
}: {
  plans: string[];
  rows: CompareRow[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-line bg-white", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="px-5 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#5b6473] uppercase">
              Plan limits
            </th>
            {plans.map((plan) => (
              <th key={plan} scope="col" className="px-5 py-4 text-[15px] font-bold text-ink">
                {plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-[#f0f3f7] last:border-b-0">
              <th scope="row" className="px-5 py-3.5 text-[14px] font-semibold text-ink">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td key={index} className="px-5 py-3.5 text-[14px] text-body">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

Export from `components/lander/index.ts`: `export { PlanCompare, type CompareRow } from "./plan-compare";`

- [ ] **Step 3: Add data to `content/pricing.ts`** (add `import type { CompareRow } from "@/components/lander";` at the top; verify each number against the app's `plans.ts` while writing):

```ts
export const comparison: { plans: string[]; rows: CompareRow[] } = {
  plans: ["Free", "Starter", "Growth", "Pro"],
  rows: [
    { label: "Custom products", values: ["5", "10", "100", "Unlimited"] },
    { label: "Orders per 30 days", values: ["20", "50", "300", "Unlimited"] },
    { label: "Storage", values: ["1 GB", "5 GB", "25 GB", "Unlimited"] },
    { label: "Print sides per product", values: ["1", "2", "6", "Unlimited"] },
    { label: "Quantity discounts", values: ["—", "Included", "Included", "Included"] },
    { label: "Advanced design tools", values: ["—", "—", "Included", "Included"] },
    { label: "Inventory control", values: ["—", "—", "Included", "Included"] },
    { label: "Tiered pricing", values: ["—", "—", "Included", "Included"] },
    { label: "Location pricing", values: ["—", "—", "—", "Included"] },
    { label: "White label", values: ["—", "—", "—", "Included"] },
    { label: "API access", values: ["—", "—", "—", "Included"] },
    { label: "Bulk order tools", values: ["—", "—", "—", "Included"] },
    { label: "Support", values: ["Email", "Email", "Priority", "Premium"] },
  ],
};
```

Append 3 items to `pricing.faq.items` (keep existing 4):

```ts
    {
      question: "What happens if I hit a plan limit?",
      answer:
        "The app shows an over-quota notice and locked features prompt an upgrade — nothing breaks, and upgrading lifts the limit immediately.",
    },
    {
      question: "How does annual billing work?",
      answer:
        "Every paid plan has an annual option that saves 20% versus paying monthly. Billing runs through Shopify either way.",
    },
    {
      question: "Can I use the free trial more than once?",
      answer:
        "The 30-day trial applies once per store. After it ends you can continue on a paid plan or drop to the Free plan.",
    },
```

- [ ] **Step 4: Render** in `app/pricing/page.tsx`: read the file; insert a comparison section between the plans grid and the FAQ, following the page's existing section/scheme pattern, with heading "Compare plans in detail" and `<PlanCompare {...comparison} className="mx-auto max-w-[1000px]" />`. Extend the page's existing test (or `app/pricing/pricing-page.test.tsx`) with `expect(screen.getByRole("columnheader", { name: "Pro" })).toBeInTheDocument();`.

- [ ] **Step 5: Run `pnpm test` and `pnpm build`** — Expected: green. Note: `content/pricing.ts` has tests pinning plan data (see its header comment) — appending `comparison` and FAQ items must not alter existing exports; if a test pins `faq.items` length, update it deliberately.

- [ ] **Step 6: Commit**

```bash
git add components/lander/plan-compare.tsx components/lander/plan-compare.test.tsx components/lander/index.ts content/pricing.ts app/pricing
git commit -m "feat: add plan comparison table and deeper pricing FAQ"
```

---

### Task 8: Fill support.mdx and contact.mdx

**Files:**
- Modify: `content/pages/support.mdx` (0 lines), `content/pages/contact.mdx` (0 lines)

**Context:** both pages already render rich TSX around an empty MDX body (`app/support/page.tsx` inserts `<Body />` into a centered prose block in the hero; check `app/contact/page.tsx` for where its body lands before writing). Keep each body short — it must read well inside the existing hero, not fight it.

- [ ] **Step 1: Read `app/contact/page.tsx`** to see where contact.mdx renders and what copy already surrounds it.

- [ ] **Step 2: Write `support.mdx`** (~8–12 lines of prose, no headings — it renders inside the hero):
  the fastest way to get help is emailing **support@custyapp.com** with your store URL, plan, and what you expected vs what happened; screenshots of the Design Lab or order help; we reply on business days and prioritize production-blocking issues (paid plans include priority/premium support tiers); for how-to questions the walkthrough and features pages usually answer fastest.

- [ ] **Step 3: Write `contact.mdx`** (~6–10 lines): who to contact for what — support questions to support@custyapp.com, partnership and supplier inquiries welcome, response on business days; mention the form below and that including your store URL speeds everything up. No claims about phone support (none exists in the app).

- [ ] **Step 4: Run `pnpm test`** — Expected: green (no-emoji guard covers the new prose).

- [ ] **Step 5: Commit**

```bash
git add content/pages/support.mdx content/pages/contact.mdx
git commit -m "content: write support and contact page bodies"
```

---

### Task 9: Three new blog posts (image-optional registry)

**Files:**
- Create: `content/posts/how-product-personalization-lifts-average-order-value.mdx`, `content/posts/setting-up-print-pricing-by-color-count-and-size.mdx`, `content/posts/a-merchants-guide-to-multi-side-printing.mdx`
- Modify: `content/posts/index.ts` (make `image` optional; register 3 posts), `components/blog-post-card.tsx` (render without image when absent — read it first), `app/blog/[slug]/page.tsx` (image block already conditional via `heroImageDims`; make JSON-LD `image` conditional too)

**Interfaces:**
- Produces: `Post.image?: string` (optional). Existing three posts keep their images; new posts omit the field.

- [ ] **Step 1: Write the failing test.** Find the blog's existing test (`grep -rln "posts" app/blog components --include='*.test.tsx'`); add/extend:

```tsx
it("registers six posts, newest first", () => {
  expect(posts).toHaveLength(6);
  const dates = posts.map((p) => p.date);
  expect([...dates].sort().reverse()).toEqual(dates);
});
```

Run — Expected: FAIL (3 ≠ 6).

- [ ] **Step 2: Make `image` optional.** In `content/posts/index.ts` change `image: string` → `image?: string`. Read `components/blog-post-card.tsx`; guard its image rendering with `post.image ? … : null`. In `app/blog/[slug]/page.tsx` the hero image block is already conditional on `heroImageDims[post.slug]`; also build `articleJsonLd` without an `image` key when `post.image` is undefined.

- [ ] **Step 3: Write the three posts** (700–900 words each, date `"2026-07-29"`, no emoji, each linking at least two internal pages). Register each in `content/posts/index.ts` with `description` = its first sentence, following the existing entries' shape (no `image` field).

**Post A — AOV** (slug `how-product-personalization-lifts-average-order-value`, title "How Product Personalization Lifts Average Order Value"). Beats: personalized items command higher willingness to pay → dynamic pricing turns design choices into revenue (extra print sides, print-method pricing, product options) → quantity discounts pull group orders (teams, events) → engagement compounds: shoppers who design convert better and return → practical setup list (enable multi-side, price each side, set discounts) → links `/design-lab`, `/pricing`.

**Post B — print pricing** (slug `setting-up-print-pricing-by-color-count-and-size`, title "Setting Up Print Pricing by Color Count and Size"). Beats: one flat print price loses money on complex designs → Custy's printing types (DTG, DTF, embroidery) each carry pricing rules → price-per-color for color-count-sensitive methods → size-range pricing for garment sizes → restrictions keep un-printable combos off the menu → worked walkthrough (configure a printing type, add color rules, add size ranges) → links `/features`, `/how-it-works`.

**Post C — multi-side** (slug `a-merchants-guide-to-multi-side-printing`, title "A Merchant's Guide to Multi-Side Printing"). Beats: front-only printing leaves revenue on the shirt → sides Custy supports (front, back, sleeves, neck tag) with per-side print areas and mockups → per-side pricing and how plans gate side counts (1 on Free up to unlimited on Pro) → design advice per side (bold front, detail back, small marks on sleeves) → production stays clean: each side exports its own print-ready file → links `/design-lab`, `/pricing`, `/use-cases`.

- [ ] **Step 4: Run `pnpm test` and `pnpm build`** — Expected: green; 6 post routes generated.

- [ ] **Step 5: Commit**

```bash
git add content/posts components/blog-post-card.tsx app/blog
git commit -m "feat: add three blog posts; make post images optional"
```

---

## Final verification

- [ ] `pnpm test` — full suite green (trial-copy guard, no-emoji, nav, redirects, content tests).
- [ ] `pnpm build` — SSG succeeds; spot-check `/`, `/design-lab`, `/use-cases`, `/dropshipping`, `/features`, `/pricing`, `/support`, `/blog` + one new post via `pnpm start`.
- [ ] `grep -rn "21-day\|21-Day" content app components` returns nothing.
- [ ] Homepage scheme alternation is intact top to bottom; each page renders exactly one RainbowBar.
