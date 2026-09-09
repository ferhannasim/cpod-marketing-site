import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpCategoryView } from "@/components/help";
import { getCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Make custom products, set colors and sizes, print areas, pricing, and see how the Design Lab works for shoppers.",
};

export default function ProductsPage() {
  const category = getCategory("products");
  if (!category) notFound();
  return <HelpCategoryView category={category} />;
}
