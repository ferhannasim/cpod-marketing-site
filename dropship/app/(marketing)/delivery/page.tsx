import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Body from "@/content/pages/delivery.mdx";
import { FREE_SHIPPING_THRESHOLD, money } from "@/content/shipping";

export const metadata: Metadata = {
  title: "Delivery Speed",
  description: `Production and shipping times across Canada, plus free shipping over ${money(FREE_SHIPPING_THRESHOLD)}.`,
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Help & info"
      title="Delivery Speed"
      lede="How fast we produce and ship, what it costs by province, and how tracking works."
    >
      <Body />
    </PageShell>
  );
}
