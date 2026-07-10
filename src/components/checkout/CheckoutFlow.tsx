"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "~/i18n/routing";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CreditCard,
  Smartphone,
  Banknote,
  Loader2,
  Zap,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Card } from "~/components/ui/card";
import { cartTotal, useCartStore } from "~/store/cartStore";
import { useOrderStore, type FakeOrder } from "~/store/orderStore";
import {
  destinationFromAddress,
  EVENT_LOCATIONS,
  pickEvent,
  WAREHOUSE_ORIGIN,
} from "~/lib/tracking";
import { formatPrice, generateTrackingId, now } from "~/lib/utils";
import { cn } from "~/lib/utils";
import { playCash } from "~/lib/sound";
import { Confetti } from "~/components/ui/Confetti";

type Address = {
  name: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  email: string;
};

type PaymentMethod = "card" | "mbway" | "ref";

export function CheckoutFlow() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const localeTag = locale === "en" ? "en-GB" : "pt-PT";
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.coupon);
  const clear = useCartStore((s) => s.clear);
  const addOrder = useOrderStore((s) => s.add);
  const total = cartTotal(items, coupon);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [addr, setAddr] = useState<Address>({
    name: "",
    address: "",
    zip: "1000-000",
    city: "Lisboa",
    country: "Portugal",
    email: "",
  });
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [processing, setProcessing] = useState(false);
  const [approved, setApproved] = useState(false);
  const [tracking, setTracking] = useState<string | null>(null);

  const submitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2400));
    setProcessing(false);
    setApproved(true);
    await new Promise((r) => setTimeout(r, 900));

    const trackingId = generateTrackingId();
    const eventKey = pickEvent(trackingId);
    const dest = destinationFromAddress(addr.zip);
    const createdAt = now();
    const order: FakeOrder = {
      trackingId,
      createdAt,
      items: [...items],
      total,
      address: addr,
      eventKey,
      destination: { lat: dest[0], lng: dest[1] },
      origin: { lat: WAREHOUSE_ORIGIN[0], lng: WAREHOUSE_ORIGIN[1] },
      current: {
        lat: EVENT_LOCATIONS[eventKey].coords[0],
        lng: EVENT_LOCATIONS[eventKey].coords[1],
      },
    };
    addOrder(order);
    clear();
    setTracking(trackingId);
    setStep(3);
    playCash();
  };

  return (
    <section className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      {step === 3 && <Confetti />}
      <h1 className="font-display mb-8 text-4xl font-extrabold md:text-5xl">
        {t("title")}
      </h1>

      <Stepper step={step} t={t} />

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={submitAddress}
            >
              <Card className="flex flex-col gap-4 p-6">
                <p className="text-text-muted text-sm italic">
                  {t("addressNote")}
                </p>
                <Field
                  label={t("fields.name")}
                  value={addr.name}
                  onChange={(v) => setAddr({ ...addr, name: v })}
                  required
                />
                <Field
                  label={t("fields.email")}
                  type="email"
                  value={addr.email}
                  onChange={(v) => setAddr({ ...addr, email: v })}
                  required
                />
                <Field
                  label={t("fields.address")}
                  value={addr.address}
                  onChange={(v) => setAddr({ ...addr, address: v })}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label={t("fields.zip")}
                    value={addr.zip}
                    onChange={(v) => setAddr({ ...addr, zip: v })}
                    required
                  />
                  <Field
                    label={t("fields.city")}
                    value={addr.city}
                    onChange={(v) => setAddr({ ...addr, city: v })}
                    required
                  />
                </div>
                <Field
                  label={t("fields.country")}
                  value={addr.country}
                  onChange={(v) => setAddr({ ...addr, country: v })}
                  required
                />
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  glow
                  className="mt-2"
                >
                  {t("next")} →
                </Button>
              </Card>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={submitPayment}
            >
              <Card className="flex flex-col gap-4 p-6">
                <Tabs
                  value={method}
                  onValueChange={(v) => setMethod(v as PaymentMethod)}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">
                      <CreditCard className="h-4 w-4" />
                      {t("tabs.card")}
                    </TabsTrigger>
                    <TabsTrigger value="mbway">
                      <Smartphone className="h-4 w-4" />
                      {t("tabs.mbway")}
                    </TabsTrigger>
                    <TabsTrigger value="ref">
                      <Banknote className="h-4 w-4" />
                      {t("tabs.ref")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="flex flex-col gap-3">
                    <Field
                      label={t("fields.cardNumber")}
                      value={card.number}
                      onChange={(v) => setCard({ ...card, number: v })}
                      placeholder="4242 4242 4242 4242"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label={t("fields.expiry")}
                        value={card.expiry}
                        onChange={(v) => setCard({ ...card, expiry: v })}
                        placeholder="12/29"
                      />
                      <Field
                        label={t("fields.cvv")}
                        value={card.cvv}
                        onChange={(v) => setCard({ ...card, cvv: v })}
                        placeholder="420"
                      />
                    </div>
                    <Field
                      label={t("fields.cardName")}
                      value={card.name}
                      onChange={(v) => setCard({ ...card, name: v })}
                    />
                    <p className="bg-brand-accent/10 text-brand-accent rounded-lg px-3 py-2 font-mono text-xs">
                      {t("card.magic")}
                    </p>
                  </TabsContent>

                  <TabsContent value="mbway">
                    <div className="border-border-subtle bg-secondary/50 rounded-xl border p-4 text-sm">
                      📱 MB Way: 912 345 678 (qualquer número funciona)
                    </div>
                  </TabsContent>

                  <TabsContent value="ref">
                    <div className="border-border-subtle bg-secondary/50 rounded-xl border p-4 font-mono text-sm">
                      Entidade: 12345 · Referência: 999 999 999 · Valor:{" "}
                      {formatPrice(total, localeTag)}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-2 flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    ← {t("back")}
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    glow
                    className="flex-1"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("processing")}
                      </>
                    ) : approved ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t("approved")}
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        {t("pay", { amount: formatPrice(total, localeTag) })}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.form>
          )}

          {step === 3 && tracking && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="from-card flex flex-col items-center gap-5 rounded-2xl border border-emerald-500/40 bg-gradient-to-br to-emerald-900/10 p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-6xl"
              >
                🎉
              </motion.div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">
                {t("confirmation.title")}
              </h2>
              <div className="border-border-subtle bg-bg-dark/40 flex w-full flex-col gap-3 rounded-2xl border p-5 text-left">
                <Row
                  label={t("confirmation.trackingNumber")}
                  value={
                    <span className="text-brand-accent font-mono">
                      {tracking}
                    </span>
                  }
                />
                <Row
                  label={t("confirmation.charged")}
                  value={
                    <span className="font-mono text-emerald-300">
                      {t("confirmation.chargedValue")}
                    </span>
                  }
                />
                <Row
                  label={t("confirmation.eta")}
                  value={t("confirmation.etaValue")}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="default"
                  size="lg"
                  glow
                  onClick={() => router.push(`/rastrear?id=${tracking}`)}
                >
                  📍 {t("confirmation.trackCta")}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => router.push("/catalogo")}
                >
                  🛍️ {t("confirmation.continueCta")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Stepper({ step, t }: { step: 1 | 2 | 3; t: (k: string) => string }) {
  const steps = [
    { n: 1 as const, label: t("step1") },
    { n: 2 as const, label: t("step2") },
    { n: 3 as const, label: t("step3") },
  ];
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.n} className="flex flex-1 items-center gap-2">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-colors",
              step === s.n &&
                "border-brand-primary bg-brand-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]",
              step > s.n && "border-emerald-500 bg-emerald-500 text-white",
              step < s.n && "border-border-subtle text-text-muted",
            )}
          >
            {step > s.n ? <Check className="h-4 w-4" /> : s.n}
          </div>
          <span
            className={cn(
              "hidden text-sm md:inline",
              step >= s.n ? "text-foreground" : "text-text-muted",
            )}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-px flex-1",
                step > s.n ? "bg-emerald-500/60" : "bg-border-subtle",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const id = `f-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-text-muted">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
