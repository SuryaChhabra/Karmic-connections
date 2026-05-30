"use client";

/**
 * PathJourney — a vertical "soul road" that runs down the ENTIRE page as a
 * spine, drawn like the road in the logo (two outer rails + a dashed
 * centerline) and ending in an infinity loop (the cycle of rebirth).
 *
 * Ambient effects (all self-contained here, fixed behind the content):
 *   • Light-steps     — glowing orbs travel down the road like a soul walking
 *   • Breathing glow  — brightness pulses on the same 4-2-6 rhythm as BreathOrb
 *   • Mist            — soft fog drifts across the road
 *   • Cursor sway     — the road leans subtly toward the pointer
 *   • Scroll-aware    — a brighter "you are here" glow follows your scroll
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TO REMOVE THIS ENTIRELY: delete this file and the single <PathJourney />
 *  line in src/app/page.tsx. Nothing else in the app depends on it.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";

// viewBox is 600 wide × 2200 tall. The road makes BIG sweeping S-curves down
// the page and finishes in an endless infinity loop (figure-eight that returns
// to its own crossing point, so there's no visible end).
const VBW = 600;
const VBH = 2200;
const PATH_D =
  "M 300 0 " +
  "C 660 200, 660 380, 300 520 " + // sweep right (further)
  "C -60 660, -60 840, 300 980 " + // sweep left (further)
  "C 660 1120, 660 1300, 300 1440 " + // sweep right (further)
  "C -30 1570, 60 1720, 300 1800 " + // ease toward centre
  // ── endless infinity loop (returns to crossing point at 300,1960) ──
  "C 300 1850, 300 1900, 300 1960 " +
  "C 360 1860, 500 1885, 500 1960 " +
  "C 500 2035, 360 2060, 300 1960 " +
  "C 240 1860, 100 1885, 100 1960 " +
  "C 100 2035, 240 2060, 300 1960";

const INHALE = 4;
const HOLD = 2;
const EXHALE = 6;
const CYCLE = INHALE + HOLD + EXHALE;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export default function PathJourney() {
  const railRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const stepsRef = useRef<SVGGElement>(null);
  const hereRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const len = rail.getTotalLength();
    const steps = Array.from(
      stepsRef.current?.querySelectorAll<SVGCircleElement>(".step") ?? []
    );

    let mx = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let scrollFrac = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollFrac = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = (now - start) / 1000;

      // breathing brightness
      const e = t % CYCLE;
      let breath: number;
      if (e < INHALE) breath = 0.4 + 0.6 * easeInOut(e / INHALE);
      else if (e < INHALE + HOLD) breath = 1;
      else breath = 1 - 0.6 * easeInOut((e - INHALE - HOLD) / EXHALE);
      if (groupRef.current)
        groupRef.current.style.opacity = String(0.45 + 0.4 * breath);

      // cursor sway
      if (groupRef.current && !reduced) {
        groupRef.current.style.transform = `translateX(${mx * 14}px)`;
      }

      // light-steps walking down the road
      if (!reduced) {
        steps.forEach((s, i) => {
          const speed = 0.04;
          const phase = (t * speed + i / steps.length) % 1;
          const pt = rail.getPointAtLength(phase * len);
          s.setAttribute("cx", String(pt.x));
          s.setAttribute("cy", String(pt.y));
          s.style.opacity = String(Math.sin(phase * Math.PI) * 0.9 * breath);
        });
      }

      // "you are here" glow follows scroll position down the road
      if (hereRef.current) {
        const pt = rail.getPointAtLength(scrollFrac * len);
        hereRef.current.setAttribute("cx", String(pt.x));
        hereRef.current.setAttribute("cy", String(pt.y));
        hereRef.current.style.opacity = String(0.5 + 0.5 * breath);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-[5] flex justify-center overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="none"
        className="h-full w-full max-w-4xl"
      >
        <defs>
          <linearGradient id="pj-rail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eccf8a" />
            <stop offset="60%" stopColor="#d4af6a" />
            <stop offset="100%" stopColor="#6a52c4" />
          </linearGradient>
          <radialGradient id="pj-mist" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(180,171,214,0.16)" />
            <stop offset="100%" stopColor="rgba(180,171,214,0)" />
          </radialGradient>
          <radialGradient id="pj-here" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(236,207,138,0.55)" />
            <stop offset="100%" stopColor="rgba(236,207,138,0)" />
          </radialGradient>
          <filter id="pj-soft">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        <g ref={groupRef} style={{ transition: "transform 0.5s ease-out" }}>
          {/* drifting mist */}
          <circle cx="150" cy="500" r="180" fill="url(#pj-mist)">
            <animate attributeName="cy" values="200;1800;200" dur="40s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="1200" r="200" fill="url(#pj-mist)">
            <animate attributeName="cy" values="1900;100;1900" dur="52s" repeatCount="indefinite" />
          </circle>

          {/* road: two outer rails + dashed centerline, like the logo */}
          {/* left rail */}
          <path
            d={PATH_D}
            fill="none"
            stroke="url(#pj-rail)"
            strokeWidth={3}
            strokeLinecap="round"
            filter="url(#pj-soft)"
            transform="translate(-9 0)"
          />
          {/* right rail */}
          <path
            d={PATH_D}
            fill="none"
            stroke="url(#pj-rail)"
            strokeWidth={3}
            strokeLinecap="round"
            filter="url(#pj-soft)"
            transform="translate(9 0)"
          />
          {/* dashed centerline */}
          <path
            ref={railRef}
            d={PATH_D}
            fill="none"
            stroke="rgba(236,207,138,0.5)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="2 16"
          />

          {/* "you are here" glow that tracks scroll */}
          <circle ref={hereRef} r={26} fill="url(#pj-here)" />

          {/* light-steps walking the road */}
          <g ref={stepsRef}>
            {Array.from({ length: 7 }).map((_, i) => (
              <circle key={i} className="step" r={3.5} fill="#f6e9c6" />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
