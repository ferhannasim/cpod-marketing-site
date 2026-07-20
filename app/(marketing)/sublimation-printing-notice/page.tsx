import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/sublimation-printing-notice.mdx";

export const metadata: Metadata = {
  title: "Sublimation Printing Notice",
  description: "What to know about sublimation printing before placing an order.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Please read"
      title="Sublimation Printing Notice"
      alert="Sublimation has specific requirements — please read this notice before ordering."
    >
      <Body />
    </PageShell>
  );
}
