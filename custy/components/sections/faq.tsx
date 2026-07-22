import { Plus } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/lander";

// Native <details>/<summary> accordion — no client JS needed. Reuses the exact
// 4 FAQ entries from content/pricing.ts's own FAQ section (pricing.faq.items);
// heading text is the exact title already used there.
export function Faq({
  items,
  scheme = "bg-scheme2-bg",
}: {
  items: { question: string; answer: string }[];
  scheme?: string;
}) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto max-w-[800px] space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-line bg-white px-6 transition-colors open:border-[#d3dce8]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-[#667085] transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="pb-5 text-[15px] leading-[1.7] text-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
