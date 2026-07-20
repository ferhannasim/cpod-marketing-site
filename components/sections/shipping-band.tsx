import { Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function ShippingBand() {
  return (
    <Section id="shipping">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-zinc-200 bg-surface p-8 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink-tint text-ink">
              <Truck aria-hidden className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold text-ink">
                Free shipping on all orders over $199
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Ground shipping in 1–5 business days across Canada · Express in 1–2 · Optional
                pick-up at our warehouse.
              </p>
            </div>
          </div>
          <ButtonLink href="/delivery" variant="secondary">
            Delivery details
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
