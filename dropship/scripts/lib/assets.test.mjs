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
  it("strips a literal {width} responsive-image placeholder before the extension", () => {
    expect(
      normalizeCdnUrl(`${CDN}/shipping_logo_900x_d5c2a14a-f84f_{width}x.webp?v=1`),
    ).toBe(`${CDN}/shipping_logo_900x_d5c2a14a-f84f.webp`);
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

  it("collects data-src and data-srcset URLs from lazy-loaded images", () => {
    const html = `
      <img class="lazyload" data-src="//cdn.shopify.com/s/files/1/0646/3881/2399/files/c.png?v=1">
      <img data-srcset="${CDN}/d_160x.png 160w, ${CDN}/d_320x.png 320w">`;
    const urls = collectCdnImageUrls(html);
    expect(urls).toContain(`${CDN}/c.png?v=1`);
    expect(urls.some((u) => u.includes("/d_160x.png"))).toBe(true);
  });

  it("accepts store-proxied /cdn/shop/ URLs from the storefront domain, protocol-relative or site-relative", () => {
    const html = `
      <img data-src="//dropshippod.ca/cdn/shop/files/gildan_logo_280x.png?v=1">
      <img data-src="/cdn/shop/files/other_280x.png?v=1">`;
    const urls = collectCdnImageUrls(html);
    expect(urls.some((u) => u === "https://dropshippod.ca/cdn/shop/files/gildan_logo_280x.png?v=1")).toBe(true);
    expect(urls.some((u) => u === "https://dropshippod.ca/cdn/shop/files/other_280x.png?v=1")).toBe(true);
  });

  it("resolves site-relative store paths against a provided scrape base (e.g. the local dev server)", () => {
    const html = `<img data-src="/cdn/shop/files/x_280x.png?v=1">`;
    const urls = collectCdnImageUrls(html, "http://127.0.0.1:9292");
    expect(urls).toEqual(["http://127.0.0.1:9292/cdn/shop/files/x_280x.png?v=1"]);
  });

  it("rejects a foreign host even when its path contains /cdn/shop/", () => {
    const html = `<img data-src="https://evil.com/cdn/shop/x.png">`;
    const urls = collectCdnImageUrls(html);
    expect(urls.some((u) => u.includes("evil.com"))).toBe(false);
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

  it("applies the longest matching key first so an overlapping shorter key can't clobber it", () => {
    const text = `![a](${CDN}/x.png?v=1) ![b](${CDN}/x.png?v=10)`;
    const out = rewriteCdnUrls(text, {
      [`${CDN}/x.png?v=1`]: "/images/content/x-v1.png",
      [`${CDN}/x.png?v=10`]: "/images/content/x-v10.png",
    });
    expect(out).toBe("![a](/images/content/x-v1.png) ![b](/images/content/x-v10.png)");
  });
});
