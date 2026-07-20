import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { STATIC_ROUTES } from "@/lib/routes";

describe("sitemap", () => {
  const entries = sitemap();
  it("contains every static route and all 47 size charts on the canonical domain", () => {
    expect(entries).toHaveLength(STATIC_ROUTES.length + 47);
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/dropshippod\.ca(\/|$)/);
    }
    expect(entries.map((e) => e.url)).toContain("https://dropshippod.ca/size-charts/gildan-5000");
  });
});
