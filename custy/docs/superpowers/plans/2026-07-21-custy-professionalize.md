# Custy Professionalize Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the custy site to a professional SaaS scale (type, spacing, density) and recompose the homepage — whole site, every page, same brand/theme.

**Architecture:** Design-system-first: Task 1 changes the scale at the source (tokens + shared components) so all pages inherit; Task 2 recomposes the homepage; Tasks 3-5 condense and copy-polish the heavy pages; Task 6 sweeps every remaining route and runs full QA.

**Tech Stack:** Existing custy app — Next.js 15, Tailwind v4 tokens in `app/globals.css`, lander component family, Vitest.

**Spec:** `custy/docs/superpowers/specs/2026-07-21-custy-professionalize-design.md`

## Global Constraints

- Work from `custy/`; branch `nextjs-migration`; never touch `dropship/`.
- **Brand is untouchable:** Inter, scheme backgrounds (#ffffff/#f5f5f5/#eef1ea/#e1edf5/#333333), accent blue `#17b6f4` / pink `#ec008c` / yellow `#ffd400`, rainbow bar, pill primary buttons, existing logo.
- **Copy license = polish + fix errors:** fix typos, tighten long/repetitive sentences. Every claim, feature name, price, and message stays. No invented facts. Every edited user-visible string must be listed in the task report (old → new) for review audit.
- **Test lockstep:** any polished copy that a test pins verbatim gets its assertion updated in the same commit. Structural/a11y/link/JSON-LD/sitemap/emoji-guard tests stay green unmodified (except where a label legitimately changed, e.g. "How it Works").
- **Canonical scale** (single source of truth; used by every task):
  - Page/hero h1: `text-[clamp(1.875rem,4vw,2.375rem)]` leading ~1.15 (30→38px)
  - Section h2: 26px mobile / 28px desktop (`text-[1.625rem] md:text-[1.75rem]`)
  - Card/step h3: 17px · Body/card text: 15px (leading-relaxed) · Lander lead: 17px
  - Eyebrow: 12px uppercase tracked · Prose body: 15.5px
  - Lander wrapper max-w 1200px · section vertical padding 56-64px (`py-14 md:py-16`)
  - `--radius-lander`: 16px · icon tiles 44px (glyph ~22px) · pricing price 32px
  - Buttons: `px-5 py-2.5 text-sm` (pill radius unchanged)
  - Header bar ~64px, logo image 40px tall (139×40 per 3000×860 ratio), nav 14px
- Explicit vitest imports in every test file. Commit trailers end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- After every task: `pnpm test` green + `pnpm build` green (all routes static except `/api/contact`).

---

### Task 1: Site-wide scale — tokens, shared components, nav label fix

**Files:**
- Modify: `custy/app/globals.css` (radius token), `custy/components/lander/{lander,hero,section,cards,steps,pricing-table,cta-band}.tsx`, `custy/components/{button,container,prose,header,footer}.tsx`, `custy/lib/nav.ts`, `custy/components/header.test.tsx`, `custy/lib/nav.test.ts` (only if it pins labels)

**Interfaces:**
- Consumes: current components (read them first — they carry the ported values).
- Produces: the canonical scale (Global Constraints) applied everywhere; `headerNav`/`footerColumns` label `"How it Works"` (hrefs unchanged). Later tasks assume components already render at the new scale.

- [ ] **Step 1: Update the failing-label test first (TDD for the visible change)** — in `components/header.test.tsx`, change both `"How it Work"` name assertions to `"How it Works"`. Run `pnpm vitest run components/header.test.tsx` → FAIL (label not yet changed).
- [ ] **Step 2: Fix labels** — in `lib/nav.ts` change both `label: "How it Work"` entries (headerNav + footerColumns) to `"How it Works"`; delete the now-stale "live spelling" comment if present. Run the test → PASS. If `lib/nav.test.ts` pins the old label, update it too.
- [ ] **Step 3: Apply the canonical scale** to each shared component, exact targets:
  - `globals.css`: `--radius-lander: 16px` (was 24px).
  - `lander.tsx` (`Lander`): `max-w-[1200px]`, wrapper `pt-8 pb-14` (mobile `px-4 pt-5 pb-10`); `LanderCta` pill sizing `px-5 py-2.5 text-sm`.
  - `hero.tsx` (`LanderHero`): h1 → canonical h1 clamp; lead → 17px; eyebrow → 12px uppercase; hero paddings reduced ~40%; `RainbowBar` height unchanged (brand); `HighlightCard` h3 → 17px, body 15px.
  - `section.tsx` (`LanderSection`): `py-14 md:py-16`; h2 → 26/28px; lead 15px.
  - `cards.tsx` (`CardGrid`): icon tile `h-11 w-11` (glyph `text-[22px]`), h3 17px, body 15px, card padding `p-5`, radius follows the token.
  - `steps.tsx` (`Steps`): numerals ~15px in smaller circles (`h-8 w-8`), h3 17px, body 15px, row/grid gaps reduced ~30%.
  - `pricing-table.tsx`: price `text-[2rem]` (was ~44px), plan h3 17-18px, feature `<li>` 14px `leading-6`, card padding `p-5`.
  - `cta-band.tsx`: h2 26/28px, text 15px, `py-12`.
  - `button.tsx` (`Button`): `px-5 py-2.5 text-sm` (both variants; pill/secondary radii unchanged).
  - `container.tsx`: unchanged width (1100px) — verify only.
  - `prose.tsx`: wrap column with `text-[15.5px]` via `prose` size override: `className="prose prose-neutral mx-auto max-w-[720px] text-[15.5px] prose-p:leading-relaxed prose-headings:text-ink"`.
  - `header.tsx`: bar height to `h-16`, logo `<Image ... width={139} height={40} />`, nav links `text-sm`, CTA uses the (now smaller) `Button`.
  - `footer.tsx`: column gap/padding reduced ~25%, links `text-sm`, copyright 13px.
- [ ] **Step 4: Full verify** — `pnpm test` (expect green; only the label test changed) and `pnpm build`. Then `pnpm dev` and eyeball `/`, `/features`, `/pricing` load with visibly tighter scale (no layout breakage).
- [ ] **Step 5: Commit** — `git add -A custy/components custy/app/globals.css custy/lib && git commit -m "feat(custy): professional type/density scale site-wide; fix How it Works label"`

---

### Task 2: Homepage recomposition

**Files:**
- Create: `custy/components/sections/feature-highlights.tsx`, `custy/components/sections/steps-teaser.tsx`, `custy/components/sections/pricing-teaser.tsx`, `custy/components/sections/faq.tsx`
- Modify: `custy/content/home.ts`, `custy/app/page.tsx`, `custy/app/page.test.tsx`; Delete: `custy/components/sections/demo-showcase.tsx`
- Possibly delete: demo-only images under `custy/public/images/content/` (only files referenced solely by the demo slice — verify with grep before deleting; list them in the report)

**Interfaces:**
- Consumes: `features` (`content/features.ts` — key-feature `cards: CardItem[]` in `sections[0]`), `howItWorks` steps (`content/how-it-works.ts` — `StepItem[]`), `pricing` plans + FAQ (`content/pricing.ts` — `Plan[]` and the 4 `{question, answer}` pairs; check exact export names in each file first), `posts` registry, `CtaBand`/`CardGrid` from `@/components/lander`, `APP_URL`.
- Produces: homepage order — hero (existing intro RichSection, lead trimmed) → FeatureHighlights → StepsTeaser → media-with-content (kept, copy trimmed) → PricingTeaser → Faq → BlogTeasers → CtaBand. Demo slice/type/component gone.

- [ ] **Step 1: Rewrite `app/page.test.tsx` (failing first):**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { APP_URL } from "@/lib/site";

describe("homepage", () => {
  it("renders the recomposed sections in order", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all features/i })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute("href", "/how-it-works");
    expect(screen.getByRole("link", { name: /compare plans/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByText(/custy blog/i)).toBeInTheDocument();
  });
  it("drops the demo product grid", () => {
    render(<HomePage />);
    expect(screen.queryByText(/test our app on demo product/i)).not.toBeInTheDocument();
  });
  it("shows an FAQ accordion with real questions", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("group").length).toBeGreaterThanOrEqual(4); // <details> = group role
  });
  it("has no commerce links", () => {
    render(<HomePage />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).not.toMatch(/\/(products|collections|cart|search)\b/);
    }
  });
});
```

Run → FAIL.
- [ ] **Step 2: New section components** (server components, Container-wrapped, scheme backgrounds alternating white/`bg-scheme2-bg`):
  - `feature-highlights.tsx`: props `{ cards: CardItem[] }`; renders section h2 "Everything a POD store needs" (authored, factual) + `CardGrid` (first 6 cards passed in) + secondary Button "All features" → `/features`.
  - `steps-teaser.tsx`: props `{ steps: StepItem[] }` (first 4); compact horizontal strip (grid `sm:grid-cols-4`), numbered circles, h3 + 1-line text (`line-clamp-2`); Button "See how it works" → `/how-it-works`.
  - `pricing-teaser.tsx`: props `{ plans: Plan[] }`; 4 mini cards: name (h3), price + period, first feature line as the one-line pitch; featured plan gets the existing gradient border accent; Button "Compare plans" → `/pricing`.
  - `faq.tsx`: props `{ items: { question: string; answer: string }[] }`; native accordion:

```tsx
<details key={item.question} className="group border-b border-line py-4">
  <summary className="flex cursor-pointer items-center justify-between text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
    {item.question}
    <span aria-hidden className="ml-4 text-lander-text transition-transform group-open:rotate-45">+</span>
  </summary>
  <p className="mt-3 text-[15px] leading-relaxed text-body">{item.answer}</p>
</details>
```

- [ ] **Step 3: Reshape `content/home.ts`** — delete the demo slice/type; keep hero/intro, media, closing; trim the intro lead and media/closing copy per the license (list edits in report). Do NOT copy feature/step/plan/FAQ data into home.ts — `app/page.tsx` imports those content modules directly and slices (`.slice(0, 6)`, `.slice(0, 4)`).
- [ ] **Step 4: Assemble `app/page.tsx`** in the Produces order; delete `demo-showcase.tsx`; grep `public/images/content` references of demo-only images (each demo image basename) across `content/ components/ app/` — delete files with zero remaining references.
- [ ] **Step 5: Verify** — `pnpm vitest run app/page.test.tsx` PASS; full `pnpm test` + `pnpm build`; dev-server eyeball of the new homepage at desktop + 375px.
- [ ] **Step 6: Commit** — `git add -A custy/app/page.tsx custy/app/page.test.tsx custy/content/home.ts custy/components/sections custy/public && git commit -m "feat(custy): recompose homepage — features, steps, pricing, FAQ; drop demo grid"`

---

### Task 3: How-it-works condense + copy polish

**Files:**
- Modify: `custy/content/how-it-works.ts`, `custy/app/how-it-works/page.tsx`, `custy/app/how-it-works/page.test.tsx` (only where polished copy was pinned)

Most sizing arrived via Task 1. This task: (a) page-level spacing — remove any page-local overrides that fight the new scale (read `page.tsx`; landers should carry none — verify); (b) copy polish in `content/how-it-works.ts`: tighten the longest step/why-card paragraphs (target ≤ 2 sentences each), fix any grammar carried from live, keep every claim; (c) update pinned test strings in lockstep.

- [ ] **Step 1:** Polish copy in `content/how-it-works.ts` (list every old → new string in the report).
- [ ] **Step 2:** Update `page.test.tsx` assertions that pinned changed strings; run `pnpm vitest run app/how-it-works` → PASS (order test must still pass — titles keep their wording unless a typo fix was needed).
- [ ] **Step 3:** Full `pnpm test` + `pnpm build`; dev eyeball vs. the old giant version.
- [ ] **Step 4: Commit** — `git commit -m "polish(custy): condense how-it-works copy"` (add the touched files explicitly).

---

### Task 4: Pricing condense + copy polish

**Files:**
- Modify: `custy/content/pricing.ts`, `custy/app/pricing/page.tsx`, `custy/app/pricing/page.test.tsx`

Task-1 scale already shrank the table. This task: (a) `page.tsx` header/FAQ inline JSX adopts the canonical scale (h1 clamp, 15px body, tighter margins — bring the header's bottom margin to ~40px); (b) copy polish: tighten the header lead and the bottom disclaimer; FAQ answers ≤ 3 sentences (facts intact); ALL 45 features and all prices stay verbatim; (c) test lockstep.

- [ ] **Step 1:** Apply header/FAQ JSX scale + copy polish (report lists old → new).
- [ ] **Step 2:** `pnpm vitest run app/pricing` PASS (plan names/prices/features assertions untouched); full `pnpm test` + `pnpm build`.
- [ ] **Step 3: Commit** — `git commit -m "polish(custy): condense pricing header, FAQ, disclaimer"`.

---

### Task 5: Features + About copy trim

**Files:**
- Modify: `custy/content/features.ts`, `custy/content/about.ts`, `custy/app/features/page.test.tsx`, `custy/app/about-us/page.test.tsx` (lockstep only)

Sizing is inherited. Copy polish only: hero leads ≤ 2 sentences; card bodies ≤ 2 sentences; kill repeated phrases ("built for POD" appearing in consecutive cards etc.); every feature name/claim stays. Icons untouched.

- [ ] **Step 1:** Polish `content/features.ts` + `content/about.ts` (report lists every old → new).
- [ ] **Step 2:** Update pinned strings in the two test files; `pnpm vitest run app/features app/about-us` PASS; full `pnpm test` + `pnpm build`.
- [ ] **Step 3: Commit** — `git commit -m "polish(custy): tighten features and about copy"`.

---

### Task 6: Whole-site sweep + QA

**Files:**
- Modify (as needed from the sweep): `custy/app/blog/page.tsx`, `custy/app/blog/[slug]/page.tsx`, `custy/app/{support,contact}/page.tsx`, `custy/app/policies/*/page.tsx`, `custy/app/not-found.tsx`, `custy/README.md` (stack line if stale)

Per-route sweep — with `pnpm dev` running, view EVERY route (`/`, `/features`, `/pricing`, `/how-it-works`, `/about-us`, `/support`, `/contact`, `/policies/privacy`, `/policies/terms`, `/blog`, one post, a bad URL for 404) at desktop + 375px and fix, per route: any element still on the old scale (oversized heading, huge padding, wide container), any page-local style fighting Task 1, blog card/post header sizing to match the new scale, 404 heading size. No copy changes here beyond typo fixes (report them).

- [ ] **Step 1:** Sweep + fix each route (report a route → changes table; "no change" is a valid entry).
- [ ] **Step 2:** Full `pnpm test` + `pnpm build`; route curl sweep (all 200, redirects intact: `/pages/features` → 308 `/features`).
- [ ] **Step 3:** Commit — `git commit -m "polish(custy): whole-site scale sweep — blog, prose pages, 404"`.

---

## Round 2 addendum (spec "Round 2" section; same Global Constraints; owner-approved 2026-07-22)

### Task R1: Global — 21-day copy, nav links, light CTA band, remove media section

**Files:** Modify `content/{home,about}.ts` (14→21-Day, 3 strings), `lib/nav.ts` (header + footer gain Blog `/blog`; footer Company gains Support `/support`), `components/lander/cta-band.tsx` (add `tone?: "dark" | "light"`, default dark unchanged; light = `bg-scheme2-bg` with soft yellow/pink radial tints, `text-ink` title, `text-body` copy, cta default variant `primary`), `app/page.tsx` (band `tone="light"`; remove MediaWithContent), delete `components/sections/media-with-content.tsx` + `home.media` slice + its image if unreferenced (grep first), tests lockstep (`components/header.test.tsx` Blog link; `app/page.test.tsx` media-section-gone + 21-Day pin; `lib/nav.test.ts` if it pins link sets).

- [ ] Steps: failing test updates (Blog in header, no media heading on home, 21-Day string) → implement → `pnpm test` + `pnpm build` green → commit `feat(custy): 21-day copy, blog nav links, light homepage CTA band; drop media section`.

### Task R2: Homepage — why-cards, trust band, richer pricing teaser

**Files:** Create `components/sections/why-custy.tsx` (h2 "Why merchants choose Custy", 3 `CardItem`-style cards distilled VERBATIM-faithfully from existing copy in `content/about.ts`/`features.ts` — no new claims), `components/sections/trust-band.tsx` (3 items: "21-day free trial on paid plans" · "Cancel anytime through Shopify" · "No hidden fees or commissions" — sourced from `content/pricing.ts` copy). Modify `components/sections/pricing-teaser.tsx` (per plan: name, price+period, first 3 features, per-card `LanderCta`-style link to `/pricing`; microcopy line "All prices billed in USD · 21-day free trial on paid plans"), `app/page.tsx` (order: hero → features → steps → why-custy → pricing teaser → trust band → FAQ → blog → CTA), `app/page.test.tsx` (assert why-card h2, one trust item, a teaser feature string).

- [ ] Steps: failing tests → implement → full green → commit `feat(custy): homepage why-cards, trust band, richer pricing teaser`.

### Task R3: Pricing page — 4-across + new sections

**Files:** Modify `components/lander/pricing-table.tsx` (`min-[1200px]:grid-cols-4` → `lg:grid-cols-4`; adjust the featured-scale threshold media query to match), `app/pricing/page.tsx` (+2 sections above FAQ: "What's included in every plan" — compute the intersection of the four plans' feature lists at build time in the page file from `content/pricing.ts` and render as a 2-col checklist; reuse `components/sections/trust-band.tsx`), `app/pricing/page.test.tsx` (assert included-in-every-plan h2 + one common feature; existing plan assertions untouched).

- [ ] Steps: failing tests → implement → full green → commit `feat(custy): pricing 4-across grid, common-features and trust sections`.

### Task R4: Features page additions + overall pass

**Files:** Modify `app/features/page.tsx` (+ "Works with your POD workflow" strip — 3-4 items using ONLY existing claims: Shopify-native, DTG/DTF print-ready files, multi-side printing, live preview; + compact 4-step `Steps` teaser reusing `content/how-it-works.ts` first 4 steps with a "See how it works" CTA), `content/features.ts` (workflow strip data), `app/features/page.test.tsx` (assert strip h2 + teaser link). Overall pass: verify every route's section backgrounds alternate cleanly and cards have consistent hover states (`CardGrid` already has hover-lift — extend to why-custy/trust/pricing-teaser cards if missing); route sweep (curl 200s + redirects) + full test + build.

- [ ] Steps: failing tests → implement → sweep table in report → full green → commit `feat(custy): features workflow strip and steps teaser; hover/background pass`.
