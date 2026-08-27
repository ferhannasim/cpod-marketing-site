import { describe, expect, it } from "vitest";
import { headerNav, footerColumns, resourceMenuLinks, socialLinks, headerCta } from "./nav";
import { APP_URL } from "./site";

describe("nav data", () => {
  it("header nav scrolls marketing sections and keeps Resources as the help doorway", () => {
    expect(headerNav.map((l) => [l.label, l.href])).toEqual([
      ["How it Works", "/#how-it-works"],
      ["Features", "/#features"],
      ["Live Demo", "/#live-demo"],
      ["Pricing", "/#pricing"],
      ["Contact", "/#contact"],
      ["Resources", "/resources"],
    ]);
  });

  it("header CTA is the Shopify free-trial listing", () => {
    expect(headerCta).toEqual({
      label: "Start Free Trial",
      href: APP_URL,
      external: true,
    });
  });

  it("footer links only point at kept routes", () => {
    const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    for (const href of hrefs) {
      expect(href.startsWith("/")).toBe(true);
      expect(href).not.toMatch(/\/(pages|products|collections|cart|search)\b/);
    }
  });

  it("Resources dropdown links to the setup guide and FAQs", () => {
    expect(resourceMenuLinks.map((link) => [link.label, link.href])).toEqual([
      ["How to Use Custy", "/resources"],
      ["FAQs", "/faq"],
    ]);
  });

  it("footer Learn more column lists help and company pages", () => {
    const learnMore = footerColumns.find((c) => c.title === "Learn more");
    expect(learnMore?.links.map((l) => l.href)).toEqual([
      "/resources",
      "/faq",
      "/blog",
      "/#live-demo",
      "/about",
      "/policies/privacy",
      "/policies/terms",
    ]);
  });

  it("footer Product column is a one-line blurb with no links", () => {
    const product = footerColumns.find((c) => c.title === "Custy");
    expect(product?.blurb).toMatch(/shopify product customizer/i);
    expect(product?.links).toEqual([]);
  });

  it("has the five social profiles", () => {
    expect(socialLinks).toHaveLength(5);
  });
});
