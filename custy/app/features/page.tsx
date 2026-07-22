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

export default function FeaturesPage() {
  const [keyFeatures, howItWorks, perfectFor] = features.sections;

  return (
    <main>
      <Lander>
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

        <LanderSection title={keyFeatures.title} lead={keyFeatures.lead}>
          <CardGrid items={keyFeatures.cards ?? []} columns={3} />
        </LanderSection>
      </Lander>

      {/* "Works with your POD workflow" strip: full-bleed so its scheme2
          background genuinely alternates against the white Lander panels on
          either side, instead of reading as just another white panel (same
          placement pattern as TrustBand on the pricing page). */}
      <section className="bg-scheme2-bg">
        <div className="mx-auto max-w-[1200px] px-5 py-14 max-md:px-4 md:py-16">
          <h2 className="mb-8 text-center text-[1.625rem] leading-[1.2] font-extrabold text-lander-dark md:text-[1.75rem]">
            {features.workflowStrip.title}
          </h2>
          <CardGrid items={features.workflowStrip.items} columns={4} />
        </div>
      </section>

      <Lander className="pt-0 max-md:pt-0">
        <LanderSection title={howItWorks.title} lead={howItWorks.lead}>
          <Steps items={howItWorks.steps ?? []} columns={4} />
          {/* howItWorks (this page's own 4-step summary) and
              content/how-it-works.ts's first 4 steps cover the same ground
              (install -> configure -> customers design -> print-ready
              orders) at different levels of detail, so rendering a second
              steps teaser here would duplicate this section rather than add
              to it. Keeping these steps and linking through to the full
              walkthrough instead — see task-R4-report.md for the full
              step-by-step comparison. */}
          <div className="mt-8 text-center">
            <LanderCta label="See how it works" href="/how-it-works" variant="secondary" />
          </div>
        </LanderSection>

        <LanderSection title={perfectFor.title} lead={perfectFor.lead}>
          <CardGrid items={perfectFor.cards ?? []} columns={4} align="center" />
        </LanderSection>

        <CtaBand
          title={features.cta.title}
          text={features.cta.text}
          cta={features.cta.cta}
          secondaryCta={features.cta.secondaryCta}
        />
      </Lander>
    </main>
  );
}
