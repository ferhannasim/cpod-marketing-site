import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  lede,
  variant = "default",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  variant?: "default" | "quiet";
}) {
  return (
    <div className="border-b border-zinc-200 bg-gradient-to-b from-ink-tint to-white">
      <Container className={variant === "quiet" ? "py-10" : "py-12 sm:py-16"}>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
        ) : null}
        <h1
          className={cn(
            "mt-2 font-display font-bold tracking-tight text-ink",
            variant === "quiet" ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl",
          )}
        >
          {title}
        </h1>
        {lede ? <p className="mt-4 max-w-2xl text-lg text-zinc-600">{lede}</p> : null}
      </Container>
    </div>
  );
}
