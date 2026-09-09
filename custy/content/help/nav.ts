import type { HelpHub, HelpNavCategory } from "./types";
import { overview } from "./overview";
import { installCusty } from "./install-custy";
import { freeTrial } from "./free-trial";
import { upgradeYourPlan } from "./upgrade-your-plan";
import { embedCusty } from "./embed-custy";
import { overviewOfTheDesignLab } from "./overview-of-the-design-lab";
import { firstProduct } from "./first-product";
import { printAreasAndMarkAreas } from "./print-areas-and-mark-areas";
import { pricingRules } from "./pricing-rules";

const installationsArticles = [installCusty, freeTrial, upgradeYourPlan] as const;
const appActivationArticles = [embedCusty] as const;
const customProductsArticles = [firstProduct, printAreasAndMarkAreas] as const;
const printingTypesArticles = [pricingRules] as const;

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
      "Add Custy, pick a plan, and turn it on in your theme — one step at a time.",
    href: "/help/getting-started",
    icon: "zap",
    overviewArticles: [toNavArticle(overview)],
    subCategories: [
      {
        slug: "installations",
        title: "Installations",
        description: "Add Custy, start the free trial, and change your plan.",
        href: "/help/getting-started/installations",
        articles: installationsArticles.map(toNavArticle),
      },
      {
        slug: "app-activation",
        title: "App Activation",
        description: "Turn on two theme switches so shoppers see Customize It.",
        href: "/help/getting-started/app-activation",
        articles: appActivationArticles.map(toNavArticle),
      },
    ],
  },
  {
    slug: "products",
    title: "Products",
    description:
      "Make custom products, set colors and sizes, print areas, pricing, and see how the Design Lab works for shoppers.",
    href: "/help/products",
    icon: "package",
    overviewArticles: [toNavArticle(overviewOfTheDesignLab)],
    subCategories: [
      {
        slug: "custom-products",
        title: "Custom Products",
        description: "Turn a Shopify product into a custom product and set print areas.",
        href: "/help/products/custom-products",
        articles: customProductsArticles.map(toNavArticle),
      },
      {
        slug: "colors",
        title: "Colors",
        description: "Build shared color lists and add extra prices for colors.",
        href: "/help/products/colors",
        articles: [],
      },
      {
        slug: "sizes",
        title: "Sizes",
        description: "Build shared size lists and optional extra prices per size.",
        href: "/help/products/sizes",
        articles: [],
      },
      {
        slug: "printing-types-and-pricing",
        title: "Printing Types & Pricing",
        description: "Set printing methods, fees, and attach them to products.",
        href: "/help/products/printing-types-and-pricing",
        articles: printingTypesArticles.map(toNavArticle),
      },
      {
        slug: "quantity-discount",
        title: "Quantity Discount",
        description: "Reward shoppers who buy more with percent or fixed discounts.",
        href: "/help/products/quantity-discount",
        articles: [],
      },
      {
        slug: "restrictions-and-inventory",
        title: "Restrictions & Inventory",
        description: "Limit design tools and track stock by size, color, and style.",
        href: "/help/products/restrictions-and-inventory",
        articles: [],
      },
    ],
  },
];

/** Flat reading order for Previous / Next across Getting Started. */
export const gettingStartedReadingOrder = [
  overview,
  ...installationsArticles,
  ...appActivationArticles,
] as const;

/** Flat reading order for Previous / Next across Products. */
export const productsReadingOrder = [
  overviewOfTheDesignLab,
  ...customProductsArticles,
  ...printingTypesArticles,
] as const;

export const helpHub: HelpHub = {
  title: "Custy Help Centre",
  lead: [
    "Plain guides for print shop owners using Custy on Shopify. No coding. One click at a time.",
    "Start with Getting Started, then open Products to set up custom products and learn the Design Lab.",
  ],
  pathTitle: "Best path the first time",
  pathLead: "Do Getting Started in order, then continue in Products. You can pause anytime.",
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
      title: overviewOfTheDesignLab.title,
      href: toNavArticle(overviewOfTheDesignLab).href,
      summary: overviewOfTheDesignLab.summary,
    },
    {
      title: firstProduct.title,
      href: toNavArticle(firstProduct).href,
      summary: firstProduct.summary,
    },
  ],
};

export const helpSidebarLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/about#contact" },
] as const;
