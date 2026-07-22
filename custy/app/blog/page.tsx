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
      <Container className="py-16 md:py-20">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <h1 className="text-[clamp(2.125rem,4.5vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
            Custy Blog
          </h1>
          <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
            Guides and news on Shopify product customization and print-on-demand from Custy.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
