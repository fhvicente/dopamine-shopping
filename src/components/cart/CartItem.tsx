"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "~/i18n/routing";
import { formatPrice } from "~/lib/utils";
import { useCartStore, type CartItem as TCartItem } from "~/store/cartStore";
import { useTranslations } from "next-intl";

export function CartItem({ item, locale }: { item: TCartItem; locale: string }) {
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const t = useTranslations("cart");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex gap-4 rounded-2xl border border-border-subtle bg-bg-card/60 p-4"
    >
      <Link
        href={`/produto/${item.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-bg-elevated"
      >
        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/produto/${item.slug}`} className="line-clamp-2 font-display text-sm font-semibold hover:text-brand-primary-soft md:text-base">
            {item.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(item.id)}
            className="cursor-pointer rounded-lg p-1 text-text-muted transition-colors hover:bg-bg-elevated hover:text-brand-hot"
            aria-label={t("remove")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-border-subtle bg-bg-elevated/60">
            <button
              type="button"
              onClick={() => setQty(item.id, item.quantity - 1)}
              className="cursor-pointer p-2 transition-colors hover:text-brand-primary-soft"
              aria-label="-"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-8 text-center font-mono text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => setQty(item.id, item.quantity + 1)}
              className="cursor-pointer p-2 transition-colors hover:text-brand-primary-soft"
              aria-label="+"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex flex-col items-end">
            {item.originalPrice > item.price && (
              <span className="font-mono text-xs text-text-muted line-through">
                {formatPrice(item.originalPrice * item.quantity, locale)}
              </span>
            )}
            <span className="font-mono text-base font-bold">
              {formatPrice(item.price * item.quantity, locale)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
