import { Container } from "@/components/container";
import { CardGrid, Eyebrow, type CardItem } from "@/components/lander";
import { features } from "@/content/features";

// Three benefit cards, each a single-source trim of one existing
// content/features.ts key-feature card (cards 7-9 of the 9 on
// sections[0].cards — none of which overlap the first 6 already shown one
// section up in FeatureHighlights). Icon + title are pulled directly from
// that same source card so they can never drift; only the body copy is
// authored here, as a trim (not a merge) of that one card's own text. See
// task-R2-report.md for the full old-source -> new-copy table:
//   1. "Fast & User-Friendly UI" <- sections[0].cards[6]
//   2. "Higher Conversion Potential" <- sections[0].cards[7]
//   3. "Built for Scalable Custom Selling" <- sections[0].cards[8]
const keyFeatureCards = features.sections[0].cards ?? [];
const [fastUx, conversion, scalable] = [keyFeatureCards[6], keyFeatureCards[7], keyFeatureCards[8]];

const cards: CardItem[] = [
  {
    icon: fastUx.icon,
    title: fastUx.title,
    text: "Built for performance and ease of use, so customers can customize products without confusion or unnecessary steps.",
  },
  {
    icon: conversion.icon,
    title: conversion.title,
    text: "An interactive design experience keeps customers engaged, builds purchase confidence, and can improve average order value.",
  },
  {
    icon: scalable.icon,
    title: scalable.title,
    text: "Whether you're launching a new custom store or expanding a growing POD brand, Custy is designed to support long-term growth.",
  },
];

// Heading reuses the exact "Why merchants choose Custy" phrase already
// published as content/features.ts's hero highlight title, rather than
// authoring a new one.
export function WhyCusty({ scheme = "bg-scheme2-bg" }: { scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">Why Custy</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            {features.hero.highlight.title}
          </h2>
        </div>
        <CardGrid items={cards} columns={3} />
      </Container>
    </section>
  );
}
