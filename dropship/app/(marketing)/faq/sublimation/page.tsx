import type { Metadata } from "next";
import { FaqPage } from "@/components/faq-page";
import { sublimationFaq } from "@/content/faqs/sublimation";

export const metadata: Metadata = {
  title: "Sublimation FAQ",
  description: "Answers about dye-sublimation printing.",
};

const related = [
  { label: "General FAQ", href: "/faq" },
  { label: "DTF FAQ", href: "/faq/dtf" },
  { label: "Print on your own item", href: "/faq/print-on-your-own-item" },
];

export default function Page() {
  return <FaqPage title="Sublimation FAQ" items={sublimationFaq} related={related} />;
}
