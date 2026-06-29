"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cartStore";

export type FakeOrder = {
  trackingId: string;
  createdAt: number;
  items: CartItem[];
  total: number;
  address: {
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    email: string;
  };
  eventKey:
    | "whale"
    | "ufo"
    | "pirates"
    | "bermuda"
    | "volcano"
    | "turtle";
  destination: { lat: number; lng: number };
  origin: { lat: number; lng: number };
  current: { lat: number; lng: number };
};

type OrderState = {
  orders: FakeOrder[];
  add: (order: FakeOrder) => void;
  getByTracking: (trackingId: string) => FakeOrder | undefined;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      // get used below

      orders: [],
      add: (order) =>
        set((state) => ({ orders: [order, ...state.orders].slice(0, 20) })),
      getByTracking: (trackingId) =>
        get().orders.find((o) => o.trackingId === trackingId),
    }),
    { name: "dopamina-orders" },
  ),
);
