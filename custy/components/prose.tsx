import { Container } from "@/components/container";

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-12">
      <div className="prose prose-neutral mx-auto max-w-[720px] text-[15.5px] prose-p:leading-relaxed prose-headings:text-ink prose-h1:text-[clamp(1.875rem,4vw,2.375rem)] prose-h1:leading-[1.15]">
        {children}
      </div>
    </Container>
  );
}
