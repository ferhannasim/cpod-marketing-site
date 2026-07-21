import { Button } from "@/components/button";
import { Container } from "@/components/container";
import type { StepItem } from "@/components/lander";

function firstLine(text: StepItem["text"]): string {
  return Array.isArray(text) ? text[0] : text;
}

// Compact horizontal preview of the how-it-works steps (first 4 of the 7 detailed
// rows on content/how-it-works.ts), condensed to one line per step so it reads as
// a quick strip rather than the full stacked walkthrough on the dedicated page.
export function StepsTeaser({ steps }: { steps: StepItem[] }) {
  return (
    <section className="bg-scheme1-bg">
      <Container className="py-14 md:py-20">
        <div className="grid gap-6 sm:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-body">{firstLine(step.text)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/how-it-works" variant="secondary">
            See how it works
          </Button>
        </div>
      </Container>
    </section>
  );
}
