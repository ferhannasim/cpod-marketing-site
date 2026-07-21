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
        <div className="mx-auto max-w-[850px] text-center">
          <h1 className="mb-4 text-[48px] leading-[1.15] font-extrabold text-lander-dark max-md:text-[34px]">
            {pricing.header.title}
          </h1>
          <p className="text-lg leading-[1.7] text-lander-text">{pricing.header.lead}</p>
          <div className="mt-[18px] inline-block rounded-full bg-[#fce4f1] px-[18px] py-2.5 text-sm font-bold text-[#e5007d]">
            {pricing.header.note}
          </div>
        </div>

        <PricingTable plans={pricing.plans} />

        {/* .custy-pricing-bottom */}
        <p className="mx-auto mt-12 max-w-[980px] text-center text-[15px] leading-[1.7] text-lander-text">
          {pricing.bottomNote}
        </p>

        {/* .custy-faq — a Q&A grid with no equivalent in components/lander. */}
        <section className="mt-[70px]">
          <h2 className="mb-7 text-center text-[34px] font-bold text-lander-dark">
            {pricing.faq.title}
          </h2>
          <div className="grid gap-5 min-[1101px]:grid-cols-2">
            {pricing.faq.items.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#ececec] bg-white p-6 shadow-[0_6px_18px_rgba(0,0,0,0.04)]"
              >
                <h3 className="mb-2.5 text-lg text-lander-dark">{item.question}</h3>
                <p className="text-[15px] leading-[1.7] text-lander-text">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Lander>
    </main>
  );
}
