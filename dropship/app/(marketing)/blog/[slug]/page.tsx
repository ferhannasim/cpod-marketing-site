import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPostDate } from "@/components/blog-post-card";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { posts } from "@/content/posts";

type PageProps = { params: Promise<{ slug: string }> };

const findPost = (slug: string) => posts.find((post) => post.slug === slug);

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const { Body } = post;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: "DropShipPOD" },
  };
  return (
    <main>
      <Container className="pt-12">
        <h1 className="font-display text-[clamp(1.875rem,4vw,2.375rem)] leading-[1.15] font-bold tracking-tight text-ink">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </Container>
      <Container className="py-10 sm:py-12">
        <Prose>
          <Body />
        </Prose>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  );
}
