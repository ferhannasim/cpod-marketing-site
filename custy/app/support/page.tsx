import type { Metadata } from "next";
import Link from "next/link";
import Body from "@/content/pages/support.mdx";
import { Container } from "@/components/container";
import { Eyebrow, RainbowBar } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { ContactChannels } from "@/components/sections/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { noIndex } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with the Custy Shopify product customizer app.",
  robots: noIndex,
};

// Common support topics, each pointing at the page that already documents the
// answer — copy is grounded in claims those pages publish.
const helpTopics = [
  {
    title: "Setup & installation",
    text: "Install Custy from the Shopify App Store, connect your store, and set up products, print areas, and pricing rules.",
    href: "/how-it-works",
    label: "Follow the walkthrough",
  },
  {
    title: "Using the customizer",
    text: "Learn what the design panel supports: multi-side printing, product options, and print-ready DTG/DTF files.",
    href: "/features",
    label: "Explore features",
  },
  {
    title: "Plans, trials & billing",
    text: "Billing runs through Shopify. Paid plans include a 30-day free trial, and you can change or cancel your plan anytime.",
    href: "/pricing",
    label: "Read the pricing FAQ",
  },
];

export default function SupportPage() {
  return (
    <main>
      <section className="bg-wash-hero border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <h1 className="text-[clamp(2.125rem,4.5vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
              Support
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.6] text-body">
              Get help with the Custy product customizer: setup, the design panel, orders, plans,
              and everything in between.
            </p>
            <div className="prose prose-neutral mx-auto mt-4 max-w-none text-left">
              <Body />
            </div>
          </div>
          <ContactChannels className="mx-auto mt-12 max-w-[880px]" />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
            <Eyebrow className="mb-4">Help topics</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              Find answers by topic
            </h2>
          </Reveal>
          <Reveal className="grid gap-5 md:grid-cols-3">
            {helpTopics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group rounded-2xl border border-line bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]"
              >
                <h3 className="text-base leading-snug font-semibold text-ink">{topic.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-body">{topic.text}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#0b7fad] group-hover:underline">
                  {topic.label} →
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-wash">
        <Container className="py-16 md:py-24">
          <Reveal className="mx-auto mb-10 max-w-[760px] text-center">
            <Eyebrow className="mb-4">Message us</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              Send us a message
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-body md:text-[16.5px]">
              Tell us what you're running into. Including your store URL and plan helps us answer
              faster.
            </p>
          </Reveal>
          <Reveal className="mx-auto max-w-[720px] rounded-2xl border border-line bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.04)] md:p-8">
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
