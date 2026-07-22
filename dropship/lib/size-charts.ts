import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

export const sizeChartSchema = z.object({
  handle: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  title: z.string().min(1),
  columns: z.array(z.string().min(1)).min(2),
  rows: z.array(z.array(z.string())).min(1),
  notes: z.array(z.string()),
});

export type SizeChart = z.infer<typeof sizeChartSchema>;

const DIR = path.join(process.cwd(), "content", "size-charts");
let cache: SizeChart[] | undefined;

export function getAllSizeCharts(): SizeChart[] {
  cache ??= fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => sizeChartSchema.parse(JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"))));
  return cache;
}

export function getSizeChart(handle: string): SizeChart | undefined {
  return getAllSizeCharts().find((chart) => chart.handle === handle);
}

export function chartsByBrand(): [string, SizeChart[]][] {
  const groups = new Map<string, SizeChart[]>();
  for (const chart of getAllSizeCharts()) {
    groups.set(chart.brand, [...(groups.get(chart.brand) ?? []), chart]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}
