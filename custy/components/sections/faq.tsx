import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/faq";

// Native <details>/<summary> accordion — no client JS needed. Shared by the
// homepage teaser band (`Faq` below) and the /faq page, which stacks one list
// per question group under its own heading.
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-[800px] space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-line bg-white px-6 transition-colors open:border-[#d3dce8]"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[16.5px] font-bold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus
              aria-hidden
              className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-45"
            />
          </summary>
          <p
            className={cn(
              "text-[15px] leading-[1.6] text-body",
              item.link ? "pb-3" : "pb-5",
            )}
          >
            {item.answer}
          </p>
          {item.link ? (
            <p className="pb-5">
              <Link
                href={item.link.href}
                className="text-[15px] font-semibold text-[#0b6f97] hover:underline"
              >
                {item.link.label}
              </Link>
            </p>
          ) : null}
        </details>
      ))}
    </div>
  );
}

// Section band wrapping the accordion. Content is caller-supplied: the homepage
// passes only the first four of content/faq.ts's faqItems as a teaser, with a
// `viewAll` link through to the full /faq page.
export function Faq({
  items,
  scheme = "bg-wash",
  viewAll,
}: {
  items: FaqItem[];
  scheme?: string;
  viewAll?: { label: string; href: string };
}) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Reveal>
          <FaqAccordion items={items} />
        </Reveal>
        {viewAll ? (
          <div className="mt-8 text-center">
            <Button href={viewAll.href} variant="secondary">
              {viewAll.label}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
