import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { AppCta } from "@/components/app-cta";
import { Container } from "@/components/ui/container";
import Body from "@/content/pages/start-your-ecommerce-brand.mdx";

export const metadata: Metadata = {
  title: "Start Your Ecommerce Brand Without Tech or High Costs",
  description: "Launch a print-on-demand brand without inventory, tech skills, or upfront costs.",
};

export default function Page() {
  return (
    <>
      <PageShell eyebrow="Start a brand" title="Start Your Ecommerce Brand Without Tech or High Costs">
        <Body />
      </PageShell>
      <Container className="pb-16">
        <AppCta />
      </Container>
    </>
  );
}
