import { Container } from "@/components/container";

export type TrustItem = { title: string; text: string };

// Three plan guarantees already promised on the pricing page — no new claims,
// just restated compactly for the homepage. Titles are the exact labels used
// in the R2 spec; one-liners are direct trims of a single content/pricing.ts
// field each (cited per item):
//   1. "21-day free trial on paid plans" — title is verbatim the tail clause
//      of pricing.header.note ("No setup fee • Cancel anytime • 21-day free
//      trial on paid plans"). Body trims pricing.faq.items[0].answer ("Paid
//      plans include a 21-day free trial so you can test Custy on your
//      Shopify store before committing. The Free plan doesn't require a
//      trial.").
//   2. "Cancel anytime through Shopify" — title trims pricing.bottomNote
//      ("You can cancel anytime through Shopify — no hidden fees, no
//      commission."). Body trims the same single field (no "billing"
//      phrasing borrowed from the FAQ, to keep this one-field-sourced).
//   3. "No hidden fees or commissions" — title paraphrases pricing.bottomNote
//      /header.note's "no hidden fees" + "no commission" claims into one
//      label (per the R2 spec). Body is pricing.bottomNote's own clause
//      verbatim ("no hidden fees, no commission").
const items: TrustItem[] = [
  {
    title: "21-day free trial on paid plans",
    text: "Paid plans include a 21-day free trial so you can test Custy before committing.",
  },
  {
    title: "Cancel anytime through Shopify",
    text: "You can cancel anytime through Shopify.",
  },
  {
    title: "No hidden fees or commissions",
    text: "No hidden fees, no commission.",
  },
];

// A slim, compact strip between the pricing teaser and the FAQ. Carries its
// own sr-only h2 (rather than an aria-label) so the page's heading outline
// doesn't skip from WhyCusty's h2 straight to these items' h3s.
export function TrustBand({ scheme = "bg-scheme2-bg" }: { scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-8 md:py-10">
        <h2 className="sr-only">Plan guarantees</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.title}>
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-body">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
