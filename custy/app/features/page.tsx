import type { Metadata } from "next";
import {
  CardGrid,
  CtaBand,
  HighlightCard,
  Lander,
  LanderCta,
  LanderHero,
  LanderSection,
  Steps,
} from "@/components/lander";
import { features } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Custy is a powerful and easy-to-use product customizer app built for Shopify merchants who want to sell personalized products.",
};

// Band tones alternate white / light down the page so no two adjacent
// sections share a background; the hero carries its own tinted wash.
export default function FeaturesPage() {
  const [keyFeatures, howItWorks, perfectFor, operations] = features.sections;

  return (
    <main>
      <LanderHero
        eyebrow={features.hero.eyebrow}
        title={features.hero.title}
        lead={features.hero.lead}
        ctas={features.hero.ctas}
        highlight={
          <HighlightCard
            title={features.hero.highlight.title}
            items={features.hero.highlight.items}
          />
        }
      />

      <LanderSection eyebrow="Features" title={keyFeatures.title} lead={keyFeatures.lead}>
        <CardGrid items={keyFeatures.cards ?? []} columns={3} />
      </LanderSection>

      <LanderSection eyebrow="Production" title={features.workflowStrip.title} tone="light">
        <CardGrid items={features.workflowStrip.items} columns={4} />
      </LanderSection>

      <LanderSection eyebrow="Workflow" title={howItWorks.title} lead={howItWorks.lead}>
        <Steps items={howItWorks.steps ?? []} columns={4} />
        {/* content/how-it-works.ts's first 4 steps cover the same ground as
            this page's own 4-step summary, so link through to the full
            walkthrough instead of rendering a second steps block. */}
        <div className="mt-10 text-center">
          <LanderCta label="See how it works" href="/how-it-works" variant="secondary" />
        </div>
      </LanderSection>

      <LanderSection eyebrow="Who it's for" title={perfectFor.title} lead={perfectFor.lead} tone="light">
        <CardGrid items={perfectFor.cards ?? []} columns={4} align="center" />
      </LanderSection>

      <LanderSection eyebrow="Operations" title={operations.title} lead={operations.lead} tone="light">
        <CardGrid items={operations.cards ?? []} columns={3} />
      </LanderSection>

      <div className="bg-white">
        <Lander className="py-16 md:py-20">
          <CtaBand
            title={features.cta.title}
            text={features.cta.text}
            cta={features.cta.cta}
            secondaryCta={features.cta.secondaryCta}
          />
        </Lander>
      </div>
    </main>
  );
}
