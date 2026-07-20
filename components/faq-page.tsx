import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import type { FaqItem } from "@/content/faqs/types";

export function FaqPage({
  title,
  lede,
  items,
  related,
}: {
  title: string;
  lede?: string;
  items: FaqItem[];
  related: { label: string; href: string }[];
}) {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-lg text-zinc-600">{lede}</p> : null}
      <div className="mt-8 max-w-3xl">
        <Accordion items={items} />
      </div>
      {related.length > 0 ? (
        <nav aria-label="Related FAQs" className="mt-10">
          <p className="text-sm font-semibold text-ink">More FAQs</p>
          <ul className="mt-2 flex flex-wrap gap-4">
            {related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-medium text-brand hover:text-brand-dark">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </Container>
  );
}
