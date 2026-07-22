import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/lander";
import { demoProducts } from "@/content/demo-products";

// Homepage band linking into /live-demo with a product preselected. Cards follow
// the BlogPostCard hover/border treatment; images are object-contain (not cover)
// so no garment gets cropped.
export function DemoProducts({ scheme = "bg-scheme1-bg" }: { scheme?: string }) {
  return (
    <section className={scheme}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">Live demo</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            Try Custy on real products
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-body md:text-[16.5px]">
            Pick a product and design it in the live customizer — front, back, and
            sleeves — no install needed.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {demoProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/live-demo?product=${product.slug}`}
              data-testid="demo-product-card"
              className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image.src}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-line p-5">
                <p className="text-[15px] leading-snug font-semibold text-ink">{product.name}</p>
                <span className="inline-flex shrink-0 items-center rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-ink transition-colors group-hover:border-[#98a2b3]">
                  Try it live
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
