import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Restrictions & Inventory",
  description: "Turn tools on or off, and track stock by size, color, and style.",
};

export default function RestrictionsAndInventoryPage() {
  const category = getCategory("products");
  const subCategory = getSubCategory("products", "restrictions-and-inventory");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
