import Image from "next/image";
import Link from "next/link";

export type BlogPostCardPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
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
      className="group block overflow-hidden rounded-card border border-line"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 640px) 33vw, 100vw"
        />
      </div>
      <div className="p-4">
        <p className="text-[15px] font-medium text-ink">{post.title}</p>
        <p className="mt-1 text-xs text-body">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </div>
    </Link>
  );
}
