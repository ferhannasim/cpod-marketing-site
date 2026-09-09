import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpArticleView } from "@/components/help";
import { getAdjacentArticles, getArticle } from "@/content/help";

export const metadata: Metadata = {
  title: "Overview of the Design Lab",
  description:
    "A plain tour of every main button in the Custy Design Lab — the screen shoppers use to decorate your products.",
};

export default function DesignLabOverviewPage() {
  const article = getArticle("products", "overview-of-the-design-lab");
  if (!article) notFound();
  const { previous, next } = getAdjacentArticles(article);
  return <HelpArticleView article={article} previous={previous} next={next} />;
}
