import { Container } from "@/components/container";
import { BlogPostCard, type BlogPostCardPost } from "@/components/blog-post-card";

// Post data now comes from content/posts/index.ts (the blog registry); this section
// just lays out the shared BlogPostCard in a 3-up grid.
export function BlogTeasers({ heading, posts }: { heading: string; posts: BlogPostCardPost[] }) {
  return (
    <section className="bg-scheme1-bg">
      <Container className="py-14 md:py-20">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{heading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
