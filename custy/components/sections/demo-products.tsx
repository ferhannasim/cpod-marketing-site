import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/lander";
import { demoProducts } from "@/content/demo-products";
import { cn } from "@/lib/utils";

export function DemoProducts({
  scheme = "bg-scheme1-bg",
  id,
}: {
  scheme?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(scheme, id && "scroll-mt-20")}>
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
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {demoProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/live-demo?product=${product.slug}`}
              data-testid="demo-product-card"
              className="group flex w-[min(220px,72vw)] shrink-0 flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)] lg:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image.src}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 20vw, 220px"
                />
              </div>
              <div className="mt-auto flex flex-col gap-3 border-t border-line p-3.5">
                <p className="text-[13px] leading-snug font-semibold text-ink">{product.name}</p>
                <span className="inline-flex w-fit items-center rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-ink transition-colors group-hover:border-[#98a2b3]">
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
