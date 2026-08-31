import type { StepIllustrationName } from "@/components/lander";
import { APP_URL } from "@/lib/site";

/** A high-level beat in the homepage "How Custy works" band. */
export type HomeStep = {
  number: number;
  illustration: StepIllustrationName;
  title: string;
  text: string;
};

/** One alternating image-and-text row in the homepage features band. */
export type FeatureRow = {
  title: string;
  text: string;
  /** Concrete specifics under the paragraph, rendered as a checked list. */
  points: string[];
  image: ImageField;
};

/** A second-tier illustrated card under the main feature rows. */
export type FeatureCard = {
  title: string;
  text: string;
  image: ImageField;
};

export type ImageField = { src: string; width: number; height: number; alt?: string };

export type Cta = { label: string; href: string; external?: boolean; variant?: "primary" | "secondary" };

export type RichBlock = {
  heading?: string;
  /** Substring of `heading` painted with the brand gradient (hero only). */
  highlight?: string;
  /** Short three-beat punchline under the h1 (hero only). */
  tagline?: string;
  html: string;
  image?: ImageField;
  ctas?: Cta[];
};

export const home = {
  intro: {
    heading: "The Shopify product customizer for POD stores",
    highlight: "POD",
    tagline: "Shoppers design it. You get print-ready artwork.",
    html: `<p>Custy turns any Shopify product into a customizable one. Shoppers open a full design studio on your product page, add text and artwork, preview every side, and add the finished design straight to their cart, while you get print-ready files, real production pricing, and order management without leaving Shopify admin.</p>`,
    image: {
      src: "/images/content/custy_left_photo.jpg",
      width: 795,
      height: 857,
      alt: "",
    },
    ctas: [
      { label: "Start Free Trial", href: APP_URL, external: true },
      { label: "Live Demo", href: "/live-demo", variant: "secondary" },
    ],
  } as RichBlock,

  // The homepage tells the story in three plain beats — you set up, the customer
  // designs, you print — rather than slicing the setup guide on /how-it-works.
  // A visitor here wants to know what Custy does, not how to configure it.
  howItWorks: {
    title: "How Custy works",
    lead: "Let your customers design their own products right on your store, then print exactly what they approved.",
    steps: [
      {
        number: 1,
        illustration: "catalog",
        title: "Install & add products",
        text: "Install Custy from the Shopify App Store and sync your catalog in one click. Choose which products customers can personalize and set your print areas and pricing.",
      },
      {
        number: 2,
        illustration: "design",
        title: "Customers design & order",
        text: "Shoppers add text, artwork and clipart on any side of the product, preview it live, and add the finished design straight to their cart.",
      },
      {
        number: 3,
        illustration: "print",
        title: "Get print-ready files",
        text: "Every order arrives with the full design details and production-ready artwork you can download as SVG, PDF, PNG or JPG at up to 300 DPI.",
      },
    ] satisfies HomeStep[],
  },

  // Section headlines come from the copy bank in section 6 of the marketing
  // brief, and the three rows are its section-1 primary value props in order:
  // the design studio, the pricing engine, then the print-ready output.
  features: {
    title: "From blank product to print-ready artwork",
    lead: "Custy gives your customers a real design studio, prices every order the way printing is actually quoted, and leaves your production team files it can send straight to the press.",
    rows: [
      {
        title: "Design studio",
        text: "Clicking Customize opens the Design Lab, a full canvas editor right on your product page. Shoppers add text, browse your clipart library, upload their own artwork, and work in layers with fifty steps of undo, previewing every side before they buy.",
        points: [
          "Text styling with outlines, drop shadows and fonts you upload yourself",
          "Image uploads up to 20 MB with crop, masking, background removal and filters",
          "Layers, alignment, zoom to 3x, and a mobile layout with full touch support",
        ],
        image: {
          src: "/images/features/design-studio.webp",
          width: 1200,
          height: 800,
          alt: "",
        },
      },
      {
        title: "Pricing engine",
        text: "Custy prices an order the way a print shop quotes one. Charge by color, by side, by character or by square inch, layer on setup fees and size-range grids, and let every rule combine automatically as the shopper designs.",
        points: [
          "Setup fees per side and per color, waived above a quantity threshold",
          "Per-color tables with a max-color cap, plus tiered and per-location pricing",
          "Quantity discounts shown as a Buy more, Save more ladder in the editor",
        ],
        image: {
          src: "/images/features/pricing.webp",
          width: 1200,
          height: 800,
          alt: "",
        },
      },
      {
        title: "Print-ready files",
        text: "Every order arrives with the design, the side and color breakdown, and artwork your team can use immediately, with guardrails that stop unprintable work long before it reaches the press.",
        points: [
          "SVG, PDF, PNG or JPG at up to 300 DPI, transparent or on a background",
          "DPI, print-area and max-colors warnings, plus an optional approval step",
          "Internal statuses and bulk updates from New through to Completed",
        ],
        image: {
          src: "/images/features/print-ready.webp",
          width: 1200,
          height: 800,
          alt: "",
        },
      },
    ] satisfies FeatureRow[],
    // A 2x2 second tier under the three main rows. These carry object-only
    // illustrations (no people) so they read as subordinate to the rows above.
    // "Set it up once, reuse it everywhere" is the brief's own section-6
    // headline for color sets, size sets and printing types.
    supporting: [
      {
        title: "Every side you print on",
        text: "Front, back, sleeves: add any side you sell, each with its own print area, mockup and named parts. Your color swatches recolor the garment art live as shoppers browse.",
        image: {
          src: "/images/features/multi-side.webp",
          width: 900,
          height: 600,
          alt: "",
        },
      },
      {
        title: "Set it up once, reuse it everywhere",
        text: "Color sets, size sets, printing types and discount sets are defined once and applied across your catalog, with per-variant inventory and SKUs behind them.",
        image: {
          src: "/images/features/reusable-sets.webp",
          width: 900,
          height: 600,
          alt: "",
        },
      },
      {
        title: "Built into Shopify, not bolted on",
        text: "Custy is embedded in Shopify admin and built on Polaris. The Customize button is a theme block, billing runs through Shopify, and it works on vintage and Online Store 2.0 themes.",
        image: {
          src: "/images/features/shopify.webp",
          width: 900,
          height: 600,
          alt: "",
        },
      },
      {
        title: "Designs your shoppers can come back to",
        text: "Shoppers save a design with a name and email, get a shareable link they can reopen or send on, and can edit it again straight from the cart.",
        image: {
          src: "/images/features/saved-designs.webp",
          width: 900,
          height: 600,
          alt: "",
        },
      },
    ] satisfies FeatureCard[],
  },

  contact: {
    title: "Get in touch",
    lead: "Ask about setup, printing methods, pricing rules, or whether Custy fits the way your store produces orders. We will help you get started.",
  },
};
