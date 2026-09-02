import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/help-centre",
  "/live-demo",
  "/about",
  "/faq",
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
