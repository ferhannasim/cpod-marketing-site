import { Check } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/lander";
import { cn } from "@/lib/utils";
import type { Plan } from "@/components/lander";
import { pricing } from "@/content/pricing";

// Homepage teaser for the four pricing plans: name, price, the plan's first 3
// features (of the full list on the /pricing comparison page), and a per-card
// link through to that page. The featured-plan treatment (tricolor hairline +
// elevated shadow) mirrors PricingTable's own (components/lander/pricing-table.tsx).
// The lead reuses content/pricing.ts's own header lead verbatim, and the
// microcopy line under the grid restates its bottomNote ("All prices are
// billed in USD...") and header.note ("21-day free trial on paid plans") — no
// new claims.
export function PricingTeaser({ plans, scheme = "bg-scheme1-bg" }: { plans: Plan[]; scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">Pricing</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
            {pricing.header.lead}
          </p>
        </div>
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]",
                plan.featured
                  ? "border border-[#c3cbd8] shadow-[0_24px_60px_-20px_rgba(16,24,40,0.28)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-2xl before:bg-[linear-gradient(90deg,#17b6f4_0%,#ec008c_50%,#ffb800_100%)]"
                  : "border border-line shadow-[0_2px_8px_rgba(16,24,40,0.04)]",
              )}
            >
              <h3 className="text-sm font-semibold tracking-[0.08em] text-[#667085] uppercase">
                {plan.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[1.75rem] leading-none font-extrabold tracking-tight text-ink">
                  {plan.price}
                </span>
                {plan.period ? <span className="text-sm text-[#667085]">{plan.period}</span> : null}
              </div>
              <ul className="m-0 mt-4 list-none p-0">
                {plan.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="mb-2 flex items-start gap-2.5 text-sm leading-6 text-body">
                    <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[#0b7fad]" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <Button href="/pricing" variant="secondary" className="w-full">
                  View {plan.name} plan
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[#667085]">
          All prices billed in USD · 21-day free trial on paid plans
        </p>
        <div className="mt-6 text-center">
          <Button href="/pricing" variant="secondary">
            Compare plans
          </Button>
        </div>
      </Container>
    </section>
  );
}
