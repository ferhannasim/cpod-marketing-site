import type { CardItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export type ImageField = { src: string; width: number; height: number; alt?: string };

export type Cta = { label: string; href: string; external?: boolean; variant?: "primary" | "secondary" };

export type RichBlock = {
  heading?: string;
  html: string;
  image?: ImageField;
  ctas?: Cta[];
};

export const home = {
  intro: {
    heading: "The Shopify product customizer for print-on-demand stores",
    html: `<p>Custy lets shoppers design apparel and products on your store — then you get print-ready orders. Built for merchants who sell personalized t-shirts, hoodies, caps, and more.</p>`,
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

  howItWorks: {
    title: "How Custy works",
    lead: "Customers design on your store. You set the rules once, then receive print-ready orders. Built for POD stores, apparel brands, team merch, and personalized gifts.",
  },

  designLabCard: {
    icon: "sparkles",
    title: "Design Lab",
    text: "Text, clipart, uploads, and every printable side — with DPI checks, bounds warnings, and approval before checkout.",
  } satisfies CardItem,

  contact: {
    title: "Get in touch",
    lead: "Custy is built by the Cheapest Print On Demand team. Ask about setup, plans, or whether Custy fits your store — we will help you get started.",
  },
};
