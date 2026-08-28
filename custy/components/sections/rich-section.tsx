import Image from "next/image";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { RainbowBar } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { RichBlock } from "@/content/home";

/** Reveal's non-animating twin, so the hero can share one call shape with the
 * scroll-revealed bands. Declared at module scope — defining it inline would
 * remount the subtree on every render. */
function Plain({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

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
    ? "text-[clamp(2.25rem,4.8vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink"
    : "text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink";

  // Splitting on the highlight keeps the h1's accessible name intact — the
  // accent lives on an inline span, not a separate heading.
  const headingParts =
    isHero && block.heading && block.highlight && block.heading.includes(block.highlight)
      ? block.heading.split(block.highlight)
      : null;

  // The hero is above the fold and holds the LCP image, so it renders solid
  // rather than fading in — matching LanderHero, which doesn't animate either.
  // Every other RichSection band scroll-reveals like the rest of the site.
  const Block = isHero ? Plain : Reveal;

  const image = block.image ? (
    <Block
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
    </Block>
  ) : null;

  const text = (
    <Block key="text">
      {isHero ? <RainbowBar className="mb-7" /> : null}
      {isHero && eyebrow ? (
        <div className="mb-4 text-[13px] font-semibold tracking-widest text-muted uppercase">
          {eyebrow}
        </div>
      ) : null}
      {block.heading && (
        <HeadingTag className={headingClasses}>
          {headingParts ? (
            <>
              {headingParts[0]}
              <span className="text-accent-pink">{block.highlight}</span>
              {headingParts.slice(1).join(block.highlight)}
            </>
          ) : (
            block.heading
          )}
        </HeadingTag>
      )}
      {isHero && block.tagline ? (
        <p className="mt-3 max-w-[38ch] text-[clamp(1.0625rem,2vw,1.375rem)] font-display font-bold tracking-[-0.01em] text-ink/75">
          {block.tagline}
        </p>
      ) : null}
      <div
        className={cn(
          "prose prose-neutral max-w-none text-[16px] text-body prose-p:leading-[1.65] prose-strong:text-ink",
          block.heading && (isHero ? "mt-5 max-w-140" : "mt-5"),
        )}
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
      {block.ctas && block.ctas.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-3">
          {block.ctas.map((cta) => (
            <Button key={cta.label} href={cta.href} external={cta.external} variant={cta.variant}>
              {cta.label}
            </Button>
          ))}
        </div>
      )}
    </Block>
  );

  return (
    <section className={cn(isHero ? "bg-wash-hero border-b border-line" : scheme)}>
      <Container
        className={cn(
          isHero ? "py-20 md:py-28" : "py-16 md:py-24",
          image && "grid gap-12 md:items-center",
          image && (isHero ? "md:grid-cols-[1.05fr_0.95fr] md:gap-16" : "md:grid-cols-2"),
        )}
      >
        {image ? (imagePosition === "left" ? [image, text] : [text, image]) : text}
      </Container>
    </section>
  );
}
