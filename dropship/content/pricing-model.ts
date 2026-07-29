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
  {
    icon: "credit-card",
    title: "One saved card",
    text: "Add a card once, securely via Stripe. Every order charges its base cost to it — nothing else, and nothing monthly.",
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
