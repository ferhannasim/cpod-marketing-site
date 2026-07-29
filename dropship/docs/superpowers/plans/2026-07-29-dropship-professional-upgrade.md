# DropShipPOD Site Professional Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the dropship marketing site on the custy-proven "process-ink" band system with DropShipPOD's crimson/navy identity, and add app-driven pages: `/features`, `/catalog`, `/pricing`, `/suppliers`, `/custy`, `/blog` (+4 posts), plus real prose for the thin MDX pages.

**Architecture:** A new `components/lander/` family (adapted from `../custy/components/lander/`, re-themed to existing tokens `--color-brand #cb1836` / `--color-ink-deep #141f56`) renders full-bleed alternating bands. New pages are structured TS content in `content/*.ts` + thin `page.tsx` composers under `app/(marketing)/`. Existing data sources (`steps.ts`, `logos.ts`, `testimonials.ts`, `videos.ts`) and components (`StepList`, `LogoWall`, `TestimonialList`, `VideoEmbed`, `CustyPitch`, `ShippingBand`) are reused. Blog infra is ported from custy without post images.

**Tech Stack:** Next.js 15 App Router (SSG), React 19, Tailwind v4 tokens in `app/globals.css`, lucide-react, Vitest + Testing Library (jsdom), pnpm. Spec: `../../docs/superpowers/specs/2026-07-29-both-sites-professional-upgrade-design.md` (repo root).

## Global Constraints

- Run everything from `dropship/` (`pnpm test`, `pnpm build`). TDD every task; commit per task as `ferhannasim` with **no Claude/AI co-author trailer**.
- **No emoji anywhere** in `content/` (except `content/raw/`), `components/`, `app/` — `lib/no-emoji.test.ts` already enforces this (allowlist `© ® ™`). The spec line "add an equivalent guard test to dropship" is superseded: the guard already exists.
- **Currency guard** (`content/shipping.test.ts`): every `$` figure in `content/pages/*.mdx` must be an amount declared in `content/shipping.ts` AND labelled `CAD` (write `$5.99 CAD`). `billing.mdx` is excluded — do not touch it. Dollar figures in `.ts` content files are NOT guarded; the `/pricing` worked example stays currency-neutral (plain `$`, explicitly illustrative).
- **Site audit invariants** (`lib/site-audit.test.ts`): every new route must, in the same task, be (a) added to `STATIC_ROUTES` in `lib/routes.ts`, (b) linked from `lib/nav.ts` nav or footer, (c) given a `page.tsx` on disk; the `toHaveLength(22)` assertion bumps by one per added route (final value after this plan: **28**).
- **Icons**: content files carry semantic `icon:` names resolved by `components/lander/icons.tsx` (Task 1). Never import lucide components in content files; never emoji. Tests assert `[data-icon="…"]`.
- **Every feature claim must be true of the DropShipPOD app** (see spec "Source of truth"). No invented stats, customer counts, or testimonials.
- All existing tests must stay green after every task.

## File Structure (end state)

```
components/lander/icons.tsx        DuoBar, Eyebrow, IconTile + icon registry
components/lander/section.tsx      LanderSection (white|light|dark bands)
components/lander/cards.tsx        CardGrid, CardItem
components/lander/hero.tsx         LanderHero, HighlightCard, heroWash
components/lander/cta-band.tsx     CtaBand
components/lander/index.ts         barrel
content/home.ts                    homepage band data
content/features.ts                /features data
content/catalog.ts                 /catalog data (categories + 8 niches)
content/pricing-model.ts           /pricing data (model, example, mini-FAQ)
content/suppliers.ts               /suppliers data
content/custy-page.ts              /custy cross-sell data
content/posts/index.ts + *.mdx     blog registry + 4 posts
components/blog-post-card.tsx      blog card + formatPostDate
app/(marketing)/{features,catalog,pricing,suppliers,custy,blog,blog/[slug]}/page.tsx
app/page.tsx                       rebuilt homepage
content/pages/*.mdx                rewritten prose (delivery, printing-notice, about,
                                   start-your-ecommerce-brand, launch-automated-brand)
```

---

### Task 1: Lander marks & icon registry

**Files:**
- Create: `components/lander/icons.tsx`
- Test: `components/lander/icons.test.tsx`

**Interfaces:**
- Produces: `DuoBar({className?})`, `Eyebrow({children, className?})`, `IconTile({name?, tint?, className?})` with `data-icon={name}`; icon registry names used by ALL later content tasks: `store, shirt, coffee, package, truck, printer, layers, palette, percent, circle-dollar-sign, trending-up, chart-column, refresh, zap, credit-card, file-check, download, shield-check, clock, users, sparkles, badge-percent, upload, mail, eye, heart, medal, trophy, graduation-cap, church, hand-heart, siren, calendar, map-pin, gift`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/lander/icons.test.tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { DuoBar, Eyebrow, IconTile, iconNames } from "./icons";

const REQUIRED = [
  "store", "shirt", "coffee", "package", "truck", "printer", "layers", "palette",
  "percent", "circle-dollar-sign", "trending-up", "chart-column", "refresh", "zap",
  "credit-card", "file-check", "download", "shield-check", "clock", "users",
  "sparkles", "badge-percent", "upload", "mail", "eye", "heart", "medal", "trophy",
  "graduation-cap", "church", "hand-heart", "siren", "calendar", "map-pin", "gift",
];

describe("icon registry", () => {
  it("registers every semantic name the content files use", () => {
    for (const name of REQUIRED) expect(iconNames, name).toContain(name);
  });
  it("renders a tile with data-icon and hides unknown names", () => {
    const { container } = render(<IconTile name="truck" />);
    expect(container.querySelector('[data-icon="truck"]')).not.toBeNull();
    const unknown = render(<IconTile name="nope" />);
    expect(unknown.container.firstChild).toBeNull();
  });
});

describe("marks", () => {
  it("Eyebrow renders its label and two brand dots", () => {
    const { container, getByText } = render(<Eyebrow>Why sellers switch</Eyebrow>);
    expect(getByText("Why sellers switch")).toBeInTheDocument();
    expect(container.querySelectorAll("span.rounded-full")).toHaveLength(2);
  });
  it("DuoBar is a decorative hairline", () => {
    const { container } = render(<DuoBar />);
    expect((container.firstChild as HTMLElement).getAttribute("aria-hidden")).toBe("true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- components/lander/icons.test.tsx`
Expected: FAIL — cannot resolve `./icons`.

- [ ] **Step 3: Write the implementation**

```tsx
// components/lander/icons.tsx
import {
  BadgePercent, CalendarDays, ChartColumn, Church, CircleDollarSign, Clock, Coffee,
  CreditCard, Download, Eye, FileCheck, Gift, GraduationCap, HandHeart, Heart, Layers,
  Mail, MapPin, Medal, Package, Palette, Percent, Printer, RefreshCw, Shirt, ShieldCheck,
  Siren, Sparkles, Store, TrendingUp, Trophy, Truck, Upload, Users, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LucideIcon = typeof Truck;

/** Semantic icon vocabulary for CardItem.icon and friends — content never imports React components. */
const icons: Record<string, LucideIcon> = {
  store: Store, shirt: Shirt, coffee: Coffee, package: Package, truck: Truck,
  printer: Printer, layers: Layers, palette: Palette, percent: Percent,
  "circle-dollar-sign": CircleDollarSign, "trending-up": TrendingUp,
  "chart-column": ChartColumn, refresh: RefreshCw, zap: Zap, "credit-card": CreditCard,
  "file-check": FileCheck, download: Download, "shield-check": ShieldCheck, clock: Clock,
  users: Users, sparkles: Sparkles, "badge-percent": BadgePercent, upload: Upload,
  mail: Mail, eye: Eye, heart: Heart, medal: Medal, trophy: Trophy,
  "graduation-cap": GraduationCap, church: Church, "hand-heart": HandHeart, siren: Siren,
  calendar: CalendarDays, "map-pin": MapPin, gift: Gift,
};

export const iconNames = Object.keys(icons);

/** Crimson / navy tint cycle — DropShipPOD's two-ink analogue of custy's tricolor tiles. */
const tileTints = ["bg-brand-tint text-brand-dark", "bg-ink-tint text-ink-soft"];

export type IconTileProps = { name?: string; tint?: number; className?: string };

export function IconTile({ name, tint = 0, className }: IconTileProps) {
  const Icon = name ? icons[name] : undefined;
  if (!Icon) return null;
  return (
    <div
      data-icon={name}
      aria-hidden
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-xl",
        tileTints[tint % tileTints.length],
        className,
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} />
    </div>
  );
}

/** Crimson+navy twin-dot registration mark + small-caps label above section titles. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      </span>
      <span className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">
        {children}
      </span>
    </div>
  );
}

/** The crimson-to-navy hairline — DropShipPOD's page-level brand mark, once per page (hero). */
export function DuoBar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#cb1836_0%,#141f56_100%)]",
        className,
      )}
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- components/lander/icons.test.tsx` — Expected: PASS.
Then `pnpm test` — Expected: full suite green (no-emoji guard sees only semantic names).

- [ ] **Step 5: Commit**

```bash
git add components/lander/icons.tsx components/lander/icons.test.tsx
git commit -m "feat: add lander icon registry and brand marks (DuoBar, Eyebrow, IconTile)"
```

---

### Task 2: Lander bands & cards

**Files:**
- Create: `components/lander/section.tsx`, `components/lander/cards.tsx`
- Test: `components/lander/lander.test.tsx`

**Interfaces:**
- Consumes: `Eyebrow`, `IconTile` from Task 1.
- Produces: `LanderSection({eyebrow?, title?, lead?, tone? = "white"|"light"|"dark", id?, className?, children?})`; `CardGrid({items: CardItem[], columns? = 3, align? = "left"|"center", className?})`; `type CardItem = { icon?: string; title: string; text: string | string[] }`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/lander/lander.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanderSection } from "./section";
import { CardGrid } from "./cards";

describe("LanderSection", () => {
  it("renders eyebrow, title and lead over its children", () => {
    render(
      <LanderSection eyebrow="Simple economics" title="You set the markup" lead="No subscription.">
        <p>child</p>
      </LanderSection>,
    );
    expect(screen.getByText("Simple economics")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "You set the markup" })).toBeInTheDocument();
    expect(screen.getByText("child")).toBeInTheDocument();
  });
  it("dark tone flips to the deep-navy band", () => {
    const { container } = render(<LanderSection tone="dark" title="T" />);
    expect((container.firstChild as HTMLElement).className).toContain("bg-ink-deep");
  });
});

describe("CardGrid", () => {
  it("renders icon tiles by semantic name and cycles tints", () => {
    const { container } = render(
      <CardGrid
        items={[
          { icon: "truck", title: "Shipping", text: "Tracked." },
          { icon: "percent", title: "Markup", text: ["You choose.", "Per product."] },
        ]}
      />,
    );
    expect(container.querySelector('[data-icon="truck"]')).not.toBeNull();
    expect(container.querySelector('[data-icon="percent"]')).not.toBeNull();
    expect(screen.getByText("Per product.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- components/lander/lander.test.tsx` — Expected: FAIL (modules missing).

- [ ] **Step 3: Write the implementation**

`section.tsx` — port of custy's `LanderSection` re-themed to dropship tokens (headings use `font-display`):

```tsx
// components/lander/section.tsx
import { cn } from "@/lib/utils";
import { Eyebrow } from "./icons";

type SectionTone = "white" | "light" | "dark";

const toneShell: Record<SectionTone, string> = {
  white: "bg-white",
  light: "bg-surface",
  dark: "bg-ink-deep text-white",
};

export type LanderSectionProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: SectionTone;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Full-bleed content band with centered header (twin-dot eyebrow, title, lead). Pages alternate white/light. */
export function LanderSection({ eyebrow, title, lead, tone = "white", id, className, children }: LanderSectionProps) {
  const hasHeader = Boolean(eyebrow || title || lead);
  const isDark = tone === "dark";
  return (
    <section id={id} className={cn(toneShell[tone], className)}>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24 max-md:px-4">
        {hasHeader ? (
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
            {title ? (
              <h2 className={cn(
                "font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-bold tracking-tight",
                isDark ? "text-white" : "text-ink",
              )}>
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className={cn("mt-4 text-base leading-[1.7] md:text-[16.5px]", isDark ? "text-white/[0.78]" : "text-zinc-600")}>
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
```

`cards.tsx` — port of custy's `CardGrid` verbatim except: hover shadow keys off navy `rgba(20,31,86,…)`, title `text-ink`, body `text-zinc-600`:

```tsx
// components/lander/cards.tsx
import { cn } from "@/lib/utils";
import { IconTile } from "./icons";

export type CardItem = { icon?: string; title: string; text: string | string[] };

const columnClasses: Record<number, string> = {
  1: "",
  2: "min-[1200px]:grid-cols-2",
  3: "md:grid-cols-2 min-[1200px]:grid-cols-3",
  4: "md:grid-cols-2 min-[1200px]:grid-cols-4",
};

export type CardGridProps = { items: CardItem[]; columns?: number; align?: "left" | "center"; className?: string };

export function CardGrid({ items, columns = 3, align = "left", className }: CardGridProps) {
  const centered = align === "center";
  return (
    <div className={cn("grid gap-5", columnClasses[columns] ?? columnClasses[3], className)}>
      {items.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_16px_40px_-12px_rgba(20,31,86,0.16)]",
            centered && "text-center",
          )}
        >
          {item.icon ? <IconTile name={item.icon} tint={index} className={cn("mb-5", centered && "mx-auto")} /> : null}
          <h3 className="text-base leading-snug font-semibold text-ink">{item.title}</h3>
          {(Array.isArray(item.text) ? item.text : [item.text]).map((paragraph, i) => (
            <p key={i} className="mt-2.5 text-[15px] leading-[1.65] text-zinc-600">{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- components/lander/lander.test.tsx` then `pnpm test` — Expected: PASS / green.

- [ ] **Step 5: Commit**

```bash
git add components/lander/section.tsx components/lander/cards.tsx components/lander/lander.test.tsx
git commit -m "feat: add LanderSection band and CardGrid to the lander family"
```

---

### Task 3: Lander hero, CTA band, barrel

**Files:**
- Create: `components/lander/hero.tsx`, `components/lander/cta-band.tsx`, `components/lander/index.ts`
- Test: `components/lander/hero.test.tsx`

**Interfaces:**
- Consumes: `DuoBar` (Task 1); existing `ButtonLink`/`ButtonVariant` from `components/ui/button.tsx` (CTAs — do NOT duplicate a CTA component).
- Produces: `type CtaLink = { label: string; href: string; variant?: ButtonVariant }`; `LanderHero({eyebrow?, title, lead?, ctas?, highlight?, className?})` (lead: `string | string[]`; highlight: ReactNode); `HighlightCard({title, items: string[], className?})`; `CtaBand({title, text, cta, secondaryCta?, className?})` (dark navy panel only — no light tone; YAGNI).

- [ ] **Step 1: Write the failing test**

```tsx
// components/lander/hero.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HighlightCard, LanderHero } from "./hero";
import { CtaBand } from "./cta-band";

describe("LanderHero", () => {
  it("renders headline, leads, and CTAs (external opens new tab)", () => {
    render(
      <LanderHero
        title="Launch a POD brand"
        lead={["No inventory.", "No monthly fee."]}
        ctas={[
          { label: "Install the app", href: "https://apps.shopify.com/dropshippod" },
          { label: "See pricing", href: "/pricing" },
        ]}
        highlight={<HighlightCard title="Why switch" items={["Auto fulfillment"]} />}
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Launch a POD brand" })).toBeInTheDocument();
    expect(screen.getByText("No monthly fee.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Install the app" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "See pricing" })).toHaveAttribute("href", "/pricing");
    expect(screen.getByText("Auto fulfillment")).toBeInTheDocument();
  });
});

describe("CtaBand", () => {
  it("renders title, text and both CTAs", () => {
    render(
      <CtaBand
        title="Start selling"
        text="Import products today."
        cta={{ label: "Install", href: "https://apps.shopify.com/dropshippod" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Start selling" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Install" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- components/lander/hero.test.tsx` — Expected: FAIL (modules missing).

- [ ] **Step 3: Write the implementation**

```tsx
// components/lander/hero.tsx
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink, type ButtonVariant } from "@/components/ui/button";
import { DuoBar } from "./icons";

export type CtaLink = { label: string; href: string; variant?: ButtonVariant };

/** Titled checkmark list on a raised white card — the hero's right-hand proof panel. */
export function HighlightCard({ title, items, className }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_45px_-18px_rgba(20,31,86,0.2)]", className)}>
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      <ul className="m-0 mt-2 list-none p-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 border-b border-zinc-100 py-2.5 last:border-b-0 last:pb-0">
            <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint">
              <Check className="h-3 w-3 text-brand-dark" strokeWidth={3} />
            </span>
            <span className="text-sm leading-6 text-zinc-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const heroWash =
  "radial-gradient(circle at 10% 0%, rgba(203,24,54,0.07), transparent 42%)," +
  "radial-gradient(circle at 90% 8%, rgba(30,45,125,0.08), transparent 38%)," +
  "linear-gradient(180deg, #ffffff 0%, #fbfbfd 60%, #f7f7f8 100%)";

export type LanderHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string | string[];
  ctas?: CtaLink[];
  highlight?: React.ReactNode;
  className?: string;
};

/** Full-bleed hero band: crimson/navy wash, DuoBar hairline, display headline, leads, pill CTAs, highlight slot. */
export function LanderHero({ eyebrow, title, lead, ctas, highlight, className }: LanderHeroProps) {
  const leads = lead === undefined ? [] : Array.isArray(lead) ? lead : [lead];
  return (
    <section className={cn("relative overflow-hidden border-b border-zinc-200", className)} style={{ background: heroWash }}>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24 max-md:px-4">
        <div className="grid items-center gap-12 min-[1200px]:grid-cols-[1.1fr_0.9fr]">
          <div>
            <DuoBar className="mb-7" />
            {eyebrow ? (
              <div className="mb-4 text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">{eyebrow}</div>
            ) : null}
            <h1 className="font-display text-[clamp(2.125rem,4.5vw,3.125rem)] leading-[1.08] font-bold tracking-tight text-ink">
              {title}
            </h1>
            {leads.map((paragraph, index) => (
              <p key={index} className="mt-5 max-w-[640px] text-[16.5px] leading-[1.75] text-zinc-600">{paragraph}</p>
            ))}
            {ctas && ctas.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3 max-md:flex-col">
                {ctas.map((cta, index) => (
                  <ButtonLink key={cta.href + cta.label} href={cta.href} variant={cta.variant ?? (index === 0 ? "primary" : "outline")}>
                    {cta.label}
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </div>
          {highlight ? <div>{highlight}</div> : null}
        </div>
      </div>
    </section>
  );
}
```

```tsx
// components/lander/cta-band.tsx
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import type { CtaLink } from "./hero";

const darkBandBackground =
  "radial-gradient(circle at 15% 0%, rgba(203,24,54,0.22), transparent 38%)," +
  "radial-gradient(circle at 85% 100%, rgba(30,45,125,0.35), transparent 40%)," +
  "linear-gradient(150deg, #141f56 0%, #0e1638 55%, #1a2450 100%)";

export type CtaBandProps = { title: string; text: string; cta: CtaLink; secondaryCta?: CtaLink; className?: string };

/** Closing call-to-action: centered rounded deep-navy panel with one or two pill CTAs. */
export function CtaBand({ title, text, cta, secondaryCta, className }: CtaBandProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] px-8 py-14 text-center text-white shadow-[0_24px_60px_-20px_rgba(20,31,86,0.5)] md:py-16 max-md:rounded-[22px] max-md:px-5",
        className,
      )}
      style={{ background: darkBandBackground }}
    >
      <h2 className="mx-auto max-w-[680px] font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-bold tracking-tight">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[680px] text-[15.5px] leading-[1.7] text-white/[0.78]">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 max-md:flex-col">
        <ButtonLink href={cta.href} variant={cta.variant ?? "primary"}>{cta.label}</ButtonLink>
        {secondaryCta ? (
          <ButtonLink href={secondaryCta.href} variant={secondaryCta.variant ?? "outline-dark"}>{secondaryCta.label}</ButtonLink>
        ) : null}
      </div>
    </section>
  );
}
```

```ts
// components/lander/index.ts
export { DuoBar, Eyebrow, IconTile, iconNames, type IconTileProps } from "./icons";
export { LanderSection, type LanderSectionProps } from "./section";
export { CardGrid, type CardGridProps, type CardItem } from "./cards";
export { LanderHero, HighlightCard, type LanderHeroProps, type CtaLink } from "./hero";
export { CtaBand, type CtaBandProps } from "./cta-band";
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- components/lander/hero.test.tsx` then `pnpm test` — Expected: PASS / green.

- [ ] **Step 5: Commit**

```bash
git add components/lander/hero.tsx components/lander/cta-band.tsx components/lander/index.ts components/lander/hero.test.tsx
git commit -m "feat: add LanderHero, HighlightCard and CtaBand"
```

---

### Task 4: Homepage rebuild

**Files:**
- Create: `content/home.ts`, `app/home.test.tsx`
- Modify: `app/page.tsx` (full rewrite)
- Delete: `components/sections/hero.tsx`, `components/sections/printing-methods.tsx`, `components/sections/dropship-pitch.tsx`, `components/sections/final-cta.tsx` (verify first with `grep -rn "printing-methods\|sections/hero\|dropship-pitch\|final-cta" app components --include=*.tsx` that only `app/page.tsx` imports them). KEEP `custy-pitch.tsx` (has its own test) and `shipping-band.tsx`.

**Interfaces:**
- Consumes: full lander barrel (Tasks 1–3); existing `StepList`, `LogoWall`, `TestimonialList`, `VideoEmbed`, `CustyPitch`, `ShippingBand`, `Container`; `SHOPIFY_APP_URL` from `lib/site.ts`; `featuredVideo` from `content/videos.ts`.
- Produces: `content/home.ts` exports `hero`, `heroHighlight`, `valueProps: CardItem[]`, `economics: CardItem[]`, `printMethods: CardItem[]`, `catalogTeaser: CardItem[]`, `fulfillmentModes: CardItem[]`, `faqTeaser: {question: string; href: string}[]`, `finalCta`.

- [ ] **Step 1: Write `content/home.ts`** (exact copy below — all claims verified against the app):

```ts
// content/home.ts
import type { CardItem } from "@/components/lander";
import { SHOPIFY_APP_URL } from "@/lib/site";

export const hero = {
  eyebrow: "Print-on-demand dropshipping for Shopify",
  title: "Your brand. Your platform. Our printers.",
  lead: [
    "Import print-on-demand products into your Shopify store, set your own markup, and let every order flow to production automatically — printed in Canada and shipped straight to your customer.",
    "No inventory. No monthly subscription. You only pay the base cost when a customer orders.",
  ],
  ctas: [
    { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
    { label: "See how it works", href: "/how-it-works" },
  ],
};

export const heroHighlight = {
  title: "Why sellers switch to DropShipPOD",
  items: [
    "100+ blanks: tees, hoodies, mugs and more",
    "You set the markup — the profit is yours",
    "Orders forward to production automatically",
    "Tracking numbers sync back to Shopify",
    "No monthly fee — pay per order only",
  ],
};

export const valueProps: CardItem[] = [
  {
    icon: "download",
    title: "Import in a few clicks",
    text: "Browse the supplier catalog inside your Shopify admin and pull products — images, variants and sizes included — straight into your store.",
  },
  {
    icon: "percent",
    title: "Price with your markup",
    text: "Set a markup per product. Retail price is base cost plus your markup, so your margin is decided before you publish.",
  },
  {
    icon: "upload",
    title: "Publish in bulk",
    text: "Push products to your storefront in bulk. Variants, options and artwork carry over without copy-paste.",
  },
  {
    icon: "zap",
    title: "Automatic fulfillment",
    text: "When a customer pays, the order is charged to your saved card and forwarded to production — no manual steps unless you want them.",
  },
  {
    icon: "chart-column",
    title: "Profit on every order",
    text: "Each order shows your customer total, the production cost, and your profit — shipping included, nothing hidden.",
  },
  {
    icon: "refresh",
    title: "Live inventory & tracking",
    text: "Supplier stock levels sync in real time, and tracking numbers post back to the Shopify order automatically.",
  },
];

export const economics: CardItem[] = [
  {
    icon: "circle-dollar-sign",
    title: "Base cost",
    text: "The production price of the blank plus printing — charged only when a customer orders. Shipping is included.",
  },
  {
    icon: "badge-percent",
    title: "Your markup",
    text: "You choose the markup per product before publishing. There is no platform commission on top.",
  },
  {
    icon: "trending-up",
    title: "Your profit",
    text: "Customer total minus base cost. Every dropship order shows the split, so you always know what you earned.",
  },
];

export const printMethods: CardItem[] = [
  {
    icon: "printer",
    title: "DTF transfers",
    text: "Vivid, durable direct-to-film prints that work across cotton, blends and dark garments.",
  },
  {
    icon: "shirt",
    title: "DTG printing",
    text: "Direct-to-garment for soft, detailed prints on cotton apparel — ideal for photo-quality artwork.",
  },
  {
    icon: "layers",
    title: "Sublimation",
    text: "All-over, edge-to-edge colour on polyester and coated products like mugs and drinkware.",
  },
  {
    icon: "sparkles",
    title: "Embroidery",
    text: "Stitched logos and text for a premium, retail-ready finish on hats, polos and outerwear.",
  },
];

export const catalogTeaser: CardItem[] = [
  { icon: "shirt", title: "T-shirts & tops", text: "Everyday tees and premium fits from top blank brands." },
  { icon: "package", title: "Hoodies & fleece", text: "Heavyweight hoodies and crewnecks built for print." },
  { icon: "coffee", title: "Mugs & drinkware", text: "Sublimated mugs with edge-to-edge artwork." },
  { icon: "gift", title: "And more", text: "The catalog keeps growing — 100+ products and counting." },
];

export const fulfillmentModes: CardItem[] = [
  {
    icon: "zap",
    title: "Automatic",
    text: "Charge and forward the moment a customer pays. The fastest route from sale to production.",
  },
  {
    icon: "eye",
    title: "Manual review",
    text: "Hold each order for your approval, then place it with one click. More control when you want it.",
  },
];

export const faqTeaser = [
  { question: "How fast is delivery?", href: "/delivery" },
  { question: "What is DTF printing?", href: "/faq/dtf" },
  { question: "Can I print on my own items?", href: "/faq/print-on-your-own-item" },
  { question: "How does billing work?", href: "/billing" },
];

export const finalCta = {
  title: "Launch your print-on-demand brand today",
  text: "Install the app, import your first products, and start selling without touching inventory. No subscription — you only pay when you sell.",
  cta: { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
  secondaryCta: { label: "Talk to us", href: "/contact" },
};
```

- [ ] **Step 2: Write the failing test**

```tsx
// app/home.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the rebuilt band sequence", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Your brand. Your platform. Our printers." }),
    ).toBeInTheDocument();
    for (const heading of [
      "How it works",
      "Sell without stock",
      "Simple economics, no subscription",
      "Four ways to print",
      "100+ blanks ready for your designs",
      "Fulfillment, your way",
      "What sellers say",
      "Launch your print-on-demand brand today",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: "Install the Shopify app" }).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test -- app/home.test.tsx` — Expected: FAIL (old homepage headings).

- [ ] **Step 4: Rewrite `app/page.tsx`**

```tsx
// app/page.tsx
import Link from "next/link";
import {
  CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection,
} from "@/components/lander";
import { CustyPitch } from "@/components/sections/custy-pitch";
import { ShippingBand } from "@/components/sections/shipping-band";
import { LogoWall } from "@/components/logo-wall";
import { TestimonialList } from "@/components/testimonial-list";
import { StepList } from "@/components/step-list";
import { VideoEmbed } from "@/components/video-embed";
import { featuredVideo } from "@/content/videos";
import {
  catalogTeaser, economics, faqTeaser, finalCta, fulfillmentModes, hero, heroHighlight,
  printMethods, valueProps,
} from "@/content/home";

export default function HomePage() {
  return (
    <>
      <LanderHero {...hero} highlight={<HighlightCard {...heroHighlight} />} />
      <LanderSection tone="light" id="how-it-works" eyebrow="Five easy steps" title="How it works">
        <StepList />
        <div className="mt-8 text-center">
          <Link href="/how-it-works" className="text-sm font-semibold text-brand hover:text-brand-dark">
            See the full walkthrough
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="Built for sellers" title="Sell without stock"
        lead="Everything between the sale and the doorstep is handled for you.">
        <CardGrid items={valueProps} columns={3} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Simple economics" title="Simple economics, no subscription"
        lead="Three numbers decide your business — and you control the middle one.">
        <CardGrid items={economics} columns={3} align="center" />
        <div className="mt-8 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-brand hover:text-brand-dark">
            See how pricing works
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="Print quality" title="Four ways to print"
        lead="300 DPI print-ready artwork, produced with the method that suits each product.">
        <CardGrid items={printMethods} columns={4} />
      </LanderSection>
      <LanderSection tone="light" id="catalog" eyebrow="The catalog" title="100+ blanks ready for your designs">
        <CardGrid items={catalogTeaser} columns={4} align="center" />
        <div className="mt-10">
          <LogoWall />
        </div>
        <div className="mt-8 text-center">
          <Link href="/catalog" className="text-sm font-semibold text-brand hover:text-brand-dark">
            Browse the catalog
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="You stay in control" title="Fulfillment, your way">
        <CardGrid items={fulfillmentModes} columns={2} align="center" className="mx-auto max-w-[760px]" />
      </LanderSection>
      <LanderSection tone="light" id="reviews" eyebrow="Reviews" title="What sellers say">
        <TestimonialList />
      </LanderSection>
      <CustyPitch />
      <LanderSection tone="light" eyebrow="Watch" title="See the platform in action">
        <div className="mx-auto max-w-[880px]">
          <VideoEmbed id={featuredVideo.id} title={featuredVideo.title} />
        </div>
        <div className="mt-8 text-center">
          <Link href="/videos" className="text-sm font-semibold text-brand hover:text-brand-dark">
            Visit the video library
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="Questions" title="Answers before you ask">
        <ul className="mx-auto grid max-w-[880px] gap-3 md:grid-cols-2">
          {faqTeaser.map((item) => (
            <li key={item.href}>
              <Link href={item.href}
                className="block rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-[15px] font-semibold text-ink transition-colors hover:border-zinc-300">
                {item.question}
              </Link>
            </li>
          ))}
        </ul>
      </LanderSection>
      <ShippingBand />
      <LanderSection>
        <CtaBand {...finalCta} />
      </LanderSection>
    </>
  );
}
```

Before deleting the four retired section files, run `grep -rn "sections/hero\|printing-methods\|dropship-pitch\|final-cta" app components --include='*.tsx'` — expect no remaining imports; then delete them. Check `VideoEmbed`'s actual prop names in `components/video-embed.tsx` first and match them.

- [ ] **Step 5: Run tests, fix fallout**

Run: `pnpm test` — Expected: `app/home.test.tsx` PASS. If any deleted-section test existed, remove it with its component. `pnpm build` must succeed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rebuild homepage on the lander band system"
```

---

### Task 5: /features page

**Files:**
- Create: `content/features.ts`, `app/(marketing)/features/page.tsx`, `app/(marketing)/features/features.test.tsx`
- Modify: `lib/routes.ts` (add `"/features"`), `lib/nav.ts` (primary nav + footer Company), `lib/site-audit.test.ts` (route count 22 → 23)

**Interfaces:**
- Consumes: lander barrel; `SHOPIFY_APP_URL`.
- Produces: `content/features.ts` exports `featuresHero`, `featureCards: CardItem[]`, `orderFlow: {number, title, text}[]`, `featuresCta`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/(marketing)/features/features.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturesPage from "./page";

describe("FeaturesPage", () => {
  it("renders the feature tour and order flow", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { level: 1, name: /everything you need to run/i })).toBeInTheDocument();
    for (const card of [
      "Catalog import & markup", "Bulk publish", "Automatic fulfillment", "Manual review mode",
      "Per-order profit view", "Tracking sync", "Real-time inventory", "Saved-card payments",
    ]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: "From sale to doorstep" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- app/\(marketing\)/features/features.test.tsx` — Expected: FAIL.

- [ ] **Step 3: Write content + page**

```ts
// content/features.ts
import type { CardItem } from "@/components/lander";
import { SHOPIFY_APP_URL } from "@/lib/site";

export const featuresHero = {
  eyebrow: "Inside the Shopify app",
  title: "Everything you need to run POD dropshipping",
  lead: "DropShipPOD lives inside your Shopify admin: import products, control your margin, and let orders run themselves.",
  ctas: [{ label: "Install the Shopify app", href: SHOPIFY_APP_URL }],
};

export const featureCards: CardItem[] = [
  {
    icon: "download",
    title: "Catalog import & markup",
    text: "Sync the supplier catalog into your admin, pick products, and set a markup per product. Retail price is always base cost plus your markup.",
  },
  {
    icon: "upload",
    title: "Bulk publish",
    text: "Publish selected products to your storefront in one action — variants, images and options included. Publishing is blocked until a markup is set, so nothing ships at cost.",
  },
  {
    icon: "zap",
    title: "Automatic fulfillment",
    text: "On payment, the order is charged to your saved card and forwarded to production automatically. The fastest route from sale to press.",
  },
  {
    icon: "eye",
    title: "Manual review mode",
    text: "Prefer a checkpoint? Hold dropship orders for review and place each one deliberately. Your card is only charged when you place the order.",
  },
  {
    icon: "chart-column",
    title: "Per-order profit view",
    text: "Every dropship order shows the customer total, production cost and your profit — with shipping included — plus a status timeline.",
  },
  {
    icon: "truck",
    title: "Tracking sync",
    text: "When production ships, the tracking number lands on the Shopify order automatically and your customer gets notified by your store.",
  },
  {
    icon: "refresh",
    title: "Real-time inventory",
    text: "Supplier stock levels update your listings in real time, and product changes propagate so you never sell a retired blank.",
  },
  {
    icon: "credit-card",
    title: "Saved-card payments",
    text: "Add a card once, securely via Stripe. Production is charged per order — there is no subscription and no monthly platform fee.",
  },
];

export const orderFlow = [
  { number: 1, title: "A customer buys from your store", text: "Checkout happens on your Shopify storefront at your retail price." },
  { number: 2, title: "The order reaches DropShipPOD", text: "The paid order creates a dropship order in the app, automatically or after your review." },
  { number: 3, title: "Production is charged and starts", text: "Your saved card is charged the base cost and the order is forwarded to the print floor." },
  { number: 4, title: "Printed, packed and shipped", text: "Your product is produced and shipped straight to your customer." },
  { number: 5, title: "Tracking flows back", text: "The tracking number posts to the Shopify order, and your profit is recorded on the order sheet." },
];

export const featuresCta = {
  title: "See it in your own admin",
  text: "Install the app, import a product, and watch an order run end to end. You only pay when a customer orders.",
  cta: { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
  secondaryCta: { label: "How pricing works", href: "/pricing" },
};
```

```tsx
// app/(marketing)/features/page.tsx
import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { featureCards, featuresCta, featuresHero, orderFlow } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Catalog import with markup pricing, bulk publish, automatic fulfillment, per-order profit, tracking and inventory sync — inside your Shopify admin.",
};

export default function FeaturesPage() {
  return (
    <>
      <LanderHero {...featuresHero} />
      <LanderSection eyebrow="The tour" title="Built for the whole workflow"
        lead="From the first import to the profit line on each order.">
        <CardGrid items={featureCards} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Order lifecycle" title="From sale to doorstep">
        <div className="relative mx-auto max-w-[880px]">
          <div aria-hidden className="absolute top-3 bottom-3 left-[19px] w-px bg-zinc-200" />
          {orderFlow.map((step) => (
            <div key={step.number} className="relative pb-10 pl-16 last:pb-0 max-md:pl-14">
              <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-[15px] font-bold text-ink shadow-sm">
                {step.number}
              </div>
              <h3 className="pt-2 text-[17px] leading-snug font-semibold text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.7] text-zinc-600">{step.text}</p>
            </div>
          ))}
        </div>
      </LanderSection>
      <LanderSection>
        <CtaBand {...featuresCta} />
      </LanderSection>
    </>
  );
}
```

- [ ] **Step 4: Register route + nav**

In `lib/routes.ts` insert `"/features",` after `"/how-it-works"`. In `lib/nav.ts`: add `{ label: "Features", href: "/features" }` to `primaryNav` right after "How it works", and `{ label: "Features", href: "/features" }` to the footer "Company" column after "How it works". In `lib/site-audit.test.ts` change `toHaveLength(22)` → `toHaveLength(23)` and update the test title's count.

- [ ] **Step 5: Run tests and verify all pass**

Run: `pnpm test` — Expected: green, including site audit and nav tests (check `lib/nav.test.ts` for hardcoded counts and update if it asserts totals).

- [ ] **Step 6: Commit**

```bash
git add content/features.ts "app/(marketing)/features" lib/routes.ts lib/nav.ts lib/site-audit.test.ts lib/nav.test.ts
git commit -m "feat: add /features app tour page"
```

---

### Task 6: /catalog page

**Files:**
- Create: `content/catalog.ts`, `app/(marketing)/catalog/page.tsx`, `app/(marketing)/catalog/catalog.test.tsx`
- Modify: `lib/routes.ts` (+`"/catalog"`), `lib/nav.ts` (primary nav + footer Resources), `lib/site-audit.test.ts` (23 → 24)

**Interfaces:**
- Consumes: lander barrel; `LogoWall`; `SHOPIFY_APP_URL`.
- Produces: `content/catalog.ts` exports `catalogHero`, `categories: CardItem[]`, `niches: CardItem[]` (exactly 8, from the app's design-template taxonomy), `catalogCta`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/(marketing)/catalog/catalog.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { niches } from "@/content/catalog";
import CatalogPage from "./page";

describe("CatalogPage", () => {
  it("renders categories and the eight-niche grid from the app taxonomy", () => {
    render(<CatalogPage />);
    expect(screen.getByRole("heading", { level: 1, name: /100\+ blanks/i })).toBeInTheDocument();
    expect(niches).toHaveLength(8);
    for (const niche of [
      "Athletic, College & Greek", "Weddings & Events", "Military", "Sports & Teams",
      "Religious", "Fundraising & Charity", "First Responders", "Holidays",
    ]) {
      expect(screen.getByRole("heading", { name: niche })).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — `pnpm test -- app/\(marketing\)/catalog/catalog.test.tsx`: FAIL.

- [ ] **Step 3: Write content + page**

```ts
// content/catalog.ts
import type { CardItem } from "@/components/lander";
import { SHOPIFY_APP_URL } from "@/lib/site";

export const catalogHero = {
  eyebrow: "The catalog",
  title: "100+ blanks from brands your customers trust",
  lead: "Every product is print-ready for DTF, DTG, sublimation or embroidery, stocked and produced in Canada, and importable into Shopify in a few clicks.",
  ctas: [
    { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
    { label: "See size charts", href: "/size-charts" },
  ],
};

export const categories: CardItem[] = [
  {
    icon: "shirt",
    title: "T-shirts & tops",
    text: "Everyday tees, premium fits and long sleeves from top blank brands — the backbone of any merch line.",
  },
  {
    icon: "package",
    title: "Hoodies & fleece",
    text: "Heavyweight hoodies, crewnecks and zip-ups that hold vivid prints wash after wash.",
  },
  {
    icon: "coffee",
    title: "Mugs & drinkware",
    text: "Sublimated mugs with edge-to-edge artwork — a favourite for gifts and fundraising runs.",
  },
  {
    icon: "gift",
    title: "More every season",
    text: "The catalog keeps growing. If you sell it, we probably print it — ask us about a product you need.",
  },
];

export const niches: CardItem[] = [
  { icon: "graduation-cap", title: "Athletic, College & Greek", text: "Team spirit wear, intramural merch and chapter apparel." },
  { icon: "heart", title: "Weddings & Events", text: "Bachelorette parties, birthdays, baby showers and family reunions." },
  { icon: "medal", title: "Military", text: "Unit pride, veteran tributes and homecoming shirts." },
  { icon: "trophy", title: "Sports & Teams", text: "League jerseys, fan merch and tournament tees." },
  { icon: "church", title: "Religious", text: "Church events, youth groups and faith-based apparel." },
  { icon: "hand-heart", title: "Fundraising & Charity", text: "Awareness campaigns and charity-run merchandise." },
  { icon: "siren", title: "First Responders", text: "Fire, police and EMS appreciation and station wear." },
  { icon: "calendar", title: "Holidays", text: "Seasonal drops for every holiday on the calendar." },
];

export const catalogCta = {
  title: "Put your designs on all of it",
  text: "Install the app to browse the full catalog with live base costs, then import and publish with your markup.",
  cta: { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
  secondaryCta: { label: "How it works", href: "/how-it-works" },
};
```

```tsx
// app/(marketing)/catalog/page.tsx
import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { LogoWall } from "@/components/logo-wall";
import { catalogCta, catalogHero, categories, niches } from "@/content/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "100+ print-on-demand blanks — tees, hoodies, mugs and more — printable with DTF, DTG, sublimation and embroidery, produced in Canada.",
};

export default function CatalogPage() {
  return (
    <>
      <LanderHero {...catalogHero} />
      <LanderSection eyebrow="What you can sell" title="Product categories">
        <CardGrid items={categories} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Blanks we stock" title="Top selling brands">
        <LogoWall />
      </LanderSection>
      <LanderSection eyebrow="Made for your niche" title="Designs for every audience"
        lead="The design taxonomy built into the platform covers the niches sellers actually build brands around.">
        <CardGrid items={niches} columns={4} align="center" />
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...catalogCta} />
      </LanderSection>
    </>
  );
}
```

- [ ] **Step 4: Register route + nav** — `lib/routes.ts` add `"/catalog"` after `"/features"`; `lib/nav.ts` primaryNav add `{ label: "Catalog", href: "/catalog" }` after Features, footer "Resources" add same; site-audit count 23 → 24.

- [ ] **Step 5: Run `pnpm test`** — Expected: green.

- [ ] **Step 6: Commit**

```bash
git add content/catalog.ts "app/(marketing)/catalog" lib/routes.ts lib/nav.ts lib/site-audit.test.ts
git commit -m "feat: add /catalog page with categories and niche grid"
```

---

### Task 7: /pricing page

**Files:**
- Create: `content/pricing-model.ts`, `app/(marketing)/pricing/page.tsx`, `app/(marketing)/pricing/pricing.test.tsx`
- Modify: `lib/routes.ts` (+`"/pricing"`), `lib/nav.ts` (primary nav + footer Company), `lib/site-audit.test.ts` (24 → 25)

**Interfaces:**
- Consumes: lander barrel; `economics` card copy exists on home — this page goes deeper, don't import home's.
- Produces: `content/pricing-model.ts` exports `pricingHero`, `model: CardItem[]`, `workedExample: {label: string; value: string; note?: string}[]`, `neverPay: string[]`, `pricingFaq: {question: string; answer: string}[]`, `pricingCta`.

**Currency rule:** this file is TS (not guarded), but keep the worked example explicitly illustrative — plain `$` figures, no CAD/USD label, and the caption below marks it as an example. Do not copy these figures into any MDX file.

- [ ] **Step 1: Write the failing test**

```tsx
// app/(marketing)/pricing/pricing.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

describe("PricingPage", () => {
  it("explains the no-subscription model with a worked example", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { level: 1, name: /no subscription/i })).toBeInTheDocument();
    expect(screen.getByText("Base cost")).toBeInTheDocument();
    expect(screen.getByText("Your markup")).toBeInTheDocument();
    expect(screen.getByText("Your profit")).toBeInTheDocument();
    expect(screen.getByText(/illustrative example/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pricing questions" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.

- [ ] **Step 3: Write content + page**

```ts
// content/pricing-model.ts
import type { CardItem } from "@/components/lander";
import { SHOPIFY_APP_URL } from "@/lib/site";

export const pricingHero = {
  eyebrow: "Pricing",
  title: "No subscription. You pay when you sell.",
  lead: [
    "DropShipPOD has no monthly fee, no listing fee and no platform commission. Importing and publishing products is free.",
    "When a customer orders, your saved card is charged the base cost — production plus shipping — and everything above it is yours.",
  ],
  ctas: [{ label: "Install the Shopify app", href: SHOPIFY_APP_URL }],
};

export const model: CardItem[] = [
  {
    icon: "circle-dollar-sign",
    title: "Base cost",
    text: "The blank plus printing plus shipping, charged per order only. Live base costs are shown in the app catalog.",
  },
  {
    icon: "badge-percent",
    title: "Your markup",
    text: "Set per product before you publish. Retail price = base cost + your markup. The app won't publish at zero markup.",
  },
  {
    icon: "trending-up",
    title: "Your profit",
    text: "Customer total minus base cost, shown on every order with its own status timeline. No spreadsheet required.",
  },
];

/** Illustrative only — not a live quote; base costs vary by product and are shown in-app. */
export const workedExample = [
  { label: "Base cost (production + shipping)", value: "$20" },
  { label: "Your markup (60%)", value: "$12" },
  { label: "Customer pays", value: "$32" },
  { label: "Your profit", value: "$12", note: "paid out through your store — DropShipPOD never touches it" },
];

export const neverPay = [
  "No monthly subscription",
  "No fee to import or publish products",
  "No platform commission on your sales",
  "No minimum order volume",
  "Shipping is part of the base cost — no surprise add-ons",
];

export const pricingFaq = [
  {
    question: "When exactly am I charged?",
    answer:
      "In automatic mode, when your customer's payment lands. In manual review mode, only when you press Place order.",
  },
  {
    question: "How do I pay?",
    answer:
      "You save a card in the app once, securely via Stripe. Each dropship order charges its base cost to that card.",
  },
  {
    question: "What if an order is cancelled?",
    answer:
      "Orders can be cancelled from the app before production; cancelled orders are not produced or shipped.",
  },
  {
    question: "Where do I see base costs?",
    answer:
      "Every product in the in-app catalog lists its live base cost, so you can set markup with the real number in front of you.",
  },
];

export const pricingCta = {
  title: "Keep the margin you create",
  text: "Set your markup once and every order does the math for you. Install the app and see live base costs today.",
  cta: { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
  secondaryCta: { label: "Read the FAQ", href: "/faq" },
};
```

```tsx
// app/(marketing)/pricing/page.tsx
import type { Metadata } from "next";
import { CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection } from "@/components/lander";
import { model, neverPay, pricingCta, pricingFaq, pricingHero, workedExample } from "@/content/pricing-model";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "No subscription, no listing fees, no commission. Pay the base cost per order; your markup is your profit.",
};

export default function PricingPage() {
  return (
    <>
      <LanderHero {...pricingHero} highlight={<HighlightCard title="What you never pay" items={neverPay} />} />
      <LanderSection eyebrow="The model" title="Three numbers, one of them yours">
        <CardGrid items={model} columns={3} align="center" />
      </LanderSection>
      <LanderSection tone="light" eyebrow="See the math" title="A sale, end to end">
        <div className="mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {workedExample.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-zinc-100 px-6 py-4 last:border-b-0 last:bg-brand-tint">
              <div>
                <div className="text-[15px] font-semibold text-ink">{row.label}</div>
                {row.note ? <div className="mt-0.5 text-[13px] text-zinc-500">{row.note}</div> : null}
              </div>
              <div className="font-display text-lg font-bold text-ink">{row.value}</div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-[560px] text-center text-[13px] text-zinc-500">
          Illustrative example — base costs vary by product and are always shown in the app before you publish.
        </p>
      </LanderSection>
      <LanderSection eyebrow="Straight answers" title="Pricing questions">
        <div className="mx-auto grid max-w-[880px] gap-5 md:grid-cols-2">
          {pricingFaq.map((item) => (
            <div key={item.question} className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h3 className="text-base font-semibold text-ink">{item.question}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-zinc-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...pricingCta} />
      </LanderSection>
    </>
  );
}
```

- [ ] **Step 4: Register route + nav** — `lib/routes.ts` add `"/pricing"`; primaryNav add `{ label: "Pricing", href: "/pricing" }` after Catalog; footer "Company" add same; site-audit 24 → 25.

- [ ] **Step 5: Run `pnpm test`** — Expected: green (currency guard untouched — no MDX changed).

- [ ] **Step 6: Commit**

```bash
git add content/pricing-model.ts "app/(marketing)/pricing" lib/routes.ts lib/nav.ts lib/site-audit.test.ts
git commit -m "feat: add /pricing page explaining the no-subscription model"
```

---

### Task 8: /suppliers page

**Files:**
- Create: `content/suppliers.ts`, `app/(marketing)/suppliers/page.tsx`, `app/(marketing)/suppliers/suppliers.test.tsx`
- Modify: `lib/routes.ts` (+`"/suppliers"`), `lib/nav.ts` (footer Company), `lib/site-audit.test.ts` (25 → 26)

**Interfaces:**
- Consumes: lander barrel.
- Produces: `content/suppliers.ts` exports `suppliersHero`, `supplierFlow: {number, title, text}[]`, `fileExports: CardItem[]`, `suppliersCta`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/(marketing)/suppliers/suppliers.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SuppliersPage from "./page";

describe("SuppliersPage", () => {
  it("renders the supplier pitch and print-file export details", () => {
    render(<SuppliersPage />);
    expect(screen.getByRole("heading", { level: 1, name: /print shop/i })).toBeInTheDocument();
    for (const card of ["Vector & raster files", "Your choice of DPI", "Everything in one ZIP", "Status workflow"]) {
      expect(screen.getByRole("heading", { name: card })).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.

- [ ] **Step 3: Write content + page**

```ts
// content/suppliers.ts
import type { CardItem } from "@/components/lander";

export const suppliersHero = {
  eyebrow: "For suppliers",
  title: "Run your print shop on the same platform",
  lead: [
    "DropShipPOD is a dual-role app: merchants sell, suppliers produce. As a supplier you manage your catalog, receive dropship orders the moment they're placed, and download print-ready files without asking anyone to re-export artwork.",
  ],
  ctas: [{ label: "Talk to us about supplying", href: "/contact" }],
};

export const supplierFlow = [
  { number: 1, title: "Orders arrive in your dashboard", text: "Every paid merchant order lands in your queue with product, variant and artwork details attached." },
  { number: 2, title: "Download the print package", text: "One ZIP per order item: print files, design and product detail sheets, preview images and a shipping CSV." },
  { number: 3, title: "Produce and update status", text: "Move orders through Processing and Shipped as you work; merchants see progress without emailing you." },
  { number: 4, title: "Tracking closes the loop", text: "Shipment tracking flows back to the merchant's Shopify order automatically." },
];

export const fileExports: CardItem[] = [
  {
    icon: "file-check",
    title: "Vector & raster files",
    text: "SVG and PDF vectors for crisp production, or PNG and JPG rasters — with transparent or coloured backgrounds.",
  },
  {
    icon: "printer",
    title: "Your choice of DPI",
    text: "Export at 72, 96, 150 or 300 DPI to match your press. Custom fonts come embedded, so nothing rasterizes wrong.",
  },
  {
    icon: "download",
    title: "Everything in one ZIP",
    text: "Design details, product details, previews and a shipping CSV ride along with the artwork — one download per order item.",
  },
  {
    icon: "clock",
    title: "Status workflow",
    text: "A clear Processing → Shipped → Completed pipeline keeps every order's state visible to you and the merchant.",
  },
];

export const suppliersCta = {
  title: "Supply the network",
  text: "If you run production capacity — DTF, DTG, sublimation or embroidery — let's talk about putting it to work.",
  cta: { label: "Contact us", href: "/contact" },
  secondaryCta: { label: "See how merchants sell", href: "/features" },
};
```

```tsx
// app/(marketing)/suppliers/page.tsx
import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { fileExports, supplierFlow, suppliersCta, suppliersHero } from "@/content/suppliers";

export const metadata: Metadata = {
  title: "For Suppliers",
  description:
    "Receive dropship orders, download print-ready files (SVG/PDF/PNG/JPG at up to 300 DPI), and manage production status — all in one dashboard.",
};

export default function SuppliersPage() {
  return (
    <>
      <LanderHero {...suppliersHero} />
      <LanderSection eyebrow="The supplier loop" title="From order to shipped, without email ping-pong">
        <div className="relative mx-auto max-w-[880px]">
          <div aria-hidden className="absolute top-3 bottom-3 left-[19px] w-px bg-zinc-200" />
          {supplierFlow.map((step) => (
            <div key={step.number} className="relative pb-10 pl-16 last:pb-0 max-md:pl-14">
              <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-[15px] font-bold text-ink shadow-sm">
                {step.number}
              </div>
              <h3 className="pt-2 text-[17px] leading-snug font-semibold text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.7] text-zinc-600">{step.text}</p>
            </div>
          ))}
        </div>
      </LanderSection>
      <LanderSection tone="light" eyebrow="Print-ready, actually" title="Files your press can use">
        <CardGrid items={fileExports} columns={4} />
      </LanderSection>
      <LanderSection>
        <CtaBand {...suppliersCta} />
      </LanderSection>
    </>
  );
}
```

- [ ] **Step 4: Register route + nav** — `lib/routes.ts` add `"/suppliers"`; footer "Company" add `{ label: "For suppliers", href: "/suppliers" }`; site-audit 25 → 26.

- [ ] **Step 5: Run `pnpm test`** — Expected: green.

- [ ] **Step 6: Commit**

```bash
git add content/suppliers.ts "app/(marketing)/suppliers" lib/routes.ts lib/nav.ts lib/site-audit.test.ts
git commit -m "feat: add /suppliers page for print shops"
```

---

### Task 9: /custy cross-sell page

**Files:**
- Create: `content/custy-page.ts`, `app/(marketing)/custy/page.tsx`, `app/(marketing)/custy/custy.test.tsx`
- Modify: `lib/routes.ts` (+`"/custy"`), `lib/nav.ts` (primaryNav "Custy" external link → internal `/custy`; footer "Custy design app" stays external), `lib/site-audit.test.ts` (26 → 27)

**Interfaces:**
- Consumes: lander barrel; `CUSTY_SITE_URL`, `CUSTY_APP_URL` from `lib/site.ts`.
- Produces: `content/custy-page.ts` exports `custyHero`, `custyFeatures: CardItem[]`, `custyHandoff: string[]`, `custyCta`.

- [ ] **Step 1: Write the failing test**

```tsx
// app/(marketing)/custy/custy.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CUSTY_APP_URL } from "@/lib/site";
import CustyPage from "./page";

describe("CustyPage", () => {
  it("pitches Custy and links out to its Shopify listing", () => {
    render(<CustyPage />);
    expect(screen.getByRole("heading", { level: 1, name: /let customers design/i })).toBeInTheDocument();
    const install = screen.getAllByRole("link", { name: /install custy free/i });
    expect(install.length).toBeGreaterThan(0);
    expect(install[0]).toHaveAttribute("href", CUSTY_APP_URL);
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.

- [ ] **Step 3: Write content + page**

```ts
// content/custy-page.ts
import type { CardItem } from "@/components/lander";
import { CUSTY_APP_URL, CUSTY_SITE_URL } from "@/lib/site";

export const custyHero = {
  eyebrow: "DropShipPOD + Custy",
  title: "Let customers design the products you dropship",
  lead: [
    "Custy is our sibling Shopify app: it puts a Customize It button on your product pages and opens a design lab where shoppers add text, cliparts and their own uploads.",
    "Products you import with DropShipPOD are Custy-aware — finished designs come back as print-ready files through the same production pipeline.",
  ],
  ctas: [
    { label: "Install Custy free", href: CUSTY_APP_URL },
    { label: "Visit custyapp.com", href: CUSTY_SITE_URL },
  ],
};

export const custyFeatures: CardItem[] = [
  {
    icon: "palette",
    title: "A design lab on your storefront",
    text: "Shoppers personalize products right on your store — text, cliparts, fonts and photo uploads, with live preview.",
  },
  {
    icon: "layers",
    title: "Multi-side printing",
    text: "Front, back, sleeves and neck tag — each side gets its own print area and mockup.",
  },
  {
    icon: "file-check",
    title: "Print-ready output",
    text: "Finished designs export as vector SVG/PDF or high-DPI raster, ready for the press with no manual rework.",
  },
  {
    icon: "shield-check",
    title: "You approve before it prints",
    text: "Optional approval and disclaimer flow, low-resolution warnings and out-of-bounds checks protect quality.",
  },
];

export const custyHandoff = [
  "Install Custy from your DropShipPOD admin in one click",
  "The free plan activates automatically — no payment required",
  "Your dropshipped products can be flagged customizable",
  "Custom orders flow into the same production pipeline",
];

export const custyCta = {
  title: "Add personalization to your store",
  text: "Custy's free plan covers your first customizable products. Upgrade only when your volume does.",
  cta: { label: "Install Custy free", href: CUSTY_APP_URL },
  secondaryCta: { label: "Explore Custy's site", href: CUSTY_SITE_URL },
};
```

```tsx
// app/(marketing)/custy/page.tsx
import type { Metadata } from "next";
import { CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection } from "@/components/lander";
import { custyCta, custyFeatures, custyHandoff, custyHero } from "@/content/custy-page";

export const metadata: Metadata = {
  title: "Custy — Product Personalization",
  description:
    "Pair DropShipPOD with Custy to let shoppers design products on your storefront — multi-side printing, print-ready files, free plan to start.",
};

export default function CustyPage() {
  return (
    <>
      <LanderHero {...custyHero} highlight={<HighlightCard title="The one-click handoff" items={custyHandoff} />} />
      <LanderSection eyebrow="What Custy adds" title="Personalization that stays print-ready">
        <CardGrid items={custyFeatures} columns={4} />
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...custyCta} />
      </LanderSection>
    </>
  );
}
```

- [ ] **Step 4: Register route + nav** — `lib/routes.ts` add `"/custy"`; in `lib/nav.ts` change primaryNav `{ label: "Custy", href: CUSTY_SITE_URL, external: true }` → `{ label: "Custy", href: "/custy" }`; site-audit 26 → 27. Check `lib/nav.test.ts` and `components/header.test.tsx` / `footer.test.tsx` for assertions about the external Custy link and update them to the internal route.

- [ ] **Step 5: Run `pnpm test`** — Expected: green.

- [ ] **Step 6: Commit**

```bash
git add content/custy-page.ts "app/(marketing)/custy" lib/routes.ts lib/nav.ts lib/site-audit.test.ts lib/nav.test.ts components/header.test.tsx components/footer.test.tsx
git commit -m "feat: add /custy cross-sell page and point nav at it"
```

---

### Task 10: Blog infrastructure + first post

**Files:**
- Create: `content/posts/index.ts`, `content/posts/dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products.mdx`, `components/blog-post-card.tsx`, `app/(marketing)/blog/page.tsx`, `app/(marketing)/blog/[slug]/page.tsx`, `app/(marketing)/blog/blog.test.tsx`
- Modify: `lib/routes.ts` (+`"/blog"`), `lib/nav.ts` (primaryNav + footer Resources "Blog"), `lib/site-audit.test.ts` (27 → 28)

**Interfaces:**
- Consumes: `Container`, `Prose` from `components/ui/`; `SITE_URL` — check `lib/site.ts`; if absent, hardcode nothing: add `export const SITE_URL = "https://dropshippod.ca";` there.
- Produces: `type Post = { slug: string; title: string; description: string; date: string; Body: React.ComponentType }` and `posts: Post[]` (date-desc) from `content/posts/index.ts`; `formatPostDate(date: string): string` from `components/blog-post-card.tsx`; `BlogPostCard({post})`. **No image field** — dropship has no blog imagery; keep the type image-free (custy's `image`/`heroImageDims` machinery is deliberately not ported).

- [ ] **Step 1: Write the failing test**

```tsx
// app/(marketing)/blog/blog.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { posts } from "@/content/posts";
import BlogIndexPage from "./page";

describe("blog", () => {
  it("registry is date-descending with unique slugs", () => {
    expect(posts.length).toBeGreaterThanOrEqual(1);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    const dates = posts.map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
  it("index lists every post with a link", () => {
    render(<BlogIndexPage />);
    for (const post of posts) {
      expect(screen.getByRole("link", { name: new RegExp(post.title.slice(0, 30)) })).toHaveAttribute(
        "href",
        `/blog/${post.slug}`,
      );
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.

- [ ] **Step 3: Write the post, registry, card, and pages**

Post 1 MDX — `content/posts/dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products.mdx`. Write 700–900 words of original prose (no dollar figures, no emoji) following exactly these beats:

- **Intro:** the print method decides fabric options, feel, and durability — most new sellers pick blindly.
- **## What DTF printing does well** — film-transfer process; works on cotton, blends, darks; vivid color; durable stretch; the workhorse for apparel. Link `/faq/dtf`.
- **## Where DTG shines** — inkjet direct to cotton; soft hand-feel; photo-level detail; best on 100% cotton.
- **## When sublimation wins** — dye becomes part of polyester/coated surfaces; edge-to-edge; mugs/drinkware and all-over prints. Link `/faq/sublimation` and `/sublimation-printing-notice`.
- **## And embroidery?** — stitched, premium, best for hats/polos/logos, not photos.
- **## How to choose for your store** — decision list by product type; note that on DropShipPOD each catalog product is produced with the method that suits it, at 300 DPI print-ready artwork.
- **Close:** link `/catalog` and `/how-it-works`.

```ts
// content/posts/index.ts
import DtfVsDtgBody from "./dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products.mdx";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  Body: React.ComponentType;
};

const allPosts: Post[] = [
  {
    slug: "dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products",
    title: "DTF vs DTG vs Sublimation: Which Print Method Fits Your Products?",
    description:
      "The print method decides which fabrics you can sell, how prints feel, and how long they last. Here's how to choose.",
    date: "2026-07-29",
    Body: DtfVsDtgBody,
  },
];

export const posts: Post[] = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
```

```tsx
// components/blog-post-card.tsx
import Link from "next/link";
import type { Post } from "@/content/posts";

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export function BlogPostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_16px_40px_-12px_rgba(20,31,86,0.16)]">
      <p className="text-[13px] text-zinc-500">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </p>
      <h2 className="mt-2 text-lg leading-snug font-semibold text-ink">
        <Link href={`/blog/${post.slug}`} className="hover:text-brand">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2.5 text-[15px] leading-[1.65] text-zinc-600">{post.description}</p>
    </article>
  );
}
```

```tsx
// app/(marketing)/blog/page.tsx
import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog-post-card";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on print-on-demand, dropshipping economics, and growing a merch brand on Shopify.",
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Guides for POD sellers" lede="Practical writing on printing, pricing and building a brand." />
      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </>
  );
}
```

```tsx
// app/(marketing)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPostDate } from "@/components/blog-post-card";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { posts } from "@/content/posts";

type PageProps = { params: Promise<{ slug: string }> };

const findPost = (slug: string) => posts.find((post) => post.slug === slug);

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const { Body } = post;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: "DropShipPOD" },
  };
  return (
    <main>
      <Container className="pt-12">
        <h1 className="font-display text-[clamp(1.875rem,4vw,2.375rem)] leading-[1.15] font-bold tracking-tight text-ink">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </Container>
      <Container className="py-10 sm:py-12">
        <Prose>
          <Body />
        </Prose>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  );
}
```

Check `components/ui/prose.tsx` prop shape first (children vs className) and `mdx-components.tsx` — MDX imports must compile; `next.config.ts` already wires `@next/mdx` (site has MDX pages).

- [ ] **Step 4: Register route + nav** — `lib/routes.ts` add `"/blog"`; primaryNav add `{ label: "Blog", href: "/blog" }` before "About"; footer "Resources" add `{ label: "Blog", href: "/blog" }`; site-audit 27 → 28. (`/blog/[slug]` is dynamic — NOT in STATIC_ROUTES, same as `/size-charts/[handle]`.)

- [ ] **Step 5: Run `pnpm test` and `pnpm build`** — Expected: both green (build exercises MDX + SSG params).

- [ ] **Step 6: Commit**

```bash
git add content/posts components/blog-post-card.tsx "app/(marketing)/blog" lib/routes.ts lib/nav.ts lib/site-audit.test.ts lib/site.ts
git commit -m "feat: add blog with first post on print methods"
```

---

### Task 11: Blog posts 2–4

**Files:**
- Create: `content/posts/how-markup-pricing-works-in-print-on-demand-dropshipping.mdx`, `content/posts/how-to-launch-a-canadian-print-on-demand-brand-on-shopify.mdx`, `content/posts/automatic-vs-manual-fulfillment-which-mode-fits-your-store.mdx`
- Modify: `content/posts/index.ts` (register all three)

**Interfaces:**
- Consumes: `Post` type from Task 10.

- [ ] **Step 1: Extend the registry test** — in `app/(marketing)/blog/blog.test.tsx` change the first assertion to `expect(posts).toHaveLength(4);`. Run: FAIL (1 ≠ 4).

- [ ] **Step 2: Write the three posts** (700–900 words each, no dollar figures, no emoji, each linking at least two internal pages):

**Post 2 — markup pricing** (`date: "2026-07-29"`, title "How Markup Pricing Works in Print-on-Demand Dropshipping", description "Retail price is base cost plus your markup — but choosing the right markup is where brands are made."). Beats: why margin confusion kills new stores → the formula (retail = base cost + markup; the app blocks publishing at zero markup) → what base cost includes (production + shipping, charged per order, no subscription) → how to think about markup by niche (commodity tees vs niche merch) → where profit shows up (per-order P&L: customer total, cost, profit) → links `/pricing`, `/features`.

**Post 3 — Canadian POD brand** (`date: "2026-07-29"`, title "How to Launch a Canadian Print-on-Demand Brand on Shopify", description "Produce in Canada, ship domestically, and keep delivery times your customers can trust."). Beats: why produce where you sell (delivery speed, no border surprises) → picking a niche (use the eight niches from `/catalog`) → setting up the store (import → markup → publish flow) → launch checklist (size charts `/size-charts`, delivery expectations `/delivery`, artwork approval `/artwork-approval`) → links `/catalog`, `/how-it-works`.

**Post 4 — fulfillment modes** (`date: "2026-07-29"`, title "Automatic vs Manual Fulfillment: Which Mode Fits Your Store?", description "Speed or control — DropShipPOD gives you both; here's how to decide."). Beats: what each mode does (auto: charge + forward on payment; manual: hold for review, charge on Place order) → when automatic wins (proven products, volume, hands-off) → when manual wins (new designs, custom checks, cash-flow pacing) → switching between modes in settings → links `/features`, `/pricing`.

Register all three in `content/posts/index.ts` following the existing entry's exact shape.

- [ ] **Step 3: Run `pnpm test`** — Expected: green (registry test now passes; no-emoji and currency guards untouched — posts have no `$` figures and posts live outside `content/pages/`... **verify**: the currency guard walks `content/pages/` only, so posts are safe either way).

- [ ] **Step 4: Run `pnpm build`** — Expected: 4 blog routes generated.

- [ ] **Step 5: Commit**

```bash
git add content/posts "app/(marketing)/blog/blog.test.tsx"
git commit -m "feat: add three blog posts on pricing, launching, and fulfillment"
```

---

### Task 12: Rewrite thin MDX pages — delivery, printing-notice, about

**Files:**
- Modify: `content/pages/delivery.mdx`, `content/pages/printing-notice.mdx`, `content/pages/about.mdx`

**Interfaces:** none new. **Currency guard applies**: only amounts from `content/shipping.ts` (`5.99, 14.99, 19.99, 24.99, 199`), always suffixed ` CAD`. Check each page's `page.tsx` for title/lede that may also need refreshing.

- [ ] **Step 1: Read the current three files and their `page.tsx` wrappers.** Preserve any factual commitments already stated (production times, provinces, policies) — expand, don't contradict.

- [ ] **Step 2: Rewrite `delivery.mdx`** (~40–60 lines): sections **Production time** (existing stated turnaround — keep the current page's figures verbatim), **Shipping across Canada** (three provincial rate tiers from `shipping.ts` — quote as `$14.99 CAD`, `$19.99 CAD`, `$24.99 CAD`; free shipping over `$199 CAD`; secure shipping `$5.99 CAD`), **Tracking** (numbers sync to the Shopify order automatically), **Delays & questions** (link `/contact`, `/faq`).

- [ ] **Step 3: Rewrite `printing-notice.mdx`** (~30–50 lines): what the notice covers (colour variance between screens and fabric, placement tolerances, pre-treatment marks on DTG, wash care), how artwork is checked (300 DPI print-ready standard, low-resolution artwork flagged before production, approval flow — link `/artwork-approval`), what to do if a print arrives wrong (link `/policies/refund`, `/contact`). No dollar figures.

- [ ] **Step 4: Expand `about.mdx`**: keep existing story, add sections **What we run** (print production + the DropShipPOD Shopify app + the Custy personalization app — link `/custy`), **How we work** (produced in Canada, printed per order, no warehouses of dead stock), **Talk to us** (link `/contact`, social channels). No dollar figures.

- [ ] **Step 5: Run `pnpm test`** — Expected: green — the currency guard now validates the new delivery figures; if it fails, fix labels, never the guard.

- [ ] **Step 6: Commit**

```bash
git add content/pages/delivery.mdx content/pages/printing-notice.mdx content/pages/about.mdx
git commit -m "content: rewrite delivery, printing-notice and about pages with real prose"
```

---

### Task 13: Rewrite thin MDX pages — start-your-ecommerce-brand, launch-automated-brand

**Files:**
- Modify: `content/pages/start-your-ecommerce-brand.mdx` (~11 lines now), `content/pages/launch-automated-brand.mdx` (~17 lines now)

**Interfaces:** none new. Currency guard applies — write these with **no dollar figures** (link `/pricing` instead).

- [ ] **Step 1: Read both current files + wrappers.** These two pages are the "start a brand" funnel from the nav; they must sell the same flow the app implements.

- [ ] **Step 2: Rewrite `start-your-ecommerce-brand.mdx`** (~40–60 lines): **Why print-on-demand first** (no inventory risk, launch with designs not stock), **What you need** (a Shopify store, designs or our design library, the DropShipPOD app), **Your first week** (pick niche → import products → set markup → publish → first marketing push; link `/catalog`, `/how-it-works`), **What it costs** (no subscription; you pay base cost per order — link `/pricing`), **Grow from there** (add Custy personalization — link `/custy`; watch the video library — link `/videos`).

- [ ] **Step 3: Rewrite `launch-automated-brand.mdx`** (~40–60 lines): **What "automated" means here** (orders charge and forward on payment; tracking returns on its own — link `/features`), **The parts you still own** (brand, designs, marketing, customer relationships), **Set it up once** (saved card, markup, automatic mode), **When to switch to manual review** (link the blog post `/blog/automatic-vs-manual-fulfillment-which-mode-fits-your-store`), **Start now** (link Shopify listing via existing page CTA pattern).

- [ ] **Step 4: Run `pnpm test`** — Expected: green.

- [ ] **Step 5: Commit**

```bash
git add content/pages/start-your-ecommerce-brand.mdx content/pages/launch-automated-brand.mdx
git commit -m "content: rewrite the two start-a-brand funnel pages"
```

---

### Task 14: Re-skin PageHero, header and footer to the band system

**Files:**
- Modify: `components/page-hero.tsx`, `components/header.tsx`, `components/footer.tsx`
- Tests: `components/page-hero.test.tsx`, `components/header.test.tsx`, `components/footer.test.tsx` (extend, don't weaken)

**Interfaces:**
- Consumes: `DuoBar`, `Eyebrow` from Task 1. PageHero keeps its exact public props (`eyebrow, title, lede, variant`) — all MDX pages depend on it.

- [ ] **Step 1: Extend `page-hero.test.tsx`** with a failing assertion that the default variant renders the DuoBar hairline:

```tsx
it("renders the brand hairline on the default variant", () => {
  const { container } = render(<PageHero title="Delivery" />);
  expect(container.querySelector('[aria-hidden="true"].rounded-full')).not.toBeNull();
});
```

Run: FAIL.

- [ ] **Step 2: Restyle `PageHero`**: add `<DuoBar className="mb-6" />` above the eyebrow (default variant only — `quiet` stays minimal); switch the eyebrow to the Task-1 `Eyebrow` component; apply the hero wash background from Task 3 (extract `heroWash` to `components/lander/hero.tsx` export and import it); headline stays `font-display`.

- [ ] **Step 3: Restyle header**: active/hover link color to `text-brand`; the "Install App" CTA stays `ButtonLink primary`; dropdown panels get `rounded-2xl border-zinc-200 shadow-[0_16px_40px_-12px_rgba(20,31,86,0.16)]`. Keep all aria behavior and tests intact.

- [ ] **Step 4: Restyle footer**: deep-navy band (`bg-ink-deep text-white`), columns unchanged, social icons `hover:text-brand`, add the DuoBar above the wordmark row. Update `footer.test.tsx` only if class assertions break — behavior assertions must not change.

- [ ] **Step 5: Run `pnpm test` and `pnpm build`** — Expected: all green.

- [ ] **Step 6: Commit**

```bash
git add components/page-hero.tsx components/header.tsx components/footer.tsx components/page-hero.test.tsx components/header.test.tsx components/footer.test.tsx
git commit -m "feat: re-skin page hero, header and footer to the band system"
```

---

## Final verification

- [ ] `pnpm test` — full suite green, site audit at 28 routes.
- [ ] `pnpm build` — static build succeeds; spot-check `/`, `/features`, `/catalog`, `/pricing`, `/suppliers`, `/custy`, `/blog`, one post, `/delivery` in `pnpm start`.
- [ ] `grep -rn "printing-methods\|sections/hero\|dropship-pitch\|final-cta" app components` returns nothing.
- [ ] Every page renders the DuoBar exactly once (hero) and alternates band tones.
