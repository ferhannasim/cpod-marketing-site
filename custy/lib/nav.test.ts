import { describe, expect, it } from "vitest";
import { headerNav, footerColumns, socialLinks } from "./nav";
import { APP_URL } from "./site";

describe("nav data", () => {
  it("header nav has six live links plus the app CTA target", () => {
    expect(headerNav.map((l) => l.href)).toEqual([
      "/how-it-works",
      "/pricing",
      "/features",
      "/design-lab",
      "/live-demo",
      "/blog",
    ]);
  });

  it("footer links only point at migrated routes or the app listing", () => {
    const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    for (const href of hrefs) {
      expect(href === APP_URL || href.startsWith("/")).toBe(true);
      expect(href).not.toMatch(/\/(pages|products|collections|cart|search)\b/);
    }
  });

  it("footer Explore column lists site pages then the app listing", () => {
    const explore = footerColumns.find((c) => c.title === "Explore");
    expect(explore?.links.map((l) => l.href)).toEqual([
      "/how-it-works",
      "/pricing",
      "/features",
      "/design-lab",
      "/live-demo",
      "/blog",
      APP_URL,
    ]);
  });

  it("footer Company column gains Support", () => {
    const company = footerColumns.find((c) => c.title === "Company");
    expect(company?.links.map((l) => l.href)).toEqual([
      "/about-us",
      "/contact",
      "/support",
    ]);
  });

  it("has the five social profiles", () => {
    expect(socialLinks).toHaveLength(5);
  });
});
