import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { AppCta } from "@/components/app-cta";
import { Container } from "@/components/ui/container";
import Body from "@/content/pages/launch-automated-brand.mdx";

export const metadata: Metadata = {
  title: "Launch a Fully Automated Ecommerce Brand",
  description: "Connect the DropShipPOD Shopify app and automate order fulfilment end to end.",
};

export default function Page() {
  return (
    <>
      <PageShell title="Launch a Fully Automated Ecommerce Brand">
        <Body />
      </PageShell>
      <Container className="pb-16">
        <AppCta />
      </Container>
    </>
  );
}
