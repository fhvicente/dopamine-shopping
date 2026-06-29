"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "~/i18n/routing";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rocket, Flame, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { formatPrice } from "~/lib/utils";
import { getFeatured } from "~/data/products";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const localeTag = locale === "en" ? "en-GB" : "pt-PT";
  const featured = getFeatured()[0]!;

  return (
    <section className="relative overflow-hidden pb-12 pt-8 md:pb-20 md:pt-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-72 w-72 translate-x-1/2 rounded-full bg-brand-accent/10 blur-[100px]" />
      </div>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-6 md:px-6">
        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="default" className="font-mono normal-case">
              {t("tagline")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="block">{t("title1")}</span>
            <span className="block gradient-text">{t("title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg text-lg text-text-muted md:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/catalogo">
              <Button variant="default" size="lg" glow>
                <Rocket className="h-4 w-4" />
                {t("ctaPrimary")} 🚀
              </Button>
            </Link>
            <Link href="/ofertas">
              <Button variant="outline" size="lg">
                <Flame className="h-4 w-4 text-brand-hot" />
                {t("ctaSecondary")} 🔥
              </Button>
            </Link>
          </motion.div>

          <SavedCounter label={t("savedToday", { amount: "{AMOUNT}" })} locale={localeTag} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-brand-primary/30 via-transparent to-brand-accent/20 blur-3xl" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-brand-primary/30 bg-bg-card/40 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.5)] backdrop-blur-sm"
          >
            <Image
              src={featured.images[0]!}
              alt={featured.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-0 top-4 flex justify-center">
              <Badge variant="accent">
                <Sparkles className="h-3 w-3" />
                {t("badge")}
              </Badge>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent p-5">
              <p className="font-mono text-[11px] uppercase text-brand-accent">
                ✦ Highlight
              </p>
              <p className="line-clamp-2 font-display text-lg font-bold">
                {featured.name}
              </p>
              <p className="mt-1 font-mono text-xl font-bold text-brand-primary-soft">
                {formatPrice(featured.salePrice, localeTag)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SavedCounter({ label, locale }: { label: string; locale: string }) {
  const count = useMotionValue(4238917);
  const [display, setDisplay] = useState("4 238 917");

  useEffect(() => {
    const controls = animate(count, 4900000, {
      duration: 60,
      ease: "linear",
      onUpdate: (v) =>
        setDisplay(
          new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v),
        ),
    });
    return () => controls.stop();
  }, [count, locale]);

  return (
    <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-sm text-emerald-300">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {label.replace("{AMOUNT}", `€${display}`)}
    </div>
  );
}
