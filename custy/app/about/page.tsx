import type { Metadata } from "next";
import {
  CardGrid,
  CtaBand,
  HighlightCard,
  Lander,
  LanderHero,
  LanderSection,
} from "@/components/lander";
import { ContactSection } from "@/components/sections/contact-section";
import { about, type AboutListGroup } from "@/content/about";
import { home } from "@/content/home";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "At Custy, our mission is simple: to empower Shopify merchants to create, customize, and sell products without limits.",
};

/**
 * Two HighlightCard checklists side by side. No shared lander component covers
 * a *grid of* HighlightCards (HighlightCard itself is a single card), so this
 * small page-scoped wrapper reuses it twice.
 */
function ListGrid({ groups, className }: { groups: AboutListGroup[]; className?: string }) {
  return (
    <div className={`grid gap-5 min-[1200px]:grid-cols-2 ${className ?? ""}`}>
      {groups.map((group) => (
        <HighlightCard key={group.title} title={group.title} items={group.items} />
      ))}
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main>
      <LanderHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        lead={about.hero.lead}
        ctas={about.hero.ctas}
        highlight={
          <HighlightCard title={about.hero.highlight.title} items={about.hero.highlight.items} />
        }
      />

      <LanderSection eyebrow="Our vision" title={about.vision.title} lead={about.vision.lead}>
        <CardGrid items={about.vision.cards} columns={2} />
      </LanderSection>

      <LanderSection
        eyebrow="What we do"
        title={about.whatWeDo.title}
        lead={about.whatWeDo.lead}
        tone="light"
      >
        <CardGrid items={about.whatWeDo.cards} columns={3} />
        <ListGrid groups={about.whatWeDo.lists} className="mt-5" />
      </LanderSection>

      <LanderSection eyebrow="Who it's for" title={about.audiences.title} lead={about.audiences.lead}>
        <CardGrid items={about.audiences.cards} columns={4} align="center" />
      </LanderSection>

      <LanderSection
        eyebrow="Why Custy"
        title={about.whyCusty.title}
        lead={about.whyCusty.lead}
        tone="light"
      >
        <CardGrid items={about.whyCusty.cards} columns={3} />
      </LanderSection>

      <LanderSection
        eyebrow="Modern eCommerce"
        title={about.modernEcommerce.title}
        lead={about.modernEcommerce.lead}
      >
        <CardGrid items={about.modernEcommerce.cards} columns={2} />
      </LanderSection>

      <LanderSection
        eyebrow="Our commitment"
        title={about.commitment.title}
        lead={about.commitment.lead}
        tone="light"
      >
        <ListGrid groups={about.commitment.lists} />
      </LanderSection>

      <div className="bg-white">
        <Lander className="py-16 md:py-20">
          <CtaBand
            title={about.cta.title}
            text={about.cta.text}
            cta={about.cta.cta}
            secondaryCta={about.cta.secondaryCta}
          />
        </Lander>
      </div>

      <ContactSection title={home.contact.title} lead={home.contact.lead} />
    </main>
  );
}
