import Link from "next/link";
import type { NavLink } from "@/lib/nav";

/** Renders a nav entry as an internal <Link> or an external <a>. */
export function NavItemLink({
  link,
  className,
  onClick,
}: {
  link: NavLink;
  className?: string;
  onClick?: () => void;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}
