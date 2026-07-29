import type { Metadata } from "next";
import { CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection } from "@/components/lander";
import { model, neverPay, pricingCta, pricingFaq, pricingHero, workedExample } from "@/content/pricing-model";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "No subscription, no listing fees, no commission. Pay the base cost per order; your markup is your profit.",
};

export default function PricingPage() {
  return (
    <>
      <LanderHero {...pricingHero} highlight={<HighlightCard title="What you never pay" items={neverPay} />} />
      <LanderSection eyebrow="The model" title="Three numbers, one of them yours">
        <CardGrid items={model} columns={4} align="center" />
      </LanderSection>
      <LanderSection tone="light" eyebrow="See the math" title="A sale, end to end">
        <div className="mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {workedExample.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-zinc-100 px-6 py-4 last:border-b-0 last:bg-brand-tint">
              <div>
                <div className="text-[15px] font-semibold text-ink">{row.label}</div>
                {row.note ? <div className="mt-0.5 text-[13px] text-zinc-500">{row.note}</div> : null}
              </div>
              <div className="font-display text-lg font-bold text-ink">{row.value}</div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-[560px] text-center text-[13px] text-zinc-500">
          Illustrative example — base costs vary by product and are always shown in the app before you publish.
        </p>
      </LanderSection>
      <LanderSection eyebrow="Straight answers" title="Pricing questions">
        <div className="mx-auto grid max-w-[880px] gap-5 md:grid-cols-2">
          {pricingFaq.map((item) => (
            <div key={item.question} className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h3 className="text-base font-semibold text-ink">{item.question}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-zinc-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...pricingCta} />
      </LanderSection>
    </>
  );
}
