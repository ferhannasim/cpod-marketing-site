import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import ContactInfo from "@/content/pages/contact-info.mdx";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with DropShipPOD — questions, quotes, and support.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Contact Us"
        lede="Questions, quotes, and order support — we answer fast."
      />
      <Container className="py-10 sm:py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink">Send us a message</h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
          <div className="rounded-2xl bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-ink">Reach us directly</h2>
            <Prose className="mt-4">
              <ContactInfo />
            </Prose>
          </div>
        </div>
      </Container>
    </>
  );
}
