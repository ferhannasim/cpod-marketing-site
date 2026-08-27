import type { Metadata } from "next";
import Link from "next/link";
import Body from "@/content/pages/contact.mdx";
import { Container } from "@/components/container";
import { Eyebrow, RainbowBar } from "@/components/lander";
import { ContactChannels } from "@/components/sections/contact-channels";
import { noIndex } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the Custy team about the Shopify product customizer app.",
  robots: noIndex,
};

const headerWash =
  "radial-gradient(circle at 10% 0%, rgba(23,182,244,0.10), transparent 42%)," +
  "radial-gradient(circle at 90% 8%, rgba(236,0,140,0.07), transparent 38%)," +
  "linear-gradient(180deg, #ffffff 0%, #fafcfe 60%, #f7f9fc 100%)";

// Reasons to reach out, each pointing at the page that already answers the
// common case — copy is grounded in claims those pages publish.
const helpTopics = [
  {
    title: "Getting started",
    text: "See the full workflow — from installing Custy to receiving print-ready orders.",
    href: "/#how-it-works",
    label: "How it works",
  },
  {
    title: "Features & setup",
    text: "Explore the real-time customizer, multi-side printing, and dynamic pricing.",
    href: "/#features",
    label: "View features",
  },
  {
    title: "Plans & billing",
    text: "Compare plans — billing runs through Shopify and you can cancel anytime.",
    href: "/#pricing",
    label: "See pricing",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="border-b border-line" style={{ background: headerWash }}>
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <RainbowBar className="mx-auto mb-7" />
            <h1 className="text-[clamp(2.125rem,4.5vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
              Contact Us
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.75] text-body">
              Questions about Custy, your plan, or selling personalized products on your Shopify
              store? Reach the team directly — we read every message.
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
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            <Eyebrow className="mb-4">Before you write</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
              Answers to the most common questions
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
              A lot of questions are already covered on these pages — you might find your answer
              right away.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
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
          </div>
          <p className="mt-12 text-center text-[15px] text-body">
            Need help with the app itself? Visit{" "}
            <Link href="/#contact" className="font-semibold text-ink underline underline-offset-4">
              Support
            </Link>{" "}
            to send the team a message.
          </p>
        </Container>
      </section>
    </main>
  );
}
