import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/delivery.mdx";

export const metadata: Metadata = {
  title: "Delivery Speed",
  description: "Production and shipping times across Canada, plus free shipping over $199.",
};

export default function Page() {
  return (
    <PageShell title="Delivery Speed">
      <Body />
    </PageShell>
  );
}
