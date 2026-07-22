import { Container } from "@/components/container";
import { RichSection } from "@/components/sections/rich-section";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { StepsTeaser } from "@/components/sections/steps-teaser";
import { WhyCusty } from "@/components/sections/why-custy";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { TrustBand } from "@/components/sections/trust-band";
import { Faq } from "@/components/sections/faq";
import { BlogTeasers } from "@/components/sections/blog-teasers";
import { CtaBand } from "@/components/lander";
import { home } from "@/content/home";
import { features } from "@/content/features";
import { howItWorks } from "@/content/how-it-works";
import { pricing } from "@/content/pricing";
import { posts } from "@/content/posts";

// Background scheme alternates scheme1 (white) / scheme2 (#f5f5f5) down the
// page so no two adjacent sections share a background — see
// task-R2-report.md for the full alternation map.
export default function HomePage() {
  return (
    <main>
      <RichSection block={home.intro} scheme="bg-scheme1-bg" imagePosition="left" headingLevel="h1" />
      <FeatureHighlights cards={(features.sections[0].cards ?? []).slice(0, 6)} scheme="bg-scheme2-bg" />
      <StepsTeaser steps={howItWorks.stepsSection.steps.slice(0, 4)} scheme="bg-scheme1-bg" />
      <WhyCusty scheme="bg-scheme2-bg" />
      <PricingTeaser plans={pricing.plans} scheme="bg-scheme1-bg" />
      <TrustBand scheme="bg-scheme2-bg" />
      <Faq items={pricing.faq.items} scheme="bg-scheme1-bg" />
      <BlogTeasers heading="Custy Blog" posts={posts} scheme="bg-scheme2-bg" />
      <Container className="pb-14">
        <CtaBand
          title={home.closing.title}
          text={home.closing.text}
          cta={home.closing.cta}
          secondaryCta={home.closing.secondaryCta}
          tone="light"
        />
      </Container>
    </main>
  );
}
