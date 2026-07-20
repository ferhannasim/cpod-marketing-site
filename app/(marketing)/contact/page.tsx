import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { ContactForm } from "@/components/contact-form";
import ContactInfo from "@/content/pages/contact-info.mdx";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with DropShipPOD — questions, quotes, and support.",
};

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Contact Us</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Send us a message</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Reach us directly</h2>
          <Prose className="mt-4">
            <ContactInfo />
          </Prose>
        </div>
      </div>
    </Container>
  );
}
