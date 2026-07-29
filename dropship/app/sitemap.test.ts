import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { posts } from "@/content/posts";
import { STATIC_ROUTES } from "@/lib/routes";

describe("sitemap", () => {
  const entries = sitemap();
  it("contains every static route, all 47 size charts and every blog post on the canonical domain", () => {
    expect(entries).toHaveLength(STATIC_ROUTES.length + 47 + posts.length);
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/dropshippod\.ca(\/|$)/);
    }
    expect(entries.map((e) => e.url)).toContain("https://dropshippod.ca/size-charts/gildan-5000");
  });

  it("includes every blog post URL", () => {
    for (const post of posts) {
      expect(entries.map((e) => e.url)).toContain(`https://dropshippod.ca/blog/${post.slug}`);
    }
  });
});
