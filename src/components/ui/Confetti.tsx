"use client";

import { motion } from "framer-motion";

const EMOJI = ["💊", "💸", "✨", "🎉", "🛍️", "🔥", "💜"];

// Full-area emoji burst. Mount it to fire once (e.g. on checkout success).
export function Confetti({ count = 40 }: { count?: number }) {
  const pieces = Array.from({ length: count });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = (i * 137.5) % 100; // golden-angle spread, no RNG needed
        const delay = (i % 10) * 0.05;
        const drift = ((i % 5) - 2) * 30;
        const rotate = (i % 2 ? 1 : -1) * (180 + (i % 4) * 90);
        return (
          <motion.span
            key={i}
            initial={{ y: -40, x: 0, opacity: 1, rotate: 0 }}
            animate={{ y: "105vh", x: drift, opacity: [1, 1, 0], rotate }}
            transition={{
              duration: 2.4 + (i % 5) * 0.2,
              delay,
              ease: "easeIn",
            }}
            className="absolute top-0 text-2xl"
            style={{ left: `${left}%` }}
          >
            {EMOJI[i % EMOJI.length]}
          </motion.span>
        );
      })}
    </div>
  );
}
