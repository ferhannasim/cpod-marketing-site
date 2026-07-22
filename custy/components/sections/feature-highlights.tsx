import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { CardGrid, type CardItem } from "@/components/lander";

// Homepage teaser for the features page: first 6 key-feature cards (of the 9 on
// content/features.ts's own "Key Features Built for POD Growth" section) plus a
// link through to the full list. Heading is authored fresh for this teaser
// context — it's a factual summary of what the card grid below it shows, not a
// copy/paste of any single source string.
export function FeatureHighlights({ cards }: { cards: CardItem[] }) {
  return (
    <section className="bg-scheme2-bg">
      <Container className="py-14 md:py-20">
        <h2 className="text-[1.625rem] font-extrabold leading-[1.2] text-ink md:text-[1.75rem]">
          Everything a POD store needs
        </h2>
        <div className="mt-8">
          <CardGrid items={cards} columns={3} />
        </div>
        <div className="mt-8">
          <Button href="/features" variant="secondary">
            All features
          </Button>
        </div>
      </Container>
    </section>
  );
}
