import { APP_URL } from "@/lib/site";

export type ImageField = { src: string; width: number; height: number; alt?: string };

export type Cta = { label: string; href: string; external?: boolean };

export type RichBlock = {
  heading?: string;
  html: string;
  image?: ImageField;
  ctas?: Cta[];
};

export type ClosingCta = {
  title: string;
  text: string;
  cta: Cta;
  secondaryCta?: Cta;
};

// Homepage copy/images transcribed verbatim from templates/index.json (section order
// and settings) and content/raw/home.html (what's actually rendered). See
// .superpowers/sdd/task-8-report.md for the full copy-fidelity + image-source notes.
// Task 2 (homepage recomposition) trimmed the intro lead and reshaped `closing` into
// a CtaBand (see below) — see .superpowers/sdd/task-2-report.md for the copy diff.
export const home = {
  // section_KdywkE ("Powerful Product Customization for Shopify POD Stores").
  // This is the first section on the live page: the Horizon "hero" section
  // (hero_jVaWmY) is disabled in index.json and renders nothing, and this section's
  // own heading is the first real content on the page. Rendered as the page's <h1>
  // (see rich-section.tsx) even though the live source styles it as an h3-look <p>.
  // CTA label had a leading party-popper emoji in the source; stripped per no-emoji rule.
  intro: {
    heading: "Powerful Product Customization for Shopify POD Stores",
    html: `<p>Custy is a next-generation Shopify product customizer built for print-on-demand (POD) businesses. Customers design products in real time on an intuitive, interactive panel — personalizing every detail on t-shirts, hoodies, caps, and more before they order.</p>
<p>Multi-side customization across the front, back, left sleeve, and right sleeve gives customers complete creative freedom, while dynamic pricing — based on design areas, printing methods, and product variations — helps you maximize revenue without losing flexibility.</p>
<p>With support for DTG, DTF, and other modern printing methods, Custy automatically generates high-quality, print-ready files, cutting manual work and fulfillment errors. Full Shopify integration keeps the workflow smooth from customization to checkout, and every order carries its complete design data so you or your print partner can process it instantly.</p>
<p>Whether you’re launching a new POD brand or scaling an existing store, Custy improves the customer experience, drives engagement, and boosts conversion rates.</p>`,
    image: {
      src: "/images/content/custy_left_photo.jpg",
      width: 795,
      height: 857,
      alt: "",
    },
    ctas: [{ label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, external: true }],
  } as RichBlock,

  // section_VyHdx4. Previously rendered as a plain closing paragraph + large logo
  // image via RichSection; Task 2 recomposes it as the page-ending CtaBand
  // (components/lander) instead, matching the closing pattern already used on the
  // features/how-it-works pages. The logo image this block used to carry
  // (/images/logo.png) is dropped here since CtaBand has no image slot — it's
  // already shipped on every page via the header, so nothing is lost or orphaned.
  closing: {
    title: "Start with Custy",
    text: "Custy is a real-time Shopify product customizer built for print-on-demand brands. Customers design t-shirts, hoodies, caps, and more across the front, back, and sleeves, with dynamic pricing for DTG, DTF, and other print methods. Print-ready files and full Shopify integration keep order processing smooth — so every order improves the customer experience and helps convert more sales.",
    cta: { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, external: true },
    secondaryCta: { label: "View Pricing", href: "/pricing" },
  } as ClosingCta,
};
