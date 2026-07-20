import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/how-it-works.mdx";

export const metadata: Metadata = {
  title: "How It Works",
  description: "The 5 easy steps to ordering custom-printed products from DropShipPOD.",
};

export default function Page() {
  return (
    <PageShell eyebrow="Getting started" title="How It Works">
      <Body />
    </PageShell>
  );
}
