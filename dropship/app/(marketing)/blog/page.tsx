import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog-post-card";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on print-on-demand, dropshipping economics, and growing a merch brand on Shopify.",
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Guides for POD sellers"
        lede="Practical writing on printing, pricing and building a brand."
      />
      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </>
  );
}
