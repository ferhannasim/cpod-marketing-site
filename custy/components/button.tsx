import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", external, className, children }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors",
    variant === "primary" &&
      "rounded-pill bg-ink text-white hover:bg-black",
    variant === "secondary" &&
      "rounded-secondary border border-line text-ink hover:border-ink",
    className,
  );
  if (external) {
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
