import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/about.mdx";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who DropShipPOD is: Canadian print-on-demand production and dropshipping.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Company"
      title="About Us"
      lede="Canadian DTF print production, plus the two Shopify apps built around it."
    >
      <Body />
    </PageShell>
  );
}
