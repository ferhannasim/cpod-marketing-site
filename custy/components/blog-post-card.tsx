import Image from "next/image";
import Link from "next/link";

export type BlogPostCardPost = {
  slug: string;
  title: string;
  date: string;
  image?: string;
};

// Post dates are stored as plain YYYY-MM-DD strings; format in UTC so the displayed
// date never shifts a day depending on the reader's timezone.
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Card grid used on both the homepage teasers and the /blog index, matching the live
// site's featured-blog-posts-card look (image, title, date) — see
// content/raw/home.html's featured-blog-posts section.
export function BlogPostCard({ post }: { post: BlogPostCardPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-testid="blog-post-card"
      className="group block overflow-hidden rounded-card border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]"
    >
      {post.image ? (
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 640px) 33vw, 100vw"
          />
        </div>
      ) : null}
      <div className="p-5">
        <p className="text-[15px] leading-snug font-semibold text-ink">{post.title}</p>
        <p className="mt-1.5 text-xs text-[#667085]">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </div>
    </Link>
  );
}
