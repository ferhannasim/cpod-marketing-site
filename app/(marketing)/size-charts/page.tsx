import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { chartsByBrand } from "@/lib/size-charts";

export const metadata: Metadata = {
  title: "Size Charts",
  description: "Size charts for every blank we print on, grouped by brand.",
};

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Size Charts</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Find the measurements for your product, or read{" "}
        <Link href="/measuring" className="font-medium text-brand hover:text-brand-dark">
          how to measure
        </Link>
        .
      </p>
      {chartsByBrand().map(([brand, charts]) => (
        <section key={brand} className="mt-10">
          <h2 className="font-display text-2xl font-bold text-ink">{brand}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {charts.map((chart) => (
              <li key={chart.handle}>
                <Link
                  href={`/size-charts/${chart.handle}`}
                  className="block rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 hover:border-ink hover:text-ink"
                >
                  {chart.brand} {chart.model}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}
