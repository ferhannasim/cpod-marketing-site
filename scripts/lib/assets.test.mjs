import { describe, expect, it } from "vitest";
import { collectCdnImageUrls, matchAsset, normalizeCdnUrl, rewriteCdnUrls } from "./assets.mjs";

const CDN = "https://cdn.shopify.com/s/files/1/0646/3881/2399/files";

describe("normalizeCdnUrl", () => {
  it("strips query strings and size-variant infixes before the extension", () => {
    expect(normalizeCdnUrl(`${CDN}/gildan_logo_160x.png?v=123`)).toBe(`${CDN}/gildan_logo.png`);
  });
  it("keeps size-looking tokens that are part of the original filename", () => {
    expect(normalizeCdnUrl(`${CDN}/shipping_logo_900x_d5c2a14a-f84f.webp?v=1`)).toBe(
      `${CDN}/shipping_logo_900x_d5c2a14a-f84f.webp`,
    );
  });
});

describe("collectCdnImageUrls", () => {
  it("collects src and srcset URLs, normalizing protocol-relative ones", () => {
    const html = `
      <img src="//cdn.shopify.com/s/files/1/0646/3881/2399/files/a.png?v=1">
      <img srcset="${CDN}/b_160x.png 160w, ${CDN}/b_320x.png 320w">
      <img src="/local/ignore.png">`;
    const urls = collectCdnImageUrls(html);
    expect(urls).toContain(`${CDN}/a.png?v=1`);
    expect(urls.some((u) => u.includes("/b_160x.png"))).toBe(true);
    expect(urls.some((u) => u.includes("ignore"))).toBe(false);
  });
});

describe("matchAsset", () => {
  const urls = [`${CDN}/Rabbit_Skins_Logo.jpg`, `${CDN}/NextLevel.jpg`];
  it("matches case-insensitively on the basename", () => {
    expect(matchAsset(urls, "rabbit_skins_logo")).toBe(`${CDN}/Rabbit_Skins_Logo.jpg`);
    expect(matchAsset(urls, "nextlevel")).toBe(`${CDN}/NextLevel.jpg`);
  });
  it("returns undefined when nothing matches", () => {
    expect(matchAsset(urls, "gildan")).toBeUndefined();
  });
});

describe("rewriteCdnUrls", () => {
  it("replaces mapped URLs and leaves other text alone", () => {
    const text = `![img](${CDN}/a.png?v=1) and plain text`;
    const out = rewriteCdnUrls(text, { [`${CDN}/a.png?v=1`]: "/images/content/a.png" });
    expect(out).toBe("![img](/images/content/a.png) and plain text");
  });
});
