import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { VideoEmbed } from "@/components/video-embed";
import { allVideos } from "@/content/videos";

export const metadata: Metadata = {
  title: "Video Library",
  description:
    "Walkthroughs and guides on building a print-on-demand brand with DropShipPOD.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Watch and learn"
        title="Video Library"
        lede="Walkthroughs and guides on launching your print-on-demand brand."
      />
      <Container className="py-10 sm:py-12">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allVideos.map((video) => (
            <li key={video.id}>
              <VideoEmbed id={video.id} title={video.title} />
              <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
