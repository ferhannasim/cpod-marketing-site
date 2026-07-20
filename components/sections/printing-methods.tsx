import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

const methods = [
  {
    name: "DTG",
    description:
      "Direct-to-garment printing lays ink straight into the fabric for soft, detailed, full-colour prints — ideal for cotton tees and hoodies.",
    href: "/faq",
    linkLabel: "Read the general FAQ",
  },
  {
    name: "DTF",
    description:
      "Direct-to-film transfers press onto almost any fabric or colour with bold colour and excellent durability.",
    href: "/faq/dtf",
    linkLabel: "Read the DTF FAQ",
  },
  {
    name: "Sublimation",
    description:
      "Dye-sublimation bonds ink into polyester for vivid, edge-to-edge prints that never crack or peel.",
    href: "/faq/sublimation",
    linkLabel: "Read the sublimation FAQ",
  },
];

export function PrintingMethods() {
  return (
    <Section id="printing-methods">
      <Container>
        <SectionHeading eyebrow="What we print" title="Printing methods" />
        <div className="grid gap-6 md:grid-cols-3">
          {methods.map((method) => (
            <Card key={method.name}>
              <h3 className="font-display text-xl font-bold text-ink">{method.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{method.description}</p>
              <Link href={method.href} className="mt-4 inline-block text-sm font-semibold text-brand hover:text-brand-dark">
                {method.linkLabel} →
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Before ordering, please read our{" "}
          <Link href="/printing-notice" className="font-medium text-brand hover:text-brand-dark">
            important printing notice
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
