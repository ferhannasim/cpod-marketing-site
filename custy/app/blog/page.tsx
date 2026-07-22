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
        <h1 className="text-[1.625rem] font-extrabold leading-[1.2] text-ink md:text-[1.75rem]">Custy Blog</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
