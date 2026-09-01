import { APP_URL } from "./site";

export type NavLink = { label: string; href: string; external?: boolean; description?: string };
export type FooterColumn = { title: string; blurb?: string; links: NavLink[] };
export type SocialLink = { label: string; href: string };

export const headerNav: NavLink[] = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Live Demo", href: "/#live-demo" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
  { label: "Resources", href: "/resources" },
];

export const resourceMenuLinks: NavLink[] = [
  {
    label: "Help Center",
    href: "/resources",
    description: "Install, configure, and test Custy step by step.",
  },
  {
    label: "FAQs",
    href: "/faq",
    description: "Find answers to common Custy questions.",
  },
];

export const headerCta: NavLink = {
  label: "Start Free Trial",
  href: APP_URL,
  external: true,
};

export const footerColumns: FooterColumn[] = [
  {
    title: "About Custy",
    blurb:
      "Custy is a Shopify app that lets merchants sell personalized print-on-demand products from their own store. Customers open the designer on your product page, create the item they want, and check out without leaving the store. Each order arrives with print-ready files, so fulfillment can start without rebuilding the design.",
    links: [],
  },
  {
    title: "Learn more",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "FAQ", href: "/faq" },
      { label: "Live Demo", href: "/#live-demo" },
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/CustyAPP" },
  { label: "Instagram", href: "https://www.instagram.com/CustyAPP" },
  { label: "YouTube", href: "https://www.youtube.com/@CustyAPP" },
  { label: "TikTok", href: "https://www.tiktok.com/CustyAPP" },
  { label: "Twitter", href: "https://x.com/CustyAPP" },
];
