import Image from "next/image";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import type { RichBlock } from "@/content/home";

type RichSectionProps = {
  block: RichBlock;
  /** Tailwind background class for the live section's color-scheme-N. */
  scheme: string;
  /** Which side the image sits on when both an image and text are present. */
  imagePosition?: "left" | "right";
};

export function RichSection({ block, scheme, imagePosition = "left" }: RichSectionProps) {
  const image = block.image ? (
    <div className="overflow-hidden rounded-card" key="image">
      <Image
        src={block.image.src}
        alt={block.image.alt ?? ""}
        width={block.image.width}
        height={block.image.height}
        className="h-auto w-full"
      />
    </div>
  ) : null;

  const text = (
    <div key="text">
      {block.heading && (
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{block.heading}</h2>
      )}
      <div
        className={cn("prose prose-neutral max-w-none text-body", block.heading && "mt-4")}
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
      {block.ctas && block.ctas.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {block.ctas.map((cta) => (
            <Button key={cta.label} href={cta.href} external={cta.external}>
              {cta.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className={scheme}>
      <Container
        className={cn(
          "py-14 md:py-20",
          image && "grid gap-10 md:grid-cols-2 md:items-center",
        )}
      >
        {image ? (imagePosition === "left" ? [image, text] : [text, image]) : text}
      </Container>
    </section>
  );
}
