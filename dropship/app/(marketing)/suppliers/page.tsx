import type { Metadata } from "next";
import { CardGrid, CtaBand, LanderHero, LanderSection } from "@/components/lander";
import { fileExports, supplierFlow, suppliersCta, suppliersHero } from "@/content/suppliers";

export const metadata: Metadata = {
  title: "For Suppliers",
  description:
    "Receive dropship orders, download print-ready files (SVG/PDF/PNG/JPG at up to 300 DPI), and manage production status — all in one dashboard.",
};

export default function SuppliersPage() {
  return (
    <>
      <LanderHero {...suppliersHero} />
      <LanderSection eyebrow="The supplier loop" title="From order to shipped, without email ping-pong">
        <div className="relative mx-auto max-w-[880px]">
          <div aria-hidden className="absolute top-3 bottom-3 left-[19px] w-px bg-zinc-200" />
          {supplierFlow.map((step) => (
            <div key={step.number} className="relative pb-10 pl-16 last:pb-0 max-md:pl-14">
              <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-[15px] font-bold text-ink shadow-sm">
                {step.number}
              </div>
              <h3 className="pt-2 text-[17px] leading-snug font-semibold text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.7] text-zinc-600">{step.text}</p>
            </div>
          ))}
        </div>
      </LanderSection>
      <LanderSection tone="light" eyebrow="Print-ready, actually" title="Files your press can use">
        <CardGrid items={fileExports} columns={4} />
      </LanderSection>
      <LanderSection>
        <CtaBand {...suppliersCta} />
      </LanderSection>
    </>
  );
}
