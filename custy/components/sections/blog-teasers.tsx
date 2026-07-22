import { Container } from "@/components/container";
import { Eyebrow } from "@/components/lander";
import { BlogPostCard, type BlogPostCardPost } from "@/components/blog-post-card";

// Post data now comes from content/posts/index.ts (the blog registry); this section
// just lays out the shared BlogPostCard in a 3-up grid.
export function BlogTeasers({
  heading,
  posts,
  scheme = "bg-scheme1-bg",
}: {
  heading: string;
  posts: BlogPostCardPost[];
  scheme?: string;
}) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">Blog</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            {heading}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
