import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpArticleView } from "@/components/help";
import {
  getAdjacentArticles,
  getArticle,
  getSubCategory,
} from "@/content/help";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const sub = getSubCategory("getting-started", "app-activation");
  return (sub?.articles ?? []).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("getting-started", slug, "app-activation");
  if (!article) return {};
  return { title: article.title, description: article.description };
}

export default async function AppActivationArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle("getting-started", slug, "app-activation");
  if (!article) notFound();
  const { previous, next } = getAdjacentArticles(article);
  return <HelpArticleView article={article} previous={previous} next={next} />;
}
