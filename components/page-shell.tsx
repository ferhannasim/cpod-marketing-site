import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";

export function PageShell({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-lg text-zinc-600">{lede}</p> : null}
      <Prose className="mt-8">{children}</Prose>
    </Container>
  );
}
