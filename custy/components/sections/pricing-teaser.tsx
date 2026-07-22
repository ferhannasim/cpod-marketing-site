import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import type { Plan } from "@/components/lander";

// Homepage teaser for the four pricing plans: name, price, the plan's first 3
// features (of the full list on the /pricing comparison page), and a
// per-card link through to that page. The featured-plan border/shadow is
// copied verbatim from PricingTable's own treatment
// (components/lander/pricing-table.tsx) rather than re-derived. The
// microcopy line under the grid restates content/pricing.ts's own bottomNote
// ("All prices are billed in USD...") and header.note ("21-day free trial on
// paid plans") — no new claims.
export function PricingTeaser({ plans, scheme = "bg-scheme1-bg" }: { plans: Plan[]; scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-14 md:py-20">
        <h2 className="text-[1.625rem] font-extrabold leading-[1.2] text-ink md:text-[1.75rem]">
          Simple, transparent pricing
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-card border border-line p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_28px_rgba(0,0,0,0.06)]",
                plan.featured && "border-2 border-[#1fb6ff] shadow-[0_12px_32px_rgba(31,182,255,0.16)]",
              )}
            >
              <h3 className="text-base font-semibold text-ink">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-ink">{plan.price}</span>
                {plan.period ? <span className="text-sm text-body">{plan.period}</span> : null}
              </div>
              <ul className="m-0 mt-3 list-none p-0">
                {plan.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="relative mb-1.5 pl-5 text-sm leading-5 text-body before:absolute before:left-0 before:font-bold before:text-ink before:content-['✓']"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <Button href="/pricing" variant="secondary" className="w-full">
                  View {plan.name} plan
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-body">All prices billed in USD · 21-day free trial on paid plans</p>
        <div className="mt-6">
          <Button href="/pricing" variant="secondary">
            Compare plans
          </Button>
        </div>
      </Container>
    </section>
  );
}
