import { Container } from "@/components/container";
import { Eyebrow, type StepItem } from "@/components/lander";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

function firstLine(text: StepItem["text"]): string {
  return Array.isArray(text) ? text[0] : text;
}

export function StepsTeaser({
  steps,
  scheme = "bg-scheme1-bg",
  id,
}: {
  steps: StepItem[];
  scheme?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(scheme, id && "scroll-mt-20")}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">How it works</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            {home.howItWorks.title}
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
            {home.howItWorks.lead}
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
      </Container>
    </section>
  );
}
