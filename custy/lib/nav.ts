import { APP_URL } from "./site";

export type NavLink = { label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: NavLink[] };
export type SocialLink = { label: string; href: string };

export const headerNav: NavLink[] = [
  { label: "How it Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Features", href: "/features" },
  { label: "Design Lab", href: "/design-lab" },
  { label: "Live Demo", href: "/live-demo" },
  { label: "Blog", href: "/blog" },
];

export const headerCta: NavLink = {
  label: "Install Now on Shopify",
  href: APP_URL,
  external: true,
};

// Live footer: Search + "Powered by Shopify" + dead "#" FAQ link dropped (no commerce).
export const footerColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "How it Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Features", href: "/features" },
      { label: "Design Lab", href: "/design-lab" },
      { label: "Live Demo", href: "/live-demo" },
      { label: "Blog", href: "/blog" },
      { label: "Install Now on Shopify", href: APP_URL, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
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
