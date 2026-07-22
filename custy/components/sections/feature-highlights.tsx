import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { CardGrid, Eyebrow, type CardItem } from "@/components/lander";
import { features } from "@/content/features";

// Homepage teaser for the features page: first 6 key-feature cards (of the 9 on
// content/features.ts's own "Key Features Built for POD Growth" section) plus a
// link through to the full list. The lead reuses that section's own published
// lead verbatim; the heading is a factual summary of the grid below it.
export function FeatureHighlights({ cards, scheme = "bg-scheme2-bg" }: { cards: CardItem[]; scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">Features</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            Everything a POD store needs
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
            {features.sections[0].lead}
          </p>
        </div>
        <CardGrid items={cards} columns={3} />
        <div className="mt-10 text-center">
          <Button href="/features" variant="secondary">
            All features
          </Button>
        </div>
      </Container>
    </section>
  );
}
