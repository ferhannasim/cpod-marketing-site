import { Container } from "@/components/container";

export type TrustItem = { title: string; text: string };

// Three plan guarantees already promised on the pricing page — no new claims,
// just restated compactly for the homepage. Sourced from content/pricing.ts:
//   1. "21-Day Free Trial" <- pricing.faq.items[0].answer ("Paid plans
//      include a 21-day free trial so you can test Custy on your Shopify
//      store before committing.")
//   2. "Cancel Anytime" <- pricing.bottomNote ("You can cancel anytime
//      through Shopify").
//   3. "No Hidden Fees" <- pricing.bottomNote ("no hidden fees, no
//      commission") + pricing.faq.items[2].answer ("your monthly
//      subscription covers the features included in your plan").
const items: TrustItem[] = [
  {
    title: "21-Day Free Trial",
    text: "Every paid plan includes a 21-day free trial so you can test Custy before committing.",
  },
  {
    title: "Cancel Anytime",
    text: "You can cancel anytime through Shopify's billing.",
  },
  {
    title: "No Hidden Fees",
    text: "No commission on your sales — your subscription covers it all.",
  },
];

// A slim, compact strip between the pricing teaser and the FAQ — no section
// heading (kept out of the page's heading outline on purpose), just an
// aria-label naming the landmark for screen-reader users.
export function TrustBand({ scheme = "bg-scheme2-bg" }: { scheme?: string }) {
  return (
    <section className={scheme} aria-label="Custy plan guarantees">
      <Container className="py-8 md:py-10">
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
