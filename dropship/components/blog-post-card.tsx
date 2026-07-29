import Link from "next/link";
import type { Post } from "@/content/posts";

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_16px_40px_-12px_rgba(20,31,86,0.16)]">
      <p className="text-[13px] text-zinc-500">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </p>
      <h2 className="mt-2 text-lg leading-snug font-semibold text-ink">
        <Link href={`/blog/${post.slug}`} className="hover:text-brand">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2.5 text-[15px] leading-[1.65] text-zinc-600">{post.description}</p>
    </article>
  );
}
