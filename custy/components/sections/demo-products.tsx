import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/lander";
import { Reveal } from "@/components/reveal";
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
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow className="mb-4">Live demo</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            Try Custy on real products
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-body md:text-[16.5px]">
            Pick a product and design it in the live customizer, on the front, back and
            sleeves, with no install needed.
          </p>
        </Reveal>
        {/* A grid rather than a scroll rail: six products across one row left
            the cards too narrow to read, and the products come in a range of
            silhouettes, so they need matching boxes to sit still against each
            other. */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {demoProducts.map((product, index) => (
            // h-full on the Reveal so the card it wraps can stretch to the
            // tallest in the row; the card keeps its own hover transition.
            <Reveal
              key={product.slug}
              variant="zoom"
              delay={index * 0.08}
              className="h-full"
            >
              <Link
                href={`/live-demo?product=${product.slug}`}
                data-testid="demo-product-card"
                className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]"
              >
                {/* Square and object-contain: the thumbnails run from a tall
                    apron to a wide business card, and a fixed box with the art
                    fitted inside keeps every product the same size on screen. */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image.src}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t border-line p-3.5">
                  <p className="text-[14px] leading-snug font-semibold text-ink">{product.name}</p>
                  <span className="inline-flex w-fit items-center rounded-full border border-line px-3 py-1 text-[12px] font-semibold text-ink transition-colors group-hover:border-[#98a2b3]">
                    Try it live
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
