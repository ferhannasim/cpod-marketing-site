import type { ImageField } from "@/content/home";

export type DemoProduct = {
  slug: string;
  name: string;
  editorUrl: string;
  image: ImageField;
};

const EDITOR_BASE = "https://product-editor-app-393012399860.us-central1.run.app/customize";

// Demo products surfaced on the homepage band and the /live-demo page. Display
// order; [0] is the default product when /live-demo has no ?product= query.
// Names are verbatim from the hosted editor's product data (including "Lengh").
// Images are one-time local pulls of the Shopify CDN _430x variants (see the
// 2026-07-22 live-demo plan for source URLs).
export const demoProducts: DemoProduct[] = [
  {
    slug: "apron-full-length-no-pockets",
    name: "Apron Full Lengh No Pockets",
    editorUrl: `${EDITOR_BASE}/11083839111204`,
    image: { src: "/images/demo/apron.jpg", width: 430, height: 538 },
  },
  {
    slug: "hoodies-70-30-cotton-polyester",
    name: "Hoodies 70/30 Cotton-Polyester 22.5 oz",
    editorUrl: `${EDITOR_BASE}/11083861360676`,
    image: { src: "/images/demo/hoodie.jpg", width: 430, height: 538 },
  },
  {
    slug: "long-sleeve-t-shirt-midweight-cotton",
    name: "Long Sleeve T-shirt Midweight Cotton 8.8 oz",
    editorUrl: `${EDITOR_BASE}/11083917918244`,
    image: { src: "/images/demo/long-sleeve-tshirt.jpg", width: 430, height: 645 },
  },
];
