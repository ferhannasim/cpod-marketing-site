import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SHOPIFY_APP_URL } from "@/lib/site";

export function FinalCta() {
  return (
    <div className="bg-gradient-to-br from-ink to-ink-deep">
      <Container className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Ready to launch your brand?
          </h2>
          <p className="mt-2 max-w-xl text-zinc-300">
            Install the DropShipPOD app on your Shopify store — we&apos;ll handle printing, packing
            and shipping.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href={SHOPIFY_APP_URL}>Install the Shopify app</ButtonLink>
          <Link href="/contact" className="text-sm font-semibold text-white hover:text-zinc-200">
            Contact us →
          </Link>
        </div>
      </Container>
    </div>
  );
}
