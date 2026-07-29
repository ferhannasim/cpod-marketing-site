import type { CardItem } from "@/components/lander";
import { SHOPIFY_APP_URL } from "@/lib/site";

export const featuresHero = {
  eyebrow: "Inside the Shopify app",
  title: "Everything you need to run POD dropshipping",
  lead: "DropShipPOD lives inside your Shopify admin: import products, control your margin, and let orders run themselves.",
  ctas: [{ label: "Install the Shopify app", href: SHOPIFY_APP_URL }],
};

export const featureCards: CardItem[] = [
  {
    icon: "download",
    title: "Catalog import & markup",
    text: "Sync the supplier catalog into your admin, pick products, and set a markup per product. Retail price is always base cost plus your markup.",
  },
  {
    icon: "upload",
    title: "Bulk publish",
    text: "Publish selected products to your storefront in one action — variants, images and options included. Publishing is blocked until a markup is set, so nothing ships at cost.",
  },
  {
    icon: "zap",
    title: "Automatic fulfillment",
    text: "On payment, the order is charged to your saved card and forwarded to production automatically. The fastest route from sale to press.",
  },
  {
    icon: "eye",
    title: "Manual review mode",
    text: "Prefer a checkpoint? Hold dropship orders for review and place each one deliberately. Your card is only charged when you place the order.",
  },
  {
    icon: "chart-column",
    title: "Per-order profit view",
    text: "Every dropship order shows the customer total, production cost and your profit — with shipping included — plus a status timeline.",
  },
  {
    icon: "truck",
    title: "Tracking sync",
    text: "When production ships, the tracking number lands on the Shopify order automatically and your customer gets notified by your store.",
  },
  {
    icon: "refresh",
    title: "Real-time inventory",
    text: "Supplier stock levels update your listings in real time, and product changes propagate so you never sell a retired blank.",
  },
  {
    icon: "credit-card",
    title: "Saved-card payments",
    text: "Add a card once, securely via Stripe. Production is charged per order — there is no subscription and no monthly platform fee.",
  },
];

export const orderFlow = [
  { number: 1, title: "A customer buys from your store", text: "Checkout happens on your Shopify storefront at your retail price." },
  { number: 2, title: "The order reaches DropShipPOD", text: "The paid order creates a dropship order in the app, automatically or after your review." },
  { number: 3, title: "Production is charged and starts", text: "Your saved card is charged the base cost and the order is forwarded to the print floor." },
  { number: 4, title: "Printed, packed and shipped", text: "Your product is produced and shipped straight to your customer." },
  { number: 5, title: "Tracking flows back", text: "The tracking number posts to the Shopify order, and your profit is recorded on the order sheet." },
];

export const featuresCta = {
  title: "See it in your own admin",
  text: "Install the app, import a product, and watch an order run end to end. You only pay when a customer orders.",
  cta: { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
  secondaryCta: { label: "How pricing works", href: "/pricing" },
};
