import type { CtaBandProps, CtaLink } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export type ResourceScreenshot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type ResourceStep = {
  id: string;
  number: number;
  title: string;
  summary: string;
  paragraphs: string[];
  actions: string[];
  note?: string;
  screenshot: ResourceScreenshot;
};

export const resourcesHero = {
  eyebrow: "Help",
  title: "How to Install and Use Custy on Shopify",
  lead: [
    "Follow this practical setup guide to connect Custy to your Shopify store, turn an existing product into a customizable product, and confirm the customer design experience from start to finish.",
    "The screenshots show the complete merchant journey, from the Shopify App Store and Custy dashboard to the storefront button and Design Lab.",
  ],
  ctas: [
    { label: "Install Custy on Shopify", href: APP_URL, variant: "primary" },
    { label: "See How Custy Works", href: "/#how-it-works", variant: "secondary" },
  ] satisfies CtaLink[],
  highlight: {
    title: "What you will set up",
    items: [
      "Custy installed on the correct Shopify store",
      "Shopify products synced into Custy",
      "Sizes, printing types, sides, and pricing configured",
      "A clear print area for every customizable side",
      "The Customize It button and Design Lab verified",
    ],
  },
};

export const resourceSteps: ResourceStep[] = [
  {
    id: "install-custy",
    number: 1,
    title: "Install Custy from the Shopify App Store",
    summary: "Connect Custy to the Shopify store where you want to sell customizable products.",
    paragraphs: [
      "Open the official Custy listing in the Shopify App Store and select Install. Shopify will ask you to sign in or choose a store before showing the installation approval screen.",
    ],
    actions: [
      "Choose the Shopify store that will offer customizable products.",
      "Review the requested permissions and approve the installation.",
      "Wait for Shopify to return you to the Custy dashboard.",
    ],
    screenshot: {
      src: "/images/resources/install-custy-shopify.png",
      alt: "Custy listing in the Shopify App Store with the Install button visible",
      caption: "Open the official Custy listing and select Install.",
      width: 1902,
      height: 1072,
    },
  },
  {
    id: "dashboard",
    number: 2,
    title: "Understand the Custy dashboard",
    summary: "Use the dashboard as the starting point for products, designs, orders, plans, and settings.",
    paragraphs: [
      "After installation, Custy opens inside Shopify Admin. The dashboard gives you a quick view of plan usage and direct access to the areas you will use most often.",
    ],
    actions: [
      "Review your Custom Products, Orders this month, and Storage usage.",
      "Use the management cards to open products, cliparts, fonts, orders, designs, or settings.",
      "Use Get Support whenever you need help from the Custy team.",
    ],
    screenshot: {
      src: "/images/resources/custy-dashboard.jpg",
      alt: "Custy dashboard in Shopify Admin showing plan usage and management cards",
      caption: "The Custy dashboard keeps product, design, order, and store controls together.",
      width: 1600,
      height: 900,
    },
  },
  {
    id: "sync-products",
    number: 3,
    title: "Sync your Shopify products",
    summary: "Bring your current Shopify catalog into Custy before choosing which products customers can personalize.",
    paragraphs: [
      "Open Products from the Custy navigation. The product list shows synced Shopify products, their current status, price, type, designer status, and the actions available for each one.",
    ],
    actions: [
      "Select Sync to pull the latest product information from Shopify.",
      "Use search or the All, Custom, and Dropshipped filters to find a product.",
      "Select Make it customizable on the product you want to configure.",
    ],
    note: "Create the product in Shopify first if it does not appear after a sync.",
    screenshot: {
      src: "/images/resources/sync-products.jpg",
      alt: "Custy Products screen with the Sync control and Make it customizable actions",
      caption: "Sync the catalog, then choose the product you want to make customizable.",
      width: 1600,
      height: 900,
    },
  },
  {
    id: "customize-product",
    number: 4,
    title: "Configure the customizable product",
    summary: "Choose the product options and printing rules that match how you will produce the item.",
    paragraphs: [
      "The Customize Product screen brings the product overview, available sizes, printing types, and pricing controls into one setup flow. Only enable combinations that your production workflow can fulfill.",
    ],
    actions: [
      "Set Active on designer to Yes so the product can open in Custy.",
      "Select or create the size set that applies to this product.",
      "Choose the supported printing type and configure any applicable pricing rules.",
      "Save your changes before continuing to the design-tool setup.",
    ],
    note: "The values shown in the screenshot are examples. Use the sizes, methods, and prices for your own store.",
    screenshot: {
      src: "/images/resources/customize-product.png",
      alt: "Custy Customize Product screen showing product overview, sizes, and printing type controls",
      caption: "Activate the designer and configure the product options your store supports.",
      width: 1718,
      height: 915,
    },
  },
  {
    id: "print-areas",
    number: 5,
    title: "Add product sides and define each print area",
    summary: "Tell Custy exactly where customers are allowed to place text, images, and graphics.",
    paragraphs: [
      "In Design Tool Setup, create the sides your product supports, such as front, back, left sleeve, or right sleeve. Each side can have its own mockup, panels, and printable boundary.",
    ],
    actions: [
      "Select Add Side and name the side clearly.",
      "Add the product image or mockup customers should see for that side.",
      "Open Advanced Settings and select the Print Area tab.",
      "Choose inches or centimeters, then set width, height, left, and top values.",
      "Select Update and repeat the setup for every supported side.",
    ],
    note: "Customers can only place designs inside the print area you define, so match it to your real production boundary.",
    screenshot: {
      src: "/images/resources/configure-print-area.png",
      alt: "Custy Advanced Settings for the Front side with a print area defined on a mug",
      caption: "Use the Print Area controls to align the editable boundary with the printable part of the product.",
      width: 1718,
      height: 916,
    },
  },
  {
    id: "storefront-button",
    number: 6,
    title: "Verify the Customize It button on your storefront",
    summary: "Check the product page as a customer before promoting the customizable item.",
    paragraphs: [
      "Open the product in your online store after saving its Custy settings. A purple Customize It button should appear on the product details page and give shoppers a clear path into the editor.",
    ],
    actions: [
      "Use View in store from the product overview or open the product URL directly.",
      "Confirm the product information and Customize It button are visible.",
      "Select Customize It and make sure the correct product opens in the Design Lab.",
    ],
    note: "If the button is missing, first confirm that Active on designer is set to Yes and that the latest product changes were saved.",
    screenshot: {
      src: "/images/resources/storefront-customize-button.png",
      alt: "Shopify product page for a mug with the purple Customize It button visible",
      caption: "The Customize It button connects the storefront product to the Custy Design Lab.",
      width: 1726,
      height: 911,
    },
  },
  {
    id: "design-lab",
    number: 7,
    title: "Use the customer-facing Design Lab",
    summary: "Test the same live customization tools your shoppers will use before they place an order.",
    paragraphs: [
      "The Design Lab shows the product mockup, available colors, editable sides, and the tools enabled for the product. The dashed boundary on the product represents the print area you configured in Custy.",
    ],
    actions: [
      "Choose an available product color and side.",
      "Add text, upload an image, or select a graphic.",
      "Position and edit each design object inside the print boundary.",
      "Switch between product sides to check every enabled design area.",
      "Select size and quantity, then continue through the store ordering flow.",
    ],
    screenshot: {
      src: "/images/resources/design-lab-editor.png",
      alt: "Custy Design Lab editor showing a mug, print area, design tools, colors, and product sides",
      caption: "The Design Lab gives shoppers a live preview while keeping artwork inside your defined print area.",
      width: 1735,
      height: 906,
    },
  },
];

export const resourcesClosing = {
  title: "From the editor to fulfillment",
  paragraphs: [
    "When a shopper completes an order, Custy keeps the selected product options, design placements, sides, and uploaded assets connected to that order so your team can review what was approved.",
    "Custy also prepares production-friendly design files for supported DTG and DTF workflows, reducing the manual work between personalization and printing.",
  ],
  cta: {
    title: "Ready to set up your first customizable product?",
    text: "Install Custy on your Shopify store and follow this guide from product sync to a tested storefront experience.",
    cta: { label: "Install Custy on Shopify", href: APP_URL, variant: "light" },
    secondaryCta: { label: "Get Support", href: "/about#contact", variant: "outline" },
  },
} satisfies { title: string; paragraphs: string[]; cta: CtaBandProps };
