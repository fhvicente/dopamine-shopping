"use client";

import { useTranslations } from "next-intl";
import { Section, SectionTitle } from "~/components/ui/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <Section>
      <SectionTitle eyebrow="✦ FAQ" title={t("title")} align="center" />
      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="mx-auto flex max-w-3xl flex-col gap-3"
      >
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
