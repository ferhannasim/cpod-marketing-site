import { Container } from "@/components/container";
import { IconTile } from "@/components/lander";
import { Reveal } from "@/components/reveal";

export type TrustItem = { icon: string; title: string; text: string };

// Three plan guarantees restated compactly from the billing terms in
// docs/CUSTY_APP_MARKETING_SITE_BRIEF.md § 3 — no claims beyond what the
// pricing section already promises. Titles are pinned by app/page.test.tsx.
const items: TrustItem[] = [
  {
    icon: "calendar-check",
    title: "30-day free trial on paid plans",
    text: "Thirty days on any paid plan, once per store, so you can test Custy on real products first.",
  },
  {
    icon: "undo",
    title: "Cancel anytime through Shopify",
    text: "Cancelling prorates and keeps your access until the end of the paid period.",
  },
  {
    icon: "badge-percent",
    title: "No hidden fees or commissions",
    text: "No setup fee and no commission on your sales — billing runs through Shopify.",
  },
];

// A slim, compact strip between the pricing teaser and the FAQ. Carries its
// own sr-only h2 (rather than an aria-label) so the page's heading outline
// doesn't skip from WhyCusty's h2 straight to these items' h3s.
export function TrustBand({ scheme = "bg-wash" }: { scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-10 md:py-14">
        <h2 className="sr-only">Plan guarantees</h2>
        {/* Three peers rather than a block, so they arrive in sequence. A plain
            fade keeps this strip calm — it sits directly under the hero. */}
        <div className="grid gap-8 sm:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              variant="fade"
              delay={index * 0.1}
              className="flex items-start gap-4"
            >
              <IconTile name={item.icon} tint={index} className="h-10 w-10 shrink-0 rounded-lg" />
              <div>
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-[1.55] text-body">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
