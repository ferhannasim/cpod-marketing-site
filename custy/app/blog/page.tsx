import type { Metadata } from "next";
import { Container } from "@/components/container";
import { BlogPostCard } from "@/components/blog-post-card";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Custy Blog",
  description: "Guides and news on Shopify product customization and print-on-demand from Custy.",
};

export default function BlogIndexPage() {
  return (
    <main>
      <Container className="py-14 md:py-20">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">Custy Blog</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
