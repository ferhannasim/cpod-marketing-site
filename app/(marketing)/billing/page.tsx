import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/billing.mdx";

export const metadata: Metadata = {
  title: "Billing Information",
  description: "How DropShipPOD billing works for dropship orders.",
};

export default function Page() {
  return (
    <PageShell title="Billing Information">
      <Body />
    </PageShell>
  );
}
