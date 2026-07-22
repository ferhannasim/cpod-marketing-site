import { cn } from "@/lib/utils";
import { type CtaLink, LanderCta } from "./lander";

const darkBandBackground =
  "radial-gradient(circle at 15% 0%, rgba(23,182,244,0.16), transparent 38%)," +
  "radial-gradient(circle at 85% 100%, rgba(236,0,140,0.14), transparent 34%)," +
  "linear-gradient(150deg, #101828 0%, #0c1524 55%, #131f33 100%)";

const lightBandBackground =
  "radial-gradient(circle at 15% 0%, rgba(23,182,244,0.08), transparent 38%)," +
  "radial-gradient(circle at 85% 100%, rgba(236,0,140,0.06), transparent 34%)";

export type CtaBandProps = {
  title: string;
  text: string;
  cta: CtaLink;
  /** Optional second action rendered as the outline button. */
  secondaryCta?: CtaLink;
  className?: string;
  /**
   * `"dark"` (default) is the deep-ink gradient panel with white text.
   * `"light"` is a soft bordered panel with ink/body text (homepage).
   */
  tone?: "dark" | "light";
};

/**
 * The closing call-to-action band: a centered rounded panel with a heading,
 * supporting copy, and one or two pill CTAs.
 */
export function CtaBand({ title, text, cta, secondaryCta, className, tone = "dark" }: CtaBandProps) {
  const isLight = tone === "light";
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] px-8 py-14 text-center md:py-16 max-md:rounded-[22px] max-md:px-5",
        isLight
          ? "border border-line bg-lander-light text-ink"
          : "text-white shadow-[0_24px_60px_-20px_rgba(16,24,40,0.45)]",
        className,
      )}
      style={
        isLight
          ? { backgroundImage: lightBandBackground }
          : { background: darkBandBackground }
      }
    >
      <h2
        className={cn(
          "mx-auto max-w-[680px] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em]",
          isLight ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mx-auto mt-4 max-w-[680px] text-[15.5px] leading-[1.7]",
          isLight ? "text-body" : "text-white/[0.78]",
        )}
      >
        {text}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 max-md:flex-col">
        <LanderCta {...cta} variant={cta.variant ?? (isLight ? "primary" : "light")} />
        {secondaryCta ? (
          <LanderCta
            {...secondaryCta}
            variant={secondaryCta.variant ?? (isLight ? "secondary" : "outline")}
          />
        ) : null}
      </div>
    </section>
  );
}
