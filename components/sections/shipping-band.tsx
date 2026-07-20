import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function ShippingBand() {
  return (
    <Section id="shipping" className="border-y border-zinc-200">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl font-bold text-ink">
            Free shipping on all orders over $199
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Ground shipping in 1–5 business days across Canada · Express in 1–2 · Optional pick-up at
            our warehouse.
          </p>
        </div>
        <ButtonLink href="/delivery" variant="secondary">
          Delivery details
        </ButtonLink>
      </Container>
    </Section>
  );
}
