import { TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { PageHero } from "@/components/page-hero";

export function PageShell({
  eyebrow,
  title,
  lede,
  alert,
  variant = "default",
  proseClassName,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  alert?: string;
  variant?: "default" | "quiet";
  proseClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} variant={variant} />
      {alert ? (
        <Container className="mt-8">
          <div
            role="note"
            className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {alert}
          </div>
        </Container>
      ) : null}
      <Container className="py-10 sm:py-12">
        <Prose className={proseClassName}>{children}</Prose>
      </Container>
    </>
  );
}
