import { cn } from "@/lib/utils";

type SectionTone = "white" | "light" | "dark";

const toneShell: Record<SectionTone, string> = {
  // .custy-section — the only tone the four pages use
  white: "border-lander-border bg-white",
  light: "border-lander-border bg-lander-light",
  dark: "border-transparent bg-lander-dark text-white",
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
 * A lander content section (`.custy-section` + `.custy-section-header`): a
 * rounded, bordered white panel with an optional centered heading group above
 * its children. `tone` covers the brief's white/light/dark contract; the four
 * source pages only use the white tone.
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
    <section
      id={id}
      className={cn(
        "mt-[34px] rounded-[30px] border px-10 py-14 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:py-16 max-md:rounded-[22px] max-md:p-[34px_22px]",
        toneShell[tone],
        className,
      )}
    >
      {hasHeader ? (
        <div className="mx-auto mb-7 max-w-[840px] text-center">
          {eyebrow ? (
            <div className="mb-3 inline-block rounded-full bg-[rgba(23,182,244,0.1)] px-3.5 py-1.5 text-[12px] font-bold tracking-[0.4px] text-[#0d86b4] uppercase">
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h2
              className={cn(
                "mb-3.5 text-[1.625rem] leading-[1.2] font-extrabold md:text-[1.75rem]",
                isDark ? "text-white" : "text-lander-dark",
              )}
            >
              {title}
            </h2>
          ) : null}
          {lead ? (
            <p
              className={cn(
                "text-[15px] leading-[1.7]",
                isDark ? "text-white/[0.86]" : "text-lander-text",
              )}
            >
              {lead}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
