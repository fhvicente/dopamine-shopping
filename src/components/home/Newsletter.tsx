"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { Rocket } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section className="container mx-auto max-w-5xl px-4 py-16 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-brand-primary/30 bg-gradient-to-br from-bg-card via-brand-primary-deep/30 to-bg-card p-8 text-center md:p-12"
      >
        <div className="absolute -top-20 left-1/2 -z-0 h-40 w-96 -translate-x-1/2 rounded-full bg-brand-primary/30 blur-3xl" />
        <h3 className="font-display text-3xl font-bold md:text-4xl">{t("title")}</h3>
        <p className="mt-3 text-text-muted">{t("subtitle")}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            required
            className="h-12 flex-1 px-4 py-3"
          />
          <Button variant="default" size="lg" glow type="submit">
            <Rocket className="h-4 w-4" />
            {t("cta")} 🚀
          </Button>
        </form>
        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-mono text-sm text-emerald-300"
          >
            {t("thanks")}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
