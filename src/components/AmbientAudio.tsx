"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient singing-bowl audio with an elegant gold toggle.
 *
 * Design rules:
 *  - NEVER autoplays with sound (browsers block it and it's jarring on a
 *    healing site). The visitor opts in by tapping the toggle.
 *  - Loops quietly and gently fades in/out instead of hard-cutting.
 *  - Remembers the visitor's choice in localStorage and resumes it.
 *
 * Drop a licensed loop at /public/ambient.mp3 (see README) and it just works.
 */
const SRC = "/ambient.mp3";
const TARGET_VOLUME = 0.35;
const FADE_STEP = 0.03;
const STORAGE_KEY = "kc-ambient-on";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  // On mount, resume the visitor's previous choice (best-effort — a fresh
  // page load may still require a gesture before audio is allowed).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      void start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFade = () => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = (target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    fadeRef.current = window.setInterval(() => {
      const diff = target - audio.volume;
      if (Math.abs(diff) <= FADE_STEP) {
        audio.volume = target;
        clearFade();
        onDone?.();
        return;
      }
      audio.volume = Math.min(1, Math.max(0, audio.volume + Math.sign(diff) * FADE_STEP));
    }, 60);
  };

  const start = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = 0;
      await audio.play();
      setPlaying(true);
      window.localStorage.setItem(STORAGE_KEY, "1");
      fadeTo(TARGET_VOLUME);
    } catch {
      // Autoplay blocked or file missing — stay silent, wait for a tap.
      setPlaying(false);
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, () => audio.pause());
    setPlaying(false);
    window.localStorage.setItem(STORAGE_KEY, "0");
  };

  const toggle = () => (playing ? stop() : void start());

  return (
    <>
      <audio
        ref={audioRef}
        src={SRC}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />

      {available && (
        <button
          onClick={toggle}
          aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
          aria-pressed={playing}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-void/60 text-gold-bright backdrop-blur-md transition-all hover:border-gold hover:bg-gold/10"
          style={{
            boxShadow: playing
              ? "0 0 24px rgba(212,175,106,0.45)"
              : "0 0 12px rgba(212,175,106,0.2)",
          }}
        >
          {/* concentric "sound" rings that animate while playing */}
          <span className="relative flex items-center justify-center">
            <span
              className="block h-2.5 w-2.5 rounded-full bg-gold-bright"
              style={{ animation: playing ? "haloPulse 3s ease-in-out infinite" : "none" }}
            />
            {playing && (
              <>
                <span className="absolute h-5 w-5 rounded-full border border-gold/50" />
                <span className="absolute h-7 w-7 rounded-full border border-gold/25" />
              </>
            )}
            {!playing && (
              // a small slash to read as "muted"
              <span className="absolute h-px w-7 rotate-45 bg-gold/60" />
            )}
          </span>
        </button>
      )}
    </>
  );
}
