import Image from "next/image";
import { Container } from "@/components/container";
import { APP_URL } from "@/lib/site";
import type { home } from "@/content/home";

// Demo-only: no commerce. Cards are static image+title tiles that link out to the
// Shopify App Store listing so a visitor can try the real customizer — never to a
// /products/* page (there is no product catalog in this port).
export function DemoShowcase({ demo }: { demo: typeof home.demo }) {
  return (
    <section className="bg-scheme1-bg">
      <Container className="py-14 md:py-20">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{demo.heading}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {demo.products.map((product) => (
            <a
              key={product.title}
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-card border border-line p-3 transition-colors hover:border-ink"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-scheme2-bg">
                <Image
                  src={product.image.src}
                  alt={product.image.alt ?? product.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-ink">{product.title}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
