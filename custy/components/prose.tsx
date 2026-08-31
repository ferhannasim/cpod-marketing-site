import { Container } from "@/components/container";

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-12">
      <div className="prose prose-neutral mx-auto max-w-[720px] text-[15.5px] text-body prose-p:leading-[1.65] prose-li:leading-[1.65] prose-headings:font-display prose-headings:text-ink prose-strong:text-ink prose-h1:text-[clamp(1.875rem,4vw,2.375rem)] prose-h1:leading-[1.15]">
        {children}
      </div>
    </Container>
  );
}
