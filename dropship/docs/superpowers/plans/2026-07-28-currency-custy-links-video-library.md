# Currency Labels, Custy Cross-Links, Video Library — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Label every money figure on the DropShipPOD site with its currency, make Custy reachable from the site, and publish a video library page.

**Architecture:** The five duplicated shipping figures move into one module, `content/shipping.ts`, which TSX call sites render through a `money()` formatter. The two client-editable MDX files keep plain prose and are policed by a test that compares their dollar figures against that module. Custy links are added by giving `NavLink` an `external` flag, which two existing tests currently forbid. The video library is a new static route reusing the existing `VideoEmbed` component.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind v4, MDX v3 via `@next/mdx`, Vitest + Testing Library, lucide-react icons.

**Spec:** `docs/superpowers/specs/2026-07-28-currency-custy-links-video-library-design.md`

## Global Constraints

- All work is inside `dropship/`. Run every command from that directory, never the repo root.
- **Shipping figures are CAD. App and service charges are USD.** These are different currencies for different things. Never render a shipping figure as USD.
- The currency constant is named `SHIPPING_CURRENCY`, not `CURRENCY`, so app pricing can never be rendered through it by mistake.
- **No figure changes value.** The only number that changes is the `$150` typo at `content/faqs/general.tsx:613`, which becomes `$199`.
- **No emoji anywhere.** `lib/no-emoji.test.ts` scans `content/`, `components/`, and `app/` for `\p{Extended_Pictographic}`; only `©`, `®`, `™` are allowed. Icons come from `lucide-react`.
- `content/pages/policies/shipping.mdx` and `content/pages/delivery.mdx` must stay plain prose. **Do not add `import` statements or `{expression}` interpolation to either** — the client edits these by hand.
- `content/raw/` is never edited.
- Do not touch `content/pages/billing.mdx`. Its currency is an unresolved client question; see the spec's Deferred section.
- Do not touch `lib/redirects.ts`.
- Verify with `pnpm test` after each task. `pnpm build` before the final commit.

## File Structure

| File | Responsibility |
| --- | --- |
| `content/shipping.ts` | **New.** The five shipping figures and the `money()` formatter. Single source of truth. |
| `content/shipping.test.ts` | **New.** Unit tests for `money()` (Task 1) plus the MDX prose guard (Task 3). |
| `content/faqs/general.tsx` | Modify. Three answers render from `shipping.ts`; the `$150` typo dies here. |
| `components/sections/shipping-band.tsx` | Modify. Homepage threshold renders from `shipping.ts`. |
| `app/(marketing)/delivery/page.tsx` | Modify. Metadata description interpolates the threshold. |
| `content/pages/policies/shipping.mdx` | Modify. CAD labels inline, prose only. |
| `content/pages/delivery.mdx` | Modify. CAD labels inline, prose only. |
| `lib/site.ts` | Modify. Adds `CUSTY_SITE_URL`, `CUSTY_APP_URL`. |
| `lib/nav.ts` | Modify. `NavLink` gains `external?`; Custy and video-library entries added. |
| `components/nav-item-link.tsx` | **New.** Renders a `NavLink` as `<Link>` or external `<a>`. Shared by header and footer. |
| `components/header.tsx` | Modify. Four render sites switch to `NavItemLink`. |
| `components/footer.tsx` | Modify. One render site switches to `NavItemLink`. |
| `components/sections/custy-pitch.tsx` | **New.** Homepage Custy section. |
| `app/(marketing)/videos/page.tsx` | **New.** Video library grid. |
| `app/(marketing)/videos/page.test.tsx` | **New.** Renders a card per video. |
| `content/videos.ts` | Modify. Adds `allVideos`. |
| `lib/routes.ts` | Modify. Adds `/videos`. |
| `lib/nav.test.ts` | Modify. Learns about external links. |
| `lib/site-audit.test.ts` | Modify. Skips external links; route count 21 → 22. |
| `app/page.test.tsx` | Modify. CAD assertion; Custy section in the h2 order list. |

**Task order is mandatory.** Task 1 defines what Tasks 2 and 3 consume. Tasks 4 and 5 both edit `lib/nav.ts` and `lib/site-audit.test.ts`; running them out of order causes conflicts.

---

### Task 1: Shipping figures module

**Files:**
- Create: `content/shipping.ts`
- Test: `content/shipping.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `SHIPPING_CURRENCY: string`, `FREE_SHIPPING_THRESHOLD: number`, `SECURE_SHIPPING_FEE: number`, `shippingRates: ShippingRate[]`, `allShippingAmounts: number[]`, `money(amount: number): string`. Tasks 2 and 3 depend on these exact names.

- [ ] **Step 1: Write the failing test**

Create `content/shipping.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  FREE_SHIPPING_THRESHOLD,
  SECURE_SHIPPING_FEE,
  SHIPPING_CURRENCY,
  allShippingAmounts,
  money,
  shippingRates,
} from "./shipping";

describe("shipping figures", () => {
  it("quotes shipping in CAD, not USD", () => {
    expect(SHIPPING_CURRENCY).toBe("CAD");
  });

  it("holds the published threshold and secure-shipping fee", () => {
    expect(FREE_SHIPPING_THRESHOLD).toBe(199);
    expect(SECURE_SHIPPING_FEE).toBe(5.99);
  });

  it("holds the three provincial rate tiers covering all ten provinces", () => {
    expect(shippingRates.map((rate) => rate.amount)).toEqual([14.99, 19.99, 24.99]);
    const provinces = shippingRates.flatMap((rate) => rate.provinces);
    expect(provinces).toHaveLength(10);
    expect(new Set(provinces).size).toBe(10);
  });

  it("exposes every distinct amount for the MDX guard", () => {
    expect([...allShippingAmounts].sort((a, b) => a - b)).toEqual([
      5.99, 14.99, 19.99, 24.99, 199,
    ]);
  });
});

describe("money()", () => {
  it("drops decimals on whole amounts", () => {
    expect(money(199)).toBe("$199 CAD");
  });

  it("keeps two decimals on fractional amounts", () => {
    expect(money(14.99)).toBe("$14.99 CAD");
    expect(money(5.99)).toBe("$5.99 CAD");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run content/shipping.test.ts`
Expected: FAIL — cannot resolve `./shipping`.

- [ ] **Step 3: Write minimal implementation**

Create `content/shipping.ts`:

```ts
// Shipping is quoted in CAD. App and service charges are USD — see
// docs/superpowers/specs/2026-07-28-currency-custy-links-video-library-design.md.
// The constant is deliberately not named CURRENCY so app pricing cannot be
// rendered through money() by mistake.
export const SHIPPING_CURRENCY = "CAD";

export const FREE_SHIPPING_THRESHOLD = 199;
export const SECURE_SHIPPING_FEE = 5.99;

export type ShippingRate = { provinces: string[]; amount: number };

export const shippingRates: ShippingRate[] = [
  { provinces: ["ON", "QC", "NB", "NS", "NL", "PE"], amount: 14.99 },
  { provinces: ["AB", "SK", "MB"], amount: 19.99 },
  { provinces: ["BC"], amount: 24.99 },
];

/** Every distinct published amount. Used by the MDX prose guard. */
export const allShippingAmounts: number[] = [
  FREE_SHIPPING_THRESHOLD,
  SECURE_SHIPPING_FEE,
  ...shippingRates.map((rate) => rate.amount),
];

/** "$199 CAD" for whole amounts, "$14.99 CAD" for fractional ones. */
export function money(amount: number): string {
  return `$${amount.toFixed(Number.isInteger(amount) ? 0 : 2)} ${SHIPPING_CURRENCY}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run content/shipping.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add content/shipping.ts content/shipping.test.ts
git commit -m "feat: single source of truth for shipping figures in CAD"
```

---

### Task 2: Render TSX call sites from the module

Fixes the live `$150` / `$199` contradiction.

**Files:**
- Modify: `content/faqs/general.tsx` (three answers)
- Modify: `components/sections/shipping-band.tsx:17`
- Modify: `app/(marketing)/delivery/page.tsx:7`
- Test: `app/page.test.tsx:28`

**Interfaces:**
- Consumes: `FREE_SHIPPING_THRESHOLD`, `SECURE_SHIPPING_FEE`, `shippingRates`, `money` from Task 1.
- Produces: nothing new.

- [ ] **Step 1: Update the failing assertion in the homepage test**

In `app/page.test.tsx`, change line 28 from:

```tsx
    expect(screen.getByText(/free shipping on all orders over \$199/i)).toBeInTheDocument();
```

to:

```tsx
    expect(screen.getByText(/free shipping on all orders over \$199 CAD/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run app/page.test.tsx`
Expected: FAIL — the band still renders `$199` with no CAD label.

- [ ] **Step 3: Update the shipping band**

In `components/sections/shipping-band.tsx`, add to the imports:

```tsx
import { FREE_SHIPPING_THRESHOLD, money } from "@/content/shipping";
```

and replace line 17:

```tsx
                Free shipping on all orders over {money(FREE_SHIPPING_THRESHOLD)}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run app/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Update the three FAQ answers**

In `content/faqs/general.tsx`, add below the existing `import type { FaqItem } from "./types";`:

```tsx
import { FREE_SHIPPING_THRESHOLD, SECURE_SHIPPING_FEE, money, shippingRates } from "@/content/shipping";
```

Replace the "How much does shipping cost?" answer body (currently the `<p>`/`<p>`/`<ul>` block using `$199`, `$14.99`, `$19.99`, `$24.99`):

```tsx
      <>
        <p>
          <strong>Orders over {money(FREE_SHIPPING_THRESHOLD)} = FREE SHIPPING</strong>
        </p>
        <p>
          <strong>Orders under {money(FREE_SHIPPING_THRESHOLD)} = Delivered to:</strong>
        </p>
        <ul>
          {shippingRates.map((rate) => (
            <li key={rate.provinces.join(",")}>
              <strong>{rate.provinces.join(", ")}</strong> = {money(rate.amount)}
            </li>
          ))}
        </ul>
      </>
```

Replace the "Do you offer free shipping?" answer body — **this is the `$150` typo**:

```tsx
      <>
        <p>We offer free shipping on orders over {money(FREE_SHIPPING_THRESHOLD)}.</p>
      </>
```

In the "What happens if my order is lost in transit?" answer, replace the `$5.99` sentence:

```tsx
          If your order is lost during shipping, please contact us immediately. We will investigate the issue and
          send a replacement if you had chosen &ldquo;secure shipping&rdquo;. Secure shipping costs an additional{" "}
          {money(SECURE_SHIPPING_FEE)} where the courier will need a signature upon delivery, thus lowering the risk
          of porch pirate theft.
```

- [ ] **Step 6: Update the delivery page metadata**

In `app/(marketing)/delivery/page.tsx`, add to the imports:

```tsx
import { FREE_SHIPPING_THRESHOLD, money } from "@/content/shipping";
```

and replace the metadata block:

```tsx
export const metadata: Metadata = {
  title: "Delivery Speed",
  description: `Production and shipping times across Canada, plus free shipping over ${money(FREE_SHIPPING_THRESHOLD)}.`,
};
```

- [ ] **Step 7: Verify no bare figures remain in TSX**

Run: `grep -rn '\$1[0-9][0-9]\|\$[0-9]\+\.99' content/faqs components app --include='*.tsx' | grep -v '\.test\.'`
Expected: no output. Every match should now come from `money()`.

- [ ] **Step 8: Run the full suite**

Run: `pnpm test`
Expected: PASS. The FAQ content test at `content/faqs/faqs.test.ts` must still pass.

- [ ] **Step 9: Commit**

```bash
git add content/faqs/general.tsx components/sections/shipping-band.tsx \
  'app/(marketing)/delivery/page.tsx' app/page.test.tsx
git commit -m "fix: render shipping figures from one source, correct \$150 threshold typo

The 'Do you offer free shipping?' FAQ answer stated a \$150 free-shipping
threshold against \$199 in ten other places. Both now render from
content/shipping.ts, so they cannot drift apart again."
```

---

### Task 3: CAD labels in MDX, guarded by a test

**Files:**
- Modify: `content/pages/policies/shipping.mdx`
- Modify: `content/pages/delivery.mdx`
- Test: `content/shipping.test.ts` (append a describe block)

**Interfaces:**
- Consumes: `allShippingAmounts` from Task 1.
- Produces: nothing new.

- [ ] **Step 1: Write the failing guard test**

Append to `content/shipping.test.ts`. Add `fs`/`path` imports at the top of the file alongside the existing imports:

```ts
import fs from "node:fs";
import path from "node:path";
```

then append:

```ts
const PROSE_FILES = [
  "content/pages/policies/shipping.mdx",
  "content/pages/delivery.mdx",
];

describe("MDX prose currency labels", () => {
  const known = new Set(allShippingAmounts);

  for (const rel of PROSE_FILES) {
    it(`${rel}: every dollar figure is a known amount labelled CAD`, () => {
      const text = fs.readFileSync(path.join(process.cwd(), rel), "utf8");
      const offenders: string[] = [];

      for (const match of text.matchAll(/\$(\d+(?:\.\d+)?)(\s+CAD)?/g)) {
        const amount = Number(match[1]);
        if (!known.has(amount)) {
          offenders.push(`${match[0]} — not a value declared in content/shipping.ts`);
        } else if (!match[2]) {
          offenders.push(`${match[0]} — missing CAD label`);
        }
      }

      expect(offenders, offenders.join("\n")).toHaveLength(0);
    });
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run content/shipping.test.ts`
Expected: FAIL — both files report "missing CAD label" for every figure (8 in `shipping.mdx`, 2 in `delivery.mdx`).

- [ ] **Step 3: Label `content/pages/delivery.mdx`**

Two edits. Line 11:

```markdown
## Free shipping over $199 CAD
```

Line 13:

```markdown
- **Free shipping on all orders over $199 CAD**
```

- [ ] **Step 4: Label `content/pages/policies/shipping.mdx`**

Line 1:

```markdown
## Free Shipping on Orders Over $199 CAD
```

Line 3 — label the one figure, leave the rest of the sentence untouched:

```markdown
We want to make high quality custom apparel accessible to everyone. That is why we have **FREE SHIPPING ON ORDERS OVER $199 CAD** in Canada. No matter where you live, we at DropShipPOD will make sure your order gets to you fast. Below, you will find our shipping options.
```

Line 8 — five figures in one bullet:

```markdown
- **Free Shipping**: We offer FREE SHIPPING ON ORDERS OVER $199 CAD across North America using Purolator, GLS or FedEx. We will provide a tracking number on all orders. Please note that  DropShipPOD is **NOT RESPONSIBLE** under **ANY CIRCUMSTANCES** for any shipping delays, package theft or shipping mishaps. Shipping on orders under $199 CAD is a flat rate of just $14.99 CAD per order if shipped to **ON, QC, NB, NS, NL, PE,**  if your order is being shipped to **AB, SK, MB** \= $19.99 CAD and if your order is being shipped to **BC** \= $24.99 CAD
```

Line 11:

```markdown
- **Secure Shipping**: For a small flat fee of $5.99 CAD, you can have secure shipping. This means your package will not be delivered unless someone signs for it. If you prefer this method of delivery, please select "Secure Shipping" option at checkout.
```

Line 13:

```markdown
- Please note that DropShipPOD is **NOT RESPONSIBLE** under **ANY CIRCUMSTANCES** for any shipping delays, package theft or shipping mishaps. For a small flat fee of $5.99 CAD, you can have secure shipping. This means your package will not be delivered unless someone signs for it. If you prefer this method of delivery, please select "**Secure Shipping**" option at checkout.
```

Line 40:

```markdown
## Secure Shipping Insurance – $5.99 CAD
```

Line 42:

```markdown
For **$5.99 CAD**, your order is protected against:
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm vitest run content/shipping.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 6: Confirm no imports leaked into the MDX**

Run: `grep -n 'import\|{money\|{FREE_SHIPPING' content/pages/policies/shipping.mdx content/pages/delivery.mdx`
Expected: no output. These files must remain plain prose.

- [ ] **Step 7: Run the full suite**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add content/pages/policies/shipping.mdx content/pages/delivery.mdx content/shipping.test.ts
git commit -m "feat: label shipping prose figures CAD, guard against drift

Adds a test that fails when a dollar figure in the two shipping MDX files
is not a value declared in content/shipping.ts, or is not labelled CAD."
```

---

### Task 4: Custy cross-links

**Files:**
- Modify: `lib/site.ts`, `lib/nav.ts`, `components/header.tsx`, `components/footer.tsx`, `app/page.tsx`
- Create: `components/nav-item-link.tsx`, `components/sections/custy-pitch.tsx`
- Test: `lib/nav.test.ts`, `lib/site-audit.test.ts`, `app/page.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `CUSTY_SITE_URL`, `CUSTY_APP_URL` from `lib/site.ts`; `NavLink.external?: boolean`; `NavItemLink` component; `CustyPitch` component. Task 5 depends on `NavLink` keeping its `external?` field.

**Why two tests must change:** `lib/nav.test.ts:11-16` asserts every href matches `/^\//`, and `lib/site-audit.test.ts:42-47` asserts every href is a known static route. An outbound link fails both. This is expected and intentional, not a regression.

- [ ] **Step 1: Write the failing test**

In `lib/nav.test.ts`, replace the first two `it` blocks:

```ts
  it("every link has a label; internal links are root-relative, external links are https", () => {
    for (const link of allLinks()) {
      expect(link.label.length).toBeGreaterThan(0);
      if (link.external) expect(link.href).toMatch(/^https:\/\//);
      else expect(link.href).toMatch(/^\//);
    }
  });
  it("contains no Shopify-era paths", () => {
    for (const link of allLinks()) {
      if (link.external) continue;
      expect(link.href).not.toMatch(/\/(pages|products|collections|cart|account)(\/|$)/);
    }
  });
```

and append a new `it` inside the same `describe`:

```ts
  it("links out to Custy from both the primary nav and the footer", () => {
    const external = allLinks().filter((link) => link.external);
    const custy = external.filter((link) => link.href.includes("custyapp.com"));
    expect(custy.length).toBeGreaterThanOrEqual(2);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run lib/nav.test.ts`
Expected: FAIL — no external Custy link exists yet.

- [ ] **Step 3: Add the URLs**

Replace `lib/site.ts` entirely:

```ts
export const TAGLINE = "Your Brand. Your Platform.";
export const SHOPIFY_APP_URL = "https://apps.shopify.com/dropshippod";

// Custy is the sibling product — its own marketing site and Shopify listing.
export const CUSTY_SITE_URL = "https://custyapp.com";
export const CUSTY_APP_URL = "https://apps.shopify.com/custy";
```

- [ ] **Step 4: Add the external flag and the nav entries**

In `lib/nav.ts`, add the import at the top:

```ts
import { CUSTY_SITE_URL } from "./site";
```

Change the `NavLink` type:

```ts
export type NavLink = { label: string; href: string; external?: boolean };
```

In `primaryNav`, insert between the `Sizing` group and `{ label: "About", href: "/about" }`:

```ts
  { label: "Custy", href: CUSTY_SITE_URL, external: true },
```

In `footerColumns`, append to the **Company** column's `links` array:

```ts
      { label: "Custy design app", href: CUSTY_SITE_URL, external: true },
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm vitest run lib/nav.test.ts`
Expected: PASS.

- [ ] **Step 6: Teach the site audit about external links**

In `lib/site-audit.test.ts`, replace the fourth `it` block:

```ts
  it("every internal nav and footer href is a known static route", () => {
    const known = new Set(STATIC_ROUTES);
    for (const link of allNavLinks) {
      if (link.external) continue;
      expect(known.has(link.href), `nav link to unknown route ${link.href}`).toBe(true);
    }
  });
```

Run: `pnpm vitest run lib/site-audit.test.ts`
Expected: PASS.

- [ ] **Step 7: Create the shared nav link renderer**

Create `components/nav-item-link.tsx`:

```tsx
import Link from "next/link";
import type { NavLink } from "@/lib/nav";

/** Renders a nav entry as an internal <Link> or an external <a>. */
export function NavItemLink({
  link,
  className,
  onClick,
}: {
  link: NavLink;
  className?: string;
  onClick?: () => void;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}
```

- [ ] **Step 8: Use it in the header**

In `components/header.tsx`, add the import:

```tsx
import { NavItemLink } from "@/components/nav-item-link";
```

Replace all four `<Link>` render sites that come from nav data. Desktop group links:

```tsx
                    {entry.links.map((link) => (
                      <NavItemLink
                        key={link.href}
                        link={link}
                        onClick={() => setOpenGroup(null)}
                        className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-surface hover:text-ink"
                      />
                    ))}
```

Desktop top-level links:

```tsx
              <NavItemLink
                key={entry.href}
                link={entry}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:text-ink"
              />
```

Mobile group links:

```tsx
                  {entry.links.map((link) => (
                    <NavItemLink
                      key={link.href}
                      link={link}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-surface"
                    />
                  ))}
```

Mobile top-level links:

```tsx
                <NavItemLink
                  key={entry.href}
                  link={entry}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-surface"
                />
```

Leave the `Wordmark` `<Link href="/">` and both `ButtonLink` CTAs untouched — they are not nav data.

- [ ] **Step 9: Use it in the footer**

In `components/footer.tsx`, add the import:

```tsx
import { NavItemLink } from "@/components/nav-item-link";
```

Replace the column link list:

```tsx
                {column.links.map((link) => (
                  <li key={link.href}>
                    <NavItemLink link={link} className="text-sm text-zinc-600 hover:text-ink" />
                  </li>
                ))}
```

Leave the logo `<Link href="/">` and the `socialLinks` anchors untouched.

- [ ] **Step 10: Run the header and footer tests**

Run: `pnpm vitest run components/header.test.tsx components/footer.test.tsx`
Expected: PASS.

- [ ] **Step 11: Add the Custy homepage section to the test**

In `app/page.test.tsx`, add `"Custy for your storefront"` to `expectedSections`, between `"Built for dropshipping"` and `"Ready to launch your brand?"`:

```tsx
    const expectedSections = [
      "How it works",
      "Printing methods",
      "Top Selling Brands",
      "What sellers say",
      "Built for dropshipping",
      "Custy for your storefront",
      "Ready to launch your brand?",
    ];
```

Run: `pnpm vitest run app/page.test.tsx`
Expected: FAIL — the section does not exist yet.

- [ ] **Step 12: Build the Custy section**

Create `components/sections/custy-pitch.tsx`:

```tsx
import { Palette } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { CUSTY_APP_URL, CUSTY_SITE_URL } from "@/lib/site";

const points = [
  "Shoppers add their own text, art and colours on your product page.",
  "Live preview, so they see the design before they buy.",
  "Print-ready artwork arrives with the order — nothing to redraw.",
];

export function CustyPitch() {
  return (
    <Section id="custy" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Also from our team"
          title="Custy for your storefront"
        />
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-zinc-600">
              Custy is our Shopify product customizer. Let customers personalize
              what they buy without you touching a design file — then send the
              finished order straight to us for printing.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-ink-tint text-ink">
                    <Palette aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-5 md:justify-end">
            <ButtonLink href={CUSTY_APP_URL}>Get Custy on Shopify</ButtonLink>
            <a
              href={CUSTY_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand hover:text-brand-dark"
            >
              Visit custyapp.com
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

`ButtonLink` already renders an external anchor when `href` starts with `http`, so `CUSTY_APP_URL` needs no special handling.

- [ ] **Step 13: Mount it on the homepage**

In `app/page.tsx`, add the import:

```tsx
import { CustyPitch } from "@/components/sections/custy-pitch";
```

and place it between `<DropshipPitch />` and `<ShippingBand />`:

```tsx
      <DropshipPitch />
      <CustyPitch />
      <ShippingBand />
```

- [ ] **Step 14: Run the full suite**

Run: `pnpm test`
Expected: PASS, including `lib/no-emoji.test.ts` — the new copy must be emoji-free.

- [ ] **Step 15: Commit**

```bash
git add lib/site.ts lib/nav.ts lib/nav.test.ts lib/site-audit.test.ts \
  components/nav-item-link.tsx components/header.tsx components/footer.tsx \
  components/sections/custy-pitch.tsx app/page.tsx app/page.test.tsx
git commit -m "feat: link Custy from the nav, footer and homepage

NavLink gains an external flag; nav.test.ts and site-audit.test.ts both
asserted internal-only hrefs and now handle external links."
```

---

### Task 5: Video library page

**Files:**
- Create: `app/(marketing)/videos/page.tsx`, `app/(marketing)/videos/page.test.tsx`
- Modify: `content/videos.ts`, `lib/routes.ts`, `lib/nav.ts`, `lib/site-audit.test.ts`

**Interfaces:**
- Consumes: `NavLink` from `lib/nav.ts` (Task 4), `VideoEmbed` from `components/video-embed.tsx` (existing, unchanged).
- Produces: `allVideos: Video[]` from `content/videos.ts`.

All six thumbnails already exist in `public/images/videos/`. No search box — six items do not need one; see the spec.

- [ ] **Step 1: Write the failing test**

Create `app/(marketing)/videos/page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { allVideos, featuredVideo, moreVideos } from "@/content/videos";

describe("video library page", () => {
  it("lists the featured video plus every video in the strip", () => {
    expect(allVideos).toHaveLength(moreVideos.length + 1);
    expect(allVideos[0]).toEqual(featuredVideo);
  });

  it("renders a playable facade for every video", () => {
    render(<Page />);
    expect(screen.getAllByRole("button", { name: /^Play video:/ })).toHaveLength(allVideos.length);
  });

  it("renders each video title as visible text", () => {
    render(<Page />);
    for (const video of allVideos) {
      expect(screen.getByText(video.title)).toBeInTheDocument();
    }
  });

  it("renders the page heading as the only h1", () => {
    render(<Page />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/video library/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run 'app/(marketing)/videos/page.test.tsx'`
Expected: FAIL — cannot resolve `./page`, and `allVideos` is not exported.

- [ ] **Step 3: Add `allVideos`**

Append to `content/videos.ts`:

```ts
/** Featured video first, then the strip — the order the library page renders. */
export const allVideos: Video[] = [featuredVideo, ...moreVideos];
```

Leave `featuredVideo` and `moreVideos` exported as they are; `components/sections/hero.tsx` still uses them and must not change.

- [ ] **Step 4: Build the page**

Create `app/(marketing)/videos/page.tsx`:

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { VideoEmbed } from "@/components/video-embed";
import { allVideos } from "@/content/videos";

export const metadata: Metadata = {
  title: "Video Library",
  description:
    "Walkthroughs and guides on building a print-on-demand brand with DropShipPOD.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Watch and learn"
        title="Video Library"
        lede="Walkthroughs and guides on launching your print-on-demand brand."
      />
      <Container className="py-10 sm:py-12">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allVideos.map((video) => (
            <li key={video.id}>
              <VideoEmbed id={video.id} title={video.title} />
              <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm vitest run 'app/(marketing)/videos/page.test.tsx'`
Expected: PASS, 4 tests.

- [ ] **Step 6: Register the route**

In `lib/routes.ts`, add `"/videos"` after `"/measuring"`:

```ts
  "/measuring",
  "/videos",
```

In `lib/site-audit.test.ts`, update the inventory assertion — both the count and the test name:

```ts
  it("matches the migration inventory: 22 static routes and 47 size charts", () => {
    expect(STATIC_ROUTES).toHaveLength(22);
    expect(getAllSizeCharts()).toHaveLength(47);
  });
```

- [ ] **Step 7: Link it from nav and footer**

The site audit forbids orphan routes, so both links are required, not optional.

In `lib/nav.ts`, append to the **Help & FAQs** group in `primaryNav`:

```ts
      { label: "Video library", href: "/videos" },
```

and append to the **Resources** column in `footerColumns`:

```ts
      { label: "Video library", href: "/videos" },
```

- [ ] **Step 8: Run the full suite**

Run: `pnpm test`
Expected: PASS. `lib/site-audit.test.ts` confirms the route exists on disk, is linked, and is not an orphan.

- [ ] **Step 9: Build**

Run: `pnpm build`
Expected: clean build; `/videos` appears in the route list as static.

- [ ] **Step 10: Commit**

```bash
git add content/videos.ts 'app/(marketing)/videos' lib/routes.ts lib/nav.ts lib/site-audit.test.ts
git commit -m "feat: add /videos library page

Grid of all six videos reusing VideoEmbed. No search: six items do not
warrant one. Linked from the Help & FAQs nav group and the footer
Resources column; static route count 21 to 22."
```

---

## Final Verification

- [ ] `pnpm test` — full suite green, including `content/shipping.test.ts`, `lib/no-emoji.test.ts`, `lib/nav.test.ts`, `lib/site-audit.test.ts`.
- [ ] `pnpm build` — clean.
- [ ] `pnpm dev`, then check by hand:
  - `/faq` — the two shipping answers and the lost-in-transit answer all read CAD; **no `$150` anywhere**.
  - `/delivery`, `/policies/shipping` — every figure labelled CAD.
  - Homepage — shipping band reads `$199 CAD`; Custy section sits between "Built for dropshipping" and the final CTA.
  - Custy links in nav, footer, and the section CTA each open the right target in a new tab.
  - `/videos` — six thumbnails, each opening its lightbox; grid reflows at `sm` and `lg`.
- [ ] `content/pages/billing.mdx` is untouched.
