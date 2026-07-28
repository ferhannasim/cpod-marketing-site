import { Palette } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { CUSTY_APP_URL, CUSTY_SITE_URL } from "@/lib/site";

const points = [
  "Shoppers add their own text, art and colours on your product page.",
  "Live preview, so they see the design before they buy.",
  "Print-ready artwork arrives with the order — nothing to redraw.",
];

export function CustyPitch() {
  return (
    <Section id="custy" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Also from our team"
          title="Custy for your storefront"
        />
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-base leading-relaxed text-zinc-600">
              Custy is our Shopify product customizer. Let customers personalize
              what they buy without you touching a design file — then send the
              finished order straight to us for printing.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-ink-tint text-ink">
                    <Palette aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-5 md:justify-end">
            <ButtonLink href={CUSTY_APP_URL}>Get Custy on Shopify</ButtonLink>
            <a
              href={CUSTY_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand hover:text-brand-dark"
            >
              Visit custyapp.com
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
