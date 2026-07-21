# DropShipPOD Brand Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewire all primary CTAs to the Shopify app listing, integrate the real brand logo + favicon + OG image, apply the brand-forward navy/red redesign to the homepage and every inner page template, and add a machine-checked page-completeness audit.

**Architecture:** All changes restyle or extend existing components in place — no renames, no file moves, so the existing 91-test suite keeps its targets. New shared pieces: `lib/site.ts` (constants), `PageHero` (band used by `PageShell`, FAQ, size-chart, contact pages), `AppCta` (lander closing band). The signature visual element is the logo's red swoosh, translated into an SVG underline in the hero headline; boldness is spent there and on the navy gradient bands — everything else stays quiet.

**Tech Stack:** Existing stack (Next 15, Tailwind v4 tokens, lucide-react, Vitest + RTL). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-20-brand-refresh-design.md` (approved).

## Global Constraints

- **App listing URL (exact):** `https://apps.shopify.com/dropshippod` — referenced ONLY via `SHOPIFY_APP_URL` from `lib/site.ts`, never as a string literal in components or tests.
- **External links** (`href` starting with `http`) render `<a target="_blank" rel="noopener noreferrer">`; internal links keep `next/link`.
- **Logo source (exact):** `https://dropshippod.ca/cdn/shop/files/ChatGPT-Image-Mar-1_-2026_-03_54_51-PM.png` (1188×359 RGBA) → committed as `public/images/logo.png`. Header/footer `alt="DropShipPOD"`.
- **New tokens (exact):** `--color-ink-deep: #141f56`, `--color-brand-tint: #fdf1f3`, `--color-ink-tint: #eef1f9`. All other colors via existing tokens or Tailwind stock neutrals/amber/red-300 — no new raw hexes in components.
- **Restyle in place:** no component renames or moves; every pre-existing test must stay green (updated only where this plan says so).
- **Tone/copy:** CTA labels exactly as the spec's CTA map ("Get started", "Get the app", "Install the Shopify app", "See how it works", "Contact us"). No other copy changes (content questions stay queued).
- **Reduced motion:** every `hover:-translate-y-*` carries `motion-reduce:transform-none`.
- **A11y:** decorative SVGs/icons `aria-hidden`; the notice callout uses `role="note"`; keyboard focus states preserved.
- **Commits:** conventional commits, exactly as written per task.
- **Verification baseline:** full suite green + `pnpm build` all-static except `/api/contact` after every task.

---

### Task 1: CTA infrastructure — `lib/site.ts`, external ButtonLink, rewiring, `AppCta`

**Files:**
- Create: `lib/site.ts`, `components/app-cta.tsx`
- Modify: `components/ui/button.tsx` (external handling + `outline-dark` variant), `app/globals.css` (3 tokens), `components/header.tsx` (CTA href), `components/sections/hero.tsx` (CTA href), `components/sections/dropship-pitch.tsx` (card CTAs), `components/sections/final-cta.tsx` (labels/links), `app/(marketing)/start-your-ecommerce-brand/page.tsx` + `app/(marketing)/launch-automated-brand/page.tsx` (append AppCta)
- Test: `components/cta.test.tsx`, extend `components/ui/primitives.test.tsx`

**Interfaces:**
- Consumes: `buttonClasses`/`ButtonLink` (Task-2-of-migration primitives), `Container`.
- Produces: `SITE_NAME = "DropShipPOD"`, `TAGLINE = "Your Brand. Your Platform."`, `SHOPIFY_APP_URL = "https://apps.shopify.com/dropshippod"` from `@/lib/site`; `ButtonLink` external behavior; `buttonClasses` accepts new variant `"outline-dark"`; `AppCta()` component (no props); tokens `ink-deep`, `brand-tint`, `ink-tint` available to later tasks.

- [ ] **Step 1: Write the failing tests**

Append to `components/ui/primitives.test.tsx` inside `describe("Button", ...)`:

```tsx
  it("ButtonLink renders external links as new-tab anchors", () => {
    render(<ButtonLink href="https://example.com/x">Ext</ButtonLink>);
    const link = screen.getByRole("link", { name: "Ext" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("ButtonLink keeps internal links same-tab", () => {
    render(<ButtonLink href="/faq">Int</ButtonLink>);
    expect(screen.getByRole("link", { name: "Int" })).not.toHaveAttribute("target");
  });
  it("renders the outline-dark variant", () => {
    render(<Button variant="outline-dark">Dark</Button>);
    expect(screen.getByRole("button", { name: "Dark" }).className).toContain("border-white/30");
  });
```

Create `components/cta.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";
import { AppCta } from "./app-cta";
import HomePage from "@/app/page";
import { SHOPIFY_APP_URL } from "@/lib/site";

function expectAppLink(link: HTMLElement) {
  expect(link).toHaveAttribute("href", SHOPIFY_APP_URL);
  expect(link).toHaveAttribute("target", "_blank");
}

describe("CTA rewiring", () => {
  it("header Get started points at the Shopify app listing", () => {
    render(<Header />);
    expectAppLink(screen.getByRole("link", { name: "Get started" }));
  });
  it("hero Get started and final CTA point at the app listing", () => {
    render(<HomePage />);
    expectAppLink(screen.getByRole("link", { name: "Get started" }));
    expectAppLink(screen.getByRole("link", { name: "Install the Shopify app" }));
    expect(screen.getByRole("link", { name: "See how it works" })).toHaveAttribute("href", "/how-it-works");
  });
  it("both pitch cards offer the app plus a lander link", () => {
    render(<HomePage />);
    const appButtons = screen.getAllByRole("link", { name: "Get the app" });
    expect(appButtons).toHaveLength(2);
    appButtons.forEach(expectAppLink);
    expect(screen.getByRole("link", { name: "Learn more about Start Your Ecommerce Brand Without Tech or High Costs" })).toHaveAttribute("href", "/start-your-ecommerce-brand");
  });
  it("final CTA keeps a contact escape hatch", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: "Contact us →" })).toHaveAttribute("href", "/contact");
  });
});

describe("AppCta", () => {
  it("renders the app install button and a contact link", () => {
    render(<AppCta />);
    expectAppLink(screen.getByRole("link", { name: "Install the Shopify app" }));
    expect(screen.getByRole("link", { name: "Contact us instead →" })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test components` → Expected: FAIL — `@/lib/site` and `./app-cta` unresolved; header CTA still `/contact`.

- [ ] **Step 3: Create `lib/site.ts`**

```ts
export const SITE_NAME = "DropShipPOD";
export const TAGLINE = "Your Brand. Your Platform.";
export const SHOPIFY_APP_URL = "https://apps.shopify.com/dropshippod";
```

- [ ] **Step 4: Add tokens to `app/globals.css`** — append inside the `@theme` block:

```css
  --color-ink-deep: #141f56;
  --color-brand-tint: #fdf1f3;
  --color-ink-tint: #eef1f9;
```

- [ ] **Step 5: Update `components/ui/button.tsx`** — add the variant and external handling (full new file):

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900",
  "outline-dark": "border border-white/30 text-white hover:bg-white/10",
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
  const classes = buttonClasses(variant, className);
  if (href.startsWith("http")) {
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

- [ ] **Step 6: Rewire the four components** (minimal edits — Task 3 restyles them)

`components/header.tsx`: add `import { SHOPIFY_APP_URL } from "@/lib/site";` and change the CTA to `<ButtonLink href={SHOPIFY_APP_URL} className="ml-3 px-4 py-2">Get started</ButtonLink>`.

`components/sections/hero.tsx`: add the same import; change the primary CTA to `<ButtonLink href={SHOPIFY_APP_URL}>Get started</ButtonLink>` (secondary unchanged).

`components/sections/dropship-pitch.tsx`: add the import; replace each card's link block with:

```tsx
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ButtonLink href={SHOPIFY_APP_URL} className="px-5 py-2.5">
                  Get the app
                </ButtonLink>
                <Link
                  href={lander.href}
                  className="text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  Learn more<span className="sr-only"> about {lander.title}</span> →
                </Link>
              </div>
```

(add `import { ButtonLink } from "@/components/ui/button";` — keep the existing `Link` import).

`components/sections/final-cta.tsx` (full new file):

```tsx
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SHOPIFY_APP_URL } from "@/lib/site";

export function FinalCta() {
  return (
    <div className="bg-gradient-to-br from-ink to-ink-deep">
      <Container className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Ready to launch your brand?
          </h2>
          <p className="mt-2 max-w-xl text-zinc-300">
            Install the DropShipPOD app on your Shopify store — we&apos;ll handle printing, packing
            and shipping.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href={SHOPIFY_APP_URL}>Install the Shopify app</ButtonLink>
          <Link href="/contact" className="text-sm font-semibold text-white hover:text-zinc-200">
            Contact us →
          </Link>
        </div>
      </Container>
    </div>
  );
}
```

- [ ] **Step 7: Create `components/app-cta.tsx`** and append to both landers

```tsx
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { SHOPIFY_APP_URL } from "@/lib/site";

export function AppCta() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-ink to-ink-deep px-8 py-12 text-center">
      <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
        Ready to launch your brand?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-zinc-300">
        Install the DropShipPOD app on your Shopify store and start selling custom products printed
        in Canada.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href={SHOPIFY_APP_URL}>Install the Shopify app</ButtonLink>
        <Link href="/contact" className="text-sm font-semibold text-white hover:text-zinc-200">
          Contact us instead →
        </Link>
      </div>
    </div>
  );
}
```

In `app/(marketing)/start-your-ecommerce-brand/page.tsx` AND `app/(marketing)/launch-automated-brand/page.tsx`, add `import { AppCta } from "@/components/app-cta";` and `import { Container } from "@/components/ui/container";`, and change the return to:

```tsx
  return (
    <>
      <PageShell title="<existing title unchanged>">
        <Body />
      </PageShell>
      <Container className="pb-16">
        <AppCta />
      </Container>
    </>
  );
```

- [ ] **Step 8: Run tests, build, commit**

Run: `pnpm test` → Expected: PASS (all suites, including the new CTA tests).
Run: `pnpm build` → Expected: unchanged route table.

```bash
git add lib/site.ts components/app-cta.tsx components/cta.test.tsx components/ui/button.tsx \
  components/ui/primitives.test.tsx app/globals.css components/header.tsx components/sections/ \
  "app/(marketing)/start-your-ecommerce-brand" "app/(marketing)/launch-automated-brand"
git commit -m "feat: route all primary CTAs to the Shopify app listing"
```

---

### Task 2: Brand assets — logo, favicon, OG image, header/footer integration

**Files:**
- Create: `public/images/logo.png` (downloaded), `app/icon.png`, `app/apple-icon.png`
- Delete: `app/icon.svg`
- Modify: `components/header.tsx` (logo wordmark), `components/footer.tsx` (logo + tagline row), `app/layout.tsx` (OG/Twitter metadata)
- Test: extend `components/header.test.tsx`, `components/footer.test.tsx` (new)

**Interfaces:**
- Consumes: `TAGLINE` from `@/lib/site` (Task 1).
- Produces: `/images/logo.png` (1188×359) used by header, footer, OG image; square favicon assets.

- [ ] **Step 1: Download the logo and cut the favicon**

```bash
curl -sf "https://dropshippod.ca/cdn/shop/files/ChatGPT-Image-Mar-1_-2026_-03_54_51-PM.png" -o public/images/logo.png
file public/images/logo.png   # expect: PNG image data, 1188 x 359, 8-bit/color RGBA
# left emblem square (t-shirt / maple leaf / package mark):
sips --cropToHeightWidth 359 359 --cropOffset 0 8 public/images/logo.png --out /tmp/dsp-emblem.png
sips -z 512 512 /tmp/dsp-emblem.png --out app/icon.png
sips -z 180 180 /tmp/dsp-emblem.png --out app/apple-icon.png
git rm app/icon.svg
```

Then **visually verify** `app/icon.png` with the Read tool (it renders images): the emblem (t-shirt + red box + swoosh) should be roughly centered and uncut on its left edge. If `--cropOffset` is unsupported or the crop clips badly, fall back to keeping `app/icon.svg` (revert the `git rm`), skip the two png icons, and report the fallback — do not ship a mangled icon.

- [ ] **Step 2: Write the failing tests**

Append to `components/header.test.tsx`:

```tsx
  it("renders the brand logo image as the home link", () => {
    render(<Header />);
    const home = screen.getByRole("link", { name: "DropShipPOD" });
    expect(home).toHaveAttribute("href", "/");
    expect(home.querySelector("img")).not.toBeNull();
  });
```

Create `components/footer.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";
import { TAGLINE } from "@/lib/site";

describe("Footer", () => {
  it("shows the logo and tagline", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "DropShipPOD" })).toHaveAttribute("href", "/");
    expect(screen.getByText(TAGLINE)).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test components` → Expected: FAIL — header link's accessible name is currently the text wordmark (no img), no footer tagline.

- [ ] **Step 4: Swap the header wordmark for the logo** — in `components/header.tsx`, add `import Image from "next/image";` and replace the `Wordmark` function:

```tsx
function Wordmark() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="DropShipPOD"
        width={198}
        height={60}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
```

- [ ] **Step 5: Add the footer brand row** — in `components/footer.tsx`, add `import Image from "next/image";`, `import Link from "next/link";` (already present), `import { TAGLINE } from "@/lib/site";`, and insert as the first child inside `<Container className="py-12">`:

```tsx
        <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-zinc-200 pb-8 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="DropShipPOD" width={165} height={50} className="h-9 w-auto" />
          </Link>
          <p className="font-display text-sm font-semibold text-ink">{TAGLINE}</p>
        </div>
```

- [ ] **Step 6: Add OG/Twitter metadata** — in `app/layout.tsx`, extend the `metadata` object (keep every existing field):

```tsx
  openGraph: {
    title: "DropShipPOD — Print-on-Demand Dropshipping in Canada",
    description:
      "DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app. We print, pack and ship your custom apparel — no inventory, no tech headaches.",
    url: "https://dropshippod.ca",
    siteName: "DropShipPOD",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1188,
        height: 359,
        alt: "DropShipPOD — Your Brand. Your Platform.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
```

- [ ] **Step 7: Run tests, build, verify head tags, commit**

Run: `pnpm test` → Expected: PASS.
Run: `pnpm build` → Expected: route table gains `/icon.png` + `/apple-icon.png` (and `/icon.svg` gone).
Run: `pnpm start &` then
`curl -s http://localhost:3000/ | grep -oE 'property="og:image"[^>]*|rel="icon"[^>]*|name="twitter:card"[^>]*' ; kill %1`
Expected: og:image ending `/images/logo.png`, icon link ending `/icon.png…`, twitter card `summary_large_image`.

```bash
git add public/images/logo.png app/icon.png app/apple-icon.png app/layout.tsx \
  components/header.tsx components/header.test.tsx components/footer.tsx components/footer.test.tsx
git rm --cached app/icon.svg 2>/dev/null; git add -u
git commit -m "feat: integrate brand logo, emblem favicon, and OG share image"
```

---
### Task 3: Homepage restyle — navy hero with swoosh signature, section treatments

**Files:**
- Modify: `components/sections/hero.tsx` (full rewrite), `components/step-list.tsx`, `components/sections/printing-methods.tsx`, `components/logo-wall.tsx`, `components/testimonial-list.tsx`, `components/sections/shipping-band.tsx`, `components/ui/section.tsx` (`SectionHeading` dark mode), `components/sections/dropship-pitch.tsx` (navy band)
- Test: extend `app/page.test.tsx`; existing component tests must keep passing untouched

**Interfaces:**
- Consumes: tokens `ink-deep`/`brand-tint`/`ink-tint`, `SHOPIFY_APP_URL`, `outline-dark` variant (Task 1).
- Produces: `SectionHeading` gains optional `dark?: boolean` (default false) — later tasks may use it.

- [ ] **Step 1: Write the failing test additions** — append to `app/page.test.tsx`:

```tsx
  it("shows the trust markers in the hero", () => {
    render(<HomePage />);
    for (const marker of ["Printed in Canada", "No minimums", "Ground shipping in 1–5 days"]) {
      expect(screen.getByText(marker)).toBeInTheDocument();
    }
  });
```

Run: `pnpm test app` → Expected: FAIL (markers don't exist yet).

- [ ] **Step 2: Rewrite `components/sections/hero.tsx`** (full file — navy gradient, swoosh signature, trust markers, framed video, captioned strip):

```tsx
import { VideoEmbed } from "@/components/video-embed";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuredVideo, moreVideos } from "@/content/videos";
import { SHOPIFY_APP_URL } from "@/lib/site";

const trustMarkers = ["Printed in Canada", "No minimums", "Ground shipping in 1–5 days"];

function SwooshUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-3 w-full text-brand"
    >
      <path
        d="M2 11 C 60 2, 160 2, 218 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-ink to-ink-deep text-white">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-red-300">
            Print-on-demand dropshipping · Canada
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
            Launch your{" "}
            <span className="relative inline-block">
              print-on-demand brand.
              <SwooshUnderline />
            </span>{" "}
            We print, pack &amp; ship.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-300">
            DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app — no
            inventory, no tech headaches, wholesale pricing on t-shirts, hoodies, DTF and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={SHOPIFY_APP_URL}>Get started</ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline-dark">
              See how it works
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {trustMarkers.map((marker) => (
              <li key={marker} className="flex items-center gap-2 text-sm text-zinc-300">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                {marker}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/20">
          <VideoEmbed id={featuredVideo.id} title={featuredVideo.title} priority />
        </div>
      </Container>
      <Container className="pb-16 sm:pb-20">
        <h2 className="sr-only">More from DropShipPOD</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {moreVideos.map((video) => (
            <li key={video.id} className="group">
              <VideoEmbed id={video.id} title={video.title} />
              <p className="mt-2 line-clamp-2 text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-200">
                {video.title}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
```

- [ ] **Step 3: `SectionHeading` dark mode** — in `components/ui/section.tsx`, replace `SectionHeading`:

```tsx
export function SectionHeading({
  eyebrow,
  title,
  className,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wider",
            dark ? "text-red-300" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
```

- [ ] **Step 4: Section treatments** (each is the full new version of the changed part)

`components/step-list.tsx` — the `<li>` becomes:

```tsx
        <li
          key={step.label}
          className="rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg motion-reduce:transform-none"
        >
```
(number chip changes `bg-ink` → `bg-brand`; everything else unchanged.)

`components/sections/printing-methods.tsx` — add `import { Droplets, Film, Shirt } from "lucide-react";`; extend each entry in `methods` with an `icon` field (`Shirt` for DTG, `Film` for DTF, `Droplets` for Sublimation, typed `icon: typeof Shirt`); render inside each card, above the `<h3>`:

```tsx
            <Card
              key={method.name}
              className="transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-md motion-reduce:transform-none"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tint text-brand">
                <method.icon aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">{method.name}</h3>
```

`components/logo-wall.tsx` — tiles with grayscale→color hover (full new list item):

```tsx
      {logos.map((logo) => (
        <li
          key={logo.name}
          className="group flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-4"
        >
          <span className="relative h-12 w-32 opacity-75 grayscale transition group-hover:opacity-100 group-hover:grayscale-0">
            <Image src={logo.src} alt={logo.name} fill sizes="128px" className="object-contain" />
          </span>
        </li>
      ))}
```

`components/testimonial-list.tsx` — card gains the red quote glyph and curly quotes (fixes a logged minor):

```tsx
        <Card key={testimonial.name} className="flex flex-col gap-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none">
          <p aria-hidden className="font-display text-5xl leading-none text-brand">“</p>
          <Stars />
          <blockquote className="text-sm leading-relaxed text-zinc-600">“{testimonial.quote}”</blockquote>
          <p className="mt-auto font-semibold text-ink">{testimonial.name}</p>
        </Card>
```

`components/sections/shipping-band.tsx` (full new file):

```tsx
import { Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function ShippingBand() {
  return (
    <Section id="shipping">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-zinc-200 bg-surface p-8 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink-tint text-ink">
              <Truck aria-hidden className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold text-ink">
                Free shipping on all orders over $199
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Ground shipping in 1–5 business days across Canada · Express in 1–2 · Optional
                pick-up at our warehouse.
              </p>
            </div>
          </div>
          <ButtonLink href="/delivery" variant="secondary">
            Delivery details
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
```

`components/sections/dropship-pitch.tsx` — the section wrapper and heading become:

```tsx
    <Section id="dropship" className="bg-gradient-to-br from-ink to-ink-deep">
      <Container>
        <SectionHeading dark eyebrow="Dropship + Shopify app" title="Built for dropshipping" />
```
(cards from Task 1 Step 6 stay as-is — white `Card` on the navy band.)

- [ ] **Step 5: Run tests and build**

Run: `pnpm test` → Expected: PASS — including the untouched order-sensitive section test, media tests, and Task 1 CTA tests.
Run: `pnpm build` → Expected: unchanged route table.

- [ ] **Step 6: Commit**

```bash
git add components/ app/page.test.tsx
git commit -m "feat: brand-forward homepage restyle with navy hero and swoosh signature"
```

---

### Task 4: Shells + inner-page treatments — `PageHero`, `PageShell`, `Prose`, per-template polish

**Files:**
- Create: `components/page-hero.tsx`
- Modify: `components/page-shell.tsx`, `components/ui/prose.tsx`, `components/faq-page.tsx`, `components/ui/accordion.tsx` (hover polish), `app/(marketing)/size-charts/page.tsx`, `app/(marketing)/size-charts/[handle]/page.tsx`, `components/size-chart-table.tsx` (striped rows), `app/(marketing)/contact/page.tsx`, `app/not-found.tsx`, and the 12 content/policy route files (eyebrow/alert props per the table below)
- Test: `components/page-shell.test.tsx` (extended), `components/page-hero.test.tsx` (new)

**Interfaces:**
- Consumes: tokens, `cn`, `Container`, `Prose`, `buttonClasses`.
- Produces: `PageHero({ eyebrow?, title, lede?, variant? })` with `variant?: "default" | "quiet"`; `PageShell({ eyebrow?, title, lede?, alert?, variant?, children })` — same variants, `alert` renders an amber `role="note"` strip. Route files pass these props.

- [ ] **Step 1: Write the failing tests**

`components/page-hero.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "./page-hero";

describe("PageHero", () => {
  it("renders eyebrow, title, and lede", () => {
    render(<PageHero eyebrow="FAQs" title="DTF FAQ" lede="Answers about transfers." />);
    expect(screen.getByText("FAQs")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "DTF FAQ" })).toBeInTheDocument();
    expect(screen.getByText("Answers about transfers.")).toBeInTheDocument();
  });
  it("quiet variant uses the smaller title scale", () => {
    render(<PageHero title="Privacy Policy" variant="quiet" />);
    expect(screen.getByRole("heading", { level: 1 }).className).toContain("text-3xl");
  });
});
```

Append to `components/page-shell.test.tsx`:

```tsx
  it("renders an eyebrow and an alert note when provided", () => {
    render(
      <PageShell eyebrow="Please read" title="Printing Notice" alert="Read before ordering.">
        <p>Body</p>
      </PageShell>,
    );
    expect(screen.getByText("Please read")).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent("Read before ordering.");
  });
```

Run: `pnpm test components` → Expected: FAIL — `./page-hero` unresolved; PageShell has no eyebrow/alert.

- [ ] **Step 2: Create `components/page-hero.tsx`**

```tsx
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  lede,
  variant = "default",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  variant?: "default" | "quiet";
}) {
  return (
    <div className="border-b border-zinc-200 bg-gradient-to-b from-ink-tint to-white">
      <Container className={variant === "quiet" ? "py-10" : "py-12 sm:py-16"}>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
        ) : null}
        <h1
          className={cn(
            "mt-2 font-display font-bold tracking-tight text-ink",
            variant === "quiet" ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl",
          )}
        >
          {title}
        </h1>
        {lede ? <p className="mt-4 max-w-2xl text-lg text-zinc-600">{lede}</p> : null}
      </Container>
    </div>
  );
}
```

- [ ] **Step 3: Rebuild `components/page-shell.tsx` on top of it** (full new file)

```tsx
import { TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { PageHero } from "@/components/page-hero";

export function PageShell({
  eyebrow,
  title,
  lede,
  alert,
  variant = "default",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  alert?: string;
  variant?: "default" | "quiet";
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} variant={variant} />
      {alert ? (
        <Container className="mt-8">
          <div
            role="note"
            className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {alert}
          </div>
        </Container>
      ) : null}
      <Container className="py-10 sm:py-12">
        <Prose>{children}</Prose>
      </Container>
    </>
  );
}
```

- [ ] **Step 4: Upgrade `components/ui/prose.tsx`** (full new file)

```tsx
import { cn } from "@/lib/utils";

export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none",
        "prose-headings:font-display prose-headings:text-ink",
        "prose-a:font-medium prose-a:text-brand hover:prose-a:text-brand-dark",
        "prose-img:rounded-xl prose-img:border prose-img:border-zinc-200",
        "prose-blockquote:border-l-brand",
        "prose-th:bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Apply eyebrows/alerts to the 14 PageShell routes.** Each route file's `<PageShell title=...>` gains props from this table (titles unchanged; this table is the complete prop set):

| Route file | `eyebrow` | `variant` | `alert` |
|---|---|---|---|
| `how-it-works` | Getting started | — | — |
| `about` | Company | — | — |
| `delivery` | Help & info | — | — |
| `billing` | Help & info | — | — |
| `measuring` | Sizing | — | — |
| `start-your-ecommerce-brand` | Start a brand | — | — |
| `launch-automated-brand` | Start a brand | — | — |
| `printing-notice` | Please read | — | Please read this notice in full before placing an order — it affects how your prints will look. |
| `sublimation-printing-notice` | Please read | — | Sublimation has specific requirements — please read this notice before ordering. |
| `artwork-approval` | Please read | — | Orders only go to production after you approve the mockup. |
| `policies/privacy` | Legal | quiet | — |
| `policies/terms` | Legal | quiet | — |
| `policies/refund` | Legal | quiet | — |
| `policies/shipping` | Legal | quiet | — |

- [ ] **Step 6: FAQ, size charts, contact, 404 treatments**

`components/faq-page.tsx` — replace the title/lede block with `<PageHero eyebrow="FAQs" title={title} lede={lede} />` (move the accordion + related sections into a following `<Container className="py-10 sm:py-12">`); related links become pill buttons:

```tsx
              <Link key={link.href} href={link.href} className={buttonClasses("outline", "px-4 py-2 text-xs")}>
                {link.label}
              </Link>
```
(import `buttonClasses` from `@/components/ui/button`; drop the old text-link classes.)

`components/ui/accordion.tsx` — trigger gains `rounded-lg px-3 -mx-3 hover:bg-surface transition-colors` alongside its existing classes.

`app/(marketing)/size-charts/page.tsx` — replace the `<h1>`/lede block with `<PageHero eyebrow="Sizing" title="Size Charts" lede={...same text as today, as a plain string...} />` and move the brand sections into a `<Container className="py-10">`; the measuring link moves into the first section's intro line: add below PageHero inside the container `<p className="text-sm text-zinc-600">Not sure how to measure? <Link href="/measuring" className="font-medium text-brand hover:text-brand-dark">Read the measuring guide</Link>.</p>`. Tile links gain `hover:border-brand/50 hover:shadow-sm transition-all` and a per-brand count in the `<h2>`: `{brand} <span className="ml-1 text-sm font-normal text-zinc-500">({charts.length})</span>`.

`app/(marketing)/size-charts/[handle]/page.tsx` — replace breadcrumb+h1 block with `<PageHero eyebrow="Sizing" title={`${chart.brand} ${chart.model} Size Chart`} />` and a following `<Container className="py-10">` holding the back-link, table, and measuring note (unchanged text).

`components/size-chart-table.tsx` — `<tbody>` rows gain zebra striping: `<tr key={rowIndex} className="odd:bg-white even:bg-surface/60">`.

`app/(marketing)/contact/page.tsx` — replace the `<h1>` with `<PageHero eyebrow="Support" title="Contact Us" lede="Questions, quotes, and order support — we answer fast." />`; wrap the two columns in `<Container className="py-10 sm:py-12">`; the form column gets `rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm`, the info column `rounded-2xl bg-surface p-6`.

`app/not-found.tsx` — full new file (navy treatment matching FinalCta):

```tsx
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-br from-ink to-ink-deep">
      <Container className="py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-300">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-300">
          The page you&apos;re looking for doesn&apos;t exist — it may have moved when we rebuilt
          the site.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="outline-dark">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
```

- [ ] **Step 7: Run tests and build**

Run: `pnpm test` → Expected: PASS — page-shell/page-hero/faq/size-chart/contact suites all green (the FAQ and size-chart tests query by role/text, which survives the wrapper changes).
Run: `pnpm build` → Expected: all routes still static.

- [ ] **Step 8: Commit**

```bash
git add components/ app/
git commit -m "feat: page-hero shells and per-template polish across all inner pages"
```

---

### Task 5: Completeness audit + final verification

**Files:**
- Create: `lib/site-audit.test.ts`
- Test: the audit suite itself + full-suite/build verification + manual old-site sweep recorded in the report

**Interfaces:**
- Consumes: `STATIC_ROUTES`, `primaryNav`/`footerColumns`/`isGroup`, `getAllSizeCharts`, `redirectList` (all existing exports).
- Produces: a permanent regression gate: missing page files, orphaned routes, or nav/route drift fail CI from now on.

- [ ] **Step 1: Write the audit suite (it should PASS immediately — it is an audit, not TDD; a failure means it found a real gap: fix the gap, not the test)**

`lib/site-audit.test.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { STATIC_ROUTES } from "./routes";
import { footerColumns, isGroup, primaryNav } from "./nav";
import { getAllSizeCharts } from "./size-charts";
import { redirectList } from "./redirects";

function pageFileExists(route: string): boolean {
  const rel = route === "/" ? "" : route.slice(1);
  const candidates = [
    path.join(process.cwd(), "app", rel, "page.tsx"),
    path.join(process.cwd(), "app", "(marketing)", rel, "page.tsx"),
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

const allNavLinks = [
  ...primaryNav.flatMap((entry) => (isGroup(entry) ? entry.links : [entry])),
  ...footerColumns.flatMap((column) => column.links),
];

describe("site audit", () => {
  it("matches the migration inventory: 21 static routes and 47 size charts", () => {
    expect(STATIC_ROUTES).toHaveLength(21);
    expect(getAllSizeCharts()).toHaveLength(47);
  });

  it("every static route has a page file on disk", () => {
    for (const route of STATIC_ROUTES) {
      expect(pageFileExists(route), `missing page for ${route}`).toBe(true);
    }
  });

  it("no orphan routes: every route is linked from nav or footer (or is the homepage)", () => {
    const linked = new Set(["/", ...allNavLinks.map((link) => link.href)]);
    for (const route of STATIC_ROUTES) {
      expect(linked.has(route), `orphaned route ${route}`).toBe(true);
    }
  });

  it("every nav and footer href is a known static route", () => {
    const known = new Set(STATIC_ROUTES);
    for (const link of allNavLinks) {
      expect(known.has(link.href), `nav link to unknown route ${link.href}`).toBe(true);
    }
  });

  it("every static redirect destination is a known route", () => {
    const known = new Set(STATIC_ROUTES);
    for (const redirect of redirectList) {
      if (!redirect.destination.includes(":")) {
        expect(known.has(redirect.destination), redirect.destination).toBe(true);
      }
    }
  });
});
```

Run: `pnpm test lib` → Expected: PASS. If any assertion fails, a real gap exists — fix the gap (create the missing page / add the missing nav link) and record what you fixed in your report.

- [ ] **Step 2: One-time old-site sweep** — confirm all 64 old pages are handled:

```bash
curl -s "https://dropshippod.ca/sitemap.xml" | grep -o 'https://[^<]*sitemap_pages[^<]*' | sed 's/&amp;/\&/g' | head -1
# fetch THAT url:
curl -s "<pages-sitemap-url>" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g;s|https://dropshippod.ca||' > /tmp/old-pages.txt
wc -l /tmp/old-pages.txt   # expect 64
while read -r p; do
  d=$(python3 -c "import urllib.parse,sys;print(urllib.parse.unquote(sys.argv[1]))" "$p")
  if grep -qF "\"$d\"" lib/redirects.ts || grep -qF "\"${d#/pages}\"" lib/routes.ts; then echo "OK   $d";
  elif [[ "$d" == /pages/size-chart-* ]]; then echo "OK   $d (pattern redirect)";
  else echo "MISS $d"; fi
done < /tmp/old-pages.txt
```

Expected: zero `MISS` lines (every old page is either redirected or pattern-covered). Paste the full OK/MISS table into your report. Any `MISS` is a blocking gap: add the redirect (and test) before proceeding.

- [ ] **Step 3: Full verification**

```bash
pnpm test    # all suites green (existing + CTA + brand + audit)
pnpm build   # all static except /api/contact; icon routes present
grep -rE "cdn.shopify.com|myshopify.com|shopify://" app/ components/ lib/ content/pages/ content/faqs/ content/*.ts && echo LEAK || echo CLEAN   # CLEAN
grep -rn "apps.shopify.com/dropshippod" app/ components/ | grep -v "lib/site" && echo "LITERAL-URL LEAK" || echo CLEAN   # CLEAN (constant-only usage)
```

- [ ] **Step 4: Commit**

```bash
git add lib/site-audit.test.ts
git commit -m "test: add site completeness audit (routes, orphans, nav integrity)"
```

---

## Self-Review (performed while writing this plan)

- **Spec coverage:** §3 CTA map → Task 1 (every row, exact labels, constant-only URL enforced by Task 5's grep); §4 logo/favicon/OG → Task 2 (exact source URL, sips crop with visual-verify + fallback); §5 tokens → Task 1 Step 4; §6 treatment matrix → Task 3 (homepage rows) + Task 4 (shells, eyebrow/alert table, FAQ/size/contact/policies/404); §7 audit → Task 5 (all five checks; manual sweep scripted with blocking MISS rule); §8 testing → each task's test steps.
- **Placeholder scan:** none — the only executor-judgment step is the favicon crop quality check, which has an explicit fallback path.
- **Type consistency:** `SHOPIFY_APP_URL`/`TAGLINE` (T1) match usage in T2–T5; `ButtonVariant` gains `outline-dark` (T1) before T3/T4 use it; `SectionHeading.dark` defined T3, used only T3; `PageHero`/`PageShell` props (T4) match the route table and tests; audit imports are all existing exports verified against the codebase.

---

## Addendum (owner punch list, same execution rules)

### Task 6: Wider container + measuring image sizing

**Files:**
- Modify: `components/ui/container.tsx`, `components/header.tsx` (its own width wrapper), `components/ui/primitives.test.tsx` (width assertion), `components/page-shell.tsx` (`proseClassName` passthrough), `app/(marketing)/measuring/page.tsx`

**Interfaces:**
- Produces: site content width becomes `max-w-7xl`; `PageShell` gains `proseClassName?: string` forwarded to `Prose`.

- [ ] **Step 1: Update the width test first** — in `components/ui/primitives.test.tsx`, change the Container assertion to `expect(...).toContain("max-w-7xl")`. Run `pnpm test components` → FAIL.
- [ ] **Step 2: Implement** — `components/ui/container.tsx`: `max-w-6xl` → `max-w-7xl`. `components/header.tsx`: the header's inner `div` class `max-w-6xl` → `max-w-7xl` (one occurrence). Run tests → PASS.
- [ ] **Step 3: `PageShell` passthrough** — add `proseClassName?: string` to props and render `<Prose className={proseClassName}>{children}</Prose>`. Append a test to `components/page-shell.test.tsx`:

```tsx
  it("forwards proseClassName to the prose wrapper", () => {
    render(
      <PageShell title="T" proseClassName="prose-img:max-h-52">
        <p>x</p>
      </PageShell>,
    );
    expect(document.querySelector(".prose-img\\:max-h-52")).not.toBeNull();
  });
```

(RED first, then implement.)
- [ ] **Step 4: Measuring page** — `app/(marketing)/measuring/page.tsx`: add `proseClassName="prose-img:max-h-52 prose-img:w-auto"` to its `PageShell`.
- [ ] **Step 5: Verify + commit** — full `pnpm test` pristine; `pnpm build` green.

```bash
git add components/ "app/(marketing)/measuring"
git commit -m "feat: widen site container to 7xl; compact measuring images"
```

### Task 7: Video modal

**Files:**
- Modify: `components/video-embed.tsx` (full rewrite below), `components/media.test.tsx` (facade tests updated), `package.json` (`pnpm add @radix-ui/react-dialog`)

**Interfaces:**
- `VideoEmbed({ id, title, priority? })` signature unchanged; clicking the poster now opens a modal (Radix Dialog) that plays the video; closing stops it (iframe unmounts).

- [ ] **Step 1: Update the two facade tests** in `components/media.test.tsx` (replace the existing `VideoEmbed` describe body):

```tsx
  it("renders a poster button and no dialog before click", () => {
    render(<VideoEmbed id="Hz8PK6i8ZsE" title="Intro" />);
    expect(screen.getByRole("button", { name: "Play video: Intro" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("opens a modal with the playing video on click, and closes it", () => {
    render(<VideoEmbed id="Hz8PK6i8ZsE" title="Intro" />);
    fireEvent.click(screen.getByRole("button", { name: "Play video: Intro" }));
    const dialog = screen.getByRole("dialog");
    const iframe = dialog.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("youtube-nocookie.com/embed/Hz8PK6i8ZsE");
    expect(iframe?.getAttribute("title")).toBe("Intro");
    fireEvent.click(screen.getByRole("button", { name: "Close video" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
```

Run → FAIL. Then `pnpm add @radix-ui/react-dialog`.

- [ ] **Step 2: Rewrite `components/video-embed.tsx`** (full file):

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";

export function VideoEmbed({ id, title, priority = false }: { id: string; title: string; priority?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          className="group relative block aspect-video w-full overflow-hidden rounded-xl"
        >
          <Image
            src={`/images/videos/${id}.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/30">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-lg">
              <Play aria-hidden className="h-7 w-7 translate-x-0.5" fill="currentColor" />
            </span>
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,64rem)] -translate-x-1/2 -translate-y-1/2 focus:outline-none">
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Close
            aria-label="Close video"
            className="absolute -top-12 right-0 rounded-full p-2 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X aria-hidden className="h-7 w-7" />
          </Dialog.Close>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
            {open ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

- [ ] **Step 3: Verify + commit** — full `pnpm test` pristine (homepage 6-facade count test unaffected); `pnpm build`.

```bash
git add components/video-embed.tsx components/media.test.tsx package.json pnpm-lock.yaml
git commit -m "feat: play videos in an accessible modal instead of inline swap"
```

### Task 8: how-it-works redesign (re-authored, owner-approved)

**Files:**
- Rewrite: `app/(marketing)/how-it-works/page.tsx` (structured TSX page below — no longer imports the MDX body)
- Delete: `content/pages/how-it-works.mdx`
- Test: extend `app/page.test.tsx`? No — new `app/(marketing)/how-it-works/page.test.tsx`

**Notes:** The owner asked for more content and better design on this page; that authorizes re-authoring (and retires the stale "Click add to cart" copy — note this resolves a queued content question). The dated `steps.png` screenshot is dropped.

- [ ] **Step 1: Failing test** — `app/(marketing)/how-it-works/page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { SHOPIFY_APP_URL } from "@/lib/site";

describe("How it works page", () => {
  it("renders the five steps as an ordered timeline", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1, name: "How It Works" })).toBeInTheDocument();
    const steps = screen.getAllByRole("listitem").filter((li) => li.dataset.step);
    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveTextContent("Pick your products");
    expect(steps[4]).toHaveTextContent("We print, pack & ship");
  });
  it("links to the app and support resources", () => {
    render(<Page />);
    expect(screen.getByRole("link", { name: "Install the Shopify app" })).toHaveAttribute("href", SHOPIFY_APP_URL);
    expect(screen.getByRole("link", { name: "Delivery speed" })).toHaveAttribute("href", "/delivery");
  });
});
```

Run → FAIL.

- [ ] **Step 2: Rewrite `app/(marketing)/how-it-works/page.tsx`** (full file; then `git rm content/pages/how-it-works.mdx`):

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { AppCta } from "@/components/app-cta";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "How It Works",
  description: "The five steps from blank product to shipped order with DropShipPOD.",
};

const steps = [
  {
    label: "Pick your products",
    detail:
      "Browse our catalog of blanks from Gildan, Bella + Canvas, Comfort Colors, American Apparel and more — t-shirts, hoodies, sweatshirts, caps and drinkware, all stocked in Canada.",
  },
  {
    label: "Choose colors and sizes",
    detail:
      "Pick the colorways that fit your brand and the size range you want to offer. Check the size charts to make sure every product fits the way your customers expect.",
  },
  {
    label: "Upload your design",
    detail:
      "Send print-ready artwork or choose from our design library. Every file goes through artwork and mockup approval before it prints, so nothing ships that you haven't seen.",
  },
  {
    label: "Connect your store — or order direct",
    detail:
      "Install the DropShipPOD Shopify app and orders flow straight to production automatically. No store yet? Order directly for events, teams and one-off runs.",
  },
  {
    label: "We print, pack & ship",
    detail:
      "Your order is produced in Canada with DTG, DTF or sublimation, then packed and shipped to your customer — ground delivery in 1–5 business days, express in 1–2.",
  },
];

const resources = [
  { label: "Delivery speed", href: "/delivery" },
  { label: "Artwork & mockup approval", href: "/artwork-approval" },
  { label: "Size charts", href: "/size-charts" },
  { label: "Printing FAQs", href: "/faq" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Getting started"
        title="How It Works"
        lede="Five steps from blank product to shipped order — no inventory, no equipment, no tech headaches."
      />
      <Container className="py-12 sm:py-16">
        <ol className="relative max-w-3xl space-y-10 border-l-2 border-ink-tint pl-8">
          {steps.map((step, index) => (
            <li key={step.label} data-step={index + 1} className="relative">
              <span
                aria-hidden
                className="absolute -left-[3.05rem] grid h-9 w-9 place-items-center rounded-full bg-brand font-display text-sm font-bold text-white ring-4 ring-white"
              >
                {index + 1}
              </span>
              <h2 className="font-display text-xl font-bold text-ink">{step.label}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-zinc-600">{step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-sm text-zinc-500">
          If you run into any difficulty at any step, give us a call — our friendly staff is always
          eager and ready to help.
        </p>
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-ink">Good to know</h2>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {resources.map((resource) => (
              <li key={resource.href}>
                <Link
                  href={resource.href}
                  className="text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  {resource.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12">
          <AppCta />
        </div>
      </Container>
    </>
  );
}
```

- [ ] **Step 3: Verify + commit** — full `pnpm test` pristine; `pnpm build` (route still static; no missing-MDX import errors).

```bash
git add "app/(marketing)/how-it-works" && git rm -q content/pages/how-it-works.mdx
git commit -m "feat: redesign how-it-works as a rich timeline page"
```

### Task 9: Emoji sweep + guard

**Files:**
- Modify: `content/pages/artwork-approval.mdx`, `content/pages/policies/refund.mdx`, `content/pages/policies/shipping.mdx`, `content/pages/printing-notice.mdx`, `content/pages/sublimation-printing-notice.mdx`, `content/faqs/dtf.tsx`, `content/faqs/general.tsx`, `content/faqs/sublimation.tsx`
- Create: `lib/no-emoji.test.ts`

**Rules:** delete each pictographic emoji plus any orphaned adjacent space/separator; never delete words; where an emoji served as a list bullet marker (e.g. `✅ item` / `🔹 item`), the text keeps its list structure without the glyph. Allowlist: `©`, `®`, `™` (typography, not emoji). Do NOT touch `content/raw/` (frozen record) or `lib/redirects.ts` (emoji URL sources are addresses).

- [ ] **Step 1: Write the guard test** — `lib/no-emoji.test.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOTS = ["content/pages", "content/faqs", "components", "app"];
const ALLOWED = new Set(["©", "®", "™"]);
const EMOJI = /\p{Extended_Pictographic}/gu;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(mdx|tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe("no emoji in rendered copy", () => {
  it("finds zero pictographic characters outside the allowlist", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(path.join(process.cwd(), root))) {
        const text = fs.readFileSync(file, "utf8");
        for (const match of text.match(EMOJI) ?? []) {
          if (!ALLOWED.has(match)) offenders.push(`${file}: ${match}`);
        }
      }
    }
    expect(offenders, offenders.join("\n")).toHaveLength(0);
  });
});
```

Run `pnpm test lib` → FAIL listing every current emoji (8 files — the RED output is your work list).

- [ ] **Step 2: Sweep the 8 files** per the rules until the guard passes. Spot-check meaning survived (e.g. "🇨🇦 Why Choose DropShipPOD?" → "Why Choose DropShipPOD?"; "✅ Yes —" → "Yes —").
- [ ] **Step 3: Verify + commit** — full `pnpm test` pristine (FAQ uniqueness/count tests still green); `pnpm build`.

```bash
git add content/ lib/no-emoji.test.ts
git commit -m "content: remove pictographic emoji from copy; add guard test"
```
