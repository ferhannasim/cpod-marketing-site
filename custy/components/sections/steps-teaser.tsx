import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Eyebrow, type StepItem } from "@/components/lander";
import { howItWorks } from "@/content/how-it-works";

function firstLine(text: StepItem["text"]): string {
  return Array.isArray(text) ? text[0] : text;
}

// Compact horizontal preview of the how-it-works steps (first 4 of the 7 detailed
// rows on content/how-it-works.ts), condensed to a few lines per step. The lead
// reuses the steps section's own published lead verbatim; the hairline after
// each number encodes that the four columns are one ordered sequence.
export function StepsTeaser({ steps, scheme = "bg-scheme1-bg" }: { steps: StepItem[]; scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">How it works</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            How Custy works
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
            {howItWorks.stepsSection.lead}
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <div key={step.number}>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  {step.number}
                </div>
                {index < steps.length - 1 ? (
                  <div aria-hidden className="h-px flex-1 bg-line max-lg:hidden" />
                ) : null}
              </div>
              <h3 className="mt-5 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">{firstLine(step.text)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/how-it-works" variant="secondary">
            See how it works
          </Button>
        </div>
      </Container>
    </section>
  );
}
