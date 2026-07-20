import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-zinc-600">
        The page you&apos;re looking for doesn&apos;t exist — it may have moved when we rebuilt the site.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
