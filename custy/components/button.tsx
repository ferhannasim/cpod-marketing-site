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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:outline-none",
    variant === "primary" && "bg-ink text-white shadow-sm hover:bg-black",
    variant === "secondary" && "border border-line bg-white text-ink hover:border-[#98a2b3]",
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
