import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { HelpArticle } from "@/content/help";
import { articleHref } from "@/content/help";

export function HelpPager({
  previous,
  next,
}: {
  previous: HelpArticle | null;
  next: HelpArticle | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Article pagination"
      className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={articleHref(previous)}
          className="group rounded-2xl border border-line bg-lander-light p-5 transition-colors hover:border-[#b8c1ce] hover:bg-white"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-muted uppercase">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            Previous
          </span>
          <span className="mt-2 block text-[16px] font-semibold text-ink">{previous.title}</span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={articleHref(next)}
          className="group rounded-2xl border border-line bg-lander-light p-5 text-right transition-colors hover:border-[#b8c1ce] hover:bg-white sm:justify-self-end"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest text-muted uppercase">
            Next
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
          <span className="mt-2 block text-[16px] font-semibold text-ink">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
