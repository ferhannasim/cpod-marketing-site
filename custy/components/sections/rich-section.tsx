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
  /**
   * Heading tag to render `block.heading` as. Defaults to "h2". Pass "h1" for the
   * page's single top-level heading (used for the intro section, whose lead line is
   * the first real content on the live page since the Horizon hero section is
   * disabled) — live itself renders this text as a plain, h3-styled `<p>`, not a real
   * heading tag at all; promoting it to `h1` here is a deliberate a11y/SEO adaptation.
   */
  headingLevel?: "h1" | "h2";
};

export function RichSection({ block, scheme, imagePosition = "left", headingLevel = "h2" }: RichSectionProps) {
  const HeadingTag = headingLevel;
  const headingClasses =
    headingLevel === "h1"
      ? "text-3xl font-bold text-ink sm:text-4xl md:text-5xl"
      : "text-2xl font-bold text-ink sm:text-3xl";

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
      {block.heading && <HeadingTag className={headingClasses}>{block.heading}</HeadingTag>}
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
