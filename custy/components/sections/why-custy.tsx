import { Container } from "@/components/container";
import { CardGrid, type CardItem } from "@/components/lander";
import { features } from "@/content/features";

// Three benefit cards distilled from copy already published elsewhere on the
// site — no new claims, tightened for a compact homepage card. Icons are the
// exact glyphs already used for these same features in their source files.
// See task-R2-report.md for the full old-source -> new-copy table:
//   1. "Real-Time Customization" <- content/features.ts sections[0].cards[0]
//      ("Real-Time Product Customizer").
//   2. "Dynamic Pricing" <- content/about.ts whyCusty.cards[0] ("Dynamic
//      Pricing"), with "automatically" carried over from features.ts's
//      sibling "Dynamic Pricing Engine" card.
//   3. "Built for POD Workflows" <- content/about.ts whyCusty.cards[1]
//      ("Modern Print Support") + content/features.ts sections[0].cards[3]
//      ("DTG, DTF & Print-Ready Files").
const cards: CardItem[] = [
  {
    icon: "🎨",
    title: "Real-Time Customization",
    text: "Customers design products live on your storefront with an instant preview that feels smooth, visual, and easy to use.",
  },
  {
    icon: "💰",
    title: "Dynamic Pricing",
    text: "Prices adjust automatically based on real customization choices, so you stay flexible while protecting your margins.",
  },
  {
    icon: "🖨️",
    title: "Built for POD Workflows",
    text: "Supports DTG, DTF, and other print workflows with print-ready design files prepared for real-world fulfillment.",
  },
];

// Heading reuses the exact "Why merchants choose Custy" phrase already
// published as content/features.ts's hero highlight title, rather than
// authoring a new one.
export function WhyCusty({ scheme = "bg-scheme2-bg" }: { scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-14 md:py-20">
        <h2 className="text-[1.625rem] font-extrabold leading-[1.2] text-ink md:text-[1.75rem]">
          {features.hero.highlight.title}
        </h2>
        <div className="mt-8">
          <CardGrid items={cards} columns={3} />
        </div>
      </Container>
    </section>
  );
}
