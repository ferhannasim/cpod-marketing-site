"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Elements a Reveal may render as. Keeps the animation from forcing an extra
 * wrapper around content whose own tag is load-bearing (a grid `ol`, say). */
type RevealTag = "div" | "ol" | "ul" | "section";

export type RevealProps = {
  className?: string;
  children: React.ReactNode;
  /** Tag to render. Defaults to `div`. */
  as?: RevealTag;
  /**
   * Seconds of delay before this element animates, for staggering siblings.
   * Kept small — a long stagger reads as lag rather than polish.
   */
  delay?: number;
};

/** Fades content up on first viewport entry. Renders visible immediately when
 * IntersectionObserver is unavailable (SSR/jsdom) or reduced motion is set. */
export function Reveal({ className, children, as: Tag = "div", delay }: RevealProps) {
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
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
