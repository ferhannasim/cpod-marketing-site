import { cn } from "@/lib/utils";
import { type CtaLink, LanderCta } from "./lander";

const bandBackground =
  "radial-gradient(circle at left top, rgba(255,212,0,0.18), transparent 26%)," +
  "radial-gradient(circle at right bottom, rgba(236,0,140,0.16), transparent 30%)," +
  "linear-gradient(135deg, #111827 0%, #0f172a 55%, #1f2937 100%)";

export type CtaBandProps = {
  title: string;
  text: string;
  cta: CtaLink;
  /** Optional second action rendered as the outline button. */
  secondaryCta?: CtaLink;
  className?: string;
};

/**
 * The closing dark call-to-action band (`.custy-trial-box` / `.custy-cta-box`):
 * a gradient panel with a heading, supporting copy, and one or two pill CTAs.
 */
export function CtaBand({ title, text, cta, secondaryCta, className }: CtaBandProps) {
  return (
    <section
      className={cn(
        "mt-[34px] overflow-hidden rounded-[30px] p-[42px_36px] text-white shadow-[0_20px_45px_rgba(0,0,0,0.14)] max-md:rounded-[22px] max-md:p-[34px_22px]",
        className,
      )}
      style={{ background: bandBackground }}
    >
      <h2 className="mb-3.5 text-[42px] leading-[1.15] text-white max-md:text-3xl">{title}</h2>
      <p className="max-w-[840px] text-[17px] leading-[1.8] text-white/[0.86]">{text}</p>
      <div className="mt-[26px] flex flex-wrap gap-3.5 max-md:flex-col">
        <LanderCta {...cta} variant={cta.variant ?? "light"} />
        {secondaryCta ? (
          <LanderCta {...secondaryCta} variant={secondaryCta.variant ?? "outline"} />
        ) : null}
      </div>
    </section>
  );
}
