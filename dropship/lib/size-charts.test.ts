import { describe, expect, it } from "vitest";
import { chartsByBrand, getAllSizeCharts, getSizeChart } from "./size-charts";

describe("size chart data", () => {
  it("loads and validates all 47 charts", () => {
    expect(getAllSizeCharts()).toHaveLength(47);
  });
  it("finds a chart by handle and returns undefined for unknown", () => {
    expect(getSizeChart("gildan-5000")?.brand).toBe("Gildan");
    expect(getSizeChart("nope")).toBeUndefined();
  });
  it("groups charts by brand with stable brand order", () => {
    const groups = chartsByBrand();
    const brands = groups.map(([brand]) => brand);
    expect(brands).toEqual([...brands].sort());
    expect(groups.flatMap(([, charts]) => charts)).toHaveLength(47);
  });
  it("every row has the same cell count as its header", () => {
    for (const chart of getAllSizeCharts()) {
      for (const row of chart.rows) expect(row).toHaveLength(chart.columns.length);
    }
  });
});
