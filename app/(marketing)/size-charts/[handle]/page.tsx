import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SizeChartTable } from "@/components/size-chart-table";
import { getAllSizeCharts, getSizeChart } from "@/lib/size-charts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSizeCharts().map((chart) => ({ handle: chart.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const chart = getSizeChart(handle);
  if (!chart) return {};
  return {
    title: `${chart.brand} ${chart.model} Size Chart`,
    description: `Measurements and sizing for the ${chart.brand} ${chart.model}.`,
  };
}

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const chart = getSizeChart(handle);
  if (!chart) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/size-charts" className="font-medium text-brand hover:text-brand-dark">
          ← All size charts
        </Link>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
        {chart.brand} {chart.model} Size Chart
      </h1>
      <div className="mt-8 max-w-3xl">
        <SizeChartTable chart={chart} />
      </div>
      <p className="mt-6 text-sm text-zinc-500">
        Not sure how to measure?{" "}
        <Link href="/measuring" className="font-medium text-brand hover:text-brand-dark">
          Read the measuring guide
        </Link>
        .
      </p>
    </Container>
  );
}
