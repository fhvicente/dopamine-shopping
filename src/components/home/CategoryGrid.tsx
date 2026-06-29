"use client";

import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import { motion } from "framer-motion";
import { categoriesMeta, getProductsByCategory } from "~/data/products";
import { Section, SectionTitle } from "~/components/ui/section";
import { ArrowRight } from "lucide-react";

export function CategoryGrid() {
  const t = useTranslations("categories");

  return (
    <Section>
      <SectionTitle
        eyebrow="✦ categorias"
        title={t("title")}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {categoriesMeta.map((cat, i) => {
          const count = getProductsByCategory(cat.key).length;
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/catalogo?cat=${cat.key}` as never}
                className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br ${cat.gradient} p-5 transition-all hover:scale-[1.02] hover:border-brand-primary/40 md:p-6`}
              >
                <span className="text-4xl md:text-5xl">{cat.emoji}</span>
                <div>
                  <h3 className="font-display text-xl font-bold md:text-2xl">
                    {t(cat.key)}
                  </h3>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-text-muted">
                      {count * 47} {t("products")}
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
