"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 — drives size, brightness, and parallax
  r: number;
  base: number; // base opacity
  tw: number; // twinkle phase
  tws: number; // twinkle speed
};

/**
 * A fixed, full-viewport canvas of drifting stars with gentle scroll parallax.
 * Deeper stars move less; foreground stars drift more — selling the feeling of
 * floating through space on a cloud.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let scrollY = window.scrollY;
    let raf = 0;
    let t = 0;

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fewer stars on small screens to save mobile CPU/battery
      const density = w < 768 ? 14000 : 6500;
      const count = Math.floor((w * h) / density);
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h * 1.6, // extra height for parallax travel
          z,
          r: 0.4 + z * 1.6,
          base: 0.25 + z * 0.6,
          tw: Math.random() * Math.PI * 2,
          tws: 0.4 + Math.random() * 1.2,
        };
      });
    };

    const draw = () => {
      // pause work when the tab/page is hidden (saves battery on mobile)
      if (document.hidden) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      for (const s of stars) {
        // Parallax: foreground stars shift more with scroll.
        const parallax = (scrollY * (0.04 + s.z * 0.22)) % (h * 1.6);
        let y = s.y - parallax;
        y = ((y % (h * 1.6)) + h * 1.6) % (h * 1.6); // wrap → endless field
        if (y > h) continue;

        const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(t * s.tws + s.tw);
        const alpha = s.base * twinkle;
        const gold = s.z > 0.82;

        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = gold
          ? `rgba(236, 207, 138, ${alpha})`
          : `rgba(236, 232, 246, ${alpha})`;
        ctx.fill();

        if (s.z > 0.7) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = gold
            ? `rgba(212, 175, 106, ${alpha * 0.08})`
            : `rgba(150, 130, 220, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => build();

    build();
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* layered nebula gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #1a1545 0%, #0b0a2b 38%, #050416 75%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(40% 35% at 18% 30%, rgba(75,58,143,0.35), transparent 70%), radial-gradient(45% 40% at 82% 65%, rgba(212,175,106,0.10), transparent 70%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
