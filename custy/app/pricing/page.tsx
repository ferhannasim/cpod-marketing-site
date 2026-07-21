import type { Metadata } from "next";
import { Lander, PricingTable } from "@/components/lander";
import { pricing } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the plan that fits your business today and scale with confidence tomorrow.",
};

export default function PricingPage() {
  return (
    <main>
      <Lander>
        {/* .custy-pricing-header — plain centered text block, not a Lander
            hero/section shape (no border, no panel, no gradient), so it's a
            minimal page-scoped block rather than a shared component. */}
        <div className="mx-auto mb-10 max-w-[850px] text-center">
          <h1 className="mb-4 text-[clamp(1.875rem,4vw,2.375rem)] leading-tight font-extrabold text-lander-dark">
            {pricing.header.title}
          </h1>
          <p className="text-[15px] leading-relaxed text-lander-text">{pricing.header.lead}</p>
          <div className="mt-[18px] inline-block rounded-full bg-[#fce4f1] px-[18px] py-2.5 text-sm font-bold text-[#e5007d]">
            {pricing.header.note}
          </div>
        </div>

        <PricingTable plans={pricing.plans} />

        {/* .custy-pricing-bottom */}
        <p className="mx-auto mt-14 max-w-[980px] text-center text-[15px] leading-relaxed text-lander-text md:mt-16">
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
                <h3 className="mb-2.5 text-lg text-lander-dark">{item.question}</h3>
                <p className="text-[15px] leading-relaxed text-lander-text">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Lander>
    </main>
  );
}
