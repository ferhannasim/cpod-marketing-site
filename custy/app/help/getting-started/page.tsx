import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpCategoryView } from "@/components/help";
import { getCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Add Custy, pick a plan, and turn it on in your theme.",
};

export default function GettingStartedPage() {
  const category = getCategory("getting-started");
  if (!category) notFound();
  return <HelpCategoryView category={category} />;
}
