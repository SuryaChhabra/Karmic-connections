"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades + lifts children into view as they enter the viewport (desktop only).
 *
 * On phones (small screen / coarse pointer) or with reduced-motion, the fade is
 * skipped entirely — content renders immediately visible, so nothing can ever
 * get stuck blank if the observer is slow to fire.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  // start animated only on capable (desktop) clients; default false so SSR /
  // mobile render fully visible with no dependency on JS firing.
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia(
      "(max-width: 768px), (pointer: coarse)"
    ).matches;

    if (reduced || isMobile) return; // stay fully visible, no fade

    setAnimate(true);

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);

    // safety net: if the observer hasn't revealed it within 1.5s, show anyway
    const safety = window.setTimeout(() => el.classList.add("is-visible"), 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={`${animate ? "reveal" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}
