import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpCategoryView } from "@/components/help";
import { getCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Add Custy, pick a plan, turn it on in your theme, and set up your first custom product — one step at a time.",
};

export default function GettingStartedPage() {
  const category = getCategory("getting-started");
  if (!category) notFound();
  return <HelpCategoryView category={category} />;
}
