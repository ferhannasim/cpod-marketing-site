import { Container } from "@/components/container";

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
      <Container className="py-14 md:py-20">
        <h2 className="text-[1.625rem] font-extrabold leading-[1.2] text-ink md:text-[1.75rem]">
          Frequently Asked Questions
        </h2>
        <div className="mt-8">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-line py-4">
              <summary className="flex cursor-pointer items-center justify-between text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden className="ml-4 text-lander-text transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
