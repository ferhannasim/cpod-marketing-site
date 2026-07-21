import { describe, expect, it } from "vitest";
import { SIZE_CHART_HANDLES, extractSizeChart, parseHandle } from "./size-chart.mjs";

describe("SIZE_CHART_HANDLES", () => {
  it("contains all 47 unique handles", () => {
    expect(SIZE_CHART_HANDLES).toHaveLength(47);
    expect(new Set(SIZE_CHART_HANDLES).size).toBe(47);
  });
});

describe("parseHandle", () => {
  it.each([
    ["gildan-5000", "Gildan", "5000"],
    ["gildan-5400b", "Gildan", "5400B"],
    ["independent-trading-co-ind5000c", "Independent Trading Co.", "IND5000C"],
    ["m-o-5540", "M&O", "5540"],
    ["q-tees-qtb6000", "Q-Tees", "QTB6000"],
    ["yp-classics-6506", "YP Classics", "6506"],
    ["american-apparel-1301", "American Apparel", "1301"],
    ["bella-canvas-3001", "Bella + Canvas", "3001"],
  ])("%s -> %s %s", (handle, brand, model) => {
    expect(parseHandle(handle)).toEqual({ brand, model });
  });
  it("throws on an unknown brand prefix", () => {
    expect(() => parseHandle("unknown-brand-123")).toThrow();
  });
});

describe("extractSizeChart", () => {
  const HTML = `<html><body>
  <section data-section-type="page">
    <header class="page__header"><h1 class="page__title">Gildan 5000 Size Chart</h1></header>
    <div class="page__content rte">
      <p>All measurements in inches.</p>
      <table>
        <thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead>
        <tbody>
          <tr><td>S</td><td>18</td><td>28</td></tr>
          <tr><td>M</td><td>20</td><td>29</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  </body></html>`;

  it("extracts title, header row, body rows, and surrounding notes", () => {
    const chart = extractSizeChart(HTML, "gildan-5000");
    expect(chart).toEqual({
      handle: "gildan-5000",
      brand: "Gildan",
      model: "5000",
      title: "Gildan 5000 Size Chart",
      columns: ["Size", "Chest", "Length"],
      rows: [
        ["S", "18", "28"],
        ["M", "20", "29"],
      ],
      notes: ["All measurements in inches."],
    });
  });
  it("throws when the page has no table", () => {
    const noTable = HTML.replace(/<table>[\s\S]*<\/table>/, "");
    expect(() => extractSizeChart(noTable, "gildan-5000")).toThrow();
  });
});
