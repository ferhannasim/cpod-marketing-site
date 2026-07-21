import { cn } from "@/lib/utils";
import { type CtaLink, LanderCta } from "./lander";

/**
 * The blue/pink/yellow gradient accent bar (`.custy-rainbow-bar`) that opens
 * every lander hero.
 */
export function RainbowBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mb-6 h-2.5 w-[180px] rounded-full bg-[linear-gradient(90deg,#19b8f2_0%,#1f6dff_20%,#ec008c_45%,#ffb800_70%,#1c1c1c_100%)]",
        className,
      )}
    />
  );
}

/**
 * The side card in the hero (`.custy-highlight-card` / `.custy-quick-card`) and
 * the about page's list cards (`.custy-list-card`): a titled checkmark list.
 * Exported so the content-assembly tasks can drop it into the hero's
 * `highlight` slot or into a section grid without re-deriving the styling.
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
        "rounded-lander border border-lander-border bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h3 className="mb-[18px] text-2xl leading-tight text-lander-dark">{title}</h3>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li
            key={item}
            className="relative border-b border-[#f2f4f7] py-3 pl-7 text-[15px] leading-[1.65] text-lander-text last:border-b-0 before:absolute before:top-3 before:left-0 before:font-bold before:text-accent-pink before:content-['✓']"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const heroBackground =
  "radial-gradient(circle at top left, rgba(23,182,244,0.16), transparent 32%)," +
  "radial-gradient(circle at top right, rgba(236,0,140,0.14), transparent 28%)," +
  "linear-gradient(135deg, #ffffff 0%, #fbfcff 45%, #f7fbff 100%)";

export type LanderHeroProps = {
  eyebrow?: string;
  title: string;
  /** One or more lead paragraphs (`.custy-hero p`). */
  lead?: string | string[];
  ctas?: CtaLink[];
  /** Right-column slot — typically a <HighlightCard />. */
  highlight?: React.ReactNode;
  className?: string;
};

/**
 * The lander hero (`.custy-hero` + `.custy-hero-grid`): gradient panel with a
 * rainbow bar, eyebrow, h1, lead copy, CTAs, and an optional highlight slot.
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
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-lander-border p-[70px_60px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] max-md:rounded-[22px] max-md:p-[34px_22px]",
        className,
      )}
      style={{ background: heroBackground }}
    >
      <RainbowBar />
      <div className="grid items-center gap-9 min-[1200px]:grid-cols-[1.15fr_0.85fr]">
        <div>
          {eyebrow ? (
            <div className="mb-[18px] inline-block rounded-full bg-[rgba(23,182,244,0.1)] px-4 py-2.5 text-[13px] font-bold tracking-[0.4px] text-[#0d86b4] uppercase">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="mb-[18px] text-[54px] leading-[1.08] font-extrabold tracking-[-1px] text-lander-dark max-md:text-4xl">
            {title}
          </h1>
          {leads.map((paragraph, index) => (
            <p
              key={index}
              className="mb-[18px] max-w-[760px] text-lg leading-[1.8] text-lander-text"
            >
              {paragraph}
            </p>
          ))}
          {ctas && ctas.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3.5 max-md:flex-col">
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
    </section>
  );
}
