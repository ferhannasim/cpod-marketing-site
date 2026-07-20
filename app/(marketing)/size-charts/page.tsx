import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { chartsByBrand } from "@/lib/size-charts";

export const metadata: Metadata = {
  title: "Size Charts",
  description: "Size charts for every blank we print on, grouped by brand.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Sizing"
        title="Size Charts"
        lede="Find the measurements for your product, or read how to measure."
      />
      <Container className="py-10">
        <p className="text-sm text-zinc-600">
          Not sure how to measure?{" "}
          <Link href="/measuring" className="font-medium text-brand hover:text-brand-dark">
            Read the measuring guide
          </Link>
          .
        </p>
        {chartsByBrand().map(([brand, charts]) => (
          <section key={brand} className="mt-10">
            <h2 className="font-display text-2xl font-bold text-ink">
              {brand} <span className="ml-1 text-sm font-normal text-zinc-500">({charts.length})</span>
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {charts.map((chart) => (
                <li key={chart.handle}>
                  <Link
                    href={`/size-charts/${chart.handle}`}
                    className="block rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition-all hover:border-brand/50 hover:text-ink hover:shadow-sm"
                  >
                    {chart.brand} {chart.model}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
