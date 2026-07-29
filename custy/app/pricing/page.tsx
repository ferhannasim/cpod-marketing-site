import type { Metadata } from "next";
import { Lander, PricingTable, RainbowBar } from "@/components/lander";
import { TrustBand } from "@/components/sections/trust-band";
import { pricing } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the plan that fits your business today and scales with you tomorrow. Every paid plan includes Custy's Shopify product customizer, easy setup, and a 30-day free trial.",
};

const headerWash =
  "radial-gradient(circle at 10% 0%, rgba(23,182,244,0.10), transparent 42%)," +
  "radial-gradient(circle at 90% 8%, rgba(236,0,140,0.07), transparent 38%)," +
  "linear-gradient(180deg, #ffffff 0%, #fafcfe 60%, #f7f9fc 100%)";

export default function PricingPage() {
  return (
    <main>
      {/* Header + plan grid share one hero-washed band so the page opens on
          the plans themselves, Shopify-style. */}
      <section className="border-b border-line" style={{ background: headerWash }}>
        <Lander className="py-16 md:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <h1 className="text-[clamp(2.125rem,4.5vw,3.125rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
              {pricing.header.title}
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.75] text-body">{pricing.header.lead}</p>
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

      <section className="bg-lander-light">
        <Lander className="py-16 md:py-24">
          <p className="mx-auto max-w-[840px] text-center text-[15px] leading-[1.7] text-body">
            {pricing.bottomNote}
          </p>

          <section className="mt-14 md:mt-16">
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
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-body">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </Lander>
      </section>
    </main>
  );
}
