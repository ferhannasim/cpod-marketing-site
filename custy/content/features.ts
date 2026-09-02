import type { CardItem, CtaLink, StepItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export type FeaturesHero = {
  eyebrow: string;
  title: string;
  lead: string[];
  ctas: CtaLink[];
  highlight: { title: string; items: string[] };
};

export type FeaturesSection = {
  title: string;
  lead: string;
  cards?: CardItem[];
  steps?: StepItem[];
};

export type FeaturesCta = {
  title: string;
  text: string;
  cta: CtaLink;
  secondaryCta: CtaLink;
};

export type FeaturesWorkflowStrip = {
  title: string;
  items: CardItem[];
};

// Copy on this page is written from docs/CUSTY_APP_MARKETING_SITE_BRIEF.md, which
// is itself derived from the shipped code. Every capability named here exists in
// the product today. Card `icon` values are semantic names resolved to SVG stroke
// icons by components/lander/icons.tsx.
//
// Deliberately not advertised, per section 8 of the brief: the Buy Blank button,
// standalone color-swatch and size-display settings, add-to-cart styling
// settings (all disabled in Settings), QR codes, name-and-number, and design
// ideas (staged but not shipped). No accessibility conformance is claimed.
export const features = {
  hero: {
    eyebrow: "Custy for Shopify • POD Ready",
    title: "Powerful Product Customization for Modern Shopify Stores",
    lead: [
      "Custy turns any Shopify product into a customizable one. Shoppers open a full design studio on your product page (layers, fonts, clipart, uploads and effects) and preview every side of the product before they add it to the cart.",
      "You get print-ready artwork at up to 300 DPI, pricing that matches how printing is actually quoted, and order management that never leaves Shopify admin.",
    ],
    ctas: [
      { label: "Start 30-Day Free Trial", href: APP_URL, variant: "primary" },
      { label: "Install on Shopify", href: APP_URL, variant: "secondary" },
    ],
    highlight: {
      title: "Why merchants choose Custy",
      items: [
        "A real design studio, not a text box",
        "Multi-side products with live preview on every side",
        "Pricing by setup fee, color, side, character or square inch",
        "Print-ready files as SVG, PDF, PNG or JPG up to 300 DPI",
        "Embedded in Shopify admin and billed through Shopify",
      ],
    },
  } satisfies FeaturesHero,

  sections: [
    {
      title: "Key Features Built for POD Growth",
      lead: "Everything below ships in Custy today: the shopper design studio, the pricing engine behind it, and the order tools your production team works from.",
      cards: [
        {
          icon: "palette",
          title: "Real-Time Product Customizer",
          text: "A canvas editor that opens straight from your product page. Shoppers add text and artwork, work in layers, undo up to 50 steps, and zoom to 3x to check the detail before they buy.",
        },
        {
          icon: "layers",
          title: "Multi-Side Customization",
          text: "Front, back, sleeves and any side you define, each with its own print area, mockup and named parts, plus product color swatches that recolor the garment art live.",
        },
        {
          icon: "circle-dollar-sign",
          title: "Dynamic Pricing Engine",
          text: "Setup fees, per color, per side, per character, per square inch, size-range grids and quantity discounts, priced the way printing is actually quoted.",
        },
        {
          icon: "printer",
          title: "DTG, DTF & Print-Ready Files",
          text: "Download artwork from the order as SVG, PDF, PNG or JPG at up to 300 DPI, with a transparent or colored background, flagged when it falls below your required DPI.",
        },
        {
          icon: "puzzle",
          title: "Flexible Product Options",
          text: "Reusable color sets and size sets, per-variant inventory with SKUs, and restrictions controlling which tools and libraries each product allows.",
        },
        {
          icon: "shield-check",
          title: "Guardrails Before It Prints",
          text: "Low-resolution DPI warnings, out-of-print-area warnings, max-colors-per-location limits, and an optional approval step in your own words.",
        },
        {
          icon: "blocks",
          title: "Seamless Shopify Integration",
          text: "Embedded in Shopify admin and built on Polaris, so it looks and feels like Shopify. The Customize button is a theme block, and billing runs through Shopify.",
        },
        {
          icon: "zap",
          title: "Designed for Mobile Too",
          text: "A dedicated layout below 750px with its own tab bar for color, text, uploads and layers, plus full touch support for dragging and reordering.",
        },
        {
          icon: "trending-up",
          title: "Save, Share and Re-Edit",
          text: "Shoppers save a design with a name and email and get a shareable link they can reopen, send on, or edit again straight from the cart.",
        },
      ],
    },
    {
      title: "How Custy Works",
      lead: "Four steps from installing the app to receiving your first order with print-ready artwork attached.",
      steps: [
        {
          number: 1,
          title: "Install Custy",
          text: "Install from the Shopify App Store and start a 30-day free trial. Custy creates your Design Lab page automatically.",
        },
        {
          number: 2,
          title: "Sync and Set Up a Product",
          text: "One click pulls in your Shopify catalog. Choose colors and sizes, add product sides and print areas, then pick your printing methods and pricing.",
        },
        {
          number: 3,
          title: "Add the Button to Your Theme",
          text: "Drop the Custy Customize block into your product template and enable the cart embed. Your customers can start designing.",
        },
        {
          number: 4,
          title: "Get Print-Ready Orders",
          text: "Each order arrives with the design, the side and color breakdown, and artwork you can download in vector or raster at up to 300 DPI.",
        },
      ],
    },
    {
      title: "Perfect For",
      lead: "Custy is built for Shopify merchants who sell products their customers help design, and who need what comes out the other end to be production-ready.",
      cards: [
        {
          icon: "shirt",
          title: "POD Businesses",
          text: "Apparel and merch brands selling t-shirts, hoodies, hats and bags, with live customization and a clean handoff to production.",
        },
        {
          icon: "printer",
          title: "Print Shops",
          text: "Screen print, DTG, embroidery, vinyl and sublimation, each with its own pricing rules, color limits and quantity minimums.",
        },
        {
          icon: "gift",
          title: "Promotional & Corporate Merch",
          text: "Mugs, totes and giveaways carrying a client's logo, with quantity discounts and an approval step before anything reaches the press.",
        },
        {
          icon: "chart-column",
          title: "Growth-Focused Merchants",
          text: "Any Shopify store adding personalization to an existing catalog, without creating a new SKU for every variation.",
        },
      ],
    },
    {
      title: "Run the business side without spreadsheets",
      lead: "Beyond the Design Lab, Custy gives merchants the pricing and operations controls a personalization business actually needs.",
      cards: [
        {
          icon: "printer",
          title: "Pricing by print method",
          text: "Each method carries its own rules: setup fees per side and per color, waived above a quantity threshold, plus separate rates for uploads, clipart and text.",
        },
        {
          icon: "badge-percent",
          title: "Quantity discounts",
          text: "Percentage or fixed discounts matched against total order quantity, shown to the shopper as a Buy more, Save more ladder.",
        },
        {
          icon: "circle-dollar-sign",
          title: "Tiered & location pricing",
          text: "Tiered pricing keeps margins right as volume grows, and location pricing lets you charge by print position.",
        },
        {
          icon: "chart-column",
          title: "Inventory control",
          text: "Per-variant restrictions keyed by size, color and style with SKUs, honoring stock tracking and a stop-sell buffer at checkout.",
        },
        {
          icon: "server",
          title: "White label & API",
          text: "Put your own logo in the editor header, remove Custy branding, and integrate through the API to fit your own stack.",
        },
        {
          icon: "blocks",
          title: "Bulk order tools",
          text: "Multi-select orders and move them through New, Downloaded, Need Fixing and Completed in bulk, instead of one at a time.",
        },
      ],
    },
  ] satisfies FeaturesSection[],

  workflowStrip: {
    title: "Works with your POD workflow",
    items: [
      {
        icon: "monitor",
        title: "Embedded in Your Store",
        text: "Works on both vintage and Online Store 2.0 themes, with no separate payment setup.",
      },
      {
        icon: "file-check",
        title: "Print-Ready in Every Order",
        text: "Vector SVG and PDF or raster PNG and JPG, at 72, 96, 150 or 300 DPI.",
      },
      {
        icon: "layers",
        title: "Multi-Side Printing",
        text: "Front, back, sleeves, and any side you define per product.",
      },
      {
        icon: "eye",
        title: "English and French",
        text: "Both languages out of the box, including the approval step copy.",
      },
    ],
  } satisfies FeaturesWorkflowStrip,

  cta: {
    title: "Start with Custy Risk-Free",
    text: "Every paid plan includes a 30-day free trial, once per store. Billing runs through Shopify, and cancelling prorates and keeps your access until the end of the paid period.",
    cta: { label: "Start Free Trial", href: APP_URL, variant: "light" },
    secondaryCta: { label: "View Pricing", href: "/pricing", variant: "outline" },
  } satisfies FeaturesCta,
};
