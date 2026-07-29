import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Plan = {
  name: string;
  price: string;
  /** e.g. "/ month". */
  period?: string;
  /** Secondary annual line, e.g. "or $220.70/year and save 20%". */
  yearly?: string;
  /** Short plan description. */
  description?: string;
  /** Heading above the feature list (default "Features"). */
  featureTitle?: string;
  features: string[];
  /** Trial line under the CTA, e.g. "30-day free trial". */
  trialNote?: string;
  cta: { label: string; href: string };
  featured?: boolean;
  /** Badge text on featured plans (default "Most popular"). */
  badge?: string;
};

function PlanCta({ label, href, featured }: { label: string; href: string; featured?: boolean }) {
  const className = cn(
    "block w-full rounded-full px-5 py-2.5 text-center text-sm font-semibold no-underline transition-colors duration-200",
    featured
      ? "bg-ink text-white shadow-sm hover:bg-black"
      : "border border-line bg-white text-ink hover:border-[#98a2b3]",
  );
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export type PricingTableProps = {
  plans: Plan[];
  className?: string;
};

/**
 * The pricing plan grid: three columns of cards, each with price, CTA, and
 * feature list. The featured plan carries the tricolor hairline, an ink
 * border, and a "Most popular" pill.
 */
export function PricingTable({ plans, className }: PricingTableProps) {
  return (
    <div className={cn("mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "relative flex flex-col rounded-2xl bg-white p-6",
            plan.featured
              ? "border border-[#c3cbd8] shadow-[0_24px_60px_-20px_rgba(16,24,40,0.28)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-2xl before:bg-[linear-gradient(90deg,#17b6f4_0%,#ec008c_50%,#ffb800_100%)]"
              : "border border-line shadow-[0_2px_8px_rgba(16,24,40,0.04)]",
          )}
        >
          {plan.featured ? (
            <div className="absolute top-5 right-5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-white uppercase">
              {plan.badge ?? "Most popular"}
            </div>
          ) : null}

          <h3 className="text-sm font-semibold tracking-[0.08em] text-[#667085] uppercase">
            {plan.name}
          </h3>
          <div className="mt-3 flex flex-wrap items-baseline gap-1.5">
            <div className="text-[2.125rem] leading-none font-extrabold tracking-tight text-ink">
              {plan.price}
            </div>
            {plan.period ? (
              <div className="text-sm font-medium text-[#667085]">{plan.period}</div>
            ) : null}
          </div>
          {plan.yearly ? (
            <div className="mt-2 text-[13px] leading-[1.5] font-medium text-[#0e8a4d]">
              {plan.yearly}
            </div>
          ) : null}
          {plan.description ? (
            <div className="mt-3 text-sm leading-[1.6] text-body">{plan.description}</div>
          ) : null}

          <div className="mt-5">
            <PlanCta label={plan.cta.label} href={plan.cta.href} featured={plan.featured} />
            {plan.trialNote ? (
              <div className="mt-2.5 text-center text-[13px] font-medium text-[#667085]">
                {plan.trialNote}
              </div>
            ) : null}
          </div>

          {/* Not a heading: three identical "Features" labels would pollute the
              heading outline; plan names carry the card-level h3 instead. */}
          <div className="mt-6 border-t border-line pt-5 text-[13px] font-semibold tracking-[0.08em] text-[#667085] uppercase">
            {plan.featureTitle ?? "Features"}
          </div>
          <ul className="m-0 mt-3 list-none p-0">
            {plan.features.map((feature) => (
              <li key={feature} className="mb-2.5 flex items-start gap-2.5 text-sm leading-6 text-body">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[#0b7fad]" strokeWidth={2.5} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
