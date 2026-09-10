import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Colors",
  description: "Build color lists you can reuse, with optional extra prices.",
};

export default function ColorsPage() {
  const category = getCategory("products");
  const subCategory = getSubCategory("products", "colors");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
