import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CtaLink, LanderCta } from "./lander";

/**
 * The tricolor process-ink hairline — the page-level brand mark. Rendered once
 * per page (hero) and echoed on the featured pricing plan.
 */
export function RainbowBar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#17b6f4_0%,#ec008c_50%,#ffb800_100%)]",
        className,
      )}
    />
  );
}

/**
 * The side card in the hero and the about page's list cards: a titled
 * checkmark list on a raised white card.
 */
export function HighlightCard({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-6 shadow-[0_20px_45px_-18px_rgba(16,24,40,0.18)]",
        className,
      )}
    >
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      <ul className="m-0 mt-2 list-none p-0">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 border-b border-[#f0f3f7] py-2.5 last:border-b-0 last:pb-0"
          >
            <span
              aria-hidden
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f6fe]"
            >
              <Check className="h-3 w-3 text-[#0b7fad]" strokeWidth={3} />
            </span>
            <span className="text-sm leading-6 text-body">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const heroWash =
  "radial-gradient(circle at 10% 0%, rgba(23,182,244,0.10), transparent 42%)," +
  "radial-gradient(circle at 90% 8%, rgba(236,0,140,0.07), transparent 38%)," +
  "linear-gradient(180deg, #ffffff 0%, #fafcfe 60%, #f7f9fc 100%)";

export type LanderHeroProps = {
  eyebrow?: string;
  title: string;
  /** One or more lead paragraphs. */
  lead?: string | string[];
  ctas?: CtaLink[];
  /** Right-column slot — typically a <HighlightCard />. */
  highlight?: React.ReactNode;
  className?: string;
};

/**
 * The lander hero: a full-bleed band with a soft brand wash, the tricolor
 * hairline, an uppercase eyebrow, display headline, lead copy, CTAs, and an
 * optional highlight slot on the right.
 */
export function LanderHero({
  eyebrow,
  title,
  lead,
  ctas,
  highlight,
  className,
}: LanderHeroProps) {
  const leads = lead === undefined ? [] : Array.isArray(lead) ? lead : [lead];

  return (
    <section
      className={cn("relative overflow-hidden border-b border-line", className)}
      style={{ background: heroWash }}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24 max-md:px-4">
        <div className="grid items-center gap-12 min-[1200px]:grid-cols-[1.1fr_0.9fr]">
          <div>
            <RainbowBar className="mb-7" />
            {eyebrow ? (
              <div className="mb-4 text-xs font-semibold tracking-[0.12em] text-[#5b6473] uppercase">
                {eyebrow}
              </div>
            ) : null}
            <h1 className="text-[clamp(2.125rem,4.5vw,3.125rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
              {title}
            </h1>
            {leads.map((paragraph, index) => (
              <p
                key={index}
                className="mt-5 max-w-[640px] text-[16.5px] leading-[1.75] text-body"
              >
                {paragraph}
              </p>
            ))}
            {ctas && ctas.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3 max-md:flex-col">
                {ctas.map((cta, index) => (
                  <LanderCta
                    key={cta.href + cta.label}
                    {...cta}
                    variant={cta.variant ?? (index === 0 ? "primary" : "secondary")}
                  />
                ))}
              </div>
            ) : null}
          </div>
          {highlight ? <div>{highlight}</div> : null}
        </div>
      </div>
    </section>
  );
}
