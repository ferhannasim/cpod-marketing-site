import { Container } from "@/components/container";
import { RichSection } from "@/components/sections/rich-section";
import { DemoProducts } from "@/components/sections/demo-products";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { StepsTeaser } from "@/components/sections/steps-teaser";
import { TrustBand } from "@/components/sections/trust-band";
import { ContactChannels } from "@/components/sections/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow, PricingTable, RainbowBar } from "@/components/lander";
import { home } from "@/content/home";
import { features } from "@/content/features";
import { howItWorks } from "@/content/how-it-works";
import { pricing } from "@/content/pricing";

export default function HomePage() {
  const featureCards = [...(features.sections[0].cards ?? []).slice(0, 5), home.designLabCard];

  return (
    <main>
      <RichSection
        block={home.intro}
        scheme="bg-scheme1-bg"
        imagePosition="left"
        headingLevel="h1"
        eyebrow="Shopify product customizer"
      />
      <TrustBand scheme="bg-scheme2-bg" />
      <StepsTeaser
        id="how-it-works"
        steps={howItWorks.stepsSection.steps.slice(0, 4)}
        scheme="bg-scheme1-bg"
      />
      <FeatureHighlights id="features" cards={featureCards} scheme="bg-scheme2-bg" />
      <DemoProducts id="live-demo" scheme="bg-scheme1-bg" />
      <section id="pricing" className="scroll-mt-20 bg-scheme2-bg">
        <Container className="py-16 md:py-24">
          <div className="mx-auto mb-4 max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <Eyebrow className="mb-4">Pricing</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              {pricing.header.title}
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
              {pricing.header.lead}
            </p>
            <div className="mt-6 inline-block rounded-full bg-[#fdeaf5] px-4 py-2 text-[13px] font-semibold text-[#c2006f]">
              {pricing.header.note}
            </div>
          </div>
          <PricingTable plans={pricing.plans} />
          <p className="mx-auto mt-10 max-w-[840px] text-center text-[15px] leading-[1.7] text-body">
            {pricing.bottomNote}
          </p>
        </Container>
      </section>
      <section id="contact" className="scroll-mt-20 bg-scheme1-bg">
        <Container className="py-16 md:py-24">
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <Eyebrow className="mb-4">Contact</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              {home.contact.title}
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">{home.contact.lead}</p>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <p className="mb-4 text-[13px] font-semibold tracking-[0.08em] text-[#667085] uppercase">
                Reach us directly
              </p>
              <ContactChannels variant="stack" />
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.04)] md:p-8 lg:col-span-3">
              <p className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-[#667085] uppercase">
                Send a message
              </p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
