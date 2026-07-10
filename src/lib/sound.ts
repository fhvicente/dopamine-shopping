"use client";

// WebAudio synth blips — zero assets, zero deps. ponytail: synth beeps beat
// shipping audio files for a joke store; swap to <audio src> if real SFX wanted.
import { useSoundStore } from "~/store/soundStore";

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  ctx ??= new (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  )();
  return ctx;
}

function blip(freq: number, dur: number, type: OscillatorType, delay = 0) {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur);
}

function enabled() {
  return !useSoundStore.getState().muted;
}

// short rising pop for add-to-cart
export function playPop() {
  if (!enabled()) return;
  blip(660, 0.12, "triangle");
  blip(990, 0.1, "triangle", 0.06);
}

// cash-register-ish arpeggio for purchase
export function playCash() {
  if (!enabled()) return;
  [523, 659, 784, 1047].forEach((f, i) => blip(f, 0.18, "square", i * 0.07));
}
