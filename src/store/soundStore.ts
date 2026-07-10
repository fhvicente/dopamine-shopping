"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SoundState = {
  muted: boolean;
  toggle: () => void;
};

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      muted: false,
      toggle: () => set((s) => ({ muted: !s.muted })),
    }),
    { name: "dopamina-sound" },
  ),
);
