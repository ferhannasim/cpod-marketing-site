import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { PageHero } from "@/components/page-hero";
import { buttonClasses } from "@/components/ui/button";
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
    <>
      <PageHero eyebrow="FAQs" title={title} lede={lede} />
      <Container className="py-10 sm:py-12">
        <div className="max-w-3xl">
          <Accordion items={items} />
        </div>
        {related.length > 0 ? (
          <nav aria-label="Related FAQs" className="mt-10">
            <p className="text-sm font-semibold text-ink">More FAQs</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {related.map((link) => (
                <Link key={link.href} href={link.href} className={buttonClasses("outline", "px-4 py-2 text-xs")}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </Container>
    </>
  );
}
