import type { Metadata } from "next";
import {
  CardGrid,
  CtaBand,
  HighlightCard,
  Lander,
  LanderHero,
  LanderSection,
} from "@/components/lander";
import { about, type AboutListGroup } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "At Custy, our mission is simple — to empower Shopify merchants to create, customize, and sell products without limits.",
};

/**
 * `.custy-list-grid`: two `.custy-list-card` checklists side by side. No shared
 * lander component covers a *grid of* HighlightCards (HighlightCard itself is a
 * single card), so this small page-scoped wrapper reuses it twice — matching the
 * same `min-[1200px]:grid-cols-2` breakpoint CardGrid uses for `columns={2}`.
 */
function ListGrid({ groups }: { groups: AboutListGroup[] }) {
  return (
    <div className="mt-3 grid gap-[22px] min-[1200px]:grid-cols-2">
      {groups.map((group) => (
        <HighlightCard key={group.title} title={group.title} items={group.items} />
      ))}
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main>
      <Lander>
        <LanderHero
          eyebrow={about.hero.eyebrow}
          title={about.hero.title}
          lead={about.hero.lead}
          ctas={about.hero.ctas}
          highlight={
            <HighlightCard title={about.hero.highlight.title} items={about.hero.highlight.items} />
          }
        />

        <LanderSection title={about.vision.title} lead={about.vision.lead}>
          <CardGrid items={about.vision.cards} columns={2} />
        </LanderSection>

        <LanderSection title={about.whatWeDo.title} lead={about.whatWeDo.lead}>
          <CardGrid items={about.whatWeDo.cards} columns={3} />
          <ListGrid groups={about.whatWeDo.lists} />
        </LanderSection>

        <LanderSection title={about.whyCusty.title} lead={about.whyCusty.lead}>
          <CardGrid items={about.whyCusty.cards} columns={3} />
        </LanderSection>

        <LanderSection title={about.modernEcommerce.title} lead={about.modernEcommerce.lead}>
          <CardGrid items={about.modernEcommerce.cards} columns={2} />
        </LanderSection>

        <LanderSection title={about.commitment.title} lead={about.commitment.lead}>
          <ListGrid groups={about.commitment.lists} />
        </LanderSection>

        <CtaBand
          title={about.cta.title}
          text={about.cta.text}
          cta={about.cta.cta}
          secondaryCta={about.cta.secondaryCta}
        />
      </Lander>
    </main>
  );
}
