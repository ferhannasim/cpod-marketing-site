import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { extractContactPage, extractFaqPage, extractPage, extractPolicy, toMarkdown } from "./lib/extract.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "http://127.0.0.1:9292";
const LIVE = "https://dropshippod.ca";

const PAGES = [
  { slug: "how-it-works", out: "how-it-works" },
  { slug: "about-us", out: "about" },
  { slug: "contact", out: "contact", extract: extractContactPage },
  { slug: "frequently-asked-questions-faqs", out: "faq-general", extract: extractFaqPage },
  { slug: "dtf-faq", out: "faq-dtf" },
  { slug: "sublimation-faq", out: "faq-sublimation" },
  { slug: "faq-print-on-your-own-item", out: "faq-print-on-your-own-item" },
  { slug: "delivery-speed", out: "delivery" },
  { slug: "billing-information", out: "billing" },
  { slug: "start-your-ecommerce-brand-without-tech-or-high-costs", out: "start-your-ecommerce-brand" },
  { slug: "launch-a-fully-automated-ecommerce-brand-no-tech-needed", out: "launch-automated-brand" },
  { slug: "⚠️-important-printing-notice", out: "printing-notice" },
  { slug: "sublimation-printing-notice", out: "sublimation-printing-notice" },
  { slug: "🎨-artwork-mockup-approval", out: "artwork-approval" },
  { slug: "measuring", out: "measuring" },
];

const POLICIES = [
  { slug: "privacy-policy", out: "policy-privacy" },
  { slug: "terms-of-service", out: "policy-terms" },
  { slug: "refund-policy", out: "policy-refund" },
  { slug: "shipping-policy", out: "policy-shipping" },
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
await mkdir(outDir, { recursive: true });
const failures = [];

async function scrapeOne(pathname, out, extract) {
  try {
    const html = await fetchHtml(pathname);
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

for (const { slug, out, extract } of PAGES) await scrapeOne(`/pages/${slug}`, out, extract ?? extractPage);
for (const { slug, out } of POLICIES) await scrapeOne(`/policies/${slug}`, out, extractPolicy);

console.log(`\n${PAGES.length + POLICIES.length - failures.length} ok, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
