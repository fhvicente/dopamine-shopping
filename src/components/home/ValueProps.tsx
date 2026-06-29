"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ValueProps() {
  const t = useTranslations("valueProps");
  const keys = ["real", "drivers", "checkout", "tracking"] as const;

  return (
    <section className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {keys.map((k, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/60 p-5 transition-all hover:border-brand-primary/40 hover:shadow-[0_10px_40px_-20px_rgba(124,58,237,0.5)]"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-primary/10 blur-2xl transition group-hover:bg-brand-primary/20" />
            <div className="relative">
              <div className="mb-3 text-3xl md:text-4xl">{t(`items.${k}.icon`)}</div>
              <h3 className="font-display text-base font-bold leading-tight md:text-lg">
                {t(`items.${k}.title`)}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {t(`items.${k}.description`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
