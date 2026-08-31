import { Container } from "@/components/container";
import { Eyebrow, RainbowBar, StepIllustration } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { home, type HomeStep } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * The three brand process-ink tints, matching the cycle IconTile uses, so this
 * band belongs to the same printed system as the card grids further down.
 */
const tints = [
  { art: "text-[#0b7fad]", wash: "bg-[#e6f6fe]" },
  { art: "text-[#c2006f]", wash: "bg-[#fdeaf5]" },
  { art: "text-[#8a6100]", wash: "bg-[#fff3d6]" },
];

export function StepsTeaser({
  steps = home.howItWorks.steps,
  scheme = "bg-scheme1-bg",
  id,
}: {
  steps?: HomeStep[];
  scheme?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(scheme, id && "scroll-mt-20")}>
      <Container className="py-16 md:py-24">
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <RainbowBar className="mx-auto mb-7" />
          <Eyebrow className="mb-4">How it works</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            {home.howItWorks.title}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-body md:text-[16.5px]">
            {home.howItWorks.lead}
          </p>
        </Reveal>

        {/* An ordered list, not a bare grid: the sequence is the meaning here.
            The steps reveal one after another for the same reason — the
            stagger replays the 1-2-3 order as you arrive at the band. Each
            step reveals as the <li> itself and keeps its card styling on an
            inner element, so the 200ms hover lift isn't overridden by the
            700ms reveal transition on the same node. */}
        <ol className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
          {steps.map((step, index) => {
            const tint = tints[index % tints.length];
            return (
              <Reveal as="li" key={step.number} variant="zoom" delay={index * 0.12}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-white px-7 py-9 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]">
                  <div
                    className={cn(
                      "relative flex h-24 w-24 items-center justify-center rounded-full",
                      tint.wash,
                    )}
                  >
                    <StepIllustration
                      name={step.illustration}
                      className={cn("h-18 w-18", tint.art)}
                    />
                    <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[19px] leading-snug font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.6] text-body">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
