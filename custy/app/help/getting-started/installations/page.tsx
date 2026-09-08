import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpSubCategoryView } from "@/components/help";
import { getCategory, getSubCategory } from "@/content/help";

export const metadata: Metadata = {
  title: "Installations",
  description: "Install Custy, start the free trial, and manage your package.",
};

export default function InstallationsPage() {
  const category = getCategory("getting-started");
  const subCategory = getSubCategory("getting-started", "installations");
  if (!category || !subCategory) notFound();
  return <HelpSubCategoryView category={category} subCategory={subCategory} />;
}
