import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/printing-notice.mdx";

export const metadata: Metadata = {
  title: "Important Printing Notice",
  description: "What to know about print results before placing an order.",
};

export default function Page() {
  return (
    <PageShell title="Important Printing Notice">
      <Body />
    </PageShell>
  );
}
