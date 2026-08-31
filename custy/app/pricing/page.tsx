import type { Metadata } from "next";
import { Lander, PlanCompare, PricingTable, RainbowBar } from "@/components/lander";
import { TrustBand } from "@/components/sections/trust-band";
import { Reveal } from "@/components/reveal";
import { comparison, pricing } from "@/content/pricing";
import { noIndex } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the plan that fits your business today and scales with you tomorrow. Every paid plan includes Custy's Shopify product customizer, easy setup, and a 30-day free trial.",
  robots: noIndex,
};

export default function PricingPage() {
  return (
    <main>
      {/* Header + plan grid share one hero-washed band so the page opens on
          the plans themselves, Shopify-style. */}
      <section className="bg-wash-hero border-b border-line">
        <Lander className="py-16 md:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <h1 className="text-[clamp(2.125rem,4.5vw,3.125rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
              {pricing.header.title}
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.6] text-body">{pricing.header.lead}</p>
            <div className="mt-6 inline-block rounded-full bg-[#fdeaf5] px-4 py-2 text-[13px] font-semibold text-[#c2006f]">
              {pricing.header.note}
            </div>
          </div>

          <PricingTable plans={pricing.plans} className="mt-12" />
        </Lander>
      </section>

      {/* Plan-guarantee strip; white so it alternates against the washed band
          above and the light FAQ band below. */}
      <TrustBand scheme="bg-white" />

      <section className="bg-wash">
        <Lander className="py-16 md:py-24">
          <p className="mx-auto max-w-[840px] text-center text-[15px] leading-[1.6] text-body">
            {pricing.bottomNote}
          </p>

          {/* Detailed comparison table, between the plan cards above and the
              FAQ below — same nested-section rhythm as the FAQ that follows. */}
          <Reveal as="section" className="mt-14 md:mt-16">
            <h2 className="mb-8 text-center text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              Compare plans in detail
            </h2>
            <PlanCompare {...comparison} className="mx-auto max-w-[1000px]" />
          </Reveal>

          <Reveal as="section" className="mt-14 md:mt-16">
            <h2 className="mb-8 text-center text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              {pricing.faq.title}
            </h2>
            <div className="grid gap-5 min-[1101px]:grid-cols-2">
              {pricing.faq.items.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-line bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.04)]"
                >
                  <h3 className="text-base font-semibold text-ink">{item.question}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-body">{item.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Lander>
      </section>
    </main>
  );
}
