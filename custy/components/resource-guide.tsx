import Image from "next/image";
import { Check, ExternalLink, Info } from "lucide-react";
import type { ResourceStep } from "@/content/resources";

function GuideLinks({ steps, compact = false }: { steps: ResourceStep[]; compact?: boolean }) {
  return (
    <ol className={compact ? "mt-4 space-y-2" : "mt-5 space-y-3"}>
      {steps.map((step) => (
        <li key={step.id}>
          <a
            href={`#${step.id}`}
            aria-label={step.title}
            className="group flex items-start gap-3 text-[15px] leading-5 text-body transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-[12px] font-bold text-ink group-hover:border-[#b8c1ce]">
              {step.number}
            </span>
            <span className="pt-0.5">{step.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function ResourceGuide({ steps }: { steps: ResourceStep[] }) {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:py-20 max-md:px-4">
      <aside className="hidden lg:block">
        <nav
          aria-label="On this page"
          className="sticky top-24 rounded-2xl border border-line bg-lander-light p-5"
        >
          <h2 className="text-sm font-semibold text-ink">On this page</h2>
          <GuideLinks steps={steps} />
        </nav>
      </aside>

      <div className="min-w-0">
        <details className="mb-10 rounded-2xl border border-line bg-lander-light p-5 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-ink">On this page</summary>
          <nav aria-label="On this page mobile">
            <GuideLinks steps={steps} compact />
          </nav>
        </details>

        <div className="space-y-16 md:space-y-20">
          {steps.map((step) => (
            <section key={step.id} id={step.id} className="scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white shadow-sm">
                  {step.number}
                </div>
                <div>
                  <p className="text-[13px] font-semibold tracking-widest text-muted uppercase">
                    Step {step.number}
                  </p>
                  <h2 className="mt-1 text-[clamp(1.5rem,3vw,2rem)] leading-tight font-extrabold text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-[16px] leading-[1.6] font-medium text-body">{step.summary}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-[15.5px] leading-[1.65] text-body">
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <ul className="mt-6 grid gap-3 rounded-2xl border border-line bg-lander-light p-5 md:p-6">
                {step.actions.map((action) => (
                  <li key={action} className="flex items-start gap-3 text-[15px] leading-6 text-body">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f6fe]"
                    >
                      <Check className="h-3 w-3 text-[#0b7fad]" strokeWidth={3} />
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>

              {step.note ? (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#d8eaf4] bg-[#f1f9fd] px-4 py-3.5 text-sm leading-6 text-[#35566b]">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <p>{step.note}</p>
                </div>
              ) : null}

              <figure className="mt-8">
                <a
                  href={step.screenshot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open full-size screenshot for step ${step.number}: ${step.title}`}
                  className="group block overflow-hidden rounded-2xl border border-line bg-[#f5f7fa] shadow-[0_18px_45px_-24px_rgba(16,24,40,0.3)] focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  <Image
                    src={step.screenshot.src}
                    alt={step.screenshot.alt}
                    width={step.screenshot.width}
                    height={step.screenshot.height}
                    sizes="(min-width: 1200px) 856px, (min-width: 1024px) calc(100vw - 340px), calc(100vw - 32px)"
                    quality={90}
                    className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </a>
                <figcaption className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#667085]">
                  <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{step.screenshot.caption} Select the image to open it at full size.</span>
                </figcaption>
              </figure>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
