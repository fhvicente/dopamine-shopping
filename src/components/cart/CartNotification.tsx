"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "~/store/cartStore";
import { formatPrice } from "~/lib/utils";

export function CartNotification() {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const localeTag = locale === "en" ? "en-GB" : "pt-PT";
  const lastAdded = useCartStore((s) => s.lastAdded);
  const dismiss = useCartStore((s) => s.dismissNotification);

  useEffect(() => {
    if (!lastAdded) return;
    const tm = setTimeout(dismiss, 3500);
    return () => clearTimeout(tm);
  }, [lastAdded, dismiss]);

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-50 flex max-w-sm flex-col gap-2 md:right-6 md:top-24">
      <AnimatePresence>
        {lastAdded && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-bg-card/95 p-3 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] backdrop-blur-xl"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-bg-elevated">
              <Image
                src={lastAdded.image}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t("addToCart")}
              </div>
              <p className="line-clamp-1 text-sm font-medium">{lastAdded.name}</p>
              <p className="font-mono text-xs text-text-muted">
                {formatPrice(lastAdded.price, localeTag)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
