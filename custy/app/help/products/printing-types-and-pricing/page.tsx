import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Printing Types & Pricing",
  description: "Set printing methods, fees, and attach them to products.",
};

export default function PrintingTypesAndPricingPage() {
  const category = getCategory("products");
  const subCategory = getSubCategory("products", "printing-types-and-pricing");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
