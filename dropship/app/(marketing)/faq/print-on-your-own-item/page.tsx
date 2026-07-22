import type { Metadata } from "next";
import { FaqPage } from "@/components/faq-page";
import { printOnYourOwnItemFaq } from "@/content/faqs/print-on-your-own-item";

export const metadata: Metadata = {
  title: "Print on Your Own Item FAQ",
  description: "Answers about sending in your own garments for printing.",
};

const related = [
  { label: "General FAQ", href: "/faq" },
  { label: "DTF FAQ", href: "/faq/dtf" },
  { label: "Sublimation FAQ", href: "/faq/sublimation" },
];

export default function Page() {
  return <FaqPage title="Print on Your Own Item FAQ" items={printOnYourOwnItemFaq} related={related} />;
}
