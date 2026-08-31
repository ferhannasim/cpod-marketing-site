import { cn } from "@/lib/utils";
import { IconTile } from "./icons";

export type CardItem = {
  /** Semantic icon name resolved by components/lander/icons.tsx. */
  icon?: string;
  title: string;
  /** One or more body paragraphs (about-us prose cards carry two). */
  text: string | string[];
};

/**
 * Responsive column classes: single column on mobile, two columns in the mid
 * range, and the requested count on wide screens.
 *
 * The wide step must use the named `xl:` breakpoint rather than an arbitrary
 * `min-[1200px]:` one. Tailwind v4 emits arbitrary min-width variants *before*
 * the named breakpoints, so above 1200px both queries matched and the later
 * `md:grid-cols-2` rule won the cascade — every grid here silently stayed at
 * two columns.
 */
const columnClasses: Record<number, string> = {
  1: "",
  2: "xl:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
  5: "md:grid-cols-2 xl:grid-cols-5",
};

export type CardGridProps = {
  items: CardItem[];
  /** Columns above 1200px (default 3). */
  columns?: number;
  /** Left-aligned feature cards (default) vs centered audience/why cards. */
  align?: "left" | "center";
  className?: string;
};

/**
 * A grid of highlight cards: white, hairline-bordered, with a brand-tinted
 * icon tile that cycles through the three process-ink tints by position, and a
 * quiet hover lift.
 */
export function CardGrid({ items, columns = 3, align = "left", className }: CardGridProps) {
  const centered = align === "center";

  return (
    <div className={cn("grid gap-5", columnClasses[columns] ?? columnClasses[3], className)}>
      {items.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]",
            centered && "text-center",
          )}
        >
          {item.icon ? (
            <IconTile name={item.icon} tint={index} className={cn("mb-5", centered && "mx-auto")} />
          ) : null}
          <h3 className="text-[17px] leading-snug font-bold text-ink">{item.title}</h3>
          {(Array.isArray(item.text) ? item.text : [item.text]).map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="mt-2.5 text-[15px] leading-[1.6] text-body"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
