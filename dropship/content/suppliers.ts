import type { CardItem } from "@/components/lander";

export const suppliersHero = {
  eyebrow: "For suppliers",
  title: "Run your print shop on the same platform",
  lead: [
    "DropShipPOD is a dual-role app: merchants sell, suppliers produce. As a supplier you manage your catalog, receive dropship orders the moment they're placed, and download print-ready files without asking anyone to re-export artwork.",
  ],
  ctas: [{ label: "Talk to us about supplying", href: "/contact" }],
};

export const supplierFlow = [
  { number: 1, title: "Orders arrive in your dashboard", text: "Every paid merchant order lands in your queue with product, variant and artwork details attached." },
  { number: 2, title: "Download the print package", text: "One ZIP per order item: print files, design and product detail sheets, preview images and a shipping CSV." },
  { number: 3, title: "Produce and update status", text: "Move orders through Processing and Shipped as you work; merchants see progress without emailing you." },
  { number: 4, title: "Tracking closes the loop", text: "Shipment tracking flows back to the merchant's Shopify order automatically." },
];

export const fileExports: CardItem[] = [
  {
    icon: "file-check",
    title: "Vector & raster files",
    text: "SVG and PDF vectors for crisp production, or PNG and JPG rasters — with transparent or coloured backgrounds.",
  },
  {
    icon: "printer",
    title: "Your choice of DPI",
    text: "Export at 72, 96, 150 or 300 DPI to match your press. Custom fonts come embedded, so nothing rasterizes wrong.",
  },
  {
    icon: "download",
    title: "Everything in one ZIP",
    text: "Design details, product details, previews and a shipping CSV ride along with the artwork — one download per order item.",
  },
  {
    icon: "clock",
    title: "Status workflow",
    text: "A clear Processing → Shipped → Completed pipeline keeps every order's state visible to you and the merchant.",
  },
];

export const suppliersCta = {
  title: "Supply the network",
  text: "If you run production capacity — DTF, DTG, sublimation or embroidery — let's talk about putting it to work.",
  cta: { label: "Contact us", href: "/contact" },
  secondaryCta: { label: "See how merchants sell", href: "/features" },
};
