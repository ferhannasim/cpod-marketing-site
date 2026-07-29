import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { STATIC_ROUTES } from "@/lib/routes";
import { getAllSizeCharts } from "@/lib/size-charts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${SITE_URL}${route}` })),
    ...getAllSizeCharts().map((chart) => ({ url: `${SITE_URL}/size-charts/${chart.handle}` })),
    ...posts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}` })),
  ];
}
