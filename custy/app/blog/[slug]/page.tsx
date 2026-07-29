import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/container";
import { Prose } from "@/components/prose";
import { formatPostDate } from "@/components/blog-post-card";
import { posts } from "@/content/posts";
import { SITE_URL } from "@/lib/site";
import { heroImageDims } from "./hero-image-dims";

type PageProps = { params: Promise<{ slug: string }> };

function findPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const { Body } = post;
  const dims = heroImageDims[post.slug];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    author: { "@type": "Organization", name: "Custy" },
  };

  return (
    <main>
      <Container className="pt-12">
        <h1 className="text-[clamp(1.875rem,4vw,2.375rem)] font-extrabold leading-[1.15] text-ink">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-body">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </Container>
      {dims && post.image && (
        <Container className="mt-8">
          <div className="overflow-hidden rounded-card">
            <Image
              src={post.image}
              alt={post.title}
              width={dims.width}
              height={dims.height}
              className="h-auto w-full"
              priority
            />
          </div>
        </Container>
      )}
      <Prose>
        <Body />
      </Prose>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </main>
  );
}
