import type { CardItem, CtaLink, StepItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export type DesignLabHero = {
  eyebrow: string;
  title: string;
  lead: string[];
  ctas: CtaLink[];
  highlight: { title: string; items: string[] };
};

export type DesignLabCta = {
  title: string;
  text: string;
  cta: CtaLink;
  secondaryCta: CtaLink;
};

export const designLabHero = {
  eyebrow: "The shopper experience",
  title: "Inside the Design Lab",
  lead: [
    "When a shopper clicks Customize on a product page, Custy opens the Design Lab, a canvas editor where they build exactly what they want to buy, on every side of the product.",
    "Everything they create becomes structured design data on the order, so what you print is precisely what they approved.",
  ],
  ctas: [
    { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" },
    { label: "Try the live demo", href: "/live-demo", variant: "secondary" },
  ],
  highlight: {
    title: "What shoppers can do",
    items: [
      "Style text with outlines, shadows and your font library",
      "Browse clipart by category, with any surcharge shown inline",
      "Upload their own images and crop, mask or filter them",
      "Design every side you enabled and preview them together",
      "Save the design and reopen it from a shareable link",
    ],
  },
} satisfies DesignLabHero;

export const designTools: CardItem[] = [
  {
    icon: "type",
    title: "Text, exactly as they want it",
    text: "Font family, size, weight, letter spacing and line height, plus two outline layers and a drop shadow with its own distance and angle, all in fonts you upload and organize.",
  },
  {
    icon: "sparkles",
    title: "A clipart and font library",
    text: "Curate clipart into nested categories with search and a popular filter, and charge a per-clipart surcharge that the shopper sees inline as they add it.",
  },
  {
    icon: "image",
    title: "Their own artwork",
    text: "Uploads up to 20 MB from a file or URL, with crop, background removal, brightness and contrast, mask shapes, and nine filters before the image is ever placed.",
  },
  {
    icon: "layers",
    title: "Every printable side",
    text: "Switch between front, back, sleeves and any side you define, each with its own print area and mockup, and recolor the garment art live from your color swatches.",
  },
];

export const safeguards: CardItem[] = [
  {
    icon: "eye",
    title: "Low-resolution warnings",
    text: "Set the DPI your production needs and the Design Lab warns shoppers before a blurry upload ever reaches the press.",
  },
  {
    icon: "shield-check",
    title: "Keep designs inside the lines",
    text: "Artwork crossing the printable boundary is flagged, and a max-colors limit per print location holds shoppers to what your method can actually print.",
  },
  {
    icon: "file-check",
    title: "Approval before checkout",
    text: "An optional approval step (your title, your body copy, your confirm button) makes shoppers sign off on the artwork and mockup first.",
  },
  {
    icon: "mail",
    title: "Saved designs and quotes",
    text: "Shoppers save a design with a name and email and get a link they can reopen or send on, and you can route quote-first orders to an email instead.",
  },
];

export const designLabFlow: StepItem[] = [
  {
    number: 1,
    title: "Shopper designs",
    text: "Text, clipart and uploads across the sides you enabled, with live preview, 50 steps of undo, and zoom up to 3x.",
  },
  {
    number: 2,
    title: "Design becomes an order",
    text: "Previews are rendered, inventory is checked per size and color, and a hidden product carries the design through checkout.",
  },
  {
    number: 3,
    title: "You review and download",
    text: "Orders arrive with per-item design downloads: vector SVG or PDF, raster PNG or JPG, at up to 300 DPI, transparent or on a background.",
  },
  {
    number: 4,
    title: "Production runs",
    text: "Print-ready files go to your press or print partner with nothing to rebuild by hand.",
  },
];

export const designLabCta = {
  title: "Give shoppers the pen",
  text: "Stores sell more when customers design what they buy. Turn the Design Lab on for your first product today.",
  cta: { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" },
  secondaryCta: { label: "See how it works", href: "/#how-it-works", variant: "secondary" },
} satisfies DesignLabCta;
