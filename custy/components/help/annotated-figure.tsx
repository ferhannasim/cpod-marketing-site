import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { AnnotatedFigure } from "@/content/help";
import { HelpInline } from "./help-inline";

/**
 * Docs screenshots must stay pixel-sharp (UI text + red markers). Use the
 * original file; do not let next/image downscale via a narrow `sizes` hint.
 */
export function AnnotatedFigure({ figure }: { figure: AnnotatedFigure }) {
  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
      <a
        href={figure.src}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full"
        aria-label={`Open full-size screenshot: ${figure.caption}`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          unoptimized
          quality={100}
          className="h-auto w-full max-w-none bg-[#f3f6fa] object-contain"
          sizes="100vw"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[12px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Full size
          <ExternalLink className="h-3 w-3" aria-hidden />
        </span>
      </a>
      <figcaption className="border-t border-line px-5 py-4 text-[14px] leading-6 text-body">
        <HelpInline text={figure.caption} />
      </figcaption>
      {figure.markers.length > 0 ? (
        <ol className="space-y-4 border-t border-line bg-lander-light px-5 py-5 md:px-6 md:py-6">
          {figure.markers.map((marker) => (
            <li key={marker.n} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e11d48] text-[12px] font-bold text-white">
                {marker.n}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[15px] font-semibold text-ink">
                  <HelpInline text={marker.title} />
                </p>
                <p className="mt-1 text-[14.5px] leading-6 text-body">
                  <HelpInline text={marker.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}
