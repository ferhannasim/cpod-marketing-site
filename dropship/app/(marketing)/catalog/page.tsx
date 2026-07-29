import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { LogoWall } from "@/components/logo-wall";
import { catalogCta, catalogHero, categories, niches } from "@/content/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "100+ print-on-demand blanks — tees, hoodies, mugs and more — printable with DTF, DTG, sublimation and embroidery, produced in Canada.",
};

export default function CatalogPage() {
  return (
    <>
      <LanderHero {...catalogHero} />
      <LanderSection eyebrow="What you can sell" title="Product categories">
        <CardGrid items={categories} columns={4} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Blanks we stock" title="Top selling brands">
        <LogoWall />
      </LanderSection>
      <LanderSection eyebrow="Made for your niche" title="Designs for every audience"
        lead="The design taxonomy built into the platform covers the niches sellers actually build brands around.">
        <CardGrid items={niches} columns={4} align="center" />
      </LanderSection>
      <LanderSection tone="light">
        <CtaBand {...catalogCta} />
      </LanderSection>
    </>
  );
}
