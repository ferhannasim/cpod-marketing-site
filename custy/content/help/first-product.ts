import type { HelpArticle } from "./types";

export const firstProduct: HelpArticle = {
  slug: "first-product",
  categorySlug: "getting-started",
  subCategorySlug: "product-setup",
  title: "Setting Up Your First Product",
  description:
    "Sync Shopify products into Custy, make a product customizable, assign sizes, colors, and printing types, then save and activate it on the designer.",
  summary:
    "Turn a synced Shopify product into a customizable product with the options your production team can fulfill.",
  readMinutes: 5,
  lead: [
    "Customizable products are configured inside Custy, not only in Shopify. You sync the catalog, select Make it customizable, complete the Customize Product screen, and Save. The first successful save enables customization and defaults Active on designer to Yes.",
  ],
  sections: [
    {
      id: "open-products",
      title: "Open Products and sync",
      paragraphs: [
        "From the Custy navigation, open Products. The Products tab lists synced Shopify products with status, price, type, designer status, and actions. Top tabs also cover Create Colors, Product Size, Printing Types & Pricing, and Quantity Discount for reusable store-level sets.",
      ],
      actions: [
        "Select Sync (or Sync Products) to pull the latest catalog from Shopify.",
        "Use search or the All, Custom, and Dropshipped filters to find a product.",
        "If a product is missing, create it in Shopify first, then sync again.",
      ],
      figure: {
        src: "/images/help/products-list-sync.png",
        alt: "Custy Products screen with Sync and Make it customizable actions",
        caption: "Sync the catalog, then choose the product you want to configure.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Products tab",
            body: "Main product list. Other tabs manage reusable colors, sizes, printing types, and quantity discounts.",
          },
          {
            n: 2,
            title: "Sync",
            body: "Import or refresh Shopify products into Custy.",
          },
          {
            n: 3,
            title: "Filters",
            body: "All, Custom, and Dropshipped narrow the list.",
          },
          {
            n: 4,
            title: "Make it customizable",
            body: "Opens Customize Product for this Shopify product.",
          },
        ],
      },
    },
    {
      id: "customize-product-screen",
      title: "Configure Customize Product",
      paragraphs: [
        "Customize Product groups everything that product needs before shoppers can design it. Work top to bottom. Only enable sizes, colors, and printing types your production workflow can fulfill.",
      ],
      actions: [
        "Product Overview — review image and price, use View in store or Design Panel when needed, set Active on designer to Yes when you are ready for the storefront.",
        "Product Sizes — select the size set (or sets) that apply.",
        "Printing Types & Pricing — select printing types and an optional quantity discount set.",
        "Product Colors — assign color groups or color sets.",
        "Design Tool Setup — add sides and print areas (covered in the next guide).",
        "Restrictions & Settings — limit design tools and inventory rules (Starter and up for inventory).",
      ],
      figure: {
        src: "/images/help/customize-product-overview.png",
        alt: "Custy Customize Product screen showing overview, sizes, and printing controls",
        caption: "Activate the designer and assign the options this product supports.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Active on designer",
            body: "Yes makes the product available in the Design Lab when Customize It is used.",
          },
          {
            n: 2,
            title: "Product Sizes",
            body: "Select the size sets shoppers can choose.",
          },
          {
            n: 3,
            title: "Printing Types & Pricing",
            body: "Assign printing methods and an optional quantity discount set.",
          },
          {
            n: 4,
            title: "Product Colors",
            body: "Assign color groups customers can switch in the editor.",
          },
          {
            n: 5,
            title: "Design Tool Setup",
            body: "Add sides, mockups, and print areas next.",
          },
          {
            n: 6,
            title: "Save",
            body: "Save commits customization settings. Changes also auto-save as you work; discard if you need to revert.",
          },
        ],
      },
      note: {
        title: "Reusable sets",
        body: "Build shared color sets under Create Colors and size sets under Product Size before or while configuring the product. Printing types and quantity discounts are managed on their own Products tabs.",
      },
    },
    {
      id: "color-and-size-sets",
      title: "Create reusable colors and sizes",
      paragraphs: [
        "Color sets include name, hex, optional swatch image, added price, dark-color flag, and order. Size sets are grouped into categories, and each size can carry an extra price.",
      ],
      figure: {
        src: "/images/help/create-colors-tab.png",
        alt: "Custy Create Colors tab for managing reusable color sets",
        caption: "Reusable color sets keep swatches and surcharges consistent across products.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Create Colors",
            body: "Manage named color sets used on customizable products.",
          },
          {
            n: 2,
            title: "Color fields",
            body: "Name, hex, swatch, added price, and dark-color flag.",
          },
        ],
      },
    },
    {
      id: "product-size-sets",
      title: "Create reusable size sets",
      paragraphs: [
        "Open the Product Size tab to define categories and sizes once, then assign those sets on Customize Product.",
      ],
      figure: {
        src: "/images/help/product-size-tab.png",
        alt: "Custy Product Size tab for managing size sets and categories",
        caption: "Size sets control which sizes appear and any per-size extra pricing.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Product Size",
            body: "Manage size categories and individual sizes.",
          },
          {
            n: 2,
            title: "Extra price",
            body: "Optional surcharge per size, recalculated on the server at checkout.",
          },
        ],
      },
    },
    {
      id: "save-and-activate",
      title: "Save and confirm Active on designer",
      paragraphs: [
        "Select Save when the product options look correct. Confirm Active on designer is Yes. Then continue to Print Areas & Mark Areas to define where artwork may be placed on each side.",
      ],
      actions: [
        "Save the Customize Product screen.",
        "Confirm Active on designer = Yes.",
        "Open Design Tool Setup to add sides and print areas.",
      ],
    },
  ],
};
