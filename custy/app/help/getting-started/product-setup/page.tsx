import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Product Setup",
  description: "Make a product customizable, define print areas, and configure pricing.",
};

export default function ProductSetupPage() {
  const category = getCategory("getting-started");
  const subCategory = getSubCategory("getting-started", "product-setup");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
