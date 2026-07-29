import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection, Steps } from "@/components/lander";
import { combo, dropshipFlow, dropshippingCta, dropshippingHero } from "@/content/dropshipping";

export const metadata: Metadata = {
  title: "Dropshipping",
  description:
    "How Custy pairs with DropShipPOD: import print-on-demand products, let shoppers personalize them, and hand print-ready files to the supplier automatically.",
};

export default function DropshippingPage() {
  return (
    <main>
      <LanderHero {...dropshippingHero} />
      <LanderSection eyebrow="Better together" title="What the pairing unlocks">
        <CardGrid items={combo} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="The loop" title="From catalog to customized doorstep">
        <Steps items={dropshipFlow} layout="rows" />
      </LanderSection>
      <LanderSection>
        <CtaBand {...dropshippingCta} />
      </LanderSection>
    </main>
  );
}
