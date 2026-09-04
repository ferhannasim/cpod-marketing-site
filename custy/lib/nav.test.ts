import { describe, expect, it } from "vitest";
import { headerNav, footerColumns, socialLinks, headerCta } from "./nav";
import { APP_URL } from "./site";

describe("nav data", () => {
  it("header nav lists homepage sections then Help and About / Contact", () => {
    expect(headerNav.map((l) => [l.label, l.href])).toEqual([
      ["Home", "/"],
      ["How It Works", "/#how-it-works"],
      ["Live Demo", "/#live-demo"],
      ["Pricing", "/#pricing"],
      ["Help", "/help"],
      ["About / Contact", "/about"],
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

  it("footer Learn more column lists help and company pages", () => {
    const learnMore = footerColumns.find((c) => c.title === "Learn more");
    expect(learnMore?.links.map((l) => [l.label, l.href])).toEqual([
      ["Help", "/help"],
      ["FAQ", "/faq"],
      ["Live Demo", "/#live-demo"],
      ["About Us", "/about"],
      ["Contact Us", "/about#contact"],
      ["Privacy Policy", "/policies/privacy"],
      ["Terms of Service", "/policies/terms"],
    ]);
  });

  it("footer About column is a short product blurb with no links", () => {
    const about = footerColumns.find((c) => c.title === "About Custy");
    expect(about?.blurb).toMatch(/print-ready files/i);
    expect(about?.links).toEqual([]);
  });

  it("has the five social profiles", () => {
    expect(socialLinks).toHaveLength(5);
  });
});
