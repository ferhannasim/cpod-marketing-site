import type { HelpArticle } from "./types";

export const overview: HelpArticle = {
  slug: "overview",
  categorySlug: "getting-started",
  subCategorySlug: null,
  title: "Overview",
  description:
    "Welcome to Custy. Learn what the app does, what it does not do, and how to complete your first setup.",
  summary: "What Custy is, how it fits Shopify, and where to start after install.",
  readMinutes: 1,
  updatedOn: "8 September 2026",
  lead: [
    "Welcome to Custy!",
    "Whether you are starting a new custom business or want to offer customized, personalized, or configurable products on Shopify, you can do so with Custy.",
  ],
  leadLinks: [{ label: "Visit the Custy live demo to explore", href: "/live-demo" }],
  sections: [
    {
      id: "best-parts",
      paragraphs: [
        "Custy’s Shopify app is built around three strengths:",
      ],
      highlights: [
        "Product customization — shoppers design in the Design Lab on your storefront",
        "Product options — sizes, colors, sides, and print areas you control",
        "Design and printing pricing — setup fees, per-color, per-side, and quantity discounts",
      ],
    },
    {
      id: "important",
      paragraphs: [],
      callout: {
        variant: "important",
        title: "Important",
        bullets: [
          "Custy is a product customizer. Fulfillment is handled by you or your connected print / POD provider — Custy prepares print-ready design files and order details.",
          "Custy does not manage shipping, taxes, or checkout; Shopify handles all of those.",
          "You can turn existing Shopify products into customizable ones, with reusable color sets, size sets, and printing types.",
        ],
      },
    },
    {
      id: "after-install",
      paragraphs: [
        "After installing Custy and starting a plan or the 30-day trial, follow Getting Started to finish setup. The guides walk you through installations, embedding Custy on your theme, then creating a customizable product with print areas and pricing before you start selling.",
      ],
      links: [
        { label: "How to Install Custy?", href: "/help/getting-started/installations/install-custy" },
        {
          label: "How to Embed Custy on Your Store?",
          href: "/help/getting-started/app-activation/embed-custy",
        },
        {
          label: "Setting Up Your First Product",
          href: "/help/getting-started/product-setup/first-product",
        },
      ],
    },
    {
      id: "tip-demo",
      paragraphs: [],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "To see the shopper experience before you configure your own catalog, open the live demo and try the Design Lab on sample products.",
        ],
        link: { label: "Open the live demo", href: "/live-demo" },
      },
    },
  ],
};
