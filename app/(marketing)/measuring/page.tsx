import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/measuring.mdx";

export const metadata: Metadata = {
  title: "How to Measure",
  description: "How to measure garments to pick the right size.",
};

export default function Page() {
  return (
    <PageShell eyebrow="Sizing" title="How to Measure">
      <Body />
    </PageShell>
  );
}
