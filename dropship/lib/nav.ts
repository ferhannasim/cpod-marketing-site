import { CUSTY_SITE_URL } from "./site";

export type NavLink = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; links: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export function isGroup(entry: NavEntry): entry is NavGroup {
  return "links" in entry;
}

export const primaryNav: NavEntry[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Catalog", href: "/catalog" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Start a brand",
    links: [
      { label: "Start your ecommerce brand", href: "/start-your-ecommerce-brand" },
      { label: "Launch an automated brand", href: "/launch-automated-brand" },
    ],
  },
  {
    label: "Help & FAQs",
    links: [
      { label: "General FAQ", href: "/faq" },
      { label: "DTF FAQ", href: "/faq/dtf" },
      { label: "Sublimation FAQ", href: "/faq/sublimation" },
      { label: "Print on your own item", href: "/faq/print-on-your-own-item" },
      { label: "Delivery speed", href: "/delivery" },
      { label: "Billing information", href: "/billing" },
      { label: "Video library", href: "/videos" },
    ],
  },
  {
    label: "Sizing",
    links: [
      { label: "Size charts", href: "/size-charts" },
      { label: "How to measure", href: "/measuring" },
    ],
  },
  { label: "Custy", href: "/custy" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: NavGroup[] = [
  {
    label: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "For suppliers", href: "/suppliers" },
      { label: "Start your ecommerce brand", href: "/start-your-ecommerce-brand" },
      { label: "Launch an automated brand", href: "/launch-automated-brand" },
      { label: "Contact", href: "/contact" },
      { label: "Custy design app", href: CUSTY_SITE_URL, external: true },
    ],
  },
  {
    label: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "DTF FAQ", href: "/faq/dtf" },
      { label: "Sublimation FAQ", href: "/faq/sublimation" },
      { label: "Print on your own item", href: "/faq/print-on-your-own-item" },
      { label: "Delivery speed", href: "/delivery" },
      { label: "Billing information", href: "/billing" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Catalog", href: "/catalog" },
      { label: "Printing notice", href: "/printing-notice" },
      { label: "Sublimation printing notice", href: "/sublimation-printing-notice" },
      { label: "Artwork & mockup approval", href: "/artwork-approval" },
      { label: "Size charts", href: "/size-charts" },
      { label: "How to measure", href: "/measuring" },
      { label: "Video library", href: "/videos" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy policy", href: "/policies/privacy" },
      { label: "Terms of service", href: "/policies/terms" },
      { label: "Refund policy", href: "/policies/refund" },
      { label: "Shipping policy", href: "/policies/shipping" },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/CheapestPrintOnDemand/" },
  { label: "Instagram", href: "https://www.instagram.com/cheapestprintondemand/" },
  { label: "TikTok", href: "https://www.tiktok.com/@cheapest.print.on.demand" },
  { label: "YouTube", href: "https://www.youtube.com/@DropShipPOD" },
];
