"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "~/i18n/routing";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useOrderStore, type FakeOrder } from "~/store/orderStore";
import { TrackingMap } from "./TrackingMap";
import { TrackingTimeline } from "./TrackingTimeline";

export function TrackingPage() {
  const t = useTranslations("tracking");
  const params = useSearchParams();
  const idFromUrl = params.get("id");
  const orders = useOrderStore((s) => s.orders);
  const getByTracking = useOrderStore((s) => s.getByTracking);

  const [query, setQuery] = useState(idFromUrl ?? "");
  const [manualOrder, setManualOrder] = useState<FakeOrder | null>(null);

  const order =
    manualOrder ??
    (idFromUrl ? (getByTracking(idFromUrl) ?? orders[0] ?? null) : (orders[0] ?? null));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getByTracking(query.trim());
    setManualOrder(found ?? orders[0] ?? null);
  };

  return (
    <section className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
      <div className="mb-8 flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-accent">
          ✦ live tracking
        </span>
        <h1 className="font-display text-4xl font-extrabold md:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-text-muted">{t("subtitle")}</p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-8 flex flex-col gap-2 rounded-2xl border border-border-subtle bg-bg-card/60 p-3 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-2 pl-3">
          <Search className="h-4 w-4 shrink-0 text-text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="border-0 bg-transparent font-mono uppercase placeholder:normal-case focus-visible:ring-0"
          />
        </div>
        <Button type="submit" variant="default" size="default" glow>
          <MapPin className="h-4 w-4" />
          {t("track")}
        </Button>
      </form>

      {order ? (
        <motion.div
          key={order.trackingId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-4">
            <div>
              <p className="font-mono text-xs uppercase text-brand-primary-soft">
                {t("track")} #
              </p>
              <p className="font-mono text-lg font-bold">{order.trackingId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-muted">{order.address.city}, {order.address.country}</p>
              <p className="text-xs text-text-muted">{order.items.length} item(s)</p>
            </div>
          </div>

          <TrackingMap order={order} />
          <TrackingTimeline order={order} />
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-border-subtle bg-bg-card/40 p-12 text-center">
          <p className="text-4xl">📦</p>
          <p className="mt-3 text-text-muted">
            Sem encomendas para rastrear. Compra primeiro algo no{" "}
            <Link href="/catalogo" className="text-brand-primary-soft underline">
              catálogo
            </Link>
            .
          </p>
        </div>
      )}
    </section>
  );
}
