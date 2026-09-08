import { describe, expect, it } from "vitest";
import {
  articleHref,
  getAdjacentArticles,
  getArticle,
  getSubCategory,
  helpCategories,
  listSitemapPaths,
} from "./index";

describe("help content registry", () => {
  it("publishes Getting Started with overview and three sub-categories", () => {
    expect(helpCategories).toHaveLength(1);
    const category = helpCategories[0];
    expect(category.overviewArticles.map((a) => a.slug)).toEqual(["overview"]);
    expect(category.subCategories.map((s) => s.slug)).toEqual([
      "installations",
      "app-activation",
      "product-setup",
    ]);
  });

  it("resolves nested articles and adjacent navigation", () => {
    const article = getArticle("getting-started", "install-custy", "installations");
    expect(article?.title).toBe("How to Install Custy?");
    expect(articleHref(article!)).toBe(
      "/help/getting-started/installations/install-custy",
    );

    const { previous, next } = getAdjacentArticles(article!);
    expect(previous?.slug).toBe("overview");
    expect(next?.slug).toBe("free-trial");
  });

  it("lists installation articles under the Installations sub-category", () => {
    const sub = getSubCategory("getting-started", "installations");
    expect(sub?.articles.map((a) => a.slug)).toEqual([
      "install-custy",
      "free-trial",
      "upgrade-your-plan",
    ]);
  });

  it("includes hub, category, sub-category, and article paths for the sitemap", () => {
    const paths = listSitemapPaths();
    expect(paths).toContain("/help");
    expect(paths).toContain("/help/getting-started");
    expect(paths).toContain("/help/getting-started/overview");
    expect(paths).toContain("/help/getting-started/installations");
    expect(paths).toContain("/help/getting-started/app-activation/embed-custy");
    expect(paths).toContain("/help/getting-started/product-setup/print-areas-and-mark-areas");
  });
});
