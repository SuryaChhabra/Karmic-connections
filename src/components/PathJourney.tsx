"use client";

/**
 * PathJourney — an ambient, interactive winding "soul path" that ends in an
 * infinity loop (the cycle of rebirth). Inspired by the road in the logo.
 *
 * Features (all self-contained here):
 *   • Light-steps     — glowing orbs drift along the path like a soul walking
 *   • Breathing path  — brightness pulses on the same 4-2-6 rhythm as BreathOrb
 *   • Mist            — soft fog drifts across the road
 *   • Cursor-reactive — the whole path shifts subtly toward the pointer
 *   • Draw-your-own   — drag the glowing dot to the end to reveal the CTA
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TO REMOVE THIS ENTIRELY: delete this file and the single <PathJourney />
 *  line in src/app/page.tsx. Nothing else in the app depends on it.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";

// A winding road that resolves into a lemniscate (∞) on the right.
const PATH_D =
  "M 60 200 C 150 120, 250 300, 360 220 S 540 110, 640 210 " +
  "C 720 290, 690 360, 760 360 C 840 360, 850 250, 790 250 " +
  "C 740 250, 740 360, 820 360 C 900 360, 910 250, 980 250";

// Breath cycle (seconds) — matches BreathOrb (inhale 4 / hold 2 / exhale 6)
const INHALE = 4;
const HOLD = 2;
const EXHALE = 6;
const CYCLE = INHALE + HOLD + EXHALE;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export default function PathJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGGElement>(null);

  const [completed, setCompleted] = useState(false);
  const draggingRef = useRef(false);
  const progressRef = useRef(0); // 0..1 along the path (the draggable dot)
  const lenRef = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const len = path.getTotalLength();
    lenRef.current = len;

    // ─── Light-steps: a few orbs walking the path at staggered offsets ───
    const steps = Array.from(
      glowRef.current?.querySelectorAll<SVGCircleElement>(".step") ?? []
    );

    // pointer position for cursor-reactivity (normalized -1..1)
    let mx = 0;
    let my = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = (now - start) / 1000;

      // ─── Breathing brightness (synced to the orb's rhythm) ───
      const e = t % CYCLE;
      let breath: number;
      if (e < INHALE) breath = 0.4 + 0.6 * easeInOut(e / INHALE);
      else if (e < INHALE + HOLD) breath = 1;
      else breath = 1 - 0.6 * easeInOut((e - INHALE - HOLD) / EXHALE);
      if (path) path.style.opacity = String(0.35 + 0.45 * breath);

      // ─── Cursor-reactivity: gently shift the whole path toward pointer ───
      if (groupRef.current && !reduced) {
        const tx = mx * 10;
        const ty = my * 6;
        groupRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }

      // ─── Light-steps walking the path ───
      if (!reduced) {
        steps.forEach((s, i) => {
          const speed = 0.06; // laps per second
          const phase = (t * speed + i / steps.length) % 1;
          const pt = path.getPointAtLength(phase * len);
          s.setAttribute("cx", String(pt.x));
          s.setAttribute("cy", String(pt.y));
          // fade in then out across the lap
          const a = Math.sin(phase * Math.PI);
          s.style.opacity = String(a * 0.9 * breath);
        });
      }

      // ─── Draggable dot position ───
      if (dotRef.current) {
        const pt = path.getPointAtLength(progressRef.current * len);
        dotRef.current.setAttribute("cx", String(pt.x));
        dotRef.current.setAttribute("cy", String(pt.y));
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // ─── Drag handling for "draw your own journey" ───
  const svgPointToProgress = (clientX: number, clientY: number) => {
    const path = pathRef.current;
    const svg = path?.ownerSVGElement;
    if (!path || !svg) return progressRef.current;
    const r = svg.getBoundingClientRect();
    // map client coords into the SVG's 1040x440 viewBox
    const vx = ((clientX - r.left) / r.width) * 1040;
    const vy = ((clientY - r.top) / r.height) * 440;
    // sample the path to find the nearest length (coarse then fine)
    const len = lenRef.current;
    let best = 0;
    let bestD = Infinity;
    const N = 120;
    for (let i = 0; i <= N; i++) {
      const p = path.getPointAtLength((i / N) * len);
      const d = (p.x - vx) ** 2 + (p.y - vy) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i / N;
      }
    }
    return best;
  };

  const onDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMoveDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const p = svgPointToProgress(e.clientX, e.clientY);
    progressRef.current = p;
    if (p > 0.97 && !completed) {
      setCompleted(true);
      window.setTimeout(() => {
        document.getElementById("begin")?.scrollIntoView({ behavior: "smooth" });
      }, 700);
    }
  };
  const onUp = () => {
    draggingRef.current = false;
  };

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden px-6 py-10"
      ref={wrapRef}
    >
      <p className="mb-2 text-center text-xs uppercase tracking-[0.35em] text-gold/60">
        Trace the journey
      </p>
      <p className="mx-auto mb-6 max-w-md text-center text-sm text-text-faint">
        Drag the light along the path — where the road folds into itself, the
        journey begins again.
      </p>

      <svg
        viewBox="0 0 1040 440"
        className="mx-auto block w-full max-w-3xl select-none"
        style={{ touchAction: "none" }}
        onPointerMove={onMoveDrag}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <defs>
          <linearGradient id="pj-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#eccf8a" />
            <stop offset="55%" stopColor="#d4af6a" />
            <stop offset="100%" stopColor="#6a52c4" />
          </linearGradient>
          <radialGradient id="pj-mist" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(180,171,214,0.18)" />
            <stop offset="100%" stopColor="rgba(180,171,214,0)" />
          </radialGradient>
          <filter id="pj-soft">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <g ref={groupRef} style={{ transition: "transform 0.4s ease-out" }}>
          {/* faint base road */}
          <path
            d={PATH_D}
            fill="none"
            stroke="rgba(212,175,106,0.18)"
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="2 14"
          />
          {/* the glowing road (breathing brightness set in JS) */}
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="url(#pj-grad)"
            strokeWidth={3}
            strokeLinecap="round"
            filter="url(#pj-soft)"
          />

          {/* drifting mist patches */}
          <g className="pj-mist-layer">
            <circle cx="250" cy="220" r="120" fill="url(#pj-mist)">
              <animate
                attributeName="cx"
                values="150;900;150"
                dur="26s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="700" cy="300" r="150" fill="url(#pj-mist)">
              <animate
                attributeName="cx"
                values="950;100;950"
                dur="34s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* light-steps walking the path */}
          <g ref={glowRef}>
            {Array.from({ length: 5 }).map((_, i) => (
              <circle key={i} className="step" r={4} fill="#f6e9c6" />
            ))}
          </g>

          {/* the draggable dot */}
          <circle
            ref={dotRef}
            r={10}
            fill="#f6e9c6"
            stroke="rgba(212,175,106,0.7)"
            strokeWidth={2}
            style={{ cursor: "grab", filter: "drop-shadow(0 0 8px rgba(236,207,138,0.9))" }}
            onPointerDown={onDown}
          />
        </g>
      </svg>

      {completed && (
        <p className="mt-4 text-center text-sm text-gold-bright animate-pulse">
          The path comes full circle — welcome back.
        </p>
      )}
    </section>
  );
}
