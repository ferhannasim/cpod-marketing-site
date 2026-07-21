import type { Metadata } from "next";
import { FaqPage } from "@/components/faq-page";
import { dtfFaq } from "@/content/faqs/dtf";

export const metadata: Metadata = {
  title: "DTF FAQ",
  description: "Answers about direct-to-film (DTF) printing and transfers.",
};

const related = [
  { label: "General FAQ", href: "/faq" },
  { label: "Sublimation FAQ", href: "/faq/sublimation" },
  { label: "Print on your own item", href: "/faq/print-on-your-own-item" },
];

export default function Page() {
  return <FaqPage title="DTF FAQ" items={dtfFaq} related={related} />;
}
