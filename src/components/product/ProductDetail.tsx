"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link, useRouter } from "~/i18n/routing";
import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Sparkles,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { StarRating } from "~/components/ui/star-rating";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Card } from "~/components/ui/card";
import { ProductGrid } from "./ProductGrid";
import { useCartStore } from "~/store/cartStore";
import { discountPct, formatPrice } from "~/lib/utils";
import { type Product, getRelated } from "~/data/products";

export function ProductDetail({ product }: { product: Product }) {
  const t = useTranslations("product");
  const cat = useTranslations("catalog");
  const catNs = useTranslations("categories");
  const locale = useLocale();
  const localeTag = locale === "en" ? "en-GB" : "pt-PT";
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const add = useCartStore((s) => s.add);
  const router = useRouter();
  const related = getRelated(product.slug, 4);
  const off = discountPct(product.originalPrice, product.salePrice);

  const handleAdd = () => {
    add(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]!,
        price: product.salePrice,
        originalPrice: product.originalPrice,
      },
      qty,
    );
  };

  const handleBuy = () => {
    handleAdd();
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-text-muted">
        <Link href="/" className="hover:text-text-primary">{t("breadcrumbHome")}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/catalogo?cat=${product.category}` as never} className="hover:text-text-primary">
          {catNs(product.category)}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        <div className="flex flex-col gap-4">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-border-subtle bg-bg-card"
          >
            <Image
              src={product.images[active]!}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority
            />
            {off > 0 && (
              <Badge variant="hot" className="absolute left-4 top-4 font-mono">
                -{off}%
              </Badge>
            )}
          </motion.div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((src, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setActive(i)}
                className={`relative aspect-square w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition ${
                  i === active ? "border-brand-primary" : "border-border-subtle hover:border-white/30"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">
              <Sparkles className="mr-1 h-3 w-3" /> {t("stockBadge")}
            </Badge>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="flex items-center gap-4">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
              locale={localeTag}
            />
            <span className="font-mono text-xs text-text-muted">
              {product.brand}
            </span>
          </div>

          <Card className="p-5">
            {off > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg text-text-muted line-through">
                  {formatPrice(product.originalPrice, localeTag)}
                </span>
                <Badge variant="hot" className="font-mono">-{off}%</Badge>
              </div>
            )}
            <p className="font-mono text-4xl font-extrabold md:text-5xl">
              {formatPrice(product.salePrice, localeTag)}
            </p>
            <p className="mt-1 font-mono text-sm text-text-muted">
              {cat("installments", {
                count: 4,
                price: formatPrice(product.salePrice / 4, localeTag),
              })}
            </p>
          </Card>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-xl border border-border-subtle bg-card">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="cursor-pointer p-3 transition-colors hover:text-brand-primary-soft"
                aria-label="-"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 text-center font-mono">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="cursor-pointer p-3 transition-colors hover:text-brand-primary-soft"
                aria-label="+"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs text-text-muted">{t("quantity")}</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="default" size="lg" glow onClick={handleAdd} className="flex-1">
              <ShoppingCart className="h-4 w-4" />
              {cat("addToCart")}
            </Button>
            <Button variant="hot" size="lg" glow onClick={handleBuy} className="flex-1">
              <Zap className="h-4 w-4" />
              {cat("buyNow")}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <TrustItem icon={<ShieldCheck className="h-4 w-4" />} label={t("trust.payment")} />
            <TrustItem icon={<Truck className="h-4 w-4" />} label={t("trust.returns")} />
            <TrustItem icon={<span className="text-base">🐋</span>} label={t("trust.delivery")} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-16">
        <TabsList>
          <TabsTrigger value="description">{t("description")}</TabsTrigger>
          <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
          <TabsTrigger value="questions">{t("questions")}</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <p className="text-base leading-relaxed text-text-muted">
              {product.description}
            </p>
            <Card className="p-5">
              <dl className="flex flex-col gap-2 text-sm">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-3 border-b border-border-subtle/60 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-text-muted">{k}</dt>
                    <dd className="text-right font-mono">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <Card className="p-6 font-mono text-sm text-text-muted">
            ★★★★★ {product.reviewCount} avaliações 5 estrelas. Todas escritas
            pela mãe da dopamina. Não há aqui nada a ver. 👀
          </Card>
        </TabsContent>
        <TabsContent value="questions">
          <Card className="p-6 font-mono text-sm text-text-muted">
            P: O produto chega? R: Sim, a bordo de uma baleia. 🐋
          </Card>
        </TabsContent>
      </Tabs>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">
            {t("related")}
          </h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border-subtle bg-bg-card/40 p-3 text-center text-text-muted">
      <span className="text-brand-primary-soft">{icon}</span>
      <span className="text-[11px] leading-tight">{label}</span>
    </div>
  );
}
