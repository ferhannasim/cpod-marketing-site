import type { CardItem, CtaLink, StepItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export type HowHero = {
  eyebrow: string;
  title: string;
  lead: string[];
  ctas: CtaLink[];
  highlight: { title: string; items: string[] };
};

export type HowStepsSection = {
  title: string;
  lead: string;
  steps: StepItem[];
};

export type HowWhySection = {
  title: string;
  lead: string;
  cards: CardItem[];
};

export type HowCta = {
  title: string;
  text: string;
  cta: CtaLink;
  secondaryCta: CtaLink;
};

// Copy is written from docs/CUSTY_APP_MARKETING_SITE_BRIEF.md (derived from the
// shipped code), so every step describes what the app actually does.
//
// This page is the detailed setup guide, so the steps stay granular. The
// homepage tells the same story in three generic beats from `home.howItWorks`
// instead of slicing these, so the two can be worded for their own audience.
//
// The rows render with `<Steps layout="rows">`; the `.custy-why-card` tiles map
// onto `CardItem` and render with `<CardGrid columns={5} align="center">`. Card
// `icon:` values are semantic names resolved by components/lander/icons.tsx.
export const howItWorks = {
  hero: {
    eyebrow: "How It Works • Custy for Shopify",
    title: "From Product Setup to Print-Ready Orders, Custy Keeps It Simple",
    lead: [
      "Custy turns a product you already sell into one your customers can design. You set the sides, print areas, printing methods and pricing once, and the app handles the rest from the product page through to the artwork you print.",
      "Whether you sell custom t-shirts, hoodies, caps, mugs, or other personalized products, your customers get creative freedom while your production team gets files it can actually use.",
    ],
    ctas: [
      { label: "Start 30-Day Free Trial", href: "/pricing", variant: "primary" },
      { label: "Install on Shopify", href: APP_URL, variant: "secondary" },
    ],
    highlight: {
      title: "What happens with Custy",
      items: [
        "Install the app and connect it to your Shopify store",
        "Sync your catalog and pick the products to make customizable",
        "Set sides, print areas, printing methods and pricing rules",
        "Add the Customize block to your product template",
        "Generate print-ready files for smoother fulfillment",
      ],
    },
  } satisfies HowHero,

  stepsSection: {
    title: "How Custy Works Step by Step",
    lead: "The first four steps get a customizable product live on your store. The last two cover what happens once the orders start arriving.",
    steps: [
      {
        number: 1,
        title: "Install and Pick a Plan",
        text: "Install Custy from the Shopify App Store and start your 30-day free trial. Custy sets up your Design Lab page automatically, so there is nothing to build by hand.",
      },
      {
        number: 2,
        title: "Sync Your Products",
        text: [
          "Open Products in Custy and sync. One click pulls your Shopify catalog in, with progress shown as it runs.",
          "Filter by All, Custom or Dropshipped, search for the item you want, and mark it customizable.",
        ],
      },
      {
        number: 3,
        title: "Set Up a Customizable Product",
        text: [
          "Choose the colors and sizes the product offers, add each side you print on (front, back, sleeves, or any side you define), and drag out the print area in inches or centimeters.",
          "Then pick the printing methods and set your pricing: setup fees, per color, per side, per character, per square inch, size ranges, and quantity discounts.",
        ],
      },
      {
        number: 4,
        title: "Add the Button to Your Theme",
        text: [
          "Drop the Custy Customize block into your product template from the theme editor and enable the cart embed. Both work on vintage and Online Store 2.0 themes.",
          "You can style the button, and optionally hide your theme's Add to Cart, Buy Now, Shop Pay and PayPal buttons so there is one clear path into the designer.",
        ],
      },
      {
        number: 5,
        title: "Receive Orders with Full Design Details",
        text: [
          "Each order arrives as one card per customized line item, showing the product image, the side and area names, the color swatch and name, size, quantity and pricing.",
          "Move orders through your own internal statuses (New, Downloaded, Need Fixing, Completed), and search, sort or update them in bulk.",
        ],
      },
      {
        number: 6,
        title: "Download Print-Ready Artwork",
        text: [
          "Download each design as vector SVG or PDF, or raster PNG or JPG, at 72, 96, 150 or 300 DPI, with a transparent or colored background.",
          "Custy flags any artwork that falls below the DPI you require, so a low-resolution upload never quietly reaches the press.",
        ],
      },
    ],
  } satisfies HowStepsSection,

  whySection: {
    title: "Why Merchants Choose Custy",
    lead: "Custy is a real design studio backed by a pricing engine that understands printing, not a text box bolted onto a product page.",
    cards: [
      {
        icon: "palette",
        title: "Real-Time Customization",
        text: "Layers, fonts, clipart, uploads and effects, with live preview and 50 steps of undo.",
      },
      {
        icon: "layers",
        title: "Multi-Side Design",
        text: "Front, back, sleeves and any side you define, each with its own print area and mockup.",
      },
      {
        icon: "circle-dollar-sign",
        title: "Dynamic Pricing",
        text: "Setup fees, per color, per side, per character, per square inch, and quantity discounts.",
      },
      {
        icon: "printer",
        title: "Print-Ready Order Data",
        text: "SVG, PDF, PNG or JPG at up to 300 DPI, transparent or on a background you choose.",
      },
      {
        icon: "sparkles",
        title: "Better Customer Experience",
        text: "Shoppers save a design, get a shareable link, and can re-edit it from the cart.",
      },
    ] satisfies CardItem[],
  } satisfies HowWhySection,

  cta: {
    title: "Start with Custy",
    text: "Install Custy and give your customers the freedom to create products they love while you simplify your custom order workflow behind the scenes.",
    cta: { label: "Start Free Trial", href: "/pricing", variant: "light" },
    secondaryCta: { label: "View Features", href: "/features", variant: "outline" },
  } satisfies HowCta,
};
