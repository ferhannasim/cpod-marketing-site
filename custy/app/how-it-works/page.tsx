import type { Metadata } from "next";
import { CardGrid, CtaBand, HighlightCard, Lander, LanderHero, LanderSection, Steps } from "@/components/lander";
import { howItWorks } from "@/content/how-it-works";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "Custy makes it easy for Shopify merchants to sell personalized products with a smooth, real-time customization experience.",
};

export default function HowItWorksPage() {
  return (
    <main>
      <Lander>
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

        <LanderSection title={howItWorks.stepsSection.title} lead={howItWorks.stepsSection.lead}>
          <Steps items={howItWorks.stepsSection.steps} layout="rows" />
        </LanderSection>

        <LanderSection title={howItWorks.whySection.title} lead={howItWorks.whySection.lead}>
          <CardGrid items={howItWorks.whySection.cards} columns={5} align="center" />
        </LanderSection>

        <CtaBand
          title={howItWorks.cta.title}
          text={howItWorks.cta.text}
          cta={howItWorks.cta.cta}
          secondaryCta={howItWorks.cta.secondaryCta}
        />
      </Lander>
    </main>
  );
}
