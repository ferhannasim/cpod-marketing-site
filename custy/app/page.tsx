import { Container } from "@/components/container";
import { RichSection } from "@/components/sections/rich-section";
import { DemoProducts } from "@/components/sections/demo-products";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { StepsTeaser } from "@/components/sections/steps-teaser";
import { TrustBand } from "@/components/sections/trust-band";
import { Eyebrow, PricingTable, RainbowBar } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { home } from "@/content/home";
import { pricing } from "@/content/pricing";

export default function HomePage() {
  return (
    <main>
      {/* The hero and the guarantees strip share one wash. Painted separately
          they read as two mismatched bands with a rule between them, because
          the hero's gradient has already settled to its pale end tone by the
          time the strip starts its own from the top. */}
      <div className="bg-wash-hero border-b border-line">
        <RichSection
          block={home.intro}
          scheme="bg-transparent"
          imagePosition="right"
          headingLevel="h1"
          eyebrow="Shopify product customizer"
        />
        <TrustBand scheme="bg-transparent" />
      </div>
      <FeatureHighlights id="features" scheme="bg-scheme1-bg" />
      <StepsTeaser id="how-it-works" scheme="bg-wash" />
      <DemoProducts id="live-demo" scheme="bg-scheme1-bg" />
      <section id="pricing" className="bg-wash scroll-mt-20">
        <Container className="py-16 md:py-24">
          <Reveal className="mx-auto mb-4 max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <Eyebrow className="mb-4">Pricing</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              {pricing.header.title}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-body md:text-[16.5px]">
              {pricing.header.lead}
            </p>
            <div className="mt-6 inline-block rounded-full bg-[#fdeaf5] px-4 py-2 text-[14px] font-semibold text-[#b00065]">
              {pricing.header.note}
            </div>
          </Reveal>
          <Reveal variant="zoom">
            <PricingTable plans={pricing.plans} />
            <p className="mx-auto mt-10 max-w-[840px] text-center text-[15px] leading-[1.6] text-body">
              {pricing.bottomNote}
            </p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
