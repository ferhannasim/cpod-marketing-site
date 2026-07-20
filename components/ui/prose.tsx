import { cn } from "@/lib/utils";

export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none",
        "prose-headings:font-display prose-headings:text-ink",
        "prose-a:font-medium prose-a:text-brand hover:prose-a:text-brand-dark",
        "prose-img:rounded-xl prose-img:border prose-img:border-zinc-200",
        "prose-blockquote:border-l-brand",
        "prose-th:bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
