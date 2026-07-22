import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/printing-notice.mdx";

export const metadata: Metadata = {
  title: "Important Printing Notice",
  description: "What to know about print results before placing an order.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Please read"
      title="Important Printing Notice"
      alert="Please read this notice in full before placing an order — it affects how your prints will look."
    >
      <Body />
    </PageShell>
  );
}
