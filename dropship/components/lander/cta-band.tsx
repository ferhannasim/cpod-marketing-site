import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import type { CtaLink } from "./hero";

const darkBandBackground =
  "radial-gradient(circle at 15% 0%, rgba(203,24,54,0.22), transparent 38%)," +
  "radial-gradient(circle at 85% 100%, rgba(30,45,125,0.35), transparent 40%)," +
  "linear-gradient(150deg, #141f56 0%, #0e1638 55%, #1a2450 100%)";

export type CtaBandProps = { title: string; text: string; cta: CtaLink; secondaryCta?: CtaLink; className?: string };

/** Closing call-to-action: centered rounded deep-navy panel with one or two pill CTAs. */
export function CtaBand({ title, text, cta, secondaryCta, className }: CtaBandProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] px-8 py-14 text-center text-white shadow-[0_24px_60px_-20px_rgba(20,31,86,0.5)] md:py-16 max-md:rounded-[22px] max-md:px-5",
        className,
      )}
      style={{ background: darkBandBackground }}
    >
      <h2 className="mx-auto max-w-[680px] font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-bold tracking-tight">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[680px] text-[15.5px] leading-[1.7] text-white/[0.78]">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 max-md:flex-col">
        <ButtonLink href={cta.href} variant={cta.variant ?? "primary"}>{cta.label}</ButtonLink>
        {secondaryCta ? (
          <ButtonLink href={secondaryCta.href} variant={secondaryCta.variant ?? "outline-dark"}>{secondaryCta.label}</ButtonLink>
        ) : null}
      </div>
    </section>
  );
}
