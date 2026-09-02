import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaBand, Eyebrow, RainbowBar } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/sections/faq";
import { faq, faqItems } from "@/content/faq";
import { APP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the questions merchants ask about Custy: what shoppers can customize, how plans and billing work, setup, and who handles printing and shipping.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-wash-hero border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <h1 className="text-[clamp(2.125rem,4.5vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
              {faq.hero.title}
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.6] text-body">{faq.hero.lead}</p>
          </div>
        </Container>
      </section>

      {/* One band per question group, alternating white / light so no two
          adjacent groups share a background. */}
      {faq.groups.map((group, index) => (
        <section key={group.title} className={index % 2 === 0 ? "bg-white" : "bg-wash"}>
          <Container className="py-14 md:py-16">
            <Reveal className="mx-auto mb-10 max-w-[760px] text-center">
              <Eyebrow className="mb-4">{group.eyebrow}</Eyebrow>
              <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
                {group.title}
              </h2>
            </Reveal>
            <Reveal>
              <FaqAccordion items={group.items} />
            </Reveal>
          </Container>
        </section>
      ))}

      <Container className="py-16 md:py-20">
        <CtaBand
          title="Still have a question?"
          text="Install Custy and try it on your own products, or send us the details and we will walk you through it."
          cta={{ label: "Install Now on Shopify", href: APP_URL }}
          secondaryCta={{ label: "Contact support", href: "/contact" }}
          tone="light"
        />
      </Container>
    </main>
  );
}
