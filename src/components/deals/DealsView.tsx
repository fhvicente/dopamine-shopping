"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";
import { ProductGrid } from "~/components/product/ProductGrid";
import { getFlashDeals } from "~/data/products";

const DURATION_MS = 60 * 60 * 1000;

export function DealsView() {
  const t = useTranslations("deals");
  const products = getFlashDeals();
  const [endsAt, setEndsAt] = useState<number>(() => Date.now() + DURATION_MS);
  const [remaining, setRemaining] = useState(DURATION_MS);

  useEffect(() => {
    const i = setInterval(() => {
      const left = endsAt - Date.now();
      if (left <= 0) {
        setEndsAt(Date.now() + DURATION_MS);
        setRemaining(DURATION_MS);
      } else {
        setRemaining(left);
      }
    }, 1000);
    return () => clearInterval(i);
  }, [endsAt]);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-brand-hot">
            <Flame className="h-3.5 w-3.5" /> flash
          </span>
          <h1 className="mt-2 font-display text-4xl font-extrabold md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-xl text-text-muted md:text-lg">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            {t("endsIn")}
          </span>
          <div className="mt-1 flex items-center gap-2 font-mono">
            <TimeBox value={pad(h)} label="H" />
            <span className="text-2xl text-brand-hot">:</span>
            <TimeBox value={pad(m)} label="M" />
            <span className="text-2xl text-brand-hot">:</span>
            <TimeBox value={pad(s)} label="S" />
          </div>
        </div>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="rounded-xl border border-brand-hot/40 bg-brand-hot/10 px-3 py-2 text-2xl font-bold text-brand-hot shadow-[0_0_20px_-4px_rgba(239,68,68,0.4)] md:text-3xl">
        {value}
      </span>
      <span className="mt-1 text-[10px] text-text-muted">{label}</span>
    </div>
  );
}
