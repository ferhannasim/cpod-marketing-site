import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * A single call-to-action link used across the lander family (hero + CTA band).
 */
export type CtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "light" | "outline";
};

const ctaVariants: Record<NonNullable<CtaLink["variant"]>, string> = {
  // Solid ink pill — the primary action on light surfaces
  primary: "bg-ink text-white shadow-sm hover:bg-black",
  // White pill with hairline border
  secondary: "border border-line bg-white text-ink hover:border-[#98a2b3]",
  // Solid white pill on the dark CTA band
  light: "bg-white text-ink hover:bg-[#eef1f6]",
  // Translucent outline on the dark CTA band
  outline: "border border-white/25 bg-white/[0.06] text-white hover:bg-white/10",
};

/**
 * Renders a pill CTA anchor. External links (http…) open in a new tab with a
 * safe rel; internal links use next/link. No commerce logic.
 */
export function LanderCta({ label, href, variant = "primary" }: CtaLink) {
  const className = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold no-underline transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:outline-none max-md:w-full",
    ctaVariants[variant],
  );
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

/**
 * Centered content column shared by the lander pages: 1200px, gutter padding.
 * Sections that need a full-bleed band render their own background and nest
 * this column inside it.
 */
export function Lander({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto box-border max-w-[1200px] px-5 max-md:px-4", className)}>
      {children}
    </div>
  );
}
