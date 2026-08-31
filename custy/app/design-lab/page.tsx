import type { Metadata } from "next";
import {
  CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection, Steps,
} from "@/components/lander";
import {
  designLabCta, designLabFlow, designLabHero, designTools, safeguards,
} from "@/content/design-lab";
import { noIndex } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Design Lab",
  description:
    "Tour Custy's Design Lab: shoppers add text, cliparts and uploads across every printable side, with DPI checks, bounds warnings and approval before checkout.",
  robots: noIndex,
};

export default function DesignLabPage() {
  return (
    <main>
      <LanderHero
        eyebrow={designLabHero.eyebrow}
        title={designLabHero.title}
        lead={designLabHero.lead}
        ctas={designLabHero.ctas}
        highlight={<HighlightCard title={designLabHero.highlight.title} items={designLabHero.highlight.items} />}
      />
      <LanderSection eyebrow="Design tools" title="Everything a shopper needs to create"
        lead="The Design Lab keeps creativity open and production safe.">
        <CardGrid items={designTools} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Quality safeguards" title="Creative freedom that stays printable">
        <CardGrid items={safeguards} columns={4} />
      </LanderSection>
      <LanderSection eyebrow="From design to press" title="What happens after they click add to cart">
        <Steps items={designLabFlow} layout="rows" />
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...designLabCta} />
      </LanderSection>
    </main>
  );
}
