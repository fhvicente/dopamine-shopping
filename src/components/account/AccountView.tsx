"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "~/i18n/routing";
import { Button } from "~/components/ui/button";
import { useOrderStore } from "~/store/orderStore";
import { formatPrice } from "~/lib/utils";
import { ACHIEVEMENTS, leaderboard, levelFor, totalSaved } from "~/lib/game";

export function AccountView() {
  const orders = useOrderStore((s) => s.orders);
  // persist hydrates client-side; wait for mount to avoid SSR mismatch
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- mount guard for persisted store hydration
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <section className="container mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <div className="mb-4 text-6xl">👤</div>
        <p className="text-text-muted">a carregar dopamina…</p>
      </section>
    );
  }

  const xp = totalSaved(orders);
  const { current, next, progress } = levelFor(xp);
  const { board, rank } = leaderboard(xp);

  return (
    <section className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display mb-2 text-4xl font-extrabold md:text-5xl">
        a minha conta
      </h1>
      <p className="text-text-muted mb-8">
        {orders.length === 0
          ? "Ainda não gastaste nada (literalmente). Compra algo imaginário para subir de nível."
          : "O teu vício em compras, quantificado."}
      </p>

      {/* Level card */}
      <div className="border-brand-primary/30 from-card to-brand-primary/10 rounded-2xl border bg-gradient-to-br p-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{current.emoji}</span>
          <div className="flex-1">
            <p className="text-brand-accent font-mono text-xs tracking-widest uppercase">
              nível {current.name}
            </p>
            <p className="font-display text-2xl font-bold">
              {formatPrice(xp)} em dopamina
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-bg-dark h-2.5 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="from-brand-primary to-brand-hot h-full rounded-full bg-gradient-to-r"
            />
          </div>
          <p className="text-text-muted mt-1.5 font-mono text-[11px]">
            {next
              ? `faltam ${formatPrice(next.min - xp)} para "${next.name}" ${next.emoji}`
              : "nível máximo — és uma lenda 👑"}
          </p>
        </div>
        <div className="border-border-subtle mt-4 flex gap-6 border-t pt-4 font-mono text-sm">
          <span>
            <span className="text-text-muted">encomendas </span>
            <b>{orders.length}</b>
          </span>
          <span>
            <span className="text-text-muted">ranking </span>
            <b>#{rank}</b>
          </span>
        </div>
      </div>

      {/* Achievements */}
      <h2 className="font-display mt-10 mb-3 text-2xl font-bold">conquistas</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const done = a.unlocked(orders);
          return (
            <div
              key={a.key}
              className={`rounded-xl border p-4 text-center transition ${
                done
                  ? "border-brand-accent/40 bg-brand-accent/10"
                  : "border-border-subtle bg-card/40 opacity-50 grayscale"
              }`}
            >
              <div className="text-3xl">{done ? a.emoji : "🔒"}</div>
              <p className="mt-1.5 text-sm font-semibold">{a.name}</p>
              <p className="text-text-muted mt-0.5 text-[11px]">{a.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Leaderboard */}
      <h2 className="font-display mt-10 mb-3 text-2xl font-bold">
        top gastadores 💸
      </h2>
      <div className="border-border-subtle overflow-hidden rounded-2xl border">
        {board.map((e, i) => {
          const you = "you" in e && e.you;
          return (
            <div
              key={e.name + i}
              className={`flex items-center justify-between px-4 py-2.5 font-mono text-sm ${
                you ? "bg-brand-primary/15 text-foreground font-bold" : ""
              } ${i % 2 ? "bg-card/30" : ""}`}
            >
              <span className="flex items-center gap-3">
                <span className="text-text-muted w-6">#{i + 1}</span>
                {e.name}
                {you && <span className="text-brand-accent">(tu)</span>}
              </span>
              <span>{formatPrice(e.score)}</span>
            </div>
          );
        })}
      </div>

      {/* History */}
      <h2 className="font-display mt-10 mb-3 text-2xl font-bold">histórico</h2>
      {orders.length === 0 ? (
        <div className="border-border-subtle bg-card/40 text-text-muted rounded-2xl border p-8 text-center">
          Sem encomendas.{" "}
          <Link href="/catalogo" className="text-brand-accent underline">
            Vai comprar dopamina →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {orders.map((o) => (
            <Link
              key={o.trackingId}
              href={`/rastrear?id=${o.trackingId}`}
              className="border-border-subtle bg-card/40 hover:border-brand-primary/40 flex items-center justify-between rounded-xl border px-4 py-3 transition"
            >
              <div>
                <p className="text-brand-accent font-mono text-sm">
                  {o.trackingId}
                </p>
                <p className="text-text-muted text-xs">
                  {o.items.length} artigo(s)
                </p>
              </div>
              <span className="font-mono text-sm font-bold">
                {formatPrice(o.total)}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/catalogo">
          <Button variant="default" size="lg" glow>
            comprar mais dopamina 💊
          </Button>
        </Link>
      </div>
    </section>
  );
}
