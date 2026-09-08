import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpCategoryView } from "@/components/help";
import { getCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Install Custy on Shopify, start your free trial, embed the storefront, and set up your first customizable product.",
};

export default function GettingStartedPage() {
  const category = getCategory("getting-started");
  if (!category) notFound();
  return <HelpCategoryView category={category} />;
}
