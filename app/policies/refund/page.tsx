import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/policies/refund.mdx";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "When and how refunds apply to custom-printed orders.",
};

export default function Page() {
  return (
    <PageShell title="Refund Policy">
      <Body />
    </PageShell>
  );
}
