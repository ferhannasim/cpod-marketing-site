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

// Transcribed verbatim from content/raw/about-us.html (custy-about-page). No <img>
// tags on this page, so no images to localize. Each card's `icon:` value below (three
// on "What We Do", six on "Why Custy") is a semantic name resolved to an SVG stroke
// icon by components/lander/icons.tsx (the design pass replaced the source's emoji
// tiles); prose itself is emoji-free. The em dashes and
// curly apostrophes/bullet ("it's", "didn't", the eyebrow's "•") are kept verbatim
// as ordinary punctuation — confirmed with `grep -noP '[^\x00-\x7F]'` that no other
// non-ASCII characters exist on this page.
//
// The `<strong>Custy</strong>` emphasis in the hero's first lead paragraph isn't
// representable by `LanderHero`'s plain-string `lead` prop, so it's flattened to
// plain text per the established ruling — no words added, removed, or reordered.
//
// Every CTA on this page is `href="#"` in the raw source (unlike features.html and
// how-it-works.html, which already carry real hrefs) — this is the one page of the
// four where the destination is a judgment call, not a transcription. Labels that
// name a concrete internal page map there directly ("View Features" → /features);
// "Install on Shopify" maps to the real Shopify App Store listing (`APP_URL`), matching
// every other page's identically-labeled button. The two "Start ... Free Trial"
// buttons (hero + closing band) route to `/pricing`, mirroring how-it-works.ts's
// choice for the same ambiguous case and avoiding a same-box duplicate destination
// with the closing band's "Install on Shopify" (→ `APP_URL`).
//
// The four `.custy-card` (two-col prose) bodies and both `.custy-list-grid` groups
// each carry exactly one paragraph / list in the current source (verified via
// `grep -c '<p>'`) — despite `CardItem.text`'s "about-us prose cards carry two"
// forward note (Task 9), this page's live copy only has one per card, so plain
// strings are used rather than arrays; no paragraph was invented to fill the shape.
export const about = {
  hero: {
    eyebrow: "About Custy • Built for Shopify",
    title: "Helping Shopify Merchants Create, Customize, and Sell Without Limits",
    lead: [
      "At Custy, our mission is simple — to empower Shopify merchants to create, customize, and sell products without limits by solving one of eCommerce’s biggest challenges: seamless, real-time product customization that stays fast, intuitive, and conversion-focused.",
      "Whether it’s a t-shirt, hoodie, cap, or any print-on-demand product, Custy gives your customers the freedom to design exactly what they want and see it instantly.",
    ],
    ctas: [
      { label: "Start 30-Day Free Trial", href: "/pricing", variant: "primary" },
      { label: "View Features", href: "/features", variant: "secondary" },
    ],
    highlight: {
      title: "What defines Custy",
      items: [
        "Built specifically for Shopify merchants and POD workflows",
        "Focused on real-time customization and better conversion",
        "Designed to simplify fulfillment with print-ready files",
        "Made for stores that want scalable growth, not complexity",
        "Committed to support, transparency, and merchant success",
      ],
    },
  } satisfies AboutHero,

  vision: {
    title: "Our Vision",
    lead: "We believe the future of eCommerce is personalization. Customers no longer want generic products — they want something unique, something personal.",
    cards: [
      {
        title: "Personalization Is the Future",
        text: "Modern shoppers expect more than a standard product page — they want products that feel personal, expressive, and meaningful. Custy helps merchants meet that demand with a powerful customization experience that stays simple for the customer and practical for the business.",
      },
      {
        title: "Turning Products into Experiences",
        text: "Custy helps merchants tap into growing demand for custom products by turning ordinary items into personalized buying experiences. Instead of offering just another product, stores can offer creativity, ownership, and a stronger connection between customer and purchase.",
      },
    ] satisfies CardItem[],
  } satisfies AboutCardSection,

  whatWeDo: {
    title: "What We Do",
    lead: "Custy is a Shopify app designed specifically for print-on-demand businesses, custom product stores, and merchants who want to increase engagement and sales.",
    cards: [
      {
        icon: "shirt",
        title: "Built for POD",
        text: "Custy supports print-on-demand businesses that need a smooth path from product customization to production-ready fulfillment.",
      },
      {
        icon: "shopping-bag",
        title: "Made for Custom Stores",
        text: "From apparel to personalized gifts, Custy gives merchants flexible tools to sell products customers can truly make their own.",
      },
      {
        icon: "trending-up",
        title: "Focused on Growth",
        text: "By improving engagement and making customization easier, Custy helps merchants drive higher conversion and stronger average order value.",
      },
    ] satisfies CardItem[],
    lists: [
      {
        title: "What customers can do",
        items: [
          "Customize products in real time",
          "Design across multiple print areas like front, back, and sleeves",
          "Choose sizes, colors, and styles",
          "Preview designs instantly before purchase",
        ],
      },
      {
        title: "What merchants get behind the scenes",
        items: [
          "Automatic print-ready file generation",
          "Cleaner fulfillment workflows",
          "Faster and more accurate order processing",
          "Better structure for scaling custom product operations",
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
    lead: "We didn’t just build another product customizer — we built a tool focused on performance, scalability, and revenue growth.",
    cards: [
      {
        icon: "circle-dollar-sign",
        title: "Dynamic Pricing",
        text: "Adjust prices based on real customization choices so you stay flexible while protecting your margins.",
      },
      {
        icon: "printer",
        title: "Modern Print Support",
        text: "Support DTG, DTF, and other production workflows with design data prepared for real-world fulfillment.",
      },
      {
        icon: "blocks",
        title: "Seamless Shopify Integration",
        text: "Connect directly with your Shopify store so orders, product options, and design details flow more smoothly.",
      },
      {
        icon: "zap",
        title: "Fast User Experience",
        text: "Deliver an intuitive customization experience that feels easy to use and keeps shoppers engaged.",
      },
      {
        icon: "server",
        title: "Reliable Infrastructure",
        text: "Built for growing stores that need dependable performance and a platform that can evolve with their business.",
      },
      {
        icon: "chart-column",
        title: "Growth-Oriented Design",
        text: "Everything in Custy is created to help merchants improve conversion, efficiency, and long-term store performance.",
      },
    ] satisfies CardItem[],
  } satisfies AboutCardSection,

  modernEcommerce: {
    title: "Built for Modern eCommerce",
    lead: "Custy is designed for merchants around the world who want to launch a POD business, scale an existing store, offer a better customer experience, and increase average order value.",
    cards: [
      {
        title: "For Merchants at Every Stage",
        text: "Whether you are just starting a custom product business or already running an established Shopify store, Custy is built to support your next step. The platform is designed to remove friction from customization while helping merchants operate more efficiently.",
      },
      {
        title: "Continuously Improving",
        text: "We continuously improve our platform based on real merchant needs and changing industry trends. Our goal is to keep Custy practical, scalable, and valuable for modern eCommerce businesses that want to stay ahead.",
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
          "Excellent support that helps merchants move faster",
          "Tools designed to support real business growth",
          "Transparency in how we operate and improve the product",
        ],
      },
      {
        title: "What merchants can expect",
        items: [
          "A product experience built with real store needs in mind",
          "Ongoing improvements guided by merchant feedback",
          "Respect for privacy and responsible data handling",
          "A long-term partner for custom product success",
        ],
      },
    ],
  } satisfies AboutListSection,

  cta: {
    title: "Build Better Custom Product Experiences with Custy",
    text: "Give your customers the freedom to create products they love while you simplify the workflow behind the scenes. Start with Custy and bring real-time product customization to your Shopify store.",
    cta: { label: "Start Free Trial", href: "/pricing", variant: "light" },
    secondaryCta: { label: "Install on Shopify", href: APP_URL, variant: "outline" },
  } satisfies AboutCta,
};
