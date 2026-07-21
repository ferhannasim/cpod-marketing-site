import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";

export type BlogTeaserPost = {
  slug: string;
  title: string;
  image: { src: string; width: number; height: number; alt?: string };
};

// Post list is inline for now (slug/title/image); the blog task's
// content/posts/index.ts becomes the source of truth once /blog exists.
export function BlogTeasers({ heading, posts }: { heading: string; posts: BlogTeaserPost[] }) {
  return (
    <section className="bg-scheme1-bg">
      <Container className="py-14 md:py-20">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{heading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-card border border-line"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={post.image.src}
                  alt={post.image.alt ?? post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <p className="p-4 text-sm font-medium text-ink">{post.title}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
