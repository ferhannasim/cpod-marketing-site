# Phase 3: Client Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the client's follow-up refinements: trim the dropship header nav, unify dropship card tiles into one professional style, even out 3-card grids to 4, and add tasteful reveal animations to both sites.

**Architecture:** Nav restructure in `dropship/lib/nav.ts` (grouped dropdowns, site-audit invariants preserved). A shared `Reveal` client component pattern (IntersectionObserver fade-up, reduced-motion safe, SSR/jsdom safe) copied per site and wired into each site's `LanderSection`. Tile unification touches only `dropship/components/lander/icons.tsx`. Custy's tricolor tile cycling is the client-approved signature — untouched.

**Tech Stack:** Same as Phases 1–2. Client request (2026-07-29): "header has too many links — remove some; add some animation; the card has different color + icon those not look great — make them professional; make card counts even; make both more professional."

## Global Constraints

- Same as Phases 1–2: TDD, no emoji, truthful claims only, commit per task as ferhannasim with no AI trailer, all suites + builds green.
- Dropship site-audit invariants hold: every STATIC_ROUTE stays linked from nav or footer (28 routes) — trimming primary nav must not orphan a route; add footer links where needed.
- Animations must respect `prefers-reduced-motion` and default to visible when IntersectionObserver is unavailable (SSR/jsdom) so no existing test breaks.
- Custy's tricolor icon-tile cycling and RainbowBar signature are client-approved — do NOT change custy tiles; custy gets animations only.

---

### Task 1: Trim the dropship primary nav

**Files:**
- Modify: `dropship/lib/nav.ts`, `dropship/lib/nav.test.ts` (and `components/header.test.tsx` if it pins entries)

**New `primaryNav` (exact structure):**

```ts
export const primaryNav: NavEntry[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Catalog", href: "/catalog" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Video library", href: "/videos" },
      { label: "FAQ", href: "/faq" },
      { label: "Delivery speed", href: "/delivery" },
      { label: "Size charts", href: "/size-charts" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "For suppliers", href: "/suppliers" },
      { label: "Custy", href: "/custy" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
```

Six top-level entries (was ten). Routes dropped from primary nav (start-your-ecommerce-brand, launch-automated-brand, faq/dtf, faq/sublimation, faq/print-on-your-own-item, billing, measuring) must remain footer-linked — verify each against `footerColumns` and ADD any missing one to the matching footer column so the site-audit no-orphan test stays green.

- [ ] Step 1: extend `nav.test.ts` with a failing assertion that `primaryNav` has exactly 6 entries and that groups are exactly "Resources" and "Company"; run → FAIL.
- [ ] Step 2: apply the structure above; reconcile footer coverage; run `pnpm test` (site-audit incl.) → green.
- [ ] Step 3: `pnpm build`; commit `feat: declutter primary nav into six entries`.

---

### Task 2: Dropship card polish — unified tiles, even grids, reveal animation

**Files:**
- Modify: `dropship/components/lander/icons.tsx` (+ its test), `dropship/content/home.ts`, `dropship/content/pricing-model.ts`, `dropship/app/page.tsx`, `dropship/app/(marketing)/pricing/page.tsx` (columns 3→4 where the grids grow), `dropship/components/lander/section.tsx`
- Create: `dropship/components/reveal.tsx`, `dropship/components/reveal.test.tsx`

**2a — Unified tile style.** In `icons.tsx`, replace the two-entry `tileTints` cycle with a single professional style used by every tile: `"bg-ink-tint text-ink-soft"`. Keep the `tint` prop accepted (it becomes a no-op index) so `CardGrid` call sites don't churn. Update the tile comment and the icons test (assert every tile renders the same tint class regardless of `tint` value).

**2b — Even card counts.** Two 3-card grids become 4 (both additions truthful):
- `content/home.ts` `economics` gains a 4th card: `{ icon: "shield-check", title: "No monthly fees", text: "There is no subscription and no platform commission — the only charge is the base cost when a customer orders." }`; the home band's `CardGrid` switches to `columns={4}`.
- `content/pricing-model.ts` `model` gains a 4th card: `{ icon: "credit-card", title: "One saved card", text: "Add a card once, securely via Stripe. Every order charges its base cost to it — nothing else, and nothing monthly." }`; the pricing page's `CardGrid` switches to `columns={4}`.
Update the home band-order test only if headings changed (they don't). Extend the home/pricing tests to assert the new card titles render.

**2c — Reveal animation.** Create `components/reveal.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Fades content up on first viewport entry. Renders visible immediately when
 * IntersectionObserver is unavailable (SSR/jsdom) or reduced motion is set. */
export function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setShown(true)),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

Wire it inside `LanderSection`: wrap the header group and the children container each in `<Reveal>`. Test: jsdom has no IntersectionObserver → `Reveal` renders children immediately with the visible classes (assert children present + `opacity-100` after effect); mock `matchMedia` if the setup lacks it. All existing page tests must stay green (they will — content is present regardless).

- [ ] TDD each part (tile test first, card-count tests first, reveal test first); `pnpm test` + `pnpm build`; commit `feat: unify card tiles, even out grids, add reveal animation`.

---

### Task 3: Custy animations + polish parity

**Files:**
- Create: `custy/components/reveal.tsx`, `custy/components/reveal.test.tsx` (same component as Task 2c, adjusted imports)
- Modify: `custy/components/lander/section.tsx` (wrap header + children in Reveal)

Custy tiles/tricolor stay untouched. Verify `window.matchMedia` exists in custy's vitest setup (add the standard stub in `vitest.setup.ts` if missing, without disturbing other tests).

- [ ] TDD; `pnpm test` + `pnpm build` from `custy/`; commit `feat: add reveal animation to lander bands`.

---

## Final verification (whole branch)

One combined whole-branch review (Phases 1+2+3) follows this plan; then merge flow.
