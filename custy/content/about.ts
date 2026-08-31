import type { CardItem, CtaLink } from "@/components/lander";
import { APP_URL } from "@/lib/site";
import { features } from "./features";

export type AboutHero = {
  eyebrow: string;
  title: string;
  lead: string[];
  ctas: CtaLink[];
  highlight: { title: string; items: string[] };
};

export type AboutListGroup = { title: string; items: string[] };

/** A `.custy-section` with a lead-in `.custy-two-col`/`.custy-feature-grid` card grid. */
export type AboutCardSection = { title: string; lead: string; cards: CardItem[] };

/** `.custy-section` combining a feature-card grid with a `.custy-list-grid` beneath it. */
export type AboutFeatureSection = {
  title: string;
  lead: string;
  cards: CardItem[];
  lists: AboutListGroup[];
};

/** `.custy-section` made entirely of a `.custy-list-grid` (no card grid). */
export type AboutListSection = { title: string; lead: string; lists: AboutListGroup[] };

export type AboutCta = {
  title: string;
  text: string;
  cta: CtaLink;
  secondaryCta: CtaLink;
};

// Copy is written from docs/CUSTY_APP_MARKETING_SITE_BRIEF.md, which is derived
// from the shipped code — the capability claims on this page are all things the
// product does today. Card `icon:` values are semantic names resolved to SVG
// stroke icons by components/lander/icons.tsx.
//
// CTA destinations: labels naming a concrete section map there directly; "Install
// on Shopify" maps to the real App Store listing (`APP_URL`), and the two
// "Start ... Free Trial" buttons route to the pricing section, avoiding a
// same-box duplicate destination with the closing band's App Store link.
export const about = {
  hero: {
    eyebrow: "About Custy • Built for Shopify",
    title: "Helping Shopify Merchants Create, Customize, and Sell Without Limits",
    lead: [
      "Custy exists to make one thing effortless for Shopify merchants: letting customers design the product they are about to buy, right on the product page, without slowing the store down or creating work for the people who have to print it.",
      "Whether it's a t-shirt, hoodie, cap, mug or any print-on-demand product, shoppers get real creative freedom and you get artwork your production team can actually use.",
    ],
    ctas: [
      { label: "Start 30-Day Free Trial", href: "/#pricing", variant: "primary" },
      { label: "View Features", href: "/#features", variant: "secondary" },
    ],
    highlight: {
      title: "What defines Custy",
      items: [
        "Built specifically for Shopify merchants and POD workflows",
        "Embedded in Shopify admin and built on Shopify Polaris",
        "A real design studio, backed by a pricing engine built for printing",
        "Print-ready artwork on every order, at up to 300 DPI",
        "English and French out of the box, with GDPR webhooks in place",
      ],
    },
  } satisfies AboutHero,

  vision: {
    title: "Our Vision",
    lead: "We believe the future of eCommerce is personalization. Customers no longer want generic products. They want something unique, something personal.",
    cards: [
      {
        title: "Personalization Is the Future",
        text: "Modern shoppers expect more than a standard product page. They want products that feel personal, expressive, and meaningful. Custy helps merchants meet that demand with a customization experience that stays simple for the customer and practical for the business.",
      },
      {
        title: "Turning Products into Experiences",
        text: "A product a customer helped design is a product they are more invested in. Instead of offering just another item on a shelf, stores can offer creativity, ownership, and a stronger connection between the customer and what they buy.",
      },
    ] satisfies CardItem[],
  } satisfies AboutCardSection,

  whatWeDo: {
    title: "What We Do",
    lead: "Custy is a Shopify app for print-on-demand businesses, print shops, and any merchant who wants customers to personalize what they buy.",
    cards: [
      {
        icon: "shirt",
        title: "Built for POD",
        text: "A full design studio on the product page and print-ready artwork on the order: the two ends of a print-on-demand workflow, connected.",
      },
      {
        icon: "shopping-bag",
        title: "Made for Custom Stores",
        text: "From apparel to personalized gifts, reusable color sets, size sets and printing types mean you configure the rules once and apply them everywhere.",
      },
      {
        icon: "trending-up",
        title: "Focused on Growth",
        text: "Shoppers who design their own product buy with more confidence, and pricing that reflects real production cost protects the margin on every order.",
      },
    ] satisfies CardItem[],
    lists: [
      {
        title: "What customers can do",
        items: [
          "Customize products in real time",
          "Design across multiple print areas like front, back, and sleeves",
          "Choose sizes, colors and styles, with live stock status",
          "Preview every side, then save the design and share a link",
        ],
      },
      {
        title: "What merchants get behind the scenes",
        items: [
          "Print-ready artwork as SVG, PDF, PNG or JPG at up to 300 DPI",
          "Order detail showing every side, color, size and price",
          "Bulk status updates and downloads for high-volume days",
          "Reusable color sets, size sets, printing types and discount sets",
        ],
      },
    ],
  } satisfies AboutFeatureSection,

  // Sixth page section (design pass): the audience grid. Lead and cards are
  // pulled straight from content/features.ts's "Perfect For" section so the
  // two pages can never drift apart — only the title label is authored here.
  audiences: {
    title: "Who Custy Serves",
    lead: features.sections[2].lead,
    cards: features.sections[2].cards ?? [],
  } satisfies AboutCardSection,

  whyCusty: {
    title: "Why Custy",
    lead: "We didn't just build another product customizer. We built one that understands how printing is quoted, produced, and shipped.",
    cards: [
      {
        icon: "circle-dollar-sign",
        title: "Dynamic Pricing",
        text: "Setup fees, per color, per side, per character, per square inch, size-range grids and quantity discounts, priced the way a print shop actually quotes.",
      },
      {
        icon: "printer",
        title: "Modern Print Support",
        text: "Screen print, DTG, DTF, embroidery, vinyl and sublimation, each with its own color limits, minimums and pricing rules.",
      },
      {
        icon: "blocks",
        title: "Seamless Shopify Integration",
        text: "Embedded in Shopify admin, built on Polaris, billed through Shopify, and working on both vintage and Online Store 2.0 themes.",
      },
      {
        icon: "zap",
        title: "Fast User Experience",
        text: "A canvas editor with 50 steps of undo, zoom to 3x, and a dedicated mobile layout with full touch support below 750px.",
      },
      {
        icon: "shield-check",
        title: "Guardrails That Protect Production",
        text: "DPI warnings, print-area warnings, max-colors-per-location limits and an optional approval step keep unprintable artwork off the press.",
      },
      {
        icon: "chart-column",
        title: "Growth-Oriented Design",
        text: "Saved designs with shareable links, re-editing from the cart, and quantity discount ladders that encourage bigger orders.",
      },
    ] satisfies CardItem[],
  } satisfies AboutCardSection,

  modernEcommerce: {
    title: "Built for Modern eCommerce",
    lead: "Custy is designed for merchants around the world who want to launch a POD business, scale an existing store, offer a better customer experience, and increase average order value.",
    cards: [
      {
        title: "For Merchants at Every Stage",
        text: "Start free on five products, move to Starter as your catalog grows, and go unlimited on Pro when volume demands it. The same tools are there at every step. You are only choosing how much of them you need.",
      },
      {
        title: "Continuously Improving",
        text: "We continuously improve the app based on real merchant needs and changing industry trends. Our goal is to keep Custy practical, scalable, and valuable for modern eCommerce businesses that want to stay ahead.",
      },
    ] satisfies CardItem[],
  } satisfies AboutCardSection,

  commitment: {
    title: "Our Commitment",
    lead: "We are committed to providing reliable and scalable solutions, delivering excellent support, helping merchants grow their business, and maintaining transparency and data privacy.",
    lists: [
      {
        title: "What we stand for",
        items: [
          "Reliable and scalable solutions for growing Shopify stores",
          "Email support on every plan, priority on Starter, premium on Pro",
          "Pricing handled by Shopify, with no commission on your sales",
          "Transparency in how we operate and improve the product",
        ],
      },
      {
        title: "What merchants can expect",
        items: [
          "A product experience built with real store needs in mind",
          "Ongoing improvements guided by merchant feedback",
          "GDPR compliance webhooks and responsible data handling",
          "A long-term partner for custom product success",
        ],
      },
    ],
  } satisfies AboutListSection,

  cta: {
    title: "Build Better Custom Product Experiences with Custy",
    text: "Give your customers the freedom to create products they love while you simplify the workflow behind the scenes. Start with Custy and bring real-time product customization to your Shopify store.",
    cta: { label: "Start Free Trial", href: "/#pricing", variant: "light" },
    secondaryCta: { label: "Install on Shopify", href: APP_URL, variant: "outline" },
  } satisfies AboutCta,
};
