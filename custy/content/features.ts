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

// Transcribed verbatim from content/raw/features.html (custy-features-page). No
// <img> tags on this page, so no images to localize. Card `icon` glyphs are the
// exact emoji from the source's `.custy-feature-icon`/`.custy-audience-icon`
// tiles (decorative design elements per controller adjudication — the
// no-pictographic-emoji rule applies to site copy/prose, not `icon:` fields).
// Inline <strong> emphasis inside hero/CTA-band paragraphs is not representable
// by LanderHero/CtaBand's plain-string `lead`/`text` props, so it's flattened to
// plain text; no words were added, removed, or reordered.
export const features = {
  hero: {
    eyebrow: "Custy for Shopify • POD Ready",
    title: "Powerful Product Customization for Modern Shopify Stores",
    lead: [
      "Custy is a powerful, easy-to-use product customizer built for Shopify merchants selling personalized products — from print-on-demand stores to custom-made items — letting customers design directly on your store in real time through an intuitive design panel.",
      "Shoppers personalize t-shirts, hoodies, caps, and more with text, images, and artwork across multiple print areas like the front, back, and sleeves — creating a better shopping experience that boosts engagement, conversions, and average order value.",
    ],
    ctas: [
      { label: "Start 21-Day Free Trial", href: APP_URL, variant: "primary" },
      { label: "Install on Shopify", href: APP_URL, variant: "secondary" },
    ],
    highlight: {
      title: "Why merchants choose Custy",
      items: [
        "Live product customization with instant visual feedback",
        "Support for multiple print sides and product areas",
        "Flexible dynamic pricing based on real customization choices",
        "Print-ready file generation for smoother production workflows",
        "Fast Shopify integration with clear order design data",
      ],
    },
  } satisfies FeaturesHero,

  sections: [
    {
      title: "Key Features Built for POD Growth",
      lead: "Everything in Custy is designed to help Shopify merchants sell personalized products with less friction, better order accuracy, and a more engaging buyer experience.",
      cards: [
        {
          icon: "🎨",
          title: "Real-Time Product Customizer",
          text: "Let customers design products live on your storefront with an instant preview experience that feels smooth, visual, and easy to use.",
        },
        {
          icon: "🔄",
          title: "Multi-Side Customization",
          text: "Support multiple design areas including front, back, left sleeve, right sleeve, and other printable locations based on your product setup.",
        },
        {
          icon: "💰",
          title: "Dynamic Pricing Engine",
          text: "Automatically adjust pricing based on selected print areas, extra options, print methods, and design complexity to protect your margins.",
        },
        {
          icon: "🖨️",
          title: "DTG, DTF & Print-Ready Files",
          text: "Generate high-quality, fulfillment-ready design outputs that make production easier for DTG, DTF, and other print workflows.",
        },
        {
          icon: "🧩",
          title: "Flexible Product Options",
          text: "Offer sizes, colors, variants, product-specific configurations, and custom rules so each product can match your exact business needs.",
        },
        {
          icon: "📦",
          title: "Seamless Shopify Integration",
          text: "Orders include full design details and selected options, making fulfillment, review, and production handoff much faster and more organized.",
        },
        {
          icon: "⚡",
          title: "Fast & User-Friendly UI",
          text: "Custy is built for performance and ease of use, helping your customers customize products without confusion or unnecessary steps.",
        },
        {
          icon: "📈",
          title: "Higher Conversion Potential",
          text: "An interactive design experience keeps customers engaged longer, increases confidence before purchase, and can improve average order value.",
        },
        {
          icon: "🛍️",
          title: "Built for Scalable Custom Selling",
          text: "Whether you are launching a new custom store or expanding a growing POD brand, Custy is designed to support long-term growth.",
        },
      ],
    },
    {
      title: "How Custy Works",
      lead: "Custy keeps the workflow simple for merchants while giving customers a premium product customization experience from storefront to fulfillment.",
      steps: [
        {
          number: 1,
          title: "Install Custy",
          text: "Install Custy from the Shopify App Store and connect it to your store in just a few steps.",
        },
        {
          number: 2,
          title: "Enable Customization",
          text: "Choose your products and define print areas, options, variants, and pricing rules for customization.",
        },
        {
          number: 3,
          title: "Customers Design Live",
          text: "Your customers personalize products in real time by adding text, artwork, and images directly on the product.",
        },
        {
          number: 4,
          title: "Get Print-Ready Orders",
          text: "Orders include production-friendly design data and print-ready files so fulfillment becomes faster and easier.",
        },
      ],
    },
    {
      title: "Perfect For",
      lead: "Custy is made for Shopify merchants who want to turn standard products into interactive, personalized buying experiences.",
      cards: [
        {
          icon: "👕",
          title: "POD Businesses",
          text: "Offer live customization for apparel and print-on-demand products with a workflow built for production.",
        },
        {
          icon: "🧢",
          title: "Custom Apparel Stores",
          text: "Sell personalized t-shirts, hoodies, caps, and more with support for multiple design positions and options.",
        },
        {
          icon: "🎁",
          title: "Gift Shops",
          text: "Create a better customer experience for stores offering personalized gifts, occasion-based items, and unique products.",
        },
        {
          icon: "📊",
          title: "Growth-Focused Merchants",
          text: "Increase engagement and sales with an interactive customization journey that helps shoppers buy with confidence.",
        },
      ],
    },
  ] satisfies FeaturesSection[],

  cta: {
    title: "Start with Custy Risk-Free",
    text: "Enjoy a 21-day free trial with full access to Custy’s core features — test it on your Shopify store, explore the customization workflow, and see how easy it is to sell personalized products. No risk, and you can cancel anytime.",
    cta: { label: "Start Free Trial", href: APP_URL, variant: "light" },
    secondaryCta: { label: "View Pricing", href: "/pricing", variant: "outline" },
  } satisfies FeaturesCta,
};
