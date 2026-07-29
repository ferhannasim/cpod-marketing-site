import type { CardItem, CtaLink, StepItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export type DesignLabHero = {
  eyebrow: string;
  title: string;
  lead: string[];
  ctas: CtaLink[];
  highlight: { title: string; items: string[] };
};

export type DesignLabCta = {
  title: string;
  text: string;
  cta: CtaLink;
  secondaryCta: CtaLink;
};

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
} satisfies DesignLabHero;

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
  cta: { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" },
  secondaryCta: { label: "See how it works", href: "/how-it-works", variant: "secondary" },
} satisfies DesignLabCta;
