import Image from "next/image";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import type { home } from "@/content/home";

export function Hero({ hero }: { hero: typeof home.hero }) {
  return (
    <section className="bg-scheme1-bg">
      <Container className="grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl md:text-5xl">{hero.heading}</h1>
          <p className="mt-4 text-lg text-body">{hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {hero.ctas.map((cta) => (
              <Button key={cta.label} href={cta.href} external={cta.external}>
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-card">
          <Image
            src={hero.image.src}
            alt={hero.image.alt ?? ""}
            width={hero.image.width}
            height={hero.image.height}
            priority
            className="h-auto w-full"
          />
        </div>
      </Container>
    </section>
  );
}
