"use client";

import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";
import { motion } from "framer-motion";
import { Copy, Check, Sparkles, Rocket } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export function CouponBanner() {
  const t = useTranslations("coupon");
  const [copied, setCopied] = useState(false);
  const code = t("code");

  const copy = () => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="container mx-auto max-w-7xl px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-brand-primary/40 bg-gradient-to-br from-brand-primary-deep via-brand-primary to-indigo-700 p-8 md:p-12"
      >
        <div className="absolute inset-0 -z-0 opacity-30">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-accent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-hot blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white backdrop-blur">
              <Sparkles className="h-3 w-3" />
              {t("tag")}
            </span>
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
              {t("title")}
              <br />
              <span className="text-2xl font-medium opacity-90 md:text-3xl">
                {t("subtitle")}
              </span>
            </h2>
            <p className="max-w-md text-base text-white/85 md:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-white/60 bg-bg-dark/40 p-1 pl-4">
              <span className="font-mono text-xl font-bold tracking-wider md:text-2xl">
                {code}
              </span>
              <button
                type="button"
                onClick={copy}
                className="ml-3 flex cursor-pointer items-center gap-1.5 rounded-xl bg-white/15 px-4 py-3 text-sm font-medium transition hover:bg-white/25"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-300" />
                    {t("copied")}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t("copy")}
                  </>
                )}
              </button>
            </div>
            <Link href="/catalogo">
              <Button variant="secondary" size="lg" glow className="w-full">
                <Rocket className="h-4 w-4" />
                {t("cta")} 🚀
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute right-6 top-6 hidden rotate-12 md:block">
          <div className="flex flex-col items-center rounded-2xl border-2 border-brand-accent bg-brand-accent/90 px-4 py-3 text-bg-dark shadow-[0_10px_30px_rgba(245,158,11,0.5)]">
            <span className="font-display text-3xl font-extrabold">25%</span>
            <span className="font-mono text-[10px] font-bold uppercase">
              {t("badge")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
