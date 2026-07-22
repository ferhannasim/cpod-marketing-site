import {
  Blocks,
  BadgePercent,
  CalendarCheck,
  ChartColumn,
  CircleDollarSign,
  Eye,
  FileCheck,
  Gift,
  Layers,
  Mail,
  MonitorSmartphone,
  Palette,
  Phone,
  Printer,
  Puzzle,
  Server,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Undo2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LucideIcon = typeof Palette;

/**
 * Semantic icon vocabulary for `CardItem.icon` and friends. Content files refer
 * to icons by these names so copy data never imports a React component.
 */
const icons: Record<string, LucideIcon> = {
  palette: Palette,
  layers: Layers,
  "circle-dollar-sign": CircleDollarSign,
  printer: Printer,
  puzzle: Puzzle,
  blocks: Blocks,
  zap: Zap,
  "trending-up": TrendingUp,
  "shopping-bag": ShoppingBag,
  shirt: Shirt,
  store: Store,
  gift: Gift,
  "chart-column": ChartColumn,
  sparkles: Sparkles,
  server: Server,
  monitor: MonitorSmartphone,
  "file-check": FileCheck,
  eye: Eye,
  "shield-check": ShieldCheck,
  "calendar-check": CalendarCheck,
  "badge-percent": BadgePercent,
  undo: Undo2,
  mail: Mail,
  phone: Phone,
};

/**
 * The three brand process-ink tints (cyan / magenta / amber). Tiles cycle
 * through them by grid position so a card row reads as one printed system.
 */
const tileTints = [
  "bg-[#e6f6fe] text-[#0b7fad]",
  "bg-[#fdeaf5] text-[#c2006f]",
  "bg-[#fff3d6] text-[#8a6100]",
];

export type IconTileProps = {
  /** Semantic icon name; unknown names render nothing. */
  name?: string;
  /** Index into the process-ink tint cycle (usually the card's grid index). */
  tint?: number;
  className?: string;
};

/**
 * A rounded, brand-tinted tile holding a stroke icon — the professional
 * replacement for the old decorative emoji glyphs.
 */
export function IconTile({ name, tint = 0, className }: IconTileProps) {
  const Icon = name ? icons[name] : undefined;
  if (!Icon) return null;
  return (
    <div
      data-icon={name}
      aria-hidden
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-xl",
        tileTints[tint % tileTints.length],
        className,
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} />
    </div>
  );
}

/**
 * The tri-dot registration mark + small-caps label used above section titles —
 * the section-level cousin of the hero's tricolor hairline.
 */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-pink" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" />
      </span>
      <span className="text-xs font-semibold tracking-[0.12em] text-[#5b6473] uppercase">
        {children}
      </span>
    </div>
  );
}
