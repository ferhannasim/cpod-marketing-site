import Link from "next/link";
import { AlertTriangle, Lightbulb } from "lucide-react";
import type { HelpCallout, HelpLink } from "@/content/help/types";
import { cn } from "@/lib/utils";
import { HelpInline } from "./help-inline";

const calloutStyles: Record<
  HelpCallout["variant"],
  { wrap: string; icon: string; Icon: typeof AlertTriangle }
> = {
  important: {
    wrap: "border-[#f0d7a8] bg-[#fff8eb]",
    icon: "text-[#8a6100]",
    Icon: AlertTriangle,
  },
  tip: {
    wrap: "border-[#cfe8f6] bg-[#f3faff]",
    icon: "text-[#0b7fad]",
    Icon: Lightbulb,
  },
};

export function HelpCalloutBox({ callout }: { callout: HelpCallout }) {
  const style = calloutStyles[callout.variant];
  const Icon = style.Icon;

  return (
    <aside className={cn("rounded-2xl border p-5 md:p-6", style.wrap)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", style.icon)} aria-hidden />
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-ink">{callout.title}</p>
          {callout.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-2 text-[14.5px] leading-6 text-body">
              <HelpInline text={paragraph} />
            </p>
          ))}
          {callout.bullets && callout.bullets.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {callout.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-[14.5px] leading-6 text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                  <span>
                    <HelpInline text={bullet} />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {callout.link ? (
            <p className="mt-3">
              <Link
                href={callout.link.href}
                className="text-[14.5px] font-semibold text-[#0b7fad] underline-offset-2 hover:underline"
              >
                {callout.link.label}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

export function HelpLinkList({ links }: { links: HelpLink[] }) {
  if (links.length === 0) return null;
  return (
    <ul className="mt-4 space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-[15px] font-semibold text-[#0b7fad] underline-offset-2 hover:underline"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
