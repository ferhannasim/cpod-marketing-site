import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-br from-ink to-ink-deep">
      <Container className="py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-300">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-300">
          The page you&apos;re looking for doesn&apos;t exist — it may have moved when we rebuilt
          the site.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="outline-dark">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
