import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpArticleView } from "@/components/help";
import { getAdjacentArticles, getArticle } from "@/content/help";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "Welcome to Custy. Learn what the app does, what it does not do, and how to complete your first setup.",
};

export default function OverviewPage() {
  const article = getArticle("getting-started", "overview");
  if (!article) notFound();
  const { previous, next } = getAdjacentArticles(article);
  return <HelpArticleView article={article} previous={previous} next={next} />;
}
