"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  coupon: string | null;
  lastAdded: { name: string; price: number; image: string } | null;
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  dismissNotification: () => void;
};

const VALID_COUPONS: Record<string, number> = {
  PRIMEIRADOSE: 0.25,
  FIRSTDOSE: 0.25,
  DOPAMINA: 0.5,
  DOPAMINE: 0.5,
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,
      lastAdded: null,
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          const items = existing
            ? state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i,
              )
            : [...state.items, { ...item, quantity: qty }];
          return {
            items,
            lastAdded: {
              name: item.name,
              price: item.price,
              image: item.image,
            },
          };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const upper = code.trim().toUpperCase();
        if (VALID_COUPONS[upper] !== undefined) {
          set({ coupon: upper });
          return true;
        }
        return false;
      },
      removeCoupon: () => set({ coupon: null }),
      dismissNotification: () => set({ lastAdded: null }),
    }),
    {
      name: "dopamina-cart",
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    },
  ),
);

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartItemCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartDiscount(items: CartItem[], coupon: string | null) {
  if (!coupon) return 0;
  const pct = VALID_COUPONS[coupon] ?? 0;
  return cartSubtotal(items) * pct;
}

export function cartTotal(items: CartItem[], coupon: string | null) {
  return cartSubtotal(items) - cartDiscount(items, coupon);
}
