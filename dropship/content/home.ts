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
