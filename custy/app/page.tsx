import { Container } from "@/components/container";
import { RichSection } from "@/components/sections/rich-section";
import { DemoProducts } from "@/components/sections/demo-products";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { StepsTeaser } from "@/components/sections/steps-teaser";
import { TrustBand } from "@/components/sections/trust-band";
import { ContactChannels } from "@/components/sections/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow, PricingTable, RainbowBar } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { home } from "@/content/home";
import { pricing } from "@/content/pricing";

export default function HomePage() {
  return (
    <main>
      <RichSection
        block={home.intro}
        scheme="bg-scheme1-bg"
        imagePosition="right"
        headingLevel="h1"
        eyebrow="Shopify product customizer"
      />
      <TrustBand scheme="bg-wash" />
      <StepsTeaser id="how-it-works" scheme="bg-scheme1-bg" />
      <FeatureHighlights id="features" scheme="bg-wash" />
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
          <Reveal>
            <PricingTable plans={pricing.plans} />
            <p className="mx-auto mt-10 max-w-[840px] text-center text-[15px] leading-[1.6] text-body">
              {pricing.bottomNote}
            </p>
          </Reveal>
        </Container>
      </section>
      <section id="contact" className="scroll-mt-20 bg-scheme1-bg">
        <Container className="py-16 md:py-24">
          <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <Eyebrow className="mb-4">Contact</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              {home.contact.title}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-body md:text-[16.5px]">
              {home.contact.lead}
            </p>
          </Reveal>
          <Reveal className="grid items-start gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <p className="mb-4 text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
                Reach us directly
              </p>
              <ContactChannels variant="stack" />
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.04)] md:p-8 lg:col-span-3">
              <p className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
                Send a message
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
