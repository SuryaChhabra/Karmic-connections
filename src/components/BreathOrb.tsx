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

  const word = phase === "in" ? "breathe in" : phase === "hold" ? "hold" : "release";

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
            "radial-gradient(circle, rgba(212,175,106,0.16) 0%, rgba(106,82,196,0.12) 45%, transparent 70%)",
          animation: "haloPulse 12s ease-in-out infinite",
        }}
      />

      {/* the orb */}
      <div
        ref={orbRef}
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: "62%",
          height: "62%",
          transformOrigin: "center",
          background:
            "radial-gradient(circle at 36% 30%, #f4e6c0 0%, #e6c987 26%, #cda35f 52%, #7d63bf 82%, #2c2160 100%)",
          boxShadow:
            "0 0 50px 6px rgba(212,175,106,0.30), 0 0 130px 30px rgba(106,82,196,0.22), inset 0 0 50px rgba(255,255,255,0.18)",
        }}
      >
        {/* soft sheen (toned down so it doesn't look flat/cheap) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 34% 26%, rgba(255,255,255,0.40), transparent 42%)",
          }}
        />
        {/* delicate inner ring for a more refined, crafted feel */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "9%",
            border: "1px solid rgba(255,248,230,0.28)",
          }}
        />

        {/* guidance word — dark ink so it reads on the bright gold centre,
            with a soft light halo to keep it legible over the violet edge */}
        <span
          className="relative font-serif lowercase italic"
          style={{
            fontSize: "1.55rem",
            letterSpacing: "0.12em",
            color: "#2a2152",
            textShadow: "0 1px 16px rgba(255,248,230,0.65)",
          }}
        >
          {word}
        </span>
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
    </div>
  );
}
