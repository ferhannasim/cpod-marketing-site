import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Custom Products",
  description: "Turn a Shopify product into a custom product and set print areas.",
};

export default function CustomProductsPage() {
  const category = getCategory("products");
  const subCategory = getSubCategory("products", "custom-products");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
