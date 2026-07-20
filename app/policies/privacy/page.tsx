import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/policies/privacy.mdx";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DropShipPOD collects, uses, and protects your information.",
};

export default function Page() {
  return (
    <PageShell title="Privacy Policy">
      <Body />
    </PageShell>
  );
}
