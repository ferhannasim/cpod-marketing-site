import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * A single call-to-action link used across the lander family (hero + CTA band).
 * `variant` maps to the four `.custy-btn-*` styles found in the scoped CSS.
 */
export type CtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "light" | "outline";
};

const ctaVariants: Record<NonNullable<CtaLink["variant"]>, string> = {
  // .custy-btn-primary — blue→indigo gradient pill (features/how/about heroes)
  primary:
    "bg-[linear-gradient(90deg,#17b6f4,#4285ff)] text-white shadow-[0_12px_25px_rgba(23,182,244,0.22)] hover:-translate-y-px hover:opacity-95",
  // .custy-btn-secondary — white with border
  secondary: "border border-lander-border bg-white text-lander-dark hover:bg-lander-light",
  // .custy-btn-light — solid white on dark CTA band
  light: "bg-white text-[#111827] hover:bg-[#f5f5f5]",
  // .custy-btn-outline — translucent outline on dark CTA band
  outline: "border border-white/20 bg-white/[0.06] text-white hover:bg-white/10",
};

/**
 * Renders a `.custy-btn` pill anchor. External links (http…) open in a new tab
 * with a safe rel; internal links use next/link. No commerce logic.
 */
export function LanderCta({ label, href, variant = "primary" }: CtaLink) {
  const className = cn(
    "inline-flex items-center justify-center rounded-[14px] px-5 py-2.5 text-sm font-bold no-underline transition-all duration-200 max-md:w-full",
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
 * Page wrapper for a lander (`.custy-*-page`): centered 1450px column with the
 * scoped padding. Vertical rhythm between sections comes from each section /
 * CTA band carrying its own top margin (faithful to the source CSS).
 */
export function Lander({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto box-border max-w-[1200px] px-5 pt-8 pb-14 font-sans text-lander-text max-md:px-4 max-md:pt-5 max-md:pb-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
