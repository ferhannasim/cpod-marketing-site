"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Elements a Reveal may render as. Keeps the animation from forcing an extra
 * wrapper around content whose own tag is load-bearing (a grid `ol`, say). */
type RevealTag = "div" | "ol" | "ul" | "li" | "section";

/**
 * How the content arrives. Pick the one that suits what the band contains:
 * `left`/`right` for a two-column row, where each half sliding in from its own
 * side echoes the layout; `zoom` for a card or badge that should land rather
 * than drift; `fade` where any movement would fight with the content; `up`
 * (the default) for ordinary stacked copy.
 *
 * Offsets stay small on purpose — a long travel distance reads as sluggish,
 * and horizontal travel risks widening the page before it settles.
 */
export type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

const restingState: Record<RevealVariant, string> = {
  up: "translate-y-6 opacity-0",
  left: "-translate-x-8 opacity-0",
  right: "translate-x-8 opacity-0",
  zoom: "scale-95 opacity-0",
  fade: "opacity-0",
};

export type RevealProps = {
  className?: string;
  children: React.ReactNode;
  /** Tag to render. Defaults to `div`. */
  as?: RevealTag;
  /** Direction the content travels in from. Defaults to `up`. */
  variant?: RevealVariant;
  /**
   * Seconds of delay before this element animates, for staggering siblings.
   * Kept small — a long stagger reads as lag rather than polish.
   */
  delay?: number;
};

/** Animates content in on first viewport entry. Renders visible immediately
 * when IntersectionObserver is unavailable (SSR/jsdom) or reduced motion is
 * set. */
export function Reveal({
  className,
  children,
  as: Tag = "div",
  variant = "up",
  delay,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setShown(true)),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        "transition-all duration-700 ease-out",
        shown
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : restingState[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
