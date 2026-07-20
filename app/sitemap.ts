import type { MetadataRoute } from "next";
import { STATIC_ROUTES } from "@/lib/routes";
import { getAllSizeCharts } from "@/lib/size-charts";

const BASE = "https://dropshippod.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${BASE}${route}` })),
    ...getAllSizeCharts().map((chart) => ({ url: `${BASE}/size-charts/${chart.handle}` })),
  ];
}
