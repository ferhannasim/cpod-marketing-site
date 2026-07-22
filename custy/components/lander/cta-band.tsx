import { cn } from "@/lib/utils";
import { type CtaLink, LanderCta } from "./lander";

const darkBandBackground =
  "radial-gradient(circle at left top, rgba(255,212,0,0.18), transparent 26%)," +
  "radial-gradient(circle at right bottom, rgba(236,0,140,0.16), transparent 30%)," +
  "linear-gradient(135deg, #111827 0%, #0f172a 55%, #1f2937 100%)";

// Same radial tints as the dark band, at a lower opacity so they read as a subtle
// wash over the light scheme2 gray base (applied separately via `bg-scheme2-bg`)
// instead of a spotlight on a near-black panel.
const lightBandBackground =
  "radial-gradient(circle at left top, rgba(255,212,0,0.12), transparent 26%)," +
  "radial-gradient(circle at right bottom, rgba(236,0,140,0.1), transparent 30%)";

export type CtaBandProps = {
  title: string;
  text: string;
  cta: CtaLink;
  /** Optional second action rendered as the outline button. */
  secondaryCta?: CtaLink;
  className?: string;
  /**
   * `"dark"` (default) is the original gradient panel with white text, used
   * unchanged on the features/how-it-works/about landers. `"light"` is a
   * soft scheme2-gray panel with ink/body text, used on the homepage.
   */
  tone?: "dark" | "light";
};

/**
 * The closing call-to-action band (`.custy-trial-box` / `.custy-cta-box`): a
 * panel with a heading, supporting copy, and one or two pill CTAs. Defaults to
 * the dark gradient treatment; pass `tone="light"` for the homepage's lighter band.
 */
export function CtaBand({ title, text, cta, secondaryCta, className, tone = "dark" }: CtaBandProps) {
  const isLight = tone === "light";
  return (
    <section
      className={cn(
        "mt-[34px] overflow-hidden rounded-[30px] px-9 py-12 shadow-[0_20px_45px_rgba(0,0,0,0.14)] max-md:rounded-[22px] max-md:p-[34px_22px]",
        isLight ? "bg-scheme2-bg text-ink" : "text-white",
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
          "mb-3.5 text-[1.625rem] leading-[1.2] md:text-[1.75rem]",
          isLight ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-[840px] text-[15px] leading-[1.7]",
          isLight ? "text-body" : "text-white/[0.86]",
        )}
      >
        {text}
      </p>
      <div className="mt-5 flex flex-wrap gap-3 max-md:flex-col">
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
