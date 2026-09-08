import type { HelpArticle } from "./types";

export const overview: HelpArticle = {
  slug: "overview",
  categorySlug: "getting-started",
  subCategorySlug: null,
  title: "Overview",
  description:
    "A simple welcome to Custy. What it does, what it does not do, and what to do first.",
  summary: "What Custy is, and the easy first steps after you add it.",
  readMinutes: 1,
  updatedOn: "8 September 2026",
  lead: [
    "Welcome to Custy!",
    "Custy helps people shop in your store design their own shirts, hats, and other products. You do not need to know coding. Follow the guides one step at a time.",
  ],
  leadLinks: [{ label: "Try the live demo first", href: "/live-demo" }],
  sections: [
    {
      id: "best-parts",
      paragraphs: [
        "Here is what Custy helps you do:",
      ],
      highlights: [
        "Shoppers design on your store — they open a simple design screen and make their own look",
        "You pick the options — sizes, colors, and which sides of the product they can decorate",
        "You set the prices — extra fees for printing, colors, sides, and buying more at once",
      ],
    },
    {
      id: "important",
      paragraphs: [],
      callout: {
        variant: "important",
        title: "Please read this first",
        bullets: [
          "Custy helps shoppers create the design. You (or your print partner) still make and ship the real product. Custy gives you the design file and the order details.",
          "Shopify still handles the cart, payment, shipping, and tax. Custy does not take those over.",
          "You can take products you already sell in Shopify and turn them into custom products. Nothing here deletes your store.",
        ],
      },
    },
    {
      id: "after-install",
      paragraphs: [
        "Do the Getting Started guides in order. First add Custy. Then turn it on in your theme. Then set up one product. You can stop and come back anytime. Changing a setting in Custy will not wipe your Shopify store.",
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
          "Want to see what a shopper sees before you set anything up? Open the live demo and tap around. You cannot break anything there.",
        ],
        link: { label: "Open the live demo", href: "/live-demo" },
      },
    },
  ],
};
