import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { collectCdnImageUrls, matchAsset, normalizeCdnUrl, rewriteCdnUrls } from "./lib/assets.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "http://127.0.0.1:9292";
const LIVE = "https://dropshippod.ca";
const CDN = "https://cdn.shopify.com/s/files/1/0646/3881/2399/files";
const PUBLIC = path.join(process.cwd(), "public", "images");

const LOGO_SEEDS = [
  { key: "gildan_logo", out: "gildan.png" },
  { key: "american-apparel-logo", out: "american-apparel.png" },
  { key: "bella-canvas", out: "bella-canvas.png" },
  { key: "mando", out: "m-o-knits.png" },
  { key: "champion-logo", out: "champion.png" },
  { key: "comfort-colors", out: "comfort-colors.png" },
  { key: "core365", out: "core365.jpg" },
  { key: "q-tees", out: "q-tees.jpg" },
  { key: "valucap_logo", out: "valucap.jpg" },
  { key: "rabbit_skins_logo", out: "rabbit-skins.jpg" },
  { key: "jerzees_logo", out: "jerzees.jpg" },
  { key: "independent_trading_co", out: "independent-trading-co.svg" },
  { key: "nextlevel", out: "next-level.jpg" },
  { key: "yp-classics", out: "yp-classics.png" },
];

const VIDEO_IDS = ["Hz8PK6i8ZsE", "YEj4ai8dLk0", "ZJUg0YhyIwU", "upEzYyPL6mc", "fh0UNC947ms", "FuunYt_DNfI"];

const failures = [];

async function fetchHtml(pathname) {
  for (const base of [LOCAL, LIVE]) {
    try {
      const res = await fetch(base + pathname, { redirect: "follow" });
      if (res.ok) return { text: await res.text(), base };
    } catch {
      // try next base
    }
  }
  throw new Error(`could not fetch ${pathname}`);
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`unexpected content-type "${contentType}" for ${url}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length === 0) {
    throw new Error(`empty response body for ${url}`);
  }
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buffer);
  console.log(`ok  ${url} -> ${path.relative(process.cwd(), dest)}`);
}

async function tryDownload(url, dest, label) {
  try {
    await download(url, dest);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

// 1. Supplier logos + shipping badge, located by scanning the homepage's CDN images
const home = await fetchHtml("/");
const homeUrls = collectCdnImageUrls(home.text, home.base).map(normalizeCdnUrl);

for (const seed of LOGO_SEEDS) {
  const url = matchAsset(homeUrls, seed.key);
  if (!url) {
    failures.push(`logo not found on homepage: ${seed.key}`);
    continue;
  }
  await tryDownload(url, path.join(PUBLIC, "logos", seed.out), seed.key);
}
const shippingUrl = matchAsset(homeUrls, "shipping_logo");
// Source bytes are PNG despite the CDN filename's .webp extension (confirmed via
// `curl -I`: content-type: image/png) — saved with an honest .png extension.
if (shippingUrl) await tryDownload(shippingUrl, path.join(PUBLIC, "shipping.png"), "shipping_logo");
else failures.push("shipping_logo not found on homepage");

// 2. Known standalone assets
await tryDownload(`${CDN}/steps.png`, path.join(PUBLIC, "steps.png"), "steps.png");

// 3. YouTube poster frames (self-hosted so the facade loads nothing from YouTube until click)
for (const id of VIDEO_IDS) {
  await tryDownload(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, path.join(PUBLIC, "videos", `${id}.jpg`), `poster ${id}`);
}

// 4. Images referenced inside scraped content — download and rewrite in place
const rawDir = path.join(process.cwd(), "content", "raw");
for (const file of (await readdir(rawDir)).filter((f) => f.endsWith(".md"))) {
  const filePath = path.join(rawDir, file);
  const text = await readFile(filePath, "utf8");
  const refs = [...new Set(text.match(/https?:\/\/cdn\.shopify\.com\/[^\s)"']+/g) ?? [])];
  const mapping = {};
  for (const ref of refs) {
    const clean = normalizeCdnUrl(ref);
    const basename = decodeURIComponent(clean.split("/").pop());
    await tryDownload(clean, path.join(PUBLIC, "content", basename), `${file}: ${basename}`);
    mapping[ref] = `/images/content/${basename}`;
  }
  if (refs.length > 0) await writeFile(filePath, rewriteCdnUrls(text, mapping));
}

console.log(`\ndone, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
