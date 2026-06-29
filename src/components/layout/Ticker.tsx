"use client";

import { useTranslations } from "next-intl";

export function Ticker() {
  const t = useTranslations("ticker");
  const items = t.raw("items") as string[];
  const doubled = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-b border-border-subtle bg-gradient-to-r from-brand-primary-deep via-brand-primary to-brand-primary-deep py-2.5">
      <div className="flex w-max animate-[ticker_50s_linear_infinite] gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 font-mono text-xs font-medium tracking-wider text-white/90"
          >
            <span className="text-brand-accent">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
