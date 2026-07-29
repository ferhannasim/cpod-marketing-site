import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { audiences, niches, useCasesCta, useCasesHero } from "@/content/use-cases";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "POD stores, apparel brands, team merch and promo products — where Custy's product personalization lifts engagement and order value.",
};

export default function UseCasesPage() {
  return (
    <main>
      <LanderHero {...useCasesHero} />
      <LanderSection eyebrow="Built for" title="Four kinds of stores, one customizer">
        <CardGrid items={audiences} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Where personalization wins" title="Niches your customers already shop"
        lead="These are the audiences personalized merch is built around — and the Design Lab serves all of them.">
        <CardGrid items={niches} columns={4} align="center" />
      </LanderSection>
      <LanderSection>
        <CtaBand {...useCasesCta} />
      </LanderSection>
    </main>
  );
}
