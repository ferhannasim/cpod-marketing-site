import { cn } from "@/lib/utils";
import { Eyebrow } from "./icons";

type SectionTone = "white" | "light" | "dark";

const toneShell: Record<SectionTone, string> = {
  white: "bg-white",
  light: "bg-lander-light",
  dark: "bg-[#0c1524] text-white",
};

export type LanderSectionProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: SectionTone;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * A full-bleed content band with a centered header group (tri-dot eyebrow,
 * title, lead) above its children. Pages alternate `white` / `light` tones so
 * adjacent bands never share a background.
 */
export function LanderSection({
  eyebrow,
  title,
  lead,
  tone = "white",
  id,
  className,
  children,
}: LanderSectionProps) {
  const hasHeader = Boolean(eyebrow || title || lead);
  const isDark = tone === "dark";

  return (
    <section id={id} className={cn(toneShell[tone], className)}>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24 max-md:px-4">
        {hasHeader ? (
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
            {title ? (
              <h2
                className={cn(
                  "text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em]",
                  isDark ? "text-white" : "text-ink",
                )}
              >
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p
                className={cn(
                  "mt-4 text-base leading-[1.7] md:text-[16.5px]",
                  isDark ? "text-white/[0.78]" : "text-body",
                )}
              >
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
