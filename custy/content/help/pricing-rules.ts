import type { HelpArticle } from "./types";

export const pricingRules: HelpArticle = {
  slug: "pricing-rules",
  categorySlug: "getting-started",
  subCategorySlug: "product-setup",
  title: "Pricing Rules",
  description:
    "Create printing types with setup fees, per-method rates, color and size tables, restrictions, and quantity discounts, then assign them to products.",
  summary:
    "Configure how Custy builds the shopper price from printing methods, surcharges, and quantity discounts.",
  readMinutes: 6,
  lead: [
    "Pricing rules live under Products → Printing Types & Pricing, not on a separate Pricing Rules page. You define reusable printing types with their fee structure, then assign those types (and optional quantity discount sets) on each Customize Product screen.",
    "The live price assembles base product price, color and style surcharges, multi-side fees, printing-method pricing, clipart surcharges, and quantity discounts. Size and color extras are always recalculated on the server.",
  ],
  sections: [
    {
      id: "open-printing-types",
      title: "Open Printing Types & Pricing",
      paragraphs: [
        "From Products, open the Printing Types & Pricing tab. Add a printing type for each method you sell (for example Screen Print, DTG, Embroidery). Edit an existing type to change fees without rebuilding products that already use it.",
      ],
      actions: [
        "Select Add Printing Type or open Edit Printing Type on an existing row.",
        "Name the method the way your shoppers and production team recognize it.",
      ],
      figure: {
        src: "/images/help/printing-types-list.png",
        alt: "Custy Printing Types and Pricing tab listing printing methods",
        caption: "Store-level printing types are reused across customizable products.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Printing Types & Pricing",
            body: "Tab where reusable printing methods and their fee tables live.",
          },
          {
            n: 2,
            title: "Add Printing Type",
            body: "Create a new method such as Screen Print or DTG.",
          },
          {
            n: 3,
            title: "Existing types",
            body: "Open a type to edit Basic Pricing and the other tabs.",
          },
        ],
      },
    },
    {
      id: "basic-pricing",
      title: "Configure Basic Pricing",
      paragraphs: [
        "The Basic Pricing tab covers setup fees and initial / per-unit prices for uploaded graphics, library cliparts, text, combined text-plus-graphics rates, full-color photo print, price per character, price per square inch, and rates for additional sides. You can charge setup fees per side and per color, and waive setup fees above a quantity threshold.",
      ],
      figure: {
        src: "/images/help/printing-type-basic-pricing.png",
        alt: "Printing Type modal Basic Pricing tab with setup fees and initial prices",
        caption: "Basic Pricing is the foundation of every printing method.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Basic Pricing tab",
            body: "Setup fees and initial prices for this printing method.",
          },
          {
            n: 2,
            title: "Setup fee",
            body: "Amount, optional charge for every side, and waive-above-quantity controls.",
          },
          {
            n: 3,
            title: "Uploaded graphics",
            body: "Initial price when shoppers upload their own files.",
          },
          {
            n: 4,
            title: "Library cliparts",
            body: "Initial price when shoppers use clipart from your library.",
          },
          {
            n: 5,
            title: "Text",
            body: "Initial text price, plus price per character when enabled.",
          },
          {
            n: 6,
            title: "Full-color photo print",
            body: "Rate for photo-style prints, plus price per square inch when used.",
          },
          {
            n: 7,
            title: "Additional side rate",
            body: "Extra charge for sides beyond the first that contain a design.",
          },
        ],
      },
    },
    {
      id: "advanced-pricing-tabs",
      title: "Colors, size ranges, and restrictions",
      paragraphs: [
        "Use the remaining tabs when your production pricing needs them. Printing Colors sets an advanced palette with added prices. Price Per Color builds quantity × color tables with a max-colors cap. Price Per Size Range uses light and dark grids. Restrictions set minimum and maximum product quantity and uploaded-image filters.",
      ],
      figure: {
        src: "/images/help/printing-type-other-tabs.png",
        alt: "Printing Type modal showing advanced pricing tabs",
        caption: "Add color tables, size-range grids, and quantity restrictions as needed.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Printing Colors",
            body: "Allowed colors and per-color added prices for this method.",
          },
          {
            n: 2,
            title: "Price Per Color",
            body: "Quantity by color-count pricing tables and max colors per location.",
          },
          {
            n: 3,
            title: "Price Per Size Range",
            body: "Grids for size ranges with light and dark pricing.",
          },
          {
            n: 4,
            title: "Restrictions",
            body: "Minimum and maximum order quantity and uploaded image filter.",
          },
        ],
      },
      note: {
        title: "Plan gates",
        body: "Tiered pricing features require Starter or higher. Location pricing is Pro only.",
      },
    },
    {
      id: "quantity-discounts",
      title: "Quantity discounts (Starter and up)",
      paragraphs: [
        "Open Products → Quantity Discount to create percent or fixed discount sets with quantity ranges. Free plan stores see a message that quantity discounts require Starter or higher.",
      ],
      actions: [
        "Select Add Quantity Discount or edit an existing set.",
        "Choose Percent discount or Fixed discount.",
        "Add quantity ranges that match how you sell volume.",
      ],
      figure: {
        src: "/images/help/quantity-discount.png",
        alt: "Custy Quantity Discount set editor with percent or fixed tiers",
        caption: "Quantity discounts show shoppers a Buy more, Save more ladder in the size and quantity modal.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Quantity Discount tab",
            body: "Reusable discount sets assigned per product.",
          },
          {
            n: 2,
            title: "Discount type",
            body: "Percent discount or Fixed discount off per item.",
          },
          {
            n: 3,
            title: "Quantity ranges",
            body: "Tiers matched against total order quantity.",
          },
        ],
      },
    },
    {
      id: "assign-to-product",
      title: "Assign printing types on the product",
      paragraphs: [
        "On Customize Product, open Printing Types & Pricing. Select the printing type pills this product supports and choose a quantity discount set when applicable. Save the product so the Design Lab and storefront price chart use the new rules.",
      ],
      figure: {
        src: "/images/help/product-assign-printing.png",
        alt: "Customize Product section for selecting printing types and quantity discount",
        caption: "Assign store-level printing types and discounts to this product.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Printing type pills",
            body: "Select every method shoppers may choose for this product.",
          },
          {
            n: 2,
            title: "Quantity discount set",
            body: "Optional Starter+ discount ladder for this product.",
          },
        ],
      },
    },
  ],
};
