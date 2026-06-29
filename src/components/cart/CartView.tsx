"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "~/i18n/routing";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Rocket, Tag, Trash2 } from "lucide-react";
import { CartItem } from "./CartItem";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  cartDiscount,
  cartSubtotal,
  cartTotal,
  useCartStore,
} from "~/store/cartStore";
import { formatPrice } from "~/lib/utils";

export function CartView() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const localeTag = locale === "en" ? "en-GB" : "pt-PT";
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const subtotal = cartSubtotal(items);
  const discount = cartDiscount(items, coupon);
  const total = cartTotal(items, coupon);

  if (items.length === 0) {
    return (
      <section className="container mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center md:px-6">
        <div className="mb-6 text-6xl">🛒</div>
        <h1 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-md text-text-muted">{t("empty")}</p>
        <Link href="/catalogo" className="mt-6">
          <Button variant="default" size="lg" glow>
            <Rocket className="h-4 w-4" />
            {t("emptyCta")}
          </Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="mb-8 font-display text-4xl font-extrabold md:text-5xl">
        {t("title")}
      </h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {items.map((item) => (
              <CartItem key={item.id} item={item} locale={localeTag} />
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3 p-5">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-brand-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                cupão
              </span>
            </div>
            {coupon ? (
              <div className="flex items-center justify-between gap-2 rounded-xl bg-emerald-500/15 px-3 py-2 text-sm">
                <span className="font-mono font-semibold text-emerald-300">
                  ✓ {coupon}
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-text-muted hover:text-brand-hot"
                  aria-label="remove coupon"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setErr(null);
                  setOk(false);
                  const success = applyCoupon(code);
                  if (success) {
                    setOk(true);
                    setCode("");
                  } else {
                    setErr(t("invalidCoupon"));
                  }
                }}
                className="flex gap-2"
              >
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t("couponPlaceholder")}
                  className="flex-1 uppercase"
                />
                <Button type="submit" variant="default" size="default">
                  {t("apply")}
                </Button>
              </form>
            )}
            {ok && <p className="font-mono text-xs text-emerald-300">{t("applied")}</p>}
            {err && <p className="font-mono text-xs text-brand-hot">{err}</p>}
            <p className="font-mono text-[10px] text-text-muted">
              dica: PRIMEIRADOSE, DOPAMINA
            </p>
          </Card>

          <Card className="flex flex-col gap-3 border-brand-primary/40 bg-gradient-to-br from-card to-brand-primary/10 p-5">
            <SummaryRow label={t("subtotal")} value={formatPrice(subtotal, localeTag)} />
            {coupon && (
              <SummaryRow
                label={`${t("discount")} (${coupon})`}
                value={`- ${formatPrice(discount, localeTag)}`}
                highlight
              />
            )}
            <SummaryRow label={t("shipping")} value={t("free")} highlight />
            <Separator className="my-1" />
            <div className="flex items-end justify-between gap-2">
              <span className="font-display text-lg font-semibold">{t("total")}</span>
              <span className="font-mono text-3xl font-extrabold gradient-text">
                {formatPrice(total, localeTag)}
              </span>
            </div>
            <p className="text-right text-xs italic text-text-muted">{t("neverPay")}</p>

            <Button
              variant="default"
              size="lg"
              glow
              onClick={() => router.push("/checkout")}
              className="mt-3"
            >
              <Rocket className="h-4 w-4" />
              {t("checkout")} 🚀
            </Button>
            <p className="text-center text-[11px] text-text-muted">{t("secure")}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-muted">{label}</span>
      <span className={`font-mono ${highlight ? "text-emerald-300" : ""}`}>
        {value}
      </span>
    </div>
  );
}
