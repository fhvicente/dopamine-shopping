"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionTitle } from "~/components/ui/section";
import { CategoryFilter, type FilterValue } from "~/components/product/CategoryFilter";
import { ProductGrid } from "~/components/product/ProductGrid";
import { products as allProducts, getProductsByCategory } from "~/data/products";

export function Catalog() {
  const t = useTranslations("catalog");
  const [filter, setFilter] = useState<FilterValue>("all");
  const list = useMemo(
    () => (filter === "all" ? allProducts : getProductsByCategory(filter)),
    [filter],
  );

  return (
    <Section id="catalog">
      <SectionTitle
        eyebrow="✦ catálogo"
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="mb-8">
        <CategoryFilter value={filter} onChange={setFilter} />
      </div>
      <ProductGrid products={list} />
    </Section>
  );
}
