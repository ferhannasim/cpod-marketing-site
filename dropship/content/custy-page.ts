import type { CardItem } from "@/components/lander";
import { CUSTY_APP_URL, CUSTY_SITE_URL } from "@/lib/site";

export const custyHero = {
  eyebrow: "DropShipPOD + Custy",
  title: "Let customers design the products you dropship",
  lead: [
    "Custy is our sibling Shopify app: it puts a Customize It button on your product pages and opens a design lab where shoppers add text, cliparts and their own uploads.",
    "Products you import with DropShipPOD are Custy-aware — finished designs come back as print-ready files through the same production pipeline.",
  ],
  ctas: [
    { label: "Install Custy free", href: CUSTY_APP_URL },
    { label: "Visit custyapp.com", href: CUSTY_SITE_URL },
  ],
};

export const custyFeatures: CardItem[] = [
  {
    icon: "palette",
    title: "A design lab on your storefront",
    text: "Shoppers personalize products right on your store — text, cliparts, fonts and photo uploads, with live preview.",
  },
  {
    icon: "layers",
    title: "Multi-side printing",
    text: "Front, back, sleeves and neck tag — each side gets its own print area and mockup.",
  },
  {
    icon: "file-check",
    title: "Print-ready output",
    text: "Finished designs export as vector SVG/PDF or high-DPI raster, ready for the press with no manual rework.",
  },
  {
    icon: "shield-check",
    title: "You approve before it prints",
    text: "Optional approval and disclaimer flow, low-resolution warnings and out-of-bounds checks protect quality.",
  },
];

export const custyHandoff = [
  "Install Custy straight from your DropShipPOD admin",
  "The free plan activates automatically — no payment required",
  "Your dropshipped products can be flagged customizable",
  "Custom orders flow into the same production pipeline",
];

export const custyCta = {
  title: "Add personalization to your store",
  text: "Custy's free plan covers your first customizable products. Upgrade only when your volume does.",
  cta: { label: "Install Custy free", href: CUSTY_APP_URL },
  secondaryCta: { label: "Explore Custy's site", href: CUSTY_SITE_URL },
};
