"use client";

import { useEffect, useRef, useState } from "react";
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
      <div className="from-brand-hot/5 via-brand-primary/10 to-brand-accent/5 absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-gradient-to-r blur-3xl" />
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-brand-hot inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase">
              <Flame className="h-3.5 w-3.5" /> flash
            </span>
            <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
              {t("title")}
            </h2>
            <p className="text-text-muted mt-2 max-w-xl">{t("subtitle")}</p>
            <p className="text-text-muted mt-1 max-w-xl text-sm">
              {t("description")}
            </p>
            <Countdown />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="border-border-subtle bg-card/60 hover:bg-card cursor-pointer rounded-full border p-2.5 transition-colors"
              aria-label="prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="border-border-subtle bg-card/60 hover:bg-card cursor-pointer rounded-full border p-2.5 transition-colors"
              aria-label="next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link href="/ofertas" className="hidden md:block">
              <Button variant="ghost" size="default">
                {t("cta")} →
              </Button>
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

// Live countdown to next midnight. ponytail: hydration-safe — renders nothing
// until the effect runs client-side, so no server/client time mismatch.
function Countdown() {
  const [left, setLeft] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      setLeft(`${h}:${m}:${sec}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (!left) return null;
  return (
    <div className="border-brand-hot/40 bg-brand-hot/10 text-brand-hot mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-sm">
      ⏳ acaba em <span className="font-bold tabular-nums">{left}</span>
    </div>
  );
}
