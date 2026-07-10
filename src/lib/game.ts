// Client-side gamification derived purely from persisted fake orders.
// ponytail: no DB/auth — XP/levels/achievements computed from orderStore, and
// the leaderboard is static parody data with the player spliced in by score.
import type { FakeOrder } from "~/store/orderStore";

// XP = total "saved" (you pay nothing, so full total is your dopamine score).
export function totalSaved(orders: FakeOrder[]) {
  return orders.reduce((s, o) => s + o.total, 0);
}

export const LEVELS = [
  { min: 0, name: "Curioso", emoji: "👀" },
  { min: 1000, name: "Comprador Compulsivo", emoji: "🛒" },
  { min: 5000, name: "Viciado em Carrinho", emoji: "💊" },
  { min: 20000, name: "Lenda da Dopamina", emoji: "🔥" },
  { min: 50000, name: "Deus do Checkout", emoji: "👑" },
] as const;

export function levelFor(xp: number) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i]!.min) idx = i;
  const current = LEVELS[idx]!;
  const next = LEVELS[idx + 1] ?? null;
  const spanStart = current.min;
  const spanEnd = next?.min ?? current.min;
  const progress = next ? (xp - spanStart) / (spanEnd - spanStart) : 1;
  return { idx, current, next, progress: Math.min(1, Math.max(0, progress)) };
}

export type Achievement = {
  key: string;
  name: string;
  emoji: string;
  desc: string;
  unlocked: (o: FakeOrder[]) => boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    key: "first",
    name: "Primeira Dose",
    emoji: "💉",
    desc: "Fizeste a tua primeira compra imaginária",
    unlocked: (o) => o.length >= 1,
  },
  {
    key: "collector",
    name: "Colecionador",
    emoji: "📦",
    desc: "5 encomendas que nunca vão chegar",
    unlocked: (o) => o.length >= 5,
  },
  {
    key: "bigspender",
    name: "Mão Larga",
    emoji: "💸",
    desc: "Uma encomenda acima de 5.000 €",
    unlocked: (o) => o.some((x) => x.total >= 5000),
  },
  {
    key: "explorer",
    name: "Explorador",
    emoji: "🧭",
    desc: "Compraste em 4+ categorias",
    unlocked: (o) => {
      const cats = new Set(
        o.flatMap((x) => x.items.map((i) => i.slug.split("-")[0])),
      );
      return cats.size >= 4;
    },
  },
  {
    key: "whale",
    name: "Amigo da Baleia",
    emoji: "🐳",
    desc: "Uma encomenda engolida por uma baleia",
    unlocked: (o) => o.some((x) => x.eventKey === "whale"),
  },
  {
    key: "millionaire",
    name: "Milionário Imaginário",
    emoji: "🤑",
    desc: "100.000 € em dopamina acumulada",
    unlocked: (o) => totalSaved(o) >= 100000,
  },
];

// Static parody leaderboard; the player is inserted by their score.
const FAKE_BOARD = [
  { name: "cristiano_dopamina", score: 184500 },
  { name: "maria_carrinho_cheio", score: 97230 },
  { name: "zé_do_pix", score: 62110 },
  { name: "shopaholic_69", score: 41900 },
  { name: "influencer_falido", score: 28400 },
  { name: "tia_do_boleto", score: 12050 },
  { name: "user_random_42", score: 4300 },
];

export function leaderboard(playerScore: number, playerName = "tu") {
  const board = [
    ...FAKE_BOARD,
    { name: playerName, score: playerScore, you: true },
  ];
  board.sort((a, b) => b.score - a.score);
  const rank = board.findIndex((e) => "you" in e && e.you) + 1;
  return { board, rank };
}
