import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { posts } from "@/content/posts";
import { SITE_URL } from "@/lib/site";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("every URL is absolute on the canonical domain", () => {
    for (const url of urls) {
      expect(url.startsWith(SITE_URL)).toBe(true);
    }
  });

  it("includes the homepage and all top-level pages", () => {
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).toContain(`${SITE_URL}/features`);
    expect(urls).toContain(`${SITE_URL}/pricing`);
    expect(urls).toContain(`${SITE_URL}/how-it-works`);
    expect(urls).toContain(`${SITE_URL}/live-demo`);
    expect(urls).toContain(`${SITE_URL}/about-us`);
    expect(urls).toContain(`${SITE_URL}/support`);
    expect(urls).toContain(`${SITE_URL}/contact`);
  });

  it("includes both policy pages", () => {
    expect(urls).toContain(`${SITE_URL}/policies/privacy`);
    expect(urls).toContain(`${SITE_URL}/policies/terms`);
  });

  it("includes the blog index and every blog post slug", () => {
    expect(urls).toContain(`${SITE_URL}/blog`);
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(urls).toContain(`${SITE_URL}/blog/${post.slug}`);
    }
  });

  it("never includes Shopify-native /pages/, /products/, or /blogs/ paths", () => {
    for (const url of urls) {
      expect(url).not.toMatch(/\/pages\//);
      expect(url).not.toMatch(/\/products\//);
      expect(url).not.toMatch(/\/blogs\//);
    }
  });

  it("has no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });
});
