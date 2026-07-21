import * as cheerio from "cheerio";

const DEFAULT_SCRAPE_BASE = "https://dropshippod.ca";

// Hosts allowed to serve store files proxied through /cdn/shop/... in addition to the canonical
// cdn.shopify.com host: the live storefront (with and without www) and the local dev-server
// preview. A URL merely *containing* "/cdn/shop/" on some other host (e.g. an attacker-controlled
// page, or a tracking pixel that echoes the path) must never be trusted.
const STORE_PROXIED_HOSTS = new Set(["dropshippod.ca", "www.dropshippod.ca", "127.0.0.1"]);

export function normalizeCdnUrl(url) {
  const noQuery = url.split("?")[0];
  // strip _<width>x or _<width>x<height> ONLY when directly before the extension.
  // Also strips the literal `_{width}x` responsive-image placeholder some themes emit
  // (unsubstituted JS template token) — the raw placeholder URL 404s, the bare filename doesn't.
  return noQuery.replace(/_(?:\d+x\d*|\{width\}x)(?=\.[a-z0-9]+$)/i, "");
}

export function collectCdnImageUrls(html, base = DEFAULT_SCRAPE_BASE) {
  const $ = cheerio.load(html);
  const urls = new Set();
  const add = (raw) => {
    if (!raw) return;
    let resolved;
    try {
      // Resolves absolute URLs as-is, protocol-relative "//host/..." against base's scheme, and
      // site-relative "/cdn/shop/..." (emitted by the local theme preview) against base entirely.
      resolved = new URL(raw, base);
    } catch {
      return;
    }
    const isShopifyCdn = resolved.hostname === "cdn.shopify.com";
    const isStoreProxied = STORE_PROXIED_HOSTS.has(resolved.hostname) && resolved.pathname.includes("/cdn/shop/");
    if (isShopifyCdn || isStoreProxied) urls.add(resolved.href);
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
  // Longest key first: a shorter key that's a literal prefix of a longer one (e.g. "...?v=1" is a
  // prefix of "...?v=10") would otherwise partially match inside the longer URL and corrupt it.
  const entries = Object.entries(mapping).sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of entries) out = out.replaceAll(from, to);
  return out;
}
