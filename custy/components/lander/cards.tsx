import { cn } from "@/lib/utils";

export type CardItem = {
  /** Emoji or short glyph. Rendered in a gradient tile (left) or bare (center). */
  icon?: string;
  title: string;
  text: string;
};

/**
 * Responsive column classes matching the source grids: single column on mobile,
 * two columns in the mid range, and the requested count above 1200px — the
 * breakpoints used by `.custy-feature-grid`, `.custy-perfect-for`,
 * `.custy-why-grid`, and `.custy-two-col`.
 */
const columnClasses: Record<number, string> = {
  1: "",
  2: "min-[1200px]:grid-cols-2",
  3: "md:grid-cols-2 min-[1200px]:grid-cols-3",
  4: "md:grid-cols-2 min-[1200px]:grid-cols-4",
  5: "md:grid-cols-2 min-[1200px]:grid-cols-5",
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
 * A grid of highlight cards (`.custy-feature-card` / `.custy-audience-card` /
 * `.custy-why-card`): rounded, bordered cards with a hover lift. Left alignment
 * renders the icon in the gradient tile; centered alignment renders a bare
 * oversized glyph.
 */
export function CardGrid({ items, columns = 3, align = "left", className }: CardGridProps) {
  const centered = align === "center";

  return (
    <div className={cn("grid gap-[22px]", columnClasses[columns] ?? columnClasses[3], className)}>
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "rounded-[22px] border border-lander-border bg-[linear-gradient(180deg,#ffffff_0%,#fafcff_100%)] p-[28px_24px] shadow-[0_10px_24px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_28px_rgba(0,0,0,0.06)]",
            centered && "text-center",
          )}
        >
          {item.icon ? (
            centered ? (
              <div className="mb-3.5 text-[34px]">{item.icon}</div>
            ) : (
              <div className="mb-[18px] flex h-[58px] w-[58px] items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(23,182,244,0.12),rgba(236,0,140,0.1))] text-[28px]">
                {item.icon}
              </div>
            )
          ) : null}
          <h3
            className={cn(
              "mb-2.5 leading-[1.3] text-lander-dark",
              centered ? "text-xl" : "text-[22px]",
            )}
          >
            {item.title}
          </h3>
          <p className="text-[15px] leading-[1.75] text-lander-text">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
