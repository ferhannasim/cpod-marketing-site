import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink, type ButtonVariant } from "@/components/ui/button";
import { DuoBar } from "./icons";

export type CtaLink = { label: string; href: string; variant?: ButtonVariant };

/** Titled checkmark list on a raised white card — the hero's right-hand proof panel. */
export function HighlightCard({ title, items, className }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_45px_-18px_rgba(20,31,86,0.2)]", className)}>
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      <ul className="m-0 mt-2 list-none p-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 border-b border-zinc-100 py-2.5 last:border-b-0 last:pb-0">
            <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint">
              <Check className="h-3 w-3 text-brand-dark" strokeWidth={3} />
            </span>
            <span className="text-sm leading-6 text-zinc-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const heroWash =
  "radial-gradient(circle at 10% 0%, rgba(203,24,54,0.07), transparent 42%)," +
  "radial-gradient(circle at 90% 8%, rgba(30,45,125,0.08), transparent 38%)," +
  "linear-gradient(180deg, #ffffff 0%, #fbfbfd 60%, #f7f7f8 100%)";

export type LanderHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string | string[];
  ctas?: CtaLink[];
  highlight?: React.ReactNode;
  className?: string;
};

/** Full-bleed hero band: crimson/navy wash, DuoBar hairline, display headline, leads, pill CTAs, highlight slot. */
export function LanderHero({ eyebrow, title, lead, ctas, highlight, className }: LanderHeroProps) {
  const leads = lead === undefined ? [] : Array.isArray(lead) ? lead : [lead];
  return (
    <section className={cn("relative overflow-hidden border-b border-zinc-200", className)} style={{ background: heroWash }}>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24 max-md:px-4">
        <div className="grid items-center gap-12 min-[1200px]:grid-cols-[1.1fr_0.9fr]">
          <div>
            <DuoBar className="mb-7" />
            {eyebrow ? (
              <div className="mb-4 text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">{eyebrow}</div>
            ) : null}
            <h1 className="font-display text-[clamp(2.125rem,4.5vw,3.125rem)] leading-[1.08] font-bold tracking-tight text-ink">
              {title}
            </h1>
            {leads.map((paragraph, index) => (
              <p key={index} className="mt-5 max-w-[640px] text-[16.5px] leading-[1.75] text-zinc-600">{paragraph}</p>
            ))}
            {ctas && ctas.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3 max-md:flex-col">
                {ctas.map((cta, index) => (
                  <ButtonLink key={cta.href + cta.label} href={cta.href} variant={cta.variant ?? (index === 0 ? "primary" : "outline")}>
                    {cta.label}
                  </ButtonLink>
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
