import { describe, expect, it } from "vitest";
import { footerColumns, isGroup, primaryNav, socialLinks } from "./nav";

function allLinks() {
  const fromPrimary = primaryNav.flatMap((e) => (isGroup(e) ? e.links : [e]));
  const fromFooter = footerColumns.flatMap((c) => c.links);
  return [...fromPrimary, ...fromFooter];
}

describe("nav data", () => {
  it("every link has a label and an internal href", () => {
    for (const link of allLinks()) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.href).toMatch(/^\//);
    }
  });
  it("contains no Shopify-era paths", () => {
    for (const link of allLinks()) {
      expect(link.href).not.toMatch(/\/(pages|products|collections|cart|account)(\/|$)/);
    }
  });
  it("footer includes all four policy pages", () => {
    const hrefs = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    for (const p of ["/policies/privacy", "/policies/terms", "/policies/refund", "/policies/shipping"]) {
      expect(hrefs).toContain(p);
    }
  });
  it("social links are the four known profiles", () => {
    expect(socialLinks.map((s) => s.label).sort()).toEqual(["Facebook", "Instagram", "TikTok", "YouTube"]);
    for (const s of socialLinks) expect(s.href).toMatch(/^https:\/\//);
  });
});
