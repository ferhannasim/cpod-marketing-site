import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { SIZE_CHART_HANDLES, extractSizeChart } from "./lib/size-chart.mjs";

const LOCAL = process.env.SCRAPE_BASE ?? "http://127.0.0.1:9292";
const LIVE = "https://dropshippod.ca";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchHtml(pathname) {
  for (const base of [LOCAL, LIVE]) {
    try {
      const res = await fetch(base + pathname, { redirect: "follow" });
      if (res.ok) return await res.text();
    } catch {
      // try next base
    }
  }
  throw new Error(`could not fetch ${pathname}`);
}

const outDir = path.join(process.cwd(), "content", "size-charts");
await mkdir(outDir, { recursive: true });
const failures = [];

for (const handle of SIZE_CHART_HANDLES) {
  try {
    const html = await fetchHtml(`/pages/size-chart-${handle}`);
    const chart = extractSizeChart(html, handle);
    await writeFile(path.join(outDir, `${handle}.json`), JSON.stringify(chart, null, 2) + "\n");
    console.log(`ok  ${handle}`);
  } catch (error) {
    failures.push(`${handle}: ${error.message}`);
    console.error(`FAIL ${handle}: ${error.message}`);
  }
  await sleep(250);
}

console.log(`\n${SIZE_CHART_HANDLES.length - failures.length} ok, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
