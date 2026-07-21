import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { collectCdnImageUrls, matchAsset, normalizeCdnUrl, rewriteCdnUrls } from "./lib/assets.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "https://custyapp.com";
const PUBLIC = path.join(process.cwd(), "public", "images");
const RAW = path.join(process.cwd(), "content", "raw");
const POSTS = path.join(RAW, "posts");

const failures = [];

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
    return true;
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`FAIL ${label}: ${error.message}`);
    return false;
  }
}

// 1. Theme logo + favicon, located by known CDN filename scanning the scraped homepage
const homeHtml = await readFile(path.join(RAW, "home.html"), "utf8");
const homeUrls = collectCdnImageUrls(homeHtml, LOCAL).map(normalizeCdnUrl);

const logoUrl = matchAsset(homeUrls, "custy_logo");
if (logoUrl) await tryDownload(logoUrl, path.join(PUBLIC, "logo.png"), "custy_logo");
else failures.push("logo not found on homepage: custy_logo");

// Exclude the already-matched logo URL before searching for the favicon — "custy_logo.png"
// also contains the substring "custy" and would otherwise shadow the shorter favicon match.
const faviconUrl = matchAsset(
  homeUrls.filter((url) => url !== logoUrl),
  "custy",
);
if (faviconUrl) await tryDownload(faviconUrl, path.join(PUBLIC, "favicon.png"), "custy favicon");
else failures.push("favicon not found on homepage: custy");

// 2. Article OG images: content/raw/posts/*.md frontmatter `image:` URL -> public/images/blog/<slug>.jpg
const postFiles = (await readdir(POSTS)).filter((f) => f.endsWith(".md"));
for (const file of postFiles) {
  const filePath = path.join(POSTS, file);
  const text = await readFile(filePath, "utf8");
  const match = text.match(/^image:\s*(\S+)\s*$/m);
  if (!match) {
    failures.push(`${file}: no image frontmatter`);
    continue;
  }
  const slug = file.replace(/\.md$/, "");
  const url = match[1];
  const ok = await tryDownload(url, path.join(PUBLIC, "blog", `${slug}.jpg`), `${file}: og image`);
  // Rewrite just the frontmatter field in place so step 3 below (which sweeps every
  // remaining cdn.shopify.com reference in content/raw/**) doesn't re-download this
  // same URL into public/images/content/ under a different name. Only rewrite on a
  // successful download — otherwise the raw URL must survive so a re-run can retry it.
  if (!ok) continue;
  const rewritten = text.replace(/^image:\s*\S+\s*$/m, `image: /images/blog/${slug}.jpg`);
  if (rewritten !== text) await writeFile(filePath, rewritten);
}

// 3. Every remaining cdn.shopify.com image referenced in content/raw/** (landers, home.html,
// prose/policy markdown, and post bodies) -> public/images/content/<basename>, rewritten in place.
const topLevelFiles = (await readdir(RAW)).filter((f) => f.endsWith(".md") || f.endsWith(".html"));
const postRelFiles = postFiles.map((f) => path.join("posts", f));
for (const rel of [...topLevelFiles, ...postRelFiles]) {
  const filePath = path.join(RAW, rel);
  const text = await readFile(filePath, "utf8");
  // Restrict to actual image files: cdn.shopify.com also serves platform JS (shop-js,
  // storefront web-components, hCaptcha widget scripts) referenced from <script src>
  // tags on the raw home.html, which would otherwise 404/mismatch content-type here.
  const refs = [
    ...new Set(
      text.match(/https?:\/\/cdn\.shopify\.com\/[^\s)"']+\.(?:png|jpe?g|gif|webp|svg|avif)(?:\?[^\s)"']*)?/gi) ?? [],
    ),
  ];
  const mapping = {};
  for (const ref of refs) {
    const clean = normalizeCdnUrl(ref);
    const basename = decodeURIComponent(clean.split("/").pop());
    const ok = await tryDownload(clean, path.join(PUBLIC, "content", basename), `${rel}: ${basename}`);
    // Only rewrite the reference once the download actually succeeded — otherwise the raw
    // cdn.shopify.com URL must survive in the file so a re-run can find and retry it.
    if (ok) mapping[ref] = `/images/content/${basename}`;
  }
  if (refs.length > 0) await writeFile(filePath, rewriteCdnUrls(text, mapping));
}

console.log(`\ndone, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
