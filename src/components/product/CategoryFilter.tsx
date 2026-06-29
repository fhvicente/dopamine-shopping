"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { categoriesMeta, type Category } from "~/data/products";

export type FilterValue = Category | "all";

export function CategoryFilter({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const t = useTranslations("catalog");
  const cat = useTranslations("categories");

  const tabs: { key: FilterValue; label: string; emoji?: string }[] = [
    { key: "all", label: t("all"), emoji: "✨" },
    ...categoriesMeta.map((c) => ({
      key: c.key,
      label: cat(c.key),
      emoji: c.emoji,
    })),
  ];

  return (
    <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
      {tabs.map((tab) => {
        const active = tab.key === value;
        return (
          <button
            type="button"
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={cn(
              "relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition",
              active
                ? "text-white"
                : "border border-border-subtle bg-card/60 text-text-muted hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="filter-active"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-deep shadow-[0_0_20px_-4px_rgba(124,58,237,0.6)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
