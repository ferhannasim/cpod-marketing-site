import { cn } from "@/lib/utils";

export type CardItem = {
  /** Emoji or short glyph. Rendered in a gradient tile (left) or bare (center). */
  icon?: string;
  title: string;
  /** One or more body paragraphs (about-us prose cards carry two). */
  text: string | string[];
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
    <div className={cn("grid gap-4", columnClasses[columns] ?? columnClasses[3], className)}>
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "rounded-lander border border-lander-border bg-[linear-gradient(180deg,#ffffff_0%,#fafcff_100%)] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_28px_rgba(0,0,0,0.06)]",
            centered && "text-center",
          )}
        >
          {item.icon ? (
            centered ? (
              <div className="mb-2.5 text-[24px]">{item.icon}</div>
            ) : (
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-secondary bg-[linear-gradient(135deg,rgba(23,182,244,0.12),rgba(236,0,140,0.1))] text-[22px]">
                {item.icon}
              </div>
            )
          ) : null}
          <h3 className="mb-2.5 text-[17px] leading-snug text-lander-dark">{item.title}</h3>
          {(Array.isArray(item.text) ? item.text : [item.text]).map((paragraph, index) => (
            <p
              key={index}
              className="mb-3 text-[15px] leading-relaxed text-lander-text last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
