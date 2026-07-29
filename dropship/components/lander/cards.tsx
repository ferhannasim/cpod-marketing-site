import { cn } from "@/lib/utils";
import { IconTile } from "./icons";

export type CardItem = { icon?: string; title: string; text: string | string[] };

const columnClasses: Record<number, string> = {
  1: "",
  2: "min-[1200px]:grid-cols-2",
  3: "md:grid-cols-2 min-[1200px]:grid-cols-3",
  4: "md:grid-cols-2 min-[1200px]:grid-cols-4",
};

export type CardGridProps = { items: CardItem[]; columns?: number; align?: "left" | "center"; className?: string };

export function CardGrid({ items, columns = 3, align = "left", className }: CardGridProps) {
  const centered = align === "center";
  return (
    <div className={cn("grid gap-5", columnClasses[columns] ?? columnClasses[3], className)}>
      {items.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_16px_40px_-12px_rgba(20,31,86,0.16)]",
            centered && "text-center",
          )}
        >
          {item.icon ? <IconTile name={item.icon} tint={index} className={cn("mb-5", centered && "mx-auto")} /> : null}
          <h3 className="text-base leading-snug font-semibold text-ink">{item.title}</h3>
          {(Array.isArray(item.text) ? item.text : [item.text]).map((paragraph, i) => (
            <p key={i} className="mt-2.5 text-[15px] leading-[1.65] text-zinc-600">{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
