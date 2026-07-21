import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { SHOPIFY_APP_URL } from "@/lib/site";

export function AppCta() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-ink to-ink-deep px-8 py-12 text-center">
      <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
        Ready to launch your brand?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-zinc-300">
        Install the DropShipPOD app on your Shopify store and start selling custom products printed
        in Canada.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href={SHOPIFY_APP_URL}>Install the Shopify app</ButtonLink>
        <Link href="/contact" className="text-sm font-semibold text-white hover:text-zinc-200">
          Contact us instead →
        </Link>
      </div>
    </div>
  );
}
