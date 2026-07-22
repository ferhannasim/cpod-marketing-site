import Image from "next/image";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { RainbowBar } from "@/components/lander";
import { cn } from "@/lib/utils";
import type { RichBlock } from "@/content/home";

const heroWash =
  "radial-gradient(circle at 10% 0%, rgba(23,182,244,0.10), transparent 42%)," +
  "radial-gradient(circle at 90% 8%, rgba(236,0,140,0.07), transparent 38%)," +
  "linear-gradient(180deg, #ffffff 0%, #fafcfe 60%, #f7f9fc 100%)";

type RichSectionProps = {
  block: RichBlock;
  /** Tailwind background class for the section band. */
  scheme: string;
  /** Which side the image sits on when both an image and text are present. */
  imagePosition?: "left" | "right";
  /**
   * Heading tag to render `block.heading` as. Defaults to "h2". Pass "h1" for
   * the page's single top-level heading — the h1 section also gets the hero
   * treatment (brand wash + tricolor hairline + eyebrow).
   */
  headingLevel?: "h1" | "h2";
  /** Small uppercase label above the h1 (hero treatment only). */
  eyebrow?: string;
};

export function RichSection({
  block,
  scheme,
  imagePosition = "left",
  headingLevel = "h2",
  eyebrow,
}: RichSectionProps) {
  const HeadingTag = headingLevel;
  const isHero = headingLevel === "h1";
  const headingClasses = isHero
    ? "text-[clamp(2.125rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink"
    : "text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink";

  const image = block.image ? (
    <div
      className="overflow-hidden rounded-card border border-line shadow-[0_24px_60px_-24px_rgba(16,24,40,0.2)]"
      key="image"
    >
      <Image
        src={block.image.src}
        alt={block.image.alt ?? ""}
        width={block.image.width}
        height={block.image.height}
        className="h-auto w-full"
        priority={isHero}
      />
    </div>
  ) : null;

  const text = (
    <div key="text">
      {isHero ? <RainbowBar className="mb-7" /> : null}
      {isHero && eyebrow ? (
        <div className="mb-4 text-xs font-semibold tracking-[0.12em] text-[#5b6473] uppercase">
          {eyebrow}
        </div>
      ) : null}
      {block.heading && <HeadingTag className={headingClasses}>{block.heading}</HeadingTag>}
      <div
        className={cn(
          "prose prose-neutral max-w-none text-body prose-p:leading-[1.75]",
          block.heading && "mt-5",
        )}
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
      {block.ctas && block.ctas.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-3">
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
    <section
      className={cn(scheme, isHero && "border-b border-line")}
      style={isHero ? { background: heroWash } : undefined}
    >
      <Container
        className={cn(
          "py-16 md:py-24",
          image && "grid gap-12 md:grid-cols-2 md:items-center",
        )}
      >
        {image ? (imagePosition === "left" ? [image, text] : [text, image]) : text}
      </Container>
    </section>
  );
}
