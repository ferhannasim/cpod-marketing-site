"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faqs/types";

export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="divide-y divide-zinc-200">
      {items.map((item, index) => (
        <AccordionPrimitive.Item key={index} value={`item-${index}`}>
          <AccordionPrimitive.Header asChild>
            <h3>
              <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 rounded-lg px-3 -mx-3 py-4 text-left font-semibold text-ink transition-colors hover:bg-surface">
                {item.question}
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-data-[state=open]:rotate-180"
                />
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="prose prose-zinc max-w-none pb-4 text-sm">
            {item.answer}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
