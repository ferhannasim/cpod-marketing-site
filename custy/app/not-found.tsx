import { Container } from "@/components/container";
import { Button } from "@/components/button";

// Copy ported from the live theme's templates/404.json (main-404 section, scheme-1):
// h1 "Page not found" + body "The link may be incorrect, or the page has been removed."
// The live button ("Continue shopping" -> shopify://collections/all) has no equivalent on
// this commerce-free marketing site, so it's replaced with a pill button back to "/".
export default function NotFound() {
  return (
    <div className="bg-scheme1-bg">
      <Container className="py-16 text-center">
        <h1 className="text-[clamp(1.875rem,4vw,2.375rem)] font-extrabold leading-[1.15] text-ink">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-body">
          The link may be incorrect, or the page has been removed.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Back to home</Button>
        </div>
      </Container>
    </div>
  );
}
