import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/container";
import { Prose } from "@/components/prose";
import { formatPostDate } from "@/components/blog-post-card";
import { posts } from "@/content/posts";
import { SITE_URL } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

// Post images aren't part of the Post registry's `image: string` contract, so real
// intrinsic dimensions (measured with `sips -g pixelWidth -g pixelHeight`) live here,
// scoped to the one place that renders a non-cropped hero <Image>.
const heroImageDims: Record<string, { width: number; height: number }> = {
  "7-ways-product-customization-increases-your-shopify-store-revenue": { width: 1279, height: 853 },
  "how-to-start-a-print-on-demand-business-with-shopify-step-by-step-guide": { width: 1848, height: 970 },
  "why-product-customization-is-the-future-of-ecommerce-in-2026": { width: 1280, height: 853 },
};

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
      images: [{ url: post.image }],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const { Body } = post;
  const dims = heroImageDims[post.slug];
  const imageUrl = `${SITE_URL}${post.image}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    image: imageUrl,
    author: { "@type": "Organization", name: "Custy" },
  };

  return (
    <main>
      <Container className="pt-12">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">{post.title}</h1>
        <p className="mt-2 text-sm text-body">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </Container>
      {dims && (
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
