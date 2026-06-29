import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, locale = "pt-PT") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, locale = "pt-PT") {
  return new Intl.NumberFormat(locale).format(value);
}

export function discountPct(original: number, sale: number) {
  if (original <= 0 || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
}

const TRACKING_PREFIX = "DSH-2024";

export function generateTrackingId() {
  const n = Math.floor(Math.random() * 900 + 100);
  const suffix = ["REAL", "FAKE", "DOPA", "PURE", "VOID"][
    Math.floor(Math.random() * 5)
  ];
  return `${TRACKING_PREFIX}-${n}-${suffix}`;
}

export function now(): number {
  return Date.now();
}

export function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
