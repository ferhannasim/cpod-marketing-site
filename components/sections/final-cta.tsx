import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCta() {
  return (
    <div className="bg-ink">
      <Container className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Ready to launch your brand?
          </h2>
          <p className="mt-2 max-w-xl text-zinc-300">
            Tell us what you want to build — we&apos;ll get you printing, packing and shipping.
          </p>
        </div>
        <ButtonLink href="/contact">Contact us</ButtonLink>
      </Container>
    </div>
  );
}
