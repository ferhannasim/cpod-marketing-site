import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/policies/shipping.mdx";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "DropShipPOD's shipping terms, timelines, and coverage.",
};

export default function Page() {
  return (
    <PageShell title="Shipping Policy">
      <Body />
    </PageShell>
  );
}
