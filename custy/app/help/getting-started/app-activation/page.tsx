import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "App Activation",
  description: "Embed the cart editor and add the Customize It button to your theme.",
};

export default function AppActivationPage() {
  const category = getCategory("getting-started");
  const subCategory = getSubCategory("getting-started", "app-activation");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
