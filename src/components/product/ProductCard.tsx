"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { StarRating } from "~/components/ui/star-rating";
import { discountPct, formatPrice, hashCode } from "~/lib/utils";
import { useCartStore } from "~/store/cartStore";
import type { Product } from "~/data/products";

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const add = useCartStore((s) => s.add);
  const [wishlisted, setWishlisted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const off = discountPct(product.originalPrice, product.salePrice);
  const localeTag = locale === "en" ? "en-GB" : "pt-PT";
  // ponytail: fake urgency, deterministic from id so SSR/CSR match (no hydration warning)
  const viewers = 3 + (hashCode(product.id) % 47);
  const stock = 1 + (hashCode(product.id + "s") % 8);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]!,
      price: product.salePrice,
      originalPrice: product.originalPrice,
    });
    setConfetti(true);
    setTimeout(() => setConfetti(false), 700);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group border-border-subtle bg-bg-card/60 hover:border-brand-primary/40 relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.4)]"
    >
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="bg-bg-elevated relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]!}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <div className="flex flex-col gap-1.5">
              {off > 0 && (
                <Badge variant="hot" className="font-mono">
                  -{off}%
                </Badge>
              )}
              {product.badge && (
                <Badge variant="accent" className="text-[10px]">
                  {product.badge}
                </Badge>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setWishlisted((v) => !v);
              }}
              className="bg-bg-dark/60 hover:bg-bg-dark/80 cursor-pointer rounded-full p-2 backdrop-blur-sm transition"
              aria-label="Wishlist"
            >
              <Heart
                className={`h-4 w-4 transition ${
                  wishlisted ? "fill-brand-hot text-brand-hot" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            locale={localeTag}
          />
          <h3 className="font-display line-clamp-2 min-h-[2.5rem] text-sm leading-tight font-semibold md:text-base">
            {product.name}
          </h3>

          <div className="flex flex-col gap-0.5">
            {off > 0 && (
              <span className="text-text-muted font-mono text-xs line-through">
                {formatPrice(product.originalPrice, localeTag)}
              </span>
            )}
            <span className="text-text-primary font-mono text-xl font-bold">
              {formatPrice(product.salePrice, localeTag)}
            </span>
            <span className="text-text-muted font-mono text-[11px]">
              {t("installments", {
                count: 4,
                price: formatPrice(product.salePrice / 4, localeTag),
              })}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {viewers} a ver agora
            </span>
            <span className="text-brand-hot">só restam {stock}!</span>
          </div>

          <motion.button
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.96 }}
            className="from-brand-primary to-brand-primary-deep relative mt-1 flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(124,58,237,0.5)] transition hover:brightness-110"
          >
            <ShoppingCart className="h-4 w-4" />
            {t("addToCart")}
            {confetti && <ConfettiBurst />}
          </motion.button>
        </div>
      </Link>
    </motion.article>
  );
}

function ConfettiBurst() {
  const pieces = Array.from({ length: 12 });
  return (
    <span className="pointer-events-none absolute inset-0">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const x = Math.cos(angle) * 50;
        const y = Math.sin(angle) * 50;
        const colors = ["#f59e0b", "#ef4444", "#a78bfa", "#10b981"];
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
        );
      })}
    </span>
  );
}
