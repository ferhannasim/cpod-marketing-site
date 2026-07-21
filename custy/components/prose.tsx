import { Container } from "@/components/container";

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-12">
      <div className="prose prose-neutral mx-auto max-w-[720px]">{children}</div>
    </Container>
  );
}
