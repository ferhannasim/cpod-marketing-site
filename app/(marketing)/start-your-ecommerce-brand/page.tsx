import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/start-your-ecommerce-brand.mdx";

export const metadata: Metadata = {
  title: "Start Your Ecommerce Brand Without Tech or High Costs",
  description: "Launch a print-on-demand brand without inventory, tech skills, or upfront costs.",
};

export default function Page() {
  return (
    <PageShell title="Start Your Ecommerce Brand Without Tech or High Costs">
      <Body />
    </PageShell>
  );
}
