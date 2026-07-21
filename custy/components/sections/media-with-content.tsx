import Image from "next/image";
import { Container } from "@/components/container";
import type { home } from "@/content/home";

// Live section (media_with_content_C9HQTJ, media_position: "right"): stylized jumbo
// heading on the left, product screenshot on the right.
export function MediaWithContent({ media }: { media: typeof home.media }) {
  return (
    <section className="bg-scheme4-bg">
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:items-center md:py-16">
        <div className="text-right">
          <h2 className="text-4xl leading-[0.8] font-bold tracking-tight text-ink uppercase sm:text-6xl">
            {media.heading}
          </h2>
          {media.text && <p className="mt-4 text-body">{media.text}</p>}
        </div>
        <div className="overflow-hidden rounded-card">
          <Image
            src={media.image.src}
            alt={media.image.alt ?? ""}
            width={media.image.width}
            height={media.image.height}
            className="h-auto w-full"
          />
        </div>
      </Container>
    </section>
  );
}
