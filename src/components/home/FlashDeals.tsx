"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "~/components/product/ProductCard";
import { getFlashDeals } from "~/data/products";
import { Button } from "~/components/ui/button";

export function FlashDeals() {
  const t = useTranslations("flashDeals");
  const products = getFlashDeals();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -w : w,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-gradient-to-r from-brand-hot/5 via-brand-primary/10 to-brand-accent/5 blur-3xl" />
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-brand-hot">
              <Flame className="h-3.5 w-3.5" /> flash
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-xl text-text-muted">{t("subtitle")}</p>
            <p className="mt-1 max-w-xl text-sm text-text-muted">{t("description")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="cursor-pointer rounded-full border border-border-subtle bg-card/60 p-2.5 transition-colors hover:bg-card"
              aria-label="prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="cursor-pointer rounded-full border border-border-subtle bg-card/60 p-2.5 transition-colors hover:bg-card"
              aria-label="next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link href="/ofertas" className="hidden md:block">
              <Button variant="ghost" size="default">{t("cta")} →</Button>
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4"
        >
          {products.map((p) => (
            <motion.div
              key={p.id}
              className="w-[260px] shrink-0 snap-start md:w-[290px]"
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
