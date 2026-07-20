import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/artwork-approval.mdx";

export const metadata: Metadata = {
  title: "Artwork & Mockup Approval",
  description: "How artwork and mockup approval works for your orders.",
};

export default function Page() {
  return (
    <PageShell title="Artwork & Mockup Approval">
      <Body />
    </PageShell>
  );
}
