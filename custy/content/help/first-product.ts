import type { HelpArticle } from "./types";

export const firstProduct: HelpArticle = {
  slug: "first-product",
  categorySlug: "products",
  subCategorySlug: "custom-products",
  title: "Setting Up Your First Product",
  description:
    "Bring a Shopify product into Custy, make it customizable, pick sizes and colors, then save.",
  summary:
    "Take one Shopify product and turn it into a custom product shoppers can design.",
  readMinutes: 5,
  lead: [
    "Your products still live in Shopify. Custy adds the custom part on top. You will bring the product list into Custy, click Make it customizable, fill in a few choices, and click Save. Take it slow. You can change things later.",
  ],
  sections: [
    {
      id: "open-products",
      title: "Open Products and bring in your list",
      paragraphs: [
        "In Custy, click Products on the left. You will see a list of products from Shopify. At the top you may also see tabs for colors, sizes, printing types, and quantity discounts. Those are shared lists you can reuse.",
      ],
      actions: [
        "Click Sync (or Sync Products) so Custy has your latest Shopify products.",
        "Use search or the filters All, Custom, and Dropshipped to find a product.",
        "If a product is missing, add it in Shopify first, then click Sync again.",
      ],
      figure: {
        src: "/images/help/products-list-sync.png",
        alt: "Custy Products list with Sync and Make it customizable",
        caption: "Click Sync, then pick the product you want to set up.",
        width: 1600,
        height: 900,
        markers: [
          {
            n: 1,
            title: "Products",
            body: "Your product list. Other tabs hold shared colors, sizes, printing, and discounts.",
          },
          {
            n: 2,
            title: "Sync",
            body: "Click this to bring products from Shopify into Custy.",
          },
          {
            n: 3,
            title: "Filters",
            body: "All, Custom, and Dropshipped help you find a product faster.",
          },
          {
            n: 4,
            title: "Make it customizable",
            body: "Click this on the product you want shoppers to design.",
          },
        ],
      },
    },
    {
      id: "customize-product-screen",
      title: "Fill in Customize Product",
      paragraphs: [
        "This screen holds everything for that one product. Work from top to bottom. Only turn on sizes, colors, and printing methods you can really make in your shop.",
      ],
      actions: [
        "Product Overview — check the photo and price. Set Active on designer to Yes when you are ready for shoppers to see it.",
        "Product Sizes — pick the size list this product uses.",
        "Printing Types & Pricing — pick how it can be printed, and an optional quantity discount list.",
        "Product Colors — pick the colors shoppers can choose.",
        "Design Tool Setup — add sides and print areas (next guide).",
        "Restrictions & Settings — limit tools or inventory if you need to (inventory needs Starter or higher).",
      ],
      figure: {
        src: "/images/help/customize-product-overview.png",
        alt: "Customize Product screen with overview, sizes, and printing",
        caption: "Turn the designer on and pick the options this product supports.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Active on designer",
            body: "Set to Yes when you want shoppers to open this product in the design screen.",
          },
          {
            n: 2,
            title: "Product Sizes",
            body: "Pick which sizes shoppers can choose.",
          },
          {
            n: 3,
            title: "Printing Types & Pricing",
            body: "Pick printing methods and an optional quantity discount.",
          },
          {
            n: 4,
            title: "Product Colors",
            body: "Pick which colors shoppers can switch to.",
          },
          {
            n: 5,
            title: "Design Tool Setup",
            body: "Next you will add sides and print areas here.",
          },
          {
            n: 6,
            title: "Save",
            body: "Click Save when you are ready. Custy also saves as you go. You can discard if you need to undo.",
          },
        ],
      },
      note: {
        title: "Shared lists you can reuse",
        body: "Make color lists under Create Colors and size lists under Product Size. Printing types and quantity discounts have their own tabs. Build them once, then use them on many products.",
      },
    },
    {
      id: "color-and-size-sets",
      title: "Make a shared color list",
      paragraphs: [
        "A color list can include a name, a color code, an optional swatch photo, an extra price, and whether the color is dark. You can use the same list on many products.",
      ],
      figure: {
        src: "/images/help/create-colors-tab.png",
        alt: "Create Colors tab for shared color lists",
        caption: "Shared color lists keep your swatches and prices the same across products.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Create Colors",
            body: "Build named color lists here.",
          },
          {
            n: 2,
            title: "Color details",
            body: "Name, color code, swatch, extra price, and dark-color option.",
          },
        ],
      },
    },
    {
      id: "product-size-sets",
      title: "Make a shared size list",
      paragraphs: [
        "Open the Product Size tab. Make size groups once (for example adult sizes). Then pick those lists on Customize Product.",
      ],
      figure: {
        src: "/images/help/product-size-tab.png",
        alt: "Product Size tab for shared size lists",
        caption: "Size lists control which sizes show and any extra price per size.",
        width: 1718,
        height: 915,
        markers: [
          {
            n: 1,
            title: "Product Size",
            body: "Make size groups and individual sizes here.",
          },
          {
            n: 2,
            title: "Extra price",
            body: "Optional extra cost for a size (for example XL).",
          },
        ],
      },
    },
    {
      id: "save-and-activate",
      title: "Save and turn the designer on",
      paragraphs: [
        "Click Save when the options look right. Make sure Active on designer is Yes. Then go to Print Areas & Mark Areas to mark where artwork can go on each side.",
      ],
      actions: [
        "Click Save on Customize Product.",
        "Confirm Active on designer is Yes.",
        "Open Design Tool Setup to add sides and print areas.",
      ],
    },
  ],
};
