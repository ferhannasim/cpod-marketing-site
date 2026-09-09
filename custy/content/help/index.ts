import type { HelpArticle, HelpNavCategory, HelpSubCategory } from "./types";
import {
  helpCategories,
  gettingStartedReadingOrder,
  productsReadingOrder,
} from "./nav";
import { overview } from "./overview";
import { installCusty } from "./install-custy";
import { freeTrial } from "./free-trial";
import { upgradeYourPlan } from "./upgrade-your-plan";
import { embedCusty } from "./embed-custy";
import { overviewOfTheDesignLab } from "./overview-of-the-design-lab";
import { firstProduct } from "./first-product";
import { printAreasAndMarkAreas } from "./print-areas-and-mark-areas";
import { pricingRules } from "./pricing-rules";

export {
  helpCategories,
  helpHub,
  helpSidebarLinks,
  gettingStartedReadingOrder,
  productsReadingOrder,
} from "./nav";
export type {
  AnnotatedFigure,
  HelpArticle,
  HelpCallout,
  HelpHub,
  HelpLink,
  HelpMarker,
  HelpNavArticle,
  HelpNavCategory,
  HelpNote,
  HelpSection,
  HelpSubCategory,
} from "./types";

function articleKey(article: HelpArticle) {
  if (article.subCategorySlug) {
    return `${article.categorySlug}/${article.subCategorySlug}/${article.slug}`;
  }
  return `${article.categorySlug}/${article.slug}`;
}

const allArticles: HelpArticle[] = [
  overview,
  installCusty,
  freeTrial,
  upgradeYourPlan,
  embedCusty,
  overviewOfTheDesignLab,
  firstProduct,
  printAreasAndMarkAreas,
  pricingRules,
];

const articlesByKey: Record<string, HelpArticle> = Object.fromEntries(
  allArticles.map((article) => [articleKey(article), article]),
);

const readingOrderByCategory: Record<string, readonly HelpArticle[]> = {
  "getting-started": gettingStartedReadingOrder,
  products: productsReadingOrder,
};

export function getCategory(slug: string): HelpNavCategory | undefined {
  return helpCategories.find((category) => category.slug === slug);
}

export function getSubCategory(
  categorySlug: string,
  subCategorySlug: string,
): HelpSubCategory | undefined {
  return getCategory(categorySlug)?.subCategories.find((sub) => sub.slug === subCategorySlug);
}

export function getArticle(
  categorySlug: string,
  slug: string,
  subCategorySlug?: string | null,
): HelpArticle | undefined {
  if (subCategorySlug) {
    return articlesByKey[`${categorySlug}/${subCategorySlug}/${slug}`];
  }
  return (
    articlesByKey[`${categorySlug}/${slug}`] ??
    allArticles.find((article) => article.categorySlug === categorySlug && article.slug === slug)
  );
}

export function listAllArticles(): HelpArticle[] {
  return [...gettingStartedReadingOrder, ...productsReadingOrder];
}

export function getAdjacentArticles(
  article: HelpArticle,
): { previous: HelpArticle | null; next: HelpArticle | null } {
  const order = [...(readingOrderByCategory[article.categorySlug] ?? [])];
  const index = order.findIndex(
    (item) =>
      item.slug === article.slug &&
      item.categorySlug === article.categorySlug &&
      (item.subCategorySlug ?? null) === (article.subCategorySlug ?? null),
  );
  if (index < 0) return { previous: null, next: null };
  return {
    previous: order[index - 1] ?? null,
    next: order[index + 1] ?? null,
  };
}

export function articleHref(article: HelpArticle): string {
  if (article.subCategorySlug) {
    return `/help/${article.categorySlug}/${article.subCategorySlug}/${article.slug}`;
  }
  return `/help/${article.categorySlug}/${article.slug}`;
}

export function listSitemapPaths(): string[] {
  const paths = ["/help"];
  for (const category of helpCategories) {
    paths.push(category.href);
    for (const overviewArticle of category.overviewArticles) {
      paths.push(overviewArticle.href);
    }
    for (const sub of category.subCategories) {
      paths.push(sub.href);
      for (const article of sub.articles) {
        paths.push(article.href);
      }
    }
  }
  return paths;
}

export function listOverviewParams(): { category: string; slug: string }[] {
  return helpCategories.flatMap((category) =>
    category.overviewArticles.map((article) => ({
      category: category.slug,
      slug: article.slug,
    })),
  );
}

export function listSubCategoryParams(): { category: string; subCategory: string }[] {
  return helpCategories.flatMap((category) =>
    category.subCategories.map((sub) => ({
      category: category.slug,
      subCategory: sub.slug,
    })),
  );
}

export function listNestedArticleParams(): {
  category: string;
  subCategory: string;
  slug: string;
}[] {
  return helpCategories.flatMap((category) =>
    category.subCategories.flatMap((sub) =>
      sub.articles.map((article) => ({
        category: category.slug,
        subCategory: sub.slug,
        slug: article.slug,
      })),
    ),
  );
}
