import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { SHOPIFY_APP_URL } from "@/lib/site";

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
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ButtonLink href={SHOPIFY_APP_URL} className="px-5 py-2.5">
                  Get the app
                </ButtonLink>
                <Link
                  href={lander.href}
                  className="text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  Learn more <span className="sr-only">about {lander.title}</span>
                  <span className="ml-0.5" aria-hidden="true">→</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
