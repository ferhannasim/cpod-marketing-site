import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { featureCards, featuresCta, featuresHero, orderFlow } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Catalog import with markup pricing, bulk publish, automatic fulfillment, per-order profit, tracking and inventory sync — inside your Shopify admin.",
};

export default function FeaturesPage() {
  return (
    <>
      <LanderHero {...featuresHero} />
      <LanderSection eyebrow="The tour" title="Built for the whole workflow"
        lead="From the first import to the profit line on each order.">
        <CardGrid items={featureCards} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Order lifecycle" title="From sale to doorstep">
        <div className="relative mx-auto max-w-[880px]">
          <div aria-hidden className="absolute top-3 bottom-3 left-[19px] w-px bg-zinc-200" />
          {orderFlow.map((step) => (
            <div key={step.number} className="relative pb-10 pl-16 last:pb-0 max-md:pl-14">
              <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-[15px] font-bold text-ink shadow-sm">
                {step.number}
              </div>
              <h3 className="pt-2 text-[17px] leading-snug font-semibold text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.7] text-zinc-600">{step.text}</p>
            </div>
          ))}
        </div>
      </LanderSection>
      <LanderSection>
        <CtaBand {...featuresCta} />
      </LanderSection>
    </>
  );
}
