import { describe, expect, it } from "vitest";
import { headerNav, footerColumns, socialLinks } from "./nav";
import { APP_URL } from "./site";

describe("nav data", () => {
  it("header nav has the three live links plus the app CTA target", () => {
    expect(headerNav.map((l) => l.href)).toEqual([
      "/how-it-works",
      "/pricing",
      "/features",
    ]);
  });

  it("footer links only point at migrated routes or the app listing", () => {
    const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    for (const href of hrefs) {
      expect(href === APP_URL || href.startsWith("/")).toBe(true);
      expect(href).not.toMatch(/\/(pages|products|collections|cart|search)\b/);
    }
  });

  it("has the five social profiles", () => {
    expect(socialLinks).toHaveLength(5);
  });
});
