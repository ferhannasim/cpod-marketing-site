import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpArticleView } from "@/components/help";
import { getAdjacentArticles, getArticle } from "@/content/help";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "A simple welcome to Custy. What it does, what it does not do, and what to do first.",
};

export default function OverviewPage() {
  const article = getArticle("getting-started", "overview");
  if (!article) notFound();
  const { previous, next } = getAdjacentArticles(article);
  return <HelpArticleView article={article} previous={previous} next={next} />;
}
