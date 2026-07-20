import * as cheerio from "cheerio";

export function normalizeCdnUrl(url) {
  const noQuery = url.split("?")[0];
  // strip _<width>x or _<width>x<height> ONLY when directly before the extension.
  // Also strips the literal `_{width}x` responsive-image placeholder some themes emit
  // (unsubstituted JS template token) — the raw placeholder URL 404s, the bare filename doesn't.
  return noQuery.replace(/_(?:\d+x\d*|\{width\}x)(?=\.[a-z0-9]+$)/i, "");
}

export function collectCdnImageUrls(html) {
  const $ = cheerio.load(html);
  const urls = new Set();
  const add = (raw) => {
    if (!raw) return;
    let url = raw;
    if (url.startsWith("//")) url = `https:${url}`;
    // The local theme preview emits store-file paths as root-relative (no protocol or host);
    // resolve those against the live storefront domain, which serves the same CDN-backed files.
    else if (url.startsWith("/cdn/shop/")) url = `https://dropshippod.ca${url}`;
    // Shopify serves store files either from cdn.shopify.com directly or proxied through the
    // store's own primary domain at /cdn/shop/... — accept both.
    if (url.includes("cdn.shopify.com") || url.includes("/cdn/shop/")) urls.add(url);
  };
  $("img, source").each((_, el) => {
    add($(el).attr("src"));
    // Lazy-loaded images (theme's `lazyload` class) carry the real URL in data-src instead of src.
    add($(el).attr("data-src"));
    const srcset = $(el).attr("srcset");
    if (srcset) for (const part of srcset.split(",")) add(part.trim().split(/\s+/)[0]);
    const dataSrcset = $(el).attr("data-srcset");
    if (dataSrcset) for (const part of dataSrcset.split(",")) add(part.trim().split(/\s+/)[0]);
  });
  return [...urls];
}

export function matchAsset(urls, key) {
  const needle = key.toLowerCase();
  return urls.find((url) => {
    const basename = decodeURIComponent(url.split("/").pop() ?? "").toLowerCase();
    return basename.includes(needle);
  });
}

export function rewriteCdnUrls(text, mapping) {
  let out = text;
  for (const [from, to] of Object.entries(mapping)) out = out.replaceAll(from, to);
  return out;
}
