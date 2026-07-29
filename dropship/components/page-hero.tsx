import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { DuoBar, Eyebrow } from "@/components/lander/icons";
import { heroWash } from "@/components/lander/hero";

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
  const isQuiet = variant === "quiet";
  return (
    <div
      className={cn("border-b border-zinc-200", isQuiet && "bg-gradient-to-b from-ink-tint to-white")}
      style={isQuiet ? undefined : { background: heroWash }}
    >
      <Container className={isQuiet ? "py-10" : "py-12 sm:py-16"}>
        {!isQuiet ? <DuoBar className="mb-6" /> : null}
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1
          className={cn(
            "mt-2 font-display font-bold tracking-tight text-ink",
            isQuiet ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl",
          )}
        >
          {title}
        </h1>
        {lede ? <p className="mt-4 max-w-2xl text-lg text-zinc-600">{lede}</p> : null}
      </Container>
    </div>
  );
}
