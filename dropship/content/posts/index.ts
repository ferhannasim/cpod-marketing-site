import DtfVsDtgBody from "./dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products.mdx";
import MarkupPricingBody from "./how-markup-pricing-works-in-print-on-demand-dropshipping.mdx";
import CanadianBrandBody from "./how-to-launch-a-canadian-print-on-demand-brand-on-shopify.mdx";
import FulfillmentModesBody from "./automatic-vs-manual-fulfillment-which-mode-fits-your-store.mdx";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  Body: React.ComponentType;
};

const allPosts: Post[] = [
  {
    slug: "dtf-vs-dtg-vs-sublimation-which-print-method-fits-your-products",
    title: "DTF vs DTG vs Sublimation: Which Print Method Fits Your Products?",
    description:
      "The print method decides which fabrics you can sell, how prints feel, and how long they last. Here's how to choose.",
    date: "2026-07-29",
    Body: DtfVsDtgBody,
  },
  {
    slug: "how-markup-pricing-works-in-print-on-demand-dropshipping",
    title: "How Markup Pricing Works in Print-on-Demand Dropshipping",
    description:
      "Retail price is base cost plus your markup — but choosing the right markup is where brands are made.",
    date: "2026-07-29",
    Body: MarkupPricingBody,
  },
  {
    slug: "how-to-launch-a-canadian-print-on-demand-brand-on-shopify",
    title: "How to Launch a Canadian Print-on-Demand Brand on Shopify",
    description:
      "Produce in Canada, ship domestically, and keep delivery times your customers can trust.",
    date: "2026-07-29",
    Body: CanadianBrandBody,
  },
  {
    slug: "automatic-vs-manual-fulfillment-which-mode-fits-your-store",
    title: "Automatic vs Manual Fulfillment: Which Mode Fits Your Store?",
    description:
      "Speed or control — DropShipPOD gives you both; here's how to decide.",
    date: "2026-07-29",
    Body: FulfillmentModesBody,
  },
];

export const posts: Post[] = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
