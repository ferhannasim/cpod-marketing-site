import { describe, expect, it } from "vitest";
import { noIndex, noIndexPaths } from "./seo";

describe("noindex", () => {
  it("covers the folded marketing pages and not the live IA", () => {
    expect(noIndex).toEqual({ index: false, follow: true });
    expect(noIndexPaths).toEqual([
      "/features",
      "/how-it-works",
      "/pricing",
      "/contact",
      "/support",
      "/design-lab",
      "/use-cases",
      "/dropshipping",
    ]);
    for (const kept of ["/", "/help", "/faq", "/blog", "/live-demo", "/about"]) {
      expect(noIndexPaths).not.toContain(kept);
    }
  });
});
