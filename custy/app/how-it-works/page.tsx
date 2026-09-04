import type { Metadata } from "next";
import {
  CardGrid,
  CtaBand,
  HighlightCard,
  Lander,
  LanderHero,
  LanderSection,
  Steps,
} from "@/components/lander";
import { howItWorks } from "@/content/how-it-works";
import { noIndex } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "Custy makes it easy for Shopify merchants to sell personalized products with a smooth, real-time customization experience.",
  robots: noIndex,
};

export default function HowItWorksPage() {
  return (
    <main>
      <LanderHero
        eyebrow={howItWorks.hero.eyebrow}
        title={howItWorks.hero.title}
        lead={howItWorks.hero.lead}
        ctas={howItWorks.hero.ctas}
        highlight={
          <HighlightCard
            title={howItWorks.hero.highlight.title}
            items={howItWorks.hero.highlight.items}
          />
        }
      />

      <LanderSection
        eyebrow="Step by step"
        title={howItWorks.stepsSection.title}
        lead={howItWorks.stepsSection.lead}
      >
        <Steps items={howItWorks.stepsSection.steps} layout="rows" />
      </LanderSection>

      <LanderSection
        eyebrow="Why Custy"
        title={howItWorks.whySection.title}
        lead={howItWorks.whySection.lead}
        tone="light"
      >
        <CardGrid items={howItWorks.whySection.cards} columns={5} align="center" />
      </LanderSection>

      <div className="bg-white">
        <Lander className="py-16 md:py-20">
          <CtaBand
            title={howItWorks.cta.title}
            text={howItWorks.cta.text}
            cta={howItWorks.cta.cta}
          />
        </Lander>
      </div>
    </main>
  );
}
