import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  extractArticle,
  extractLander,
  extractMeta,
  extractPolicy,
  extractProsePage,
  toMarkdown,
} from "./lib/extract.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "https://custyapp.com";
const LIVE = "https://custyapp.com";

const LANDERS = ["features", "pricing", "how-it-works", "about-us"];
const PROSE_PAGES = [
  { slug: "support", out: "support" },
  { slug: "contact", out: "contact" },
];
const POLICIES = [
  { slug: "privacy-policy", out: "policy-privacy" },
  { slug: "terms-of-service", out: "policy-terms" },
];
const ARTICLES = [
  "why-product-customization-is-the-future-of-ecommerce-in-2026",
  "how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide",
  "7-ways-product-customization-increases-your-shopify-store-revenue",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchHtml(pathname) {
  for (const base of [LOCAL, LIVE]) {
    try {
      const res = await fetch(base + encodeURI(pathname), { redirect: "follow" });
      if (res.ok) return await res.text();
    } catch {
      // base unreachable — try the next one
    }
  }
  throw new Error(`could not fetch ${pathname} from ${LOCAL} or ${LIVE}`);
}

const outDir = path.join(process.cwd(), "content", "raw");
const postsDir = path.join(outDir, "posts");
await mkdir(postsDir, { recursive: true });

const failures = [];
const meta = {};
let attempted = 0;

function recordMeta(pathname, html) {
  try {
    meta[pathname] = extractMeta(html);
  } catch (error) {
    failures.push(`${pathname} (meta): ${error.message}`);
    console.error(`FAIL ${pathname} (meta): ${error.message}`);
  }
}

async function scrapeLander(slug) {
  const pathname = `/pages/${slug}`;
  attempted++;
  try {
    const html = await fetchHtml(pathname);
    recordMeta(pathname, html);
    const { css, rootHtml } = extractLander(html);
    const out = `<style>\n${css}\n</style>\n${rootHtml}`;
    await writeFile(path.join(outDir, `${slug}.html`), out);
    console.log(`ok  ${pathname} -> content/raw/${slug}.html`);
  } catch (error) {
    failures.push(`${pathname}: ${error.message}`);
    console.error(`FAIL ${pathname}: ${error.message}`);
  }
  await sleep(300);
}

async function scrapeHome() {
  const pathname = "/";
  attempted++;
  try {
    const html = await fetchHtml(pathname);
    recordMeta(pathname, html);
    await writeFile(path.join(outDir, "home.html"), html);
    console.log(`ok  ${pathname} -> content/raw/home.html`);
  } catch (error) {
    failures.push(`${pathname}: ${error.message}`);
    console.error(`FAIL ${pathname}: ${error.message}`);
  }
  await sleep(300);
}

async function scrapeProse(pathname, out, extract) {
  attempted++;
  try {
    const html = await fetchHtml(pathname);
    recordMeta(pathname, html);
    const { title, bodyHtml } = extract(html);
    const md = toMarkdown(bodyHtml);
    const frontmatter = `---\ntitle: "${title.replaceAll('"', '\\"')}"\nsource: ${pathname}\n---\n\n`;
    await writeFile(path.join(outDir, `${out}.md`), frontmatter + md + "\n");
    console.log(`ok  ${pathname} -> content/raw/${out}.md`);
  } catch (error) {
    failures.push(`${pathname}: ${error.message}`);
    console.error(`FAIL ${pathname}: ${error.message}`);
  }
  await sleep(300);
}

async function scrapeArticle(slug) {
  const pathname = `/blogs/custy-blog/${slug}`;
  attempted++;
  try {
    const html = await fetchHtml(pathname);
    recordMeta(pathname, html);
    const { title, date, image, bodyHtml } = extractArticle(html);
    const md = toMarkdown(bodyHtml);
    const frontmatter = `---\ntitle: "${title.replaceAll('"', '\\"')}"\ndate: ${date}\nimage: ${image}\nsource: ${pathname}\n---\n\n`;
    await writeFile(path.join(postsDir, `${slug}.md`), frontmatter + md + "\n");
    console.log(`ok  ${pathname} -> content/raw/posts/${slug}.md`);
  } catch (error) {
    failures.push(`${pathname}: ${error.message}`);
    console.error(`FAIL ${pathname}: ${error.message}`);
  }
  await sleep(300);
}

for (const slug of LANDERS) await scrapeLander(slug);
await scrapeHome();
for (const { slug, out } of PROSE_PAGES) await scrapeProse(`/pages/${slug}`, out, extractProsePage);
for (const { slug, out } of POLICIES) await scrapeProse(`/policies/${slug}`, out, extractPolicy);
for (const slug of ARTICLES) await scrapeArticle(slug);

await writeFile(path.join(outDir, "meta.json"), `${JSON.stringify(meta, null, 2)}\n`);
console.log(`ok  wrote content/raw/meta.json (${Object.keys(meta).length} paths)`);

console.log(`\n${attempted - failures.length} ok, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
