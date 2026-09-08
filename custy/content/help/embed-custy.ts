import type { HelpArticle } from "./types";

export const embedCusty: HelpArticle = {
  slug: "embed-custy",
  categorySlug: "getting-started",
  subCategorySlug: "app-activation",
  title: "How to Embed Custy on Your Store?",
  description:
    "Enable the Custy cart editor app embed and add the Customize It button block so shoppers can open and re-edit designs.",
  summary: "Activate the theme embed and product block so the Design Lab appears on your storefront.",
  readMinutes: 3,
  lead: [
    "To show Custy on your storefront you need two theme pieces: the Custy cart editor app embed, and the Custy Customize Button block on your product template. Without both, shoppers cannot reliably open or re-edit designs.",
  ],
  sections: [
    {
      id: "enable-embed",
      title: "Step 1: Enable the Custy cart editor embed",
      paragraphs: [
        "The app embed named Custy cart editor lets shoppers reopen a customized item from the cart or cart drawer. If it is off, the dashboard shows a Finish Custy storefront setup banner with Enable in theme.",
      ],
      actions: [
        "From the dashboard banner, select Enable in theme, or open the theme editor Apps panel yourself.",
        "Find Custy cart editor and turn the embed on.",
        "Select Save in the theme editor.",
      ],
      figure: {
        src: "/images/help/install-theme-embed.png",
        alt: "Shopify theme editor Apps panel with the Custy cart editor embed",
        caption: "Turn on the Custy cart editor embed, then save the theme.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Custy cart editor",
            body: "The body app embed that rewrites cart links for Custy products.",
          },
          {
            n: 2,
            title: "Embed toggle",
            body: "Enable the embed, then save the theme.",
          },
        ],
      },
    },
    {
      id: "dashboard-banner",
      title: "Dashboard reminder",
      paragraphs: [
        "If the embed is still inactive, the Custy dashboard keeps the Finish Custy storefront setup banner visible until you enable it.",
      ],
      figure: {
        src: "/images/help/install-dashboard-banner.png",
        alt: "Custy dashboard banner prompting to finish storefront setup",
        caption: "Use Enable in theme whenever the cart editor embed is still off.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Finish Custy storefront setup",
            body: "Banner shown when the cart editor embed is inactive.",
          },
          {
            n: 2,
            title: "Enable in theme",
            body: "Opens the theme editor with the Custy cart editor embed ready to activate.",
          },
        ],
      },
    },
    {
      id: "customize-button",
      title: "Step 2: Add the Custy Customize Button",
      paragraphs: [
        "On your product template, add the theme app block Custy Customize Button. The default label is Customize It. The block can optionally show a price chart and hide your theme Add to Cart or Buy Now buttons while customers design.",
      ],
      actions: [
        "In the theme editor, open the product template customers use.",
        "Add block and select Custy Customize Button.",
        "Place it where shoppers expect a primary action, then save.",
        "Optionally configure the label, colors, price chart, and which theme buttons to hide.",
      ],
      figure: {
        src: "/images/help/install-customize-block.png",
        alt: "Shopify theme editor showing the Custy Customize Button on a product template",
        caption: "The Customize It block links the product page to the Design Lab.",
        width: 1726,
        height: 911,
        markers: [
          {
            n: 1,
            title: "Custy Customize Button",
            body: "App block in the product template sidebar.",
          },
          {
            n: 2,
            title: "Customize It",
            body: "Storefront button preview. Default label is Customize It.",
          },
          {
            n: 3,
            title: "Block settings",
            body: "Label, colors, price chart, and controls to hide theme checkout buttons.",
          },
        ],
      },
    },
    {
      id: "confirm",
      title: "Step 3: Confirm on the storefront",
      paragraphs: [
        "After at least one product is customizable and Active on designer is Yes, open the product in your online store. Confirm Customize It appears and opens the Design Lab for that product.",
      ],
      actions: [
        "Use View in store from Customize Product, or open the product URL directly.",
        "Select Customize It and confirm the correct product and sides load.",
      ],
      figure: {
        src: "/images/help/storefront-customize-it.png",
        alt: "Shopify product page with the Customize It button visible",
        caption: "The Customize It button is the shopper path into the Design Lab.",
        width: 1726,
        height: 911,
        markers: [
          {
            n: 1,
            title: "Customize It",
            body: "Primary storefront action that opens /pages/custydesignlab for this product.",
          },
        ],
      },
      note: {
        title: "Sync Shopify Resources",
        body: "If the Design Lab page looks missing, open Settings and select Sync Shopify Resources to recreate the page and refresh metafield definitions.",
      },
    },
  ],
};
