"use client";

import { useEffect, useRef, useState } from "react";

// Breath cycle (seconds): inhale → hold → exhale
const INHALE = 4;
const HOLD = 2;
const EXHALE = 6;
const CYCLE = INHALE + HOLD + EXHALE;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const MIN = 0.82;
const MAX = 1.16;

/**
 * The breathing orb. Scale and the guidance word ("Breathe in / Hold / Release")
 * are driven by one shared clock so they stay perfectly in sync. Gold embers
 * drift up on each exhale, like releasing the past.
 */
export default function BreathOrb({ size = 320 }: { size?: number }) {
  const orbRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (orbRef.current) orbRef.current.style.transform = "scale(1)";
      return;
    }

    let raf = 0;
    const start = performance.now();
    let lastPhase = "";

    const tick = (now: number) => {
      const elapsed = ((now - start) / 1000) % CYCLE;
      let scale: number;
      let p: "in" | "hold" | "out";

      if (elapsed < INHALE) {
        scale = MIN + (MAX - MIN) * easeInOut(elapsed / INHALE);
        p = "in";
      } else if (elapsed < INHALE + HOLD) {
        scale = MAX;
        p = "hold";
      } else {
        scale = MAX - (MAX - MIN) * easeInOut((elapsed - INHALE - HOLD) / EXHALE);
        p = "out";
      }

      if (orbRef.current) orbRef.current.style.transform = `scale(${scale})`;
      if (p !== lastPhase) {
        lastPhase = p;
        setPhase(p);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const word = phase === "in" ? "Breathe in" : phase === "hold" ? "Hold" : "Release";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* outer halo */}
      <div
        className="absolute rounded-full"
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle, rgba(212,175,106,0.18) 0%, rgba(106,82,196,0.12) 45%, transparent 70%)",
          animation: "haloPulse 12s ease-in-out infinite",
        }}
      />

      {/* the orb */}
      <div
        ref={orbRef}
        className="relative rounded-full"
        style={{
          width: "62%",
          height: "62%",
          transformOrigin: "center",
          background:
            "radial-gradient(circle at 38% 32%, #f6e9c6 0%, #eccf8a 18%, #d4af6a 42%, #8a6fd1 78%, #3a2c7a 100%)",
          boxShadow:
            "0 0 60px 8px rgba(212,175,106,0.35), 0 0 120px 30px rgba(106,82,196,0.25), inset 0 0 40px rgba(255,255,255,0.25)",
        }}
      >
        {/* inner sheen */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55), transparent 45%)",
          }}
        />
      </div>

      {/* embers rising on exhale */}
      {phase === "out" &&
        Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              bottom: "42%",
              left: `${42 + i * 3}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              background: "rgba(236,207,138,0.9)",
              animation: `emberRise ${3 + (i % 3)}s ease-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

      {/* guidance word in the centre */}
      <span
        className="absolute font-serif text-lg uppercase tracking-[0.35em] text-text/80"
        style={{ textShadow: "0 0 18px rgba(11,10,43,0.9)" }}
      >
        {word}
      </span>
    </div>
  );
}
