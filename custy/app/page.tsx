import { Container } from "@/components/container";
import { RichSection } from "@/components/sections/rich-section";
import { DemoProducts } from "@/components/sections/demo-products";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { StepsTeaser } from "@/components/sections/steps-teaser";
import { WhyCusty } from "@/components/sections/why-custy";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { TrustBand } from "@/components/sections/trust-band";
import { Faq } from "@/components/sections/faq";
import { BlogTeasers } from "@/components/sections/blog-teasers";
import { CardGrid, CtaBand, Eyebrow } from "@/components/lander";
import { home } from "@/content/home";
import { features } from "@/content/features";
import { howItWorks } from "@/content/how-it-works";
import { pricing } from "@/content/pricing";
import { posts } from "@/content/posts";

// Background scheme alternates scheme1 (white) / scheme2 (#f5f5f5) down the
// page so no two adjacent sections share a background — see task-R2-report.md
// for the original alternation map; the 2026-07-22 live-demo work inserted
// DemoProducts after StepsTeaser and flipped every later band. Task 5
// (2026-07-29) inserted the print-methods, Design Lab teaser and DropShipPOD
// tie-in bands and re-flipped WhyCusty, Faq and BlogTeasers so the alternation
// still holds; the page-ending CtaBand sits in a plain (unschemed) Container,
// which inherits the body's scheme1 (white) background, so BlogTeasers — the
// last real section — is pinned to scheme2 to stay adjacent-distinct from it.
export default function HomePage() {
  return (
    <main>
      <RichSection
        block={home.intro}
        scheme="bg-scheme1-bg"
        imagePosition="left"
        headingLevel="h1"
        eyebrow="Shopify product customizer"
      />
      <FeatureHighlights cards={(features.sections[0].cards ?? []).slice(0, 6)} scheme="bg-scheme2-bg" />
      <StepsTeaser steps={howItWorks.stepsSection.steps.slice(0, 4)} scheme="bg-scheme1-bg" />
      <DemoProducts scheme="bg-scheme2-bg" />
      <section className="bg-scheme1-bg">
        <Container className="py-16 md:py-24">
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            <Eyebrow className="mb-4">Print methods</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              Print methods that match your products
            </h2>
          </div>
          <CardGrid items={home.printMethods} columns={3} align="center" />
        </Container>
      </section>
      <WhyCusty scheme="bg-scheme2-bg" />
      <section className="bg-scheme1-bg">
        <Container className="py-16 md:py-20">
          <CtaBand
            title={home.designLabTeaser.title}
            text={home.designLabTeaser.text}
            cta={home.designLabTeaser.cta}
            secondaryCta={home.designLabTeaser.secondaryCta}
            tone="light"
          />
        </Container>
      </section>
      <PricingTeaser plans={pricing.plans} scheme="bg-scheme2-bg" />
      <TrustBand scheme="bg-scheme1-bg" />
      <section className="bg-scheme2-bg">
        <Container className="py-16 md:py-20">
          <CtaBand
            title={home.dropshipTiein.title}
            text={home.dropshipTiein.text}
            cta={home.dropshipTiein.cta}
            secondaryCta={home.dropshipTiein.secondaryCta}
            tone="light"
          />
        </Container>
      </section>
      <Faq items={pricing.faq.items.slice(0, 4)} scheme="bg-scheme1-bg" />
      <BlogTeasers heading="Custy Blog" posts={posts} scheme="bg-scheme2-bg" />
      <Container className="py-16 md:py-20">
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
