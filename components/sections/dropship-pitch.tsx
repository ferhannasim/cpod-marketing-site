import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

const landers = [
  {
    title: "Start Your Ecommerce Brand Without Tech or High Costs",
    description:
      "Skip the upfront inventory and the tech stack. We handle printing, packing and shipping while you focus on your brand.",
    href: "/start-your-ecommerce-brand",
  },
  {
    title: "Launch a Fully Automated Ecommerce Brand (No Tech Needed)",
    description:
      "Connect our Shopify app and orders flow straight to production — fully automated, printed in Canada.",
    href: "/launch-automated-brand",
  },
];

export function DropshipPitch() {
  return (
    <Section id="dropship" className="bg-surface">
      <Container>
        <SectionHeading eyebrow="Dropship + Shopify app" title="Built for dropshipping" />
        <div className="grid gap-6 md:grid-cols-2">
          {landers.map((lander) => (
            <Card key={lander.href} className="flex flex-col">
              <h3 className="font-display text-xl font-bold text-ink">{lander.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{lander.description}</p>
              <Link
                href={lander.href}
                className="mt-4 inline-block text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
