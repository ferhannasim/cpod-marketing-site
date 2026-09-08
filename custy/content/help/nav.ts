import type { HelpHub, HelpNavCategory } from "./types";
import { overview } from "./overview";
import { installCusty } from "./install-custy";
import { freeTrial } from "./free-trial";
import { upgradeYourPlan } from "./upgrade-your-plan";
import { embedCusty } from "./embed-custy";
import { firstProduct } from "./first-product";
import { printAreasAndMarkAreas } from "./print-areas-and-mark-areas";
import { pricingRules } from "./pricing-rules";

const installationsArticles = [installCusty, freeTrial, upgradeYourPlan] as const;
const appActivationArticles = [embedCusty] as const;
const productSetupArticles = [firstProduct, printAreasAndMarkAreas, pricingRules] as const;

function toNavArticle(article: {
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  subCategorySlug?: string | null;
}) {
  const base = article.subCategorySlug
    ? `/help/${article.categorySlug}/${article.subCategorySlug}/${article.slug}`
    : `/help/${article.categorySlug}/${article.slug}`;
  return {
    slug: article.slug,
    title: article.title,
    href: base,
    summary: article.summary,
  };
}

export const helpCategories: HelpNavCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description:
      "Discover a simple installation guide, subscription plans, theme activation, and first product setup.",
    href: "/help/getting-started",
    icon: "zap",
    overviewArticles: [toNavArticle(overview)],
    subCategories: [
      {
        slug: "installations",
        title: "Installations",
        description: "Install Custy, start the free trial, and manage your plan.",
        href: "/help/getting-started/installations",
        articles: installationsArticles.map(toNavArticle),
      },
      {
        slug: "app-activation",
        title: "App Activation",
        description: "Embed the cart editor and add the Customize It button to your theme.",
        href: "/help/getting-started/app-activation",
        articles: appActivationArticles.map(toNavArticle),
      },
      {
        slug: "product-setup",
        title: "Product Setup",
        description: "Make a product customizable, define print areas, and configure pricing.",
        href: "/help/getting-started/product-setup",
        articles: productSetupArticles.map(toNavArticle),
      },
    ],
  },
];

/** Flat reading order for Previous / Next across Getting Started. */
export const gettingStartedReadingOrder = [
  overview,
  ...installationsArticles,
  ...appActivationArticles,
  ...productSetupArticles,
] as const;

export const helpHub: HelpHub = {
  title: "Custy Help Centre",
  lead: [
    "Guides for Shopify merchants who are installing Custy, activating the storefront, and setting up customizable products.",
    "Start with Getting Started — the same path as Overview, Installations, App Activation, then Product Setup.",
  ],
  pathTitle: "Recommended path",
  pathLead: "Complete Getting Started in order the first time you set up a store.",
  pathSteps: [
    {
      title: overview.title,
      href: toNavArticle(overview).href,
      summary: overview.summary,
    },
    {
      title: installCusty.title,
      href: toNavArticle(installCusty).href,
      summary: installCusty.summary,
    },
    {
      title: freeTrial.title,
      href: toNavArticle(freeTrial).href,
      summary: freeTrial.summary,
    },
    {
      title: embedCusty.title,
      href: toNavArticle(embedCusty).href,
      summary: embedCusty.summary,
    },
    {
      title: firstProduct.title,
      href: toNavArticle(firstProduct).href,
      summary: firstProduct.summary,
    },
    {
      title: printAreasAndMarkAreas.title,
      href: toNavArticle(printAreasAndMarkAreas).href,
      summary: printAreasAndMarkAreas.summary,
    },
    {
      title: pricingRules.title,
      href: toNavArticle(pricingRules).href,
      summary: pricingRules.summary,
    },
  ],
};

export const helpSidebarLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/about#contact" },
] as const;
