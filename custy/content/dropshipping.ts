import type { CardItem, StepItem } from "@/components/lander";
import { APP_URL, DROPSHIP_APP_URL, DROPSHIP_SITE_URL } from "@/lib/site";

export const dropshippingHero = {
  eyebrow: "Custy + DropShipPOD",
  title: "Customization meets dropshipping",
  lead: [
    "Custy and DropShipPOD are sibling Shopify apps built on the same platform. DropShipPOD fills your store with print-on-demand products and fulfills the orders; Custy lets your customers personalize those products before they buy.",
    "Together they close the loop: import a blank, let the shopper design it, and the print-ready file lands with the supplier who produces it.",
  ],
  ctas: [
    { label: "Get DropShipPOD", href: DROPSHIP_APP_URL, variant: "primary" as const },
    { label: "Visit dropshippod.ca", href: DROPSHIP_SITE_URL, variant: "secondary" as const },
  ],
};

export const combo: CardItem[] = [
  {
    icon: "store",
    title: "One store, two roles",
    text: "Stores on the platform act as merchants or suppliers. Merchants sell and set markup; suppliers produce and ship — the apps route everything between them.",
  },
  {
    icon: "puzzle",
    title: "Dropshipped products, Custy-aware",
    text: "Products imported through DropShipPOD are tagged in Custy, and the supplier controls which of them can be customized — so nothing unprintable goes on sale.",
  },
  {
    icon: "file-check",
    title: "Print-ready hand-off",
    text: "A shopper's finished design travels with the order as vector or high-DPI raster files, straight to the supplier's download queue.",
  },
  {
    icon: "zap",
    title: "Free to start, on both sides",
    text: "DropShipPOD has no subscription, and Custy's Free plan activates automatically when installed from the DropShipPOD admin — no payment required.",
  },
];

export const dropshipFlow: StepItem[] = [
  { number: 1, title: "Import with DropShipPOD", text: "Pull blanks from the supplier catalog into your Shopify store and set your markup." },
  { number: 2, title: "Customers design with Custy", text: "The Customize It button opens the Design Lab on the products you flag as customizable." },
  { number: 3, title: "Orders carry the design", text: "Paid orders include complete design data and print-ready files." },
  { number: 4, title: "The supplier produces and ships", text: "Production runs from the same platform, and tracking flows back to your store." },
];

export const dropshippingCta = {
  title: "Run the full loop",
  text: "Start with either app — they're built to find each other. Add Custy to a DropShipPOD store, or DropShipPOD to a Custy store.",
  cta: { label: "Get DropShipPOD", href: DROPSHIP_APP_URL, variant: "primary" as const },
  secondaryCta: { label: "Install Custy", href: APP_URL, variant: "secondary" as const },
};
