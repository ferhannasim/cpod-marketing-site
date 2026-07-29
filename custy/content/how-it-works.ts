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

// Originally transcribed verbatim from content/raw/how-it-works.html
// (custy-how-page); the four longest step paragraphs (steps 2, 3, 4, and 6's
// first paragraph) were later condensed for the professionalize pass — same
// claims, tighter wording, still ≤ 2 sentences each. No <img> tags on this
// page, so no images to localize. The `.custy-why-card` icons are semantic
// names resolved to SVG stroke icons by components/lander/icons.tsx (the
// design pass replaced the source's emoji), and the curly apostrophe in
// "Custy's design panel" (step 4) is kept verbatim as ordinary punctuation — confirmed with
// `grep -noP '[^\x00-\x7F]'` that no other non-ASCII prose exists on this
// page.
//
// Old Shopify-relative hrefs are rewritten to the equivalent Next.js routes
// per the established ruling: `/pages/pricing` → `/pricing`, `/pages/features`
// → `/features`; the Shopify App Store link stays as `APP_URL` from
// `@/lib/site`, never hardcoded.
//
// The seven `.custy-step` rows map onto the Task 9 `StepItem` type and are
// rendered with `<Steps layout="rows">` (the how-it-works stacked treatment,
// distinct from the features page's numbered-circle grid). The five
// `.custy-why-card` tiles map onto `CardItem` and render with `<CardGrid
// columns={5} align="center">`, matching the source's centered text layout.
export const howItWorks = {
  hero: {
    eyebrow: "How It Works • Custy for Shopify",
    title: "From Product Setup to Print-Ready Orders, Custy Keeps It Simple",
    lead: [
      "Custy makes it easy for Shopify merchants to sell personalized products with a smooth, real-time customization experience. From setup to order fulfillment, the workflow is designed to be simple, fast, and scalable.",
      "Whether you sell custom t-shirts, hoodies, caps, mugs, or other personalized products, Custy helps you give customers creative freedom while keeping your production process organized behind the scenes.",
    ],
    ctas: [
      { label: "Start 30-Day Free Trial", href: "/pricing", variant: "primary" },
      { label: "Install on Shopify", href: APP_URL, variant: "secondary" },
    ],
    highlight: {
      title: "What happens with Custy",
      items: [
        "Install the app and connect it to your Shopify store",
        "Set up products, print areas, and customization rules",
        "Let customers design products in real time",
        "Receive clean order data with design details attached",
        "Generate print-ready files for smoother fulfillment",
      ],
    },
  } satisfies HowHero,

  stepsSection: {
    title: "How Custy Works Step by Step",
    lead: "Every stage of the Custy workflow is built to help merchants launch faster, sell with confidence, and process personalized orders with less manual effort.",
    steps: [
      {
        number: 1,
        title: "Install Custy on Your Shopify Store",
        text: "Start by installing Custy from the Shopify App Store. Once installed, you can connect the app to your store and begin setting up customizable products in just a few steps.",
      },
      {
        number: 2,
        title: "Set Up Your Products",
        text: [
          "Choose which products to make customizable — t-shirts, hoodies, caps, mugs, and more — then define the available print areas: front, back, left sleeve, right sleeve, and other supported sides.",
          "Custy also lets you configure product options such as size, color, print type, and design rules based on your business needs.",
        ],
      },
      {
        number: 3,
        title: "Configure Pricing Rules",
        text: [
          "Apply dynamic pricing based on the customization options your customer selects — for example, charging different prices for extra print sides, premium print methods, larger design areas, or special product options.",
          "This helps you keep pricing flexible while protecting your profit margin.",
        ],
      },
      {
        number: 4,
        title: "Let Customers Design in Real Time",
        text: [
          "Once your products are set up, customers can customize them directly on your Shopify store using Custy’s design panel — adding text, uploading images, placing artwork, and personalizing different sides while seeing changes instantly.",
          "This interactive experience makes shopping more engaging and helps customers feel confident before placing an order.",
        ],
      },
      {
        number: 5,
        title: "Receive Orders with Full Design Details",
        text: [
          "When a customer places an order, Custy captures the selected customization data and attaches it to the order. This includes product options, design placements, selected sides, and uploaded assets.",
          "Everything is organized clearly so you can review each order without confusion.",
        ],
      },
      {
        number: 6,
        title: "Generate Print-Ready Files",
        text: [
          "Custy helps streamline production by preparing design data in a fulfillment-friendly format, making it easier for your team or print partner to accurately process customized orders for DTG, DTF, and other supported print workflows.",
          "By reducing manual steps, Custy helps save time and minimize production errors.",
        ],
      },
      {
        number: 7,
        title: "Fulfill and Grow",
        text: "With a smoother workflow from customization to fulfillment, you can focus on growing your business. Custy helps improve customer experience, increase conversion rates, and make custom product selling easier at scale.",
      },
    ],
  } satisfies HowStepsSection,

  whySection: {
    title: "Why Merchants Choose Custy",
    lead: "Merchants choose Custy because it combines ease of use with powerful customization features. It is built for modern Shopify stores that want to offer personalized products without creating a complex buying experience.",
    cards: [
      {
        icon: "palette",
        title: "Real-Time Customization",
        text: "Let customers personalize products live with instant visual feedback directly on your storefront.",
      },
      {
        icon: "layers",
        title: "Multi-Side Design",
        text: "Support front, back, sleeves, and more so customers can create truly personalized products.",
      },
      {
        icon: "circle-dollar-sign",
        title: "Dynamic Pricing",
        text: "Adjust pricing based on selected design areas, extra options, and different print methods.",
      },
      {
        icon: "printer",
        title: "Print-Ready Order Data",
        text: "Get organized design details and production-friendly files to make fulfillment easier.",
      },
      {
        icon: "sparkles",
        title: "Better Customer Experience",
        text: "Create a smooth and interactive customization journey that builds confidence before purchase.",
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
