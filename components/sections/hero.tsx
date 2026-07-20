import { VideoEmbed } from "@/components/video-embed";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuredVideo, moreVideos } from "@/content/videos";
import { SHOPIFY_APP_URL } from "@/lib/site";

const trustMarkers = ["Printed in Canada", "No minimums", "Ground shipping in 1–5 days"];

function SwooshUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-3 w-full text-brand"
    >
      <path
        d="M2 11 C 60 2, 160 2, 218 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-ink to-ink-deep text-white">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-red-300">
            Print-on-demand dropshipping · Canada
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
            Launch your{" "}
            <span className="relative inline-block">
              print-on-demand brand.
              <SwooshUnderline />
            </span>{" "}
            We print, pack &amp; ship.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-300">
            DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app — no
            inventory, no tech headaches, wholesale pricing on t-shirts, hoodies, DTF and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={SHOPIFY_APP_URL}>Get started</ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline-dark">
              See how it works
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {trustMarkers.map((marker) => (
              <li key={marker} className="flex items-center gap-2 text-sm text-zinc-300">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                {marker}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/20">
          <VideoEmbed id={featuredVideo.id} title={featuredVideo.title} priority />
        </div>
      </Container>
      <Container className="pb-16 sm:pb-20">
        <h2 className="sr-only">More from DropShipPOD</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {moreVideos.map((video) => (
            <li key={video.id} className="group">
              <VideoEmbed id={video.id} title={video.title} />
              <p className="mt-2 line-clamp-2 text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-200">
                {video.title}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
