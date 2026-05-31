"use client";

/**
 * InfinityLoop — a complete, gently glowing figure-eight (the cycle of rebirth)
 * with light-steps endlessly circling it and breathing brightness synced to the
 * BreathOrb's 4-2-6 rhythm. Self-contained; safe to drop anywhere.
 *
 * Used at the top of the contact section (above "Come Back, Grounded").
 * To remove: delete this file and its <InfinityLoop /> usage in Begin.tsx.
 */

import { useEffect, useRef } from "react";

const LOOP_D =
  "M 200 120 " +
  "C 240 56, 348 70, 348 120 " +
  "C 348 170, 240 184, 200 120 " +
  "C 160 56, 52 70, 52 120 " +
  "C 52 170, 160 184, 200 120";

const INHALE = 4;
const HOLD = 2;
const EXHALE = 6;
const CYCLE = INHALE + HOLD + EXHALE;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export default function InfinityLoop() {
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // phones: render the loop static (skip the per-frame animation loop)
    if (
      reduced ||
      window.matchMedia("(max-width: 768px), (pointer: coarse)").matches
    )
      return;
    const len = path.getTotalLength();
    const steps = Array.from(
      stepsRef.current?.querySelectorAll<SVGCircleElement>(".lstep") ?? []
    );

    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const e = t % CYCLE;
      let breath: number;
      if (e < INHALE) breath = 0.4 + 0.6 * easeInOut(e / INHALE);
      else if (e < INHALE + HOLD) breath = 1;
      else breath = 1 - 0.6 * easeInOut((e - INHALE - HOLD) / EXHALE);
      if (groupRef.current)
        groupRef.current.style.opacity = String(0.5 + 0.45 * breath);

      if (!reduced) {
        steps.forEach((s, i) => {
          const phase = (t * 0.08 + i / steps.length) % 1;
          const pt = path.getPointAtLength(phase * len);
          s.setAttribute("cx", String(pt.x));
          s.setAttribute("cy", String(pt.y));
          s.style.opacity = String(0.9 * breath);
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none mx-auto w-[420px] max-w-[85vw]">
      <svg viewBox="0 0 400 240" className="h-auto w-full">
        <defs>
          <linearGradient id="il-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6a52c4" />
            <stop offset="50%" stopColor="#eccf8a" />
            <stop offset="100%" stopColor="#6a52c4" />
          </linearGradient>
          <filter id="il-soft">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>
        <g ref={groupRef}>
          <path d={LOOP_D} fill="none" stroke="url(#il-grad)" strokeWidth={3} strokeLinecap="round" filter="url(#il-soft)" transform="translate(-7 0)" />
          <path d={LOOP_D} fill="none" stroke="url(#il-grad)" strokeWidth={3} strokeLinecap="round" filter="url(#il-soft)" transform="translate(7 0)" />
          <path ref={pathRef} d={LOOP_D} fill="none" stroke="rgba(236,207,138,0.55)" strokeWidth={2} strokeLinecap="round" strokeDasharray="2 14" />
          <g ref={stepsRef}>
            {Array.from({ length: 4 }).map((_, i) => (
              <circle key={i} className="lstep" r={3.5} fill="#f6e9c6" />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
