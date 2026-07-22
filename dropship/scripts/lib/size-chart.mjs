import * as cheerio from "cheerio";

export const SIZE_CHART_HANDLES = [
  "q-tees-q4350", "q-tees-q2010", "yp-classics-6506", "valucap-vc300a", "q-tees-q600",
  "q-tees-qtb6000", "q-tees-qtb", "gildan-64800", "gildan-8800", "m-o-5540",
  "jerzees-995mr", "m-o-3590", "m-o-4505", "gildan-5200", "gildan-5400b",
  "gildan-5400", "rabbit-skins-3317", "gildan-18000b", "independent-trading-co-ind5000c",
  "gildan-12000", "gildan-sf000", "gildan-18000", "rabbit-skins-3326", "gildan-18600b",
  "gildan-sf500b", "gildan-18500b", "independent-trading-co-afx64crp",
  "independent-trading-co-ind5000p", "independent-trading-co-ss4500z",
  "independent-trading-co-ind4000", "gildan-18600", "gildan-12500", "gildan-sf500",
  "gildan-18500", "rabbit-skins-4400", "rabbit-skins-3322", "gildan-5100p",
  "gildan-5000b", "gildan-8000b", "gildan-64000l", "gildan-64v00", "comfort-colors-1717",
  "bella-canvas-3001", "american-apparel-1301", "gildan-8000", "gildan-64000", "gildan-5000",
];

// Longest prefixes first so e.g. "independent-trading-co" wins before any shorter match.
const BRANDS = [
  ["independent-trading-co", "Independent Trading Co."],
  ["american-apparel", "American Apparel"],
  ["comfort-colors", "Comfort Colors"],
  ["bella-canvas", "Bella + Canvas"],
  ["rabbit-skins", "Rabbit Skins"],
  ["yp-classics", "YP Classics"],
  ["q-tees", "Q-Tees"],
  ["valucap", "Valucap"],
  ["jerzees", "Jerzees"],
  ["gildan", "Gildan"],
  ["m-o", "M&O"],
];

export function parseHandle(handle) {
  for (const [prefix, brand] of BRANDS) {
    if (handle.startsWith(`${prefix}-`)) {
      return { brand, model: handle.slice(prefix.length + 1).toUpperCase() };
    }
  }
  throw new Error(`unknown brand in handle: ${handle}`);
}

export function extractSizeChart(html, handle) {
  const $ = cheerio.load(html);
  const root = $('[data-section-type="page"]').first();
  const title = root.find("h1.page__title").first().text().trim();
  const table = root.find(".page__content table").first();
  if (!title || table.length === 0) throw new Error(`no size-chart table for ${handle}`);

  const readRow = (row) =>
    $(row)
      .find("th, td")
      .map((_, cell) => $(cell).text().replace(/ /g, " ").trim())
      .get();

  const allRows = table.find("tr").get();
  const columns = readRow(allRows[0]);
  const rows = allRows.slice(1).map(readRow).filter((cells) => cells.some((c) => c.length > 0));
  if (columns.length < 2 || rows.length === 0) throw new Error(`degenerate table for ${handle}`);

  const notes = root
    .find(".page__content p")
    .map((_, p) => $(p).text().replace(/ /g, " ").trim())
    .get()
    .filter((text) => text.length > 0);

  const { brand, model } = parseHandle(handle);
  return { handle, brand, model, title, columns, rows, notes };
}
