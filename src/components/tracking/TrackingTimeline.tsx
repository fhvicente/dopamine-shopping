"use client";

import { useTranslations } from "next-intl";
import { Check, Loader2, MapPin, Package } from "lucide-react";
import { motion } from "framer-motion";
import type { FakeOrder } from "~/store/orderStore";
import { buildTimeline } from "~/lib/tracking";
import { EVENT_LOCATIONS } from "~/lib/tracking";
import { cn } from "~/lib/utils";

export function TrackingTimeline({ order }: { order: FakeOrder }) {
  const t = useTranslations("tracking");
  const stages = buildTimeline(order.createdAt);
  const eventInfo = EVENT_LOCATIONS[order.eventKey];

  const labels: Record<string, string> = {
    received: t("states.received"),
    paid: t("states.paid"),
    preparing: t("states.preparing"),
    shipped: t("states.shipped"),
    transit: t("states.transit"),
    delivered: t("states.eta"),
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-bg-card/40 p-6">
      {stages.map((stage, i) => {
        const isLast = i === stages.length - 1;
        return (
          <div key={stage.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2",
                  stage.done && "border-emerald-500 bg-emerald-500/20 text-emerald-300",
                  stage.active &&
                    "animate-pulse border-brand-primary bg-brand-primary/20 text-brand-primary-soft shadow-[0_0_20px_rgba(124,58,237,0.5)]",
                  !stage.done && !stage.active && "border-border-subtle text-text-muted",
                )}
              >
                {stage.done ? (
                  <Check className="h-4 w-4" />
                ) : stage.active ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Package className="h-4 w-4" />
                )}
              </motion.div>
              {!isLast && (
                <div
                  className={cn(
                    "mt-1 w-px flex-1",
                    stage.done ? "bg-emerald-500/60" : "bg-border-subtle",
                  )}
                />
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    "font-medium",
                    stage.done && "text-text-primary",
                    stage.active && "text-brand-primary-soft",
                    !stage.done && !stage.active && "text-text-muted",
                  )}
                >
                  {labels[stage.key]}
                </p>
                {stage.done && stage.minutesAgo > 0 && (
                  <span className="font-mono text-xs text-text-muted">
                    — {stage.minutesAgo} min
                  </span>
                )}
                {stage.active && (
                  <span className="rounded-full bg-brand-primary/20 px-2 py-0.5 font-mono text-[10px] uppercase text-brand-primary-soft">
                    {t("states.transitNow")}
                  </span>
                )}
                {stage.key === "delivered" && !stage.done && (
                  <span className="font-mono text-xs text-text-muted">
                    — {t("states.tomorrow")}
                  </span>
                )}
              </div>

              {stage.key === "paid" && (
                <p className="mt-1 font-mono text-xs text-emerald-400/70">
                  {t("states.paidNote")}
                </p>
              )}
              {stage.key === "transit" && (
                <div className="mt-2 flex items-start gap-2 rounded-lg border border-brand-accent/30 bg-brand-accent/10 p-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-accent">
                      {t("states.currently")}
                    </p>
                    <p className="mt-0.5 text-sm text-text-primary">
                      📍 {t(`locations.${eventInfo.locationKey}` as never)}
                    </p>
                    <p className="mt-2 text-sm italic text-text-muted">
                      {t(`events.${order.eventKey}`)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
