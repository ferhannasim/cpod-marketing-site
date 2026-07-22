import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/policies/terms.mdx";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of DropShipPOD's site and services.",
};

export default function Page() {
  return (
    <PageShell eyebrow="Legal" variant="quiet" title="Terms of Service">
      <Body />
    </PageShell>
  );
}
