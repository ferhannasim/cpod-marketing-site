import { cn } from "@/lib/utils";

export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}
