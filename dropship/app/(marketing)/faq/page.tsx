import type { Metadata } from "next";
import { FaqPage } from "@/components/faq-page";
import { generalFaq } from "@/content/faqs/general";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about DropShipPOD printing and dropshipping.",
};

const related = [
  { label: "DTF FAQ", href: "/faq/dtf" },
  { label: "Sublimation FAQ", href: "/faq/sublimation" },
  { label: "Print on your own item", href: "/faq/print-on-your-own-item" },
];

export default function Page() {
  return <FaqPage title="Frequently Asked Questions" items={generalFaq} related={related} />;
}
