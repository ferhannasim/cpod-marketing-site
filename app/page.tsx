import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { PrintingMethods } from "@/components/sections/printing-methods";
import { DropshipPitch } from "@/components/sections/dropship-pitch";
import { ShippingBand } from "@/components/sections/shipping-band";
import { FinalCta } from "@/components/sections/final-cta";
import { LogoWall } from "@/components/logo-wall";
import { TestimonialList } from "@/components/testimonial-list";
import { StepList } from "@/components/step-list";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section id="how-it-works">
        <Container>
          <SectionHeading eyebrow="5 easy steps" title="How it works" />
          <StepList />
          <Link
            href="/how-it-works"
            className="mt-6 inline-block text-sm font-semibold text-brand hover:text-brand-dark"
          >
            See the full walkthrough →
          </Link>
        </Container>
      </Section>
      <PrintingMethods />
      <Section id="brands" className="bg-surface">
        <Container>
          <SectionHeading eyebrow="Blanks we stock" title="Top Selling Brands" />
          <LogoWall />
        </Container>
      </Section>
      <Section id="reviews">
        <Container>
          <SectionHeading eyebrow="Reviews" title="What sellers say" />
          <TestimonialList />
        </Container>
      </Section>
      <DropshipPitch />
      <ShippingBand />
      <FinalCta />
    </>
  );
}
