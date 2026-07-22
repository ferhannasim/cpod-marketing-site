import type { Metadata } from "next";
import { Container } from "@/components/container";
import { DemoExplorer } from "@/components/live-demo/demo-explorer";
import { demoProducts } from "@/content/demo-products";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "Try the Custy product customizer on real products — aprons, hoodies, and long sleeve t-shirts — right in your browser, no install needed.",
};

// ?product=<slug> picks the initially open product; anything unknown (or no
// query at all) falls back to the first registry entry, so this page never
// 404s on a bad slug. Keyed by the resolved slug so a client-side navigation
// to a different ?product= remounts the explorer with fresh state.
export default async function LiveDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>;
}) {
  const { product } = await searchParams;
  const requested = Array.isArray(product) ? product[0] : product;
  const selected = demoProducts.find((p) => p.slug === requested) ?? demoProducts[0];

  return (
    <main>
      <Container className="py-16 md:py-20">
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <h1 className="text-[clamp(2.125rem,4.5vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
            Live Demo
          </h1>
          <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
            Design a real product in the Custy customizer — pick one on the right and
            start creating.
          </p>
        </div>
        <DemoExplorer key={selected.slug} initialSlug={selected.slug} />
      </Container>
    </main>
  );
}
