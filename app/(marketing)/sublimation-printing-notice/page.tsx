import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/sublimation-printing-notice.mdx";

export const metadata: Metadata = {
  title: "Sublimation Printing Notice",
  description: "What to know about sublimation printing before placing an order.",
};

export default function Page() {
  return (
    <PageShell title="Sublimation Printing Notice">
      <Body />
    </PageShell>
  );
}
