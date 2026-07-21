import type { Metadata } from "next";
import { Prose } from "@/components/prose";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the Custy team about the Shopify product customizer app.",
};

export default function ContactPage() {
  return (
    <main>
      <Prose>
        <h1>Contact Us</h1>
      </Prose>
      <Container className="pb-16">
        <div className="mx-auto max-w-[720px]">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
