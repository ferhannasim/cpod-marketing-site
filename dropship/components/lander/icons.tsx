import {
  BadgePercent, CalendarDays, ChartColumn, Church, CircleDollarSign, Clock, Coffee,
  CreditCard, Download, Eye, FileCheck, Gift, GraduationCap, HandHeart, Heart, Layers,
  Mail, MapPin, Medal, Package, Palette, Percent, Printer, RefreshCw, Shirt, ShieldCheck,
  Siren, Sparkles, Store, TrendingUp, Trophy, Truck, Upload, Users, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LucideIcon = typeof Truck;

/** Semantic icon vocabulary for CardItem.icon and friends — content never imports React components. */
const icons: Record<string, LucideIcon> = {
  store: Store, shirt: Shirt, coffee: Coffee, package: Package, truck: Truck,
  printer: Printer, layers: Layers, palette: Palette, percent: Percent,
  "circle-dollar-sign": CircleDollarSign, "trending-up": TrendingUp,
  "chart-column": ChartColumn, refresh: RefreshCw, zap: Zap, "credit-card": CreditCard,
  "file-check": FileCheck, download: Download, "shield-check": ShieldCheck, clock: Clock,
  users: Users, sparkles: Sparkles, "badge-percent": BadgePercent, upload: Upload,
  mail: Mail, eye: Eye, heart: Heart, medal: Medal, trophy: Trophy,
  "graduation-cap": GraduationCap, church: Church, "hand-heart": HandHeart, siren: Siren,
  calendar: CalendarDays, "map-pin": MapPin, gift: Gift,
};

export const iconNames = Object.keys(icons);

/** Crimson / navy tint cycle — DropShipPOD's two-ink analogue of custy's tricolor tiles. */
const tileTints = ["bg-brand-tint text-brand-dark", "bg-ink-tint text-ink-soft"];

export type IconTileProps = { name?: string; tint?: number; className?: string };

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

/** Crimson+navy twin-dot registration mark + small-caps label above section titles. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      </span>
      <span className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">
        {children}
      </span>
    </div>
  );
}

/** The crimson-to-navy hairline — DropShipPOD's page-level brand mark, once per page (hero). */
export function DuoBar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#cb1836_0%,#141f56_100%)]",
        className,
      )}
    />
  );
}
