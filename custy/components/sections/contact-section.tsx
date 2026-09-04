"use client";

import { Container } from "@/components/container";
import { ContactChannels } from "@/components/sections/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow, RainbowBar } from "@/components/lander";
import { Reveal } from "@/components/reveal";

type ContactSectionProps = {
  title: string;
  lead: string;
};

/** Shared Contact band used on the homepage and About / Contact page. */
export function ContactSection({ title, lead }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-scheme1-bg overflow-x-clip scroll-mt-20">
      <Container className="py-16 md:py-24">
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <RainbowBar className="mx-auto mb-7" />
          <Eyebrow className="mb-4">Contact</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            {title}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-body md:text-[16.5px]">{lead}</p>
        </Reveal>
        <div className="grid items-start gap-6 lg:grid-cols-5 lg:gap-8">
          <Reveal variant="left" className="lg:col-span-2">
            <p className="mb-4 text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
              Reach us directly
            </p>
            <ContactChannels variant="stack" />
          </Reveal>
          <Reveal
            variant="right"
            delay={0.12}
            className="rounded-2xl border border-line bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.04)] md:p-8 lg:col-span-3"
          >
            <p className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
              Send a message
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
