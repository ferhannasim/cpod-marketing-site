import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import type { Plan } from "@/components/lander";

// Homepage teaser for the four pricing plans: name, price, and the plan's first
// feature line as a one-line pitch, plus a link through to the full comparison.
// The featured-plan border/shadow is copied verbatim from PricingTable's own
// treatment (components/lander/pricing-table.tsx) rather than re-derived.
export function PricingTeaser({ plans }: { plans: Plan[] }) {
  return (
    <section className="bg-scheme1-bg">
      <Container className="py-14 md:py-20">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Simple, transparent pricing</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-card border border-line p-5",
                plan.featured && "border-2 border-[#1fb6ff] shadow-[0_12px_32px_rgba(31,182,255,0.16)]",
              )}
            >
              <h3 className="text-base font-semibold text-ink">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-ink">{plan.price}</span>
                {plan.period ? <span className="text-sm text-body">{plan.period}</span> : null}
              </div>
              {plan.features[0] ? <p className="mt-2 text-sm text-body">{plan.features[0]}</p> : null}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/pricing" variant="secondary">
            Compare plans
          </Button>
        </div>
      </Container>
    </section>
  );
}
