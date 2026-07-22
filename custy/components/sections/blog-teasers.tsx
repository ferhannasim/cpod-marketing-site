import { Container } from "@/components/container";
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
      <Container className="py-14 md:py-20">
        <h2 className="text-[1.625rem] font-extrabold leading-[1.2] text-ink md:text-[1.75rem]">{heading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
