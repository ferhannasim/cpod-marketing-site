import type { Metadata } from "next";
import { Lander, PricingTable } from "@/components/lander";
import { TrustBand } from "@/components/sections/trust-band";
import { pricing } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the plan that fits your business today and scales with you tomorrow. Every paid plan includes Custy's Shopify product customizer, easy setup, and a 21-day free trial.",
};

// Computed at module load from content/pricing.ts (not hand-curated) so this
// section can never claim a feature that isn't verbatim present on all four
// plans. Starts from Free's list and repeatedly filters down to the features
// every other plan's array also contains, string-for-string.
//
// The literal intersection across Free/Starter/Growth/Pro is exactly one
// item ("Basic product customization") — every quota-shaped feature (product
// counts, order counts, storage, print sides, support tier) is worded
// differently per plan. Free is NOT a subset of the paid plans either (its
// own quota lines and the "Powered by Custy" footer note don't appear in any
// paid plan), so the "everything in Free" framing would be false and isn't
// used here; the literal intersection is rendered as-is instead of being
// paraphrased into a longer list.
const commonFeatures = pricing.plans.reduce<string[]>(
  (acc, plan) => acc.filter((feature) => plan.features.includes(feature)),
  pricing.plans[0].features,
);

export default function PricingPage() {
  return (
    <main>
      <Lander>
        {/* .custy-pricing-header — plain centered text block, not a Lander
            hero/section shape (no border, no panel, no gradient), so it's a
            minimal page-scoped block rather than a shared component. */}
        <div className="mx-auto mb-10 max-w-[850px] text-center">
          <h1 className="mb-4 text-[clamp(1.875rem,4vw,2.375rem)] leading-[1.15] font-extrabold text-lander-dark">
            {pricing.header.title}
          </h1>
          <p className="text-[15px] leading-relaxed text-lander-text">{pricing.header.lead}</p>
          <div className="mt-[18px] inline-block rounded-full bg-[#fce4f1] px-[18px] py-2.5 text-sm font-bold text-[#e5007d]">
            {pricing.header.note}
          </div>
        </div>

        <PricingTable plans={pricing.plans} />

        {/* New R3 section: what every plan shares, derived (not hand-picked)
            from content/pricing.ts — see commonFeatures above. */}
        <section className="mt-14 md:mt-16">
          <h2 className="mb-7 text-center text-[1.625rem] leading-[1.2] font-extrabold text-lander-dark md:text-[1.75rem]">
            What&apos;s included in every plan
          </h2>
          <ul className="mx-auto grid max-w-[640px] list-none gap-x-10 gap-y-3 p-0 sm:grid-cols-2">
            {commonFeatures.map((feature) => (
              <li
                key={feature}
                className="relative pl-7 text-[15px] leading-relaxed text-lander-text before:absolute before:top-0 before:left-0 before:font-bold before:text-[#111] before:content-['✓']"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>
      </Lander>

      {/* Reused plan-guarantee strip (components/sections/trust-band.tsx);
          full-bleed like its homepage usage so its background genuinely
          alternates against the white Lander panels on either side, rather
          than sitting as an inset box inside the Lander's padded column. */}
      <TrustBand />

      <Lander className="pt-0 max-md:pt-0">
        {/* .custy-pricing-bottom */}
        <p className="mx-auto max-w-[980px] text-center text-[15px] leading-relaxed text-lander-text">
          {pricing.bottomNote}
        </p>

        {/* .custy-faq — a Q&A grid with no equivalent in components/lander. */}
        <section className="mt-14 md:mt-16">
          <h2 className="mb-7 text-center text-[1.625rem] leading-[1.2] font-extrabold text-lander-dark md:text-[1.75rem]">
            {pricing.faq.title}
          </h2>
          <div className="grid gap-5 min-[1101px]:grid-cols-2">
            {pricing.faq.items.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_6px_18px_rgba(0,0,0,0.04)]"
              >
                <h3 className="mb-2.5 text-[17px] text-lander-dark">{item.question}</h3>
                <p className="text-[15px] leading-relaxed text-lander-text">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Lander>
    </main>
  );
}
