import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/features",
  "/pricing",
  "/how-it-works",
  "/live-demo",
  "/about-us",
  "/support",
  "/contact",
  "/policies/privacy",
  "/policies/terms",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${SITE_URL}${route}` })),
    ...posts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: post.date })),
  ];
}
