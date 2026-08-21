import type { Metadata } from "next";
import { CtaBand, HighlightCard, Lander, LanderHero } from "@/components/lander";
import { ResourceGuide } from "@/components/resource-guide";
import { resourceSteps, resourcesClosing, resourcesHero } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources: How to Install and Use Custy",
  description:
    "Learn how to install Custy on Shopify, sync products, configure print areas, enable the Customize It button, and test the customer Design Lab.",
};

export default function ResourcesPage() {
  return (
    <main>
      <LanderHero
        eyebrow={resourcesHero.eyebrow}
        title={resourcesHero.title}
        lead={resourcesHero.lead}
        ctas={resourcesHero.ctas}
        highlight={
          <HighlightCard
            title={resourcesHero.highlight.title}
            items={resourcesHero.highlight.items}
          />
        }
      />

      <ResourceGuide steps={resourceSteps} />

      <section className="border-t border-line bg-lander-light">
        <Lander className="py-16 md:py-20">
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#667085] uppercase">
              What happens next
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-extrabold text-ink">
              {resourcesClosing.title}
            </h2>
            {resourcesClosing.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-[16px] leading-7 text-body">
                {paragraph}
              </p>
            ))}
          </div>
          <CtaBand {...resourcesClosing.cta} />
        </Lander>
      </section>
    </main>
  );
}
