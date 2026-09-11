import { describe, expect, it } from "vitest";
import {
  articleHref,
  getAdjacentArticles,
  getArticle,
  getCategory,
  getSubCategory,
  helpCategories,
  listSitemapPaths,
} from "./index";

describe("help content registry", () => {
  it("publishes Getting Started and Products categories", () => {
    expect(helpCategories.map((c) => c.slug)).toEqual(["getting-started", "products"]);

    const gettingStarted = getCategory("getting-started");
    expect(gettingStarted?.overviewArticles.map((a) => a.slug)).toEqual(["overview"]);
    expect(gettingStarted?.subCategories.map((s) => s.slug)).toEqual([
      "installations",
      "app-activation",
    ]);

    const products = getCategory("products");
    expect(products?.overviewArticles.map((a) => a.slug)).toEqual([
      "overview-of-the-design-lab",
    ]);
    expect(products?.subCategories.map((s) => s.slug)).toEqual([
      "custom-products",
      "colors",
      "sizes",
      "printing-types-and-pricing",
      "quantity-discount",
      "restrictions-and-inventory",
    ]);
  });

  it("resolves nested articles and adjacent navigation within a category", () => {
    const article = getArticle("getting-started", "install-custy", "installations");
    expect(article?.title).toBe("How to Install Custy?");
    expect(articleHref(article!)).toBe(
      "/help/getting-started/installations/install-custy",
    );

    const { previous, next } = getAdjacentArticles(article!);
    expect(previous?.slug).toBe("overview");
    expect(next?.slug).toBe("free-trial");
  });

  it("lists custom product articles under Products", () => {
    const sub = getSubCategory("products", "custom-products");
    expect(sub?.articles.map((a) => a.slug)).toEqual([
      "first-product",
      "product-sizes",
      "product-colors",
      "print-areas-and-mark-areas",
    ]);

    const designLab = getArticle("products", "overview-of-the-design-lab");
    expect(designLab?.title).toBe("Overview of the Design Lab");
    const { next } = getAdjacentArticles(designLab!);
    expect(next?.slug).toBe("first-product");
  });

  it("includes hub, category, sub-category, and article paths for the sitemap", () => {
    const paths = listSitemapPaths();
    expect(paths).toContain("/help");
    expect(paths).toContain("/help/getting-started");
    expect(paths).toContain("/help/getting-started/overview");
    expect(paths).toContain("/help/getting-started/installations");
    expect(paths).toContain("/help/getting-started/app-activation/embed-custy");
    expect(paths).toContain("/help/products");
    expect(paths).toContain("/help/products/overview-of-the-design-lab");
    expect(paths).toContain("/help/products/custom-products/first-product");
    expect(paths).toContain("/help/products/custom-products/product-sizes");
    expect(paths).toContain("/help/products/custom-products/product-colors");
    expect(paths).toContain(
      "/help/products/custom-products/print-areas-and-mark-areas",
    );
    expect(paths).toContain(
      "/help/products/printing-types-and-pricing/pricing-rules",
    );
    expect(paths).toContain("/help/products/colors");
  });
});
