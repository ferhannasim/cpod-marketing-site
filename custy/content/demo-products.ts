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
// Every editorUrl carries a ?designId= so the editor opens with a finished
// design already on the product rather than a blank one, and each thumbnail is
// the proof render of that same design.
export const demoProducts: DemoProduct[] = [
  {
    slug: "apron-full-length-no-pockets",
    name: "Apron Full Lengh No Pockets",
    editorUrl: `${EDITOR_BASE}/11083839111204?designId=1a285f7e-f592-478f-87d8-3c7ce3260d3f`,
    image: { src: "/images/demo/apron.jpg", width: 430, height: 573 },
  },
  {
    slug: "hoodies-70-30-cotton-polyester",
    name: "Hoodies 70/30 Cotton-Polyester 22.5 oz",
    editorUrl: `${EDITOR_BASE}/11083861360676?designId=148f0d71-8989-4ad9-b7a8-86f19cfed984`,
    image: { src: "/images/demo/hoodie.jpg", width: 430, height: 555 },
  },
  {
    slug: "long-sleeve-t-shirt-midweight-cotton",
    name: "Long Sleeve T-shirt Midweight Cotton 8.8 oz",
    editorUrl: `${EDITOR_BASE}/11083917918244?designId=fe0ce17d-de82-47aa-8a4e-832e70cc0bb4`,
    image: { src: "/images/demo/long-sleeve-tshirt.jpg", width: 430, height: 568 },
  },
  {
    slug: "snapback-trucker-hats-6-panels",
    name: "Snapback Trucker Hats (6-panels)",
    editorUrl: `${EDITOR_BASE}/11169069563940?designId=03784721-11a1-4074-9d40-0e514c7052aa`,
    image: { src: "/images/demo/trucker-hat.webp", width: 430, height: 573 },
  },
  {
    slug: "mugs-11oz",
    name: "Mugs 11oz.",
    editorUrl: `${EDITOR_BASE}/11097607634980?designId=17746e67-52f1-4a26-94a4-87e4345683c9`,
    image: { src: "/images/demo/mug.webp", width: 430, height: 573 },
  },
  {
    slug: "business-cards-14pt",
    name: "Business cards 14pt",
    editorUrl: `${EDITOR_BASE}/11097622773796?designId=f5f1b3cb-a902-483b-8358-0b3a60c4adbc`,
    image: { src: "/images/demo/business-cards.webp", width: 430, height: 564 },
  },
];
