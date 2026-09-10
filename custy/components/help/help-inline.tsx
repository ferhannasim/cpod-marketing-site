import { Fragment, type ReactNode } from "react";

/**
 * Renders help copy with light inline emphasis.
 * Use **double asterisks** around UI labels and key terms in content strings.
 */
export function HelpInline({ text }: { text: string }): ReactNode {
  if (!text.includes("**")) return text;

  const parts = text.split(/\*\*/);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index}>{part}</strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
