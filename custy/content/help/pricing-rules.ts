import type { HelpArticle } from "./types";

export const pricingRules: HelpArticle = {
  slug: "pricing-rules",
  categorySlug: "getting-started",
  subCategorySlug: "product-setup",
  title: "Pricing Rules",
  description:
    "Set up printing methods with fees and discounts, then attach them to a product.",
  summary:
    "Tell Custy how to add printing fees and quantity discounts to the shopper’s price.",
  readMinutes: 6,
  lead: [
    "Pricing lives under Products → Printing Types & Pricing. You make a printing type once (for example Screen Print or DTG), set the fees, then attach that type to each product that uses it.",
    "The shopper’s price is built from the product price plus extras you set — colors, sides, printing fees, clipart, and quantity discounts. You can change fees later without starting over.",
  ],
  sections: [
    {
      id: "open-printing-types",
      title: "Open Printing Types & Pricing",
      paragraphs: [
        "From Products, open the Printing Types & Pricing tab. Add one printing type for each method you sell (Screen Print, DTG, Embroidery, and so on). Edit a type anytime — products that already use it will pick up the new fees.",
      ],
      actions: [
        "Click Add Printing Type, or open Edit on a type you already have.",
        "Name it the way your shop and your customers already say it.",
      ],
      figure: {
        src: "/images/help/printing-types-list.png",
        alt: "Printing Types and Pricing list",
        caption: "Make printing methods once, then reuse them on many products.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Printing Types & Pricing",
            body: "This tab holds your printing methods and their fees.",
          },
          {
            n: 2,
            title: "Add Printing Type",
            body: "Click to create a new method such as Screen Print or DTG.",
          },
          {
            n: 3,
            title: "Existing types",
            body: "Open a type to change Basic Pricing and the other tabs.",
          },
        ],
      },
    },
    {
      id: "basic-pricing",
      title: "Set Basic Pricing",
      paragraphs: [
        "The Basic Pricing tab is where most of your fees live. You can set a setup fee, prices for uploaded pictures, library clipart, text, photo prints, price per character, price per square inch, and an extra charge when someone designs more than one side. You can also waive the setup fee above a certain quantity.",
      ],
      figure: {
        src: "/images/help/printing-type-basic-pricing.png",
        alt: "Basic Pricing tab with setup fees and starting prices",
        caption: "Basic Pricing is the starting point for each printing method.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Basic Pricing tab",
            body: "Setup fees and starting prices for this printing method.",
          },
          {
            n: 2,
            title: "Setup fee",
            body: "A one-time fee. You can charge it per side or per color, and skip it above a quantity.",
          },
          {
            n: 3,
            title: "Uploaded graphics",
            body: "Price when shoppers upload their own picture.",
          },
          {
            n: 4,
            title: "Library cliparts",
            body: "Price when shoppers use art from your library.",
          },
          {
            n: 5,
            title: "Text",
            body: "Starting price for text, plus price per character if you turn that on.",
          },
          {
            n: 6,
            title: "Full-color photo print",
            body: "Price for photo-style prints, plus price per square inch if you use it.",
          },
          {
            n: 7,
            title: "Additional side",
            body: "Extra charge when more than one side has a design.",
          },
        ],
      },
    },
    {
      id: "advanced-pricing-tabs",
      title: "Colors, size ranges, and limits",
      paragraphs: [
        "Use the other tabs only if you need them. Printing Colors lets you set colors and extra prices. Price Per Color builds tables by how many colors and how many pieces. Price Per Size Range uses light and dark price grids. Restrictions set the smallest and largest order size and rules for uploaded images.",
      ],
      figure: {
        src: "/images/help/printing-type-other-tabs.png",
        alt: "Other pricing tabs on a printing type",
        caption: "Add color tables, size grids, and order limits only if you need them.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Printing Colors",
            body: "Allowed colors and extra price per color.",
          },
          {
            n: 2,
            title: "Price Per Color",
            body: "Tables by quantity and number of colors.",
          },
          {
            n: 3,
            title: "Price Per Size Range",
            body: "Price grids for size ranges, including light and dark.",
          },
          {
            n: 4,
            title: "Restrictions",
            body: "Minimum and maximum order quantity, and uploaded image rules.",
          },
        ],
      },
      note: {
        title: "Plan note",
        body: "Some advanced pricing needs Starter or higher. Location pricing is Pro only.",
      },
    },
    {
      id: "quantity-discounts",
      title: "Quantity discounts (Starter and up)",
      paragraphs: [
        "Open Products → Quantity Discount to reward people who buy more. You can take off a percent or a fixed amount at different quantity ranges. On Free, you will see a message that this needs Starter or higher.",
      ],
      actions: [
        "Click Add Quantity Discount, or edit one you already have.",
        "Choose Percent discount or Fixed discount.",
        "Add quantity ranges that match how you sell (for example 1–11, 12–23).",
      ],
      figure: {
        src: "/images/help/quantity-discount.png",
        alt: "Quantity Discount editor with percent or fixed tiers",
        caption: "Shoppers see a simple Buy more, Save more list when they pick sizes and quantities.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Quantity Discount tab",
            body: "Shared discount lists you can attach to products.",
          },
          {
            n: 2,
            title: "Discount type",
            body: "Percent off or a fixed amount off each item.",
          },
          {
            n: 3,
            title: "Quantity ranges",
            body: "The steps that match how many pieces someone orders.",
          },
        ],
      },
    },
    {
      id: "assign-to-product",
      title: "Attach printing to a product",
      paragraphs: [
        "On Customize Product, open Printing Types & Pricing. Click the printing types this product can use. Pick a quantity discount list if you have one. Click Save so the design screen and price chart use the new rules.",
      ],
      figure: {
        src: "/images/help/product-assign-printing.png",
        alt: "Customize Product with printing types selected",
        caption: "Attach your printing methods and discounts to this product.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Printing types",
            body: "Click every method shoppers may choose for this product.",
          },
          {
            n: 2,
            title: "Quantity discount",
            body: "Optional. Attach a discount list if you use one (Starter and up).",
          },
        ],
      },
    },
  ],
};
