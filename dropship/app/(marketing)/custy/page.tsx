import type { Metadata } from "next";
import { CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection } from "@/components/lander";
import { custyCta, custyFeatures, custyHandoff, custyHero } from "@/content/custy-page";

export const metadata: Metadata = {
  title: "Custy — Product Personalization",
  description:
    "Pair DropShipPOD with Custy to let shoppers design products on your storefront — multi-side printing, print-ready files, free plan to start.",
};

export default function CustyPage() {
  return (
    <>
      <LanderHero {...custyHero} highlight={<HighlightCard title="The one-click handoff" items={custyHandoff} />} />
      <LanderSection eyebrow="What Custy adds" title="Personalization that stays print-ready">
        <CardGrid items={custyFeatures} columns={4} />
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...custyCta} />
      </LanderSection>
    </>
  );
}
