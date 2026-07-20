import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900",
  "outline-dark": "border border-white/30 text-white hover:bg-white/10",
};

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button {...rest} className={buttonClasses(variant, className)} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = buttonClasses(variant, className);
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
