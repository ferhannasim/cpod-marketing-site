import { VideoEmbed } from "@/components/video-embed";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuredVideo, moreVideos } from "@/content/videos";
import { SHOPIFY_APP_URL } from "@/lib/site";

export function Hero() {
  return (
    <div className="bg-surface">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 sm:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Print-on-demand dropshipping · Canada
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Launch your print-on-demand brand. We print, pack &amp; ship.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600">
            DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app — no
            inventory, no tech headaches, wholesale pricing on t-shirts, hoodies, DTF and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={SHOPIFY_APP_URL}>Get started</ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline">
              See how it works
            </ButtonLink>
          </div>
        </div>
        <VideoEmbed id={featuredVideo.id} title={featuredVideo.title} priority />
      </Container>
      <Container className="pb-16">
        <h2 className="sr-only">More from DropShipPOD</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {moreVideos.map((video) => (
            <li key={video.id}>
              <VideoEmbed id={video.id} title={video.title} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
