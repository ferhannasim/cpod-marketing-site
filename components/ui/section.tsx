import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wider",
            dark ? "text-red-300" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
