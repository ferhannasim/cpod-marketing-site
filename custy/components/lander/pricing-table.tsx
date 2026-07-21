import Link from "next/link";
import { cn } from "@/lib/utils";

export type Plan = {
  name: string;
  price: string;
  /** e.g. "/ month" (`.custy-price-term`). */
  period?: string;
  /** Secondary annual line, e.g. "or $383.90/year and save 20%" (`.custy-yearly`). */
  yearly?: string;
  /** Short plan description (`.custy-plan-desc`). */
  description?: string;
  /** Heading above the feature list (default "Features"). */
  featureTitle?: string;
  features: string[];
  /** Trial line in the footer, e.g. "21-day free trial" (`.custy-trial`). */
  trialNote?: string;
  cta: { label: string; href: string };
  featured?: boolean;
  /** Badge text on featured plans (default "MOST POPULAR"). */
  badge?: string;
};

function PlanCta({ label, href, featured }: { label: string; href: string; featured?: boolean }) {
  const className = cn(
    "block w-full rounded-xl px-5 py-3 text-center text-sm font-bold no-underline transition-all duration-200",
    featured
      ? "bg-[linear-gradient(90deg,#1fb6ff,#7855ff)] text-white hover:opacity-90"
      : "bg-[#111] text-white hover:bg-black",
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
 * The pricing plan grid (`.custy-pricing-grid` + `.custy-plan`): four columns
 * of cards, each with price, feature list, and a footer CTA. The featured plan
 * gets the blue→purple border, badge, and accent CTA.
 */
export function PricingTable({ plans, className }: PricingTableProps) {
  return (
    <div
      className={cn(
        "mt-8 grid gap-5 md:grid-cols-2 min-[1200px]:grid-cols-4",
        className,
      )}
    >
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "relative flex flex-col overflow-hidden rounded-[20px] border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
            plan.featured
              ? "border-2 border-[#1fb6ff] shadow-[0_12px_32px_rgba(31,182,255,0.16)] min-[1101px]:scale-[1.02]"
              : "border border-[#e7e7e7]",
          )}
        >
          {plan.featured ? (
            <div className="absolute top-[18px] right-[18px] rounded-full bg-[linear-gradient(90deg,#1fb6ff,#7855ff)] px-3 py-2 text-xs font-bold tracking-[0.3px] text-white">
              {plan.badge ?? "MOST POPULAR"}
            </div>
          ) : null}

          <div className="flex-1 p-5">
            <h3 className="mb-2.5 text-lg font-bold text-[#666]">{plan.name}</h3>
            <div className="mb-2.5 flex flex-wrap items-baseline gap-1.5">
              <div className="text-[2rem] leading-none font-extrabold text-[#111]">
                {plan.price}
              </div>
              {plan.period ? (
                <div className="text-sm font-medium text-[#666]">{plan.period}</div>
              ) : null}
            </div>
            {plan.yearly ? (
              <div className="mb-5 text-sm leading-[1.5] text-[#128a43]">{plan.yearly}</div>
            ) : null}
            {plan.description ? (
              <div className="mb-5 text-[15px] leading-[1.6] text-[#666]">{plan.description}</div>
            ) : null}

            {/* Not a heading: four identical "Features" labels would pollute the
                heading outline; plan names carry the card-level h3 instead. */}
            <div className="mb-3 text-lg font-bold text-[#111]">
              {plan.featureTitle ?? "Features"}
            </div>
            <ul className="m-0 list-none p-0">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="relative mb-2.5 pl-7 text-sm leading-6 text-[#444] before:absolute before:top-0 before:left-0 before:font-bold before:text-[#111] before:content-['✓']"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#ececec] bg-[#f7f7f7] p-5">
            {plan.trialNote ? (
              <div className="mb-2.5 text-[15px] font-bold text-[#333]">{plan.trialNote}</div>
            ) : null}
            <PlanCta label={plan.cta.label} href={plan.cta.href} featured={plan.featured} />
          </div>
        </div>
      ))}
    </div>
  );
}
