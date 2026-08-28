import Image from "next/image";
import { Container } from "@/components/container";
import { Eyebrow, RainbowBar } from "@/components/lander";
import { Reveal } from "@/components/reveal";
import { home, type FeatureRow } from "@/content/home";
import { cn } from "@/lib/utils";

/** The process-ink tint cycle, matching IconTile and the how-it-works band. */
const tints = ["text-[#0b7fad]", "text-[#c2006f]", "text-[#8a6100]"];

function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={cn("mt-0.5 h-5 w-5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="8.25" opacity="0.35" />
      <path d="m6.5 10.25 2.5 2.5 4.5-5" />
    </svg>
  );
}

function Row({ row, index }: { row: FeatureRow; index: number }) {
  // Alternate sides so the eye zig-zags down the band instead of reading three
  // identical rows. Below `md` both cells stack, image first.
  const imageOnRight = index % 2 === 0;

  return (
    <Reveal className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">
      {/* The illustrations are transparent PNG-style WebPs, so they sit
          straight on the section band with no panel behind them. */}
      <div className={cn(imageOnRight ? "md:order-2" : "md:order-1")}>
        <Image
          src={row.image.src}
          width={row.image.width}
          height={row.image.height}
          alt={row.image.alt ?? ""}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </div>
      <div className={cn(imageOnRight ? "md:order-1" : "md:order-2")}>
        <h3 className="text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.2] font-extrabold tracking-[-0.02em] text-ink">
          {row.title}
        </h3>
        <p className="mt-4 text-[16px] leading-[1.65] text-body">{row.text}</p>
        <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
          {row.points.map((point) => (
            <li key={point} className="flex gap-3 text-[15px] leading-[1.55] text-body">
              <CheckMark className={tints[index % tints.length]} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function FeatureHighlights({
  scheme = "bg-wash",
  id,
}: {
  scheme?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(scheme, id && "scroll-mt-20")}>
      <Container className="py-16 md:py-24">
        <Reveal className="mx-auto mb-14 max-w-[760px] text-center">
          <RainbowBar className="mx-auto mb-7" />
          <Eyebrow className="mb-4">Features</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
            {home.features.title}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-body md:text-[16.5px]">
            {home.features.lead}
          </p>
        </Reveal>

        <div className="flex flex-col gap-16 md:gap-24">
          {home.features.rows.map((row, index) => (
            <Row key={row.title} row={row} index={index} />
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-14 md:mt-24">
          {/* A 2x2 of illustrated cards. Not CardGrid: these carry an image
              rather than an icon tile, and that component's CardItem has no
              image slot. */}
          <div className="grid gap-6 md:grid-cols-2">
            {home.features.supporting.map((card, index) => (
              <Reveal
                key={card.title}
                delay={(index % 2) * 0.1}
                className="overflow-hidden rounded-2xl border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]"
              >
                <Image
                  src={card.image.src}
                  width={card.image.width}
                  height={card.image.height}
                  alt={card.image.alt ?? ""}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <div className="p-6 md:p-7">
                  <h3 className="text-[18px] leading-snug font-bold text-ink">{card.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-body">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
