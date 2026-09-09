import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Quantity Discount",
  description: "Reward shoppers who buy more with percent or fixed discounts.",
};

export default function QuantityDiscountPage() {
  const category = getCategory("products");
  const subCategory = getSubCategory("products", "quantity-discount");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
