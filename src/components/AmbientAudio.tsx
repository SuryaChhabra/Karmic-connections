"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient singing-bowl audio.
 *
 * Browsers block audio that plays with sound before the visitor interacts with
 * the page, so true "autoplay on load" is impossible. Instead we start the
 * music the moment the visitor does ANYTHING (scroll, click, tap, key press) —
 * which feels automatic — and keep a visible gold control to mute/unmute.
 *
 * Drop a licensed loop at /public/ambient.mp3 (see README) and it just works.
 */
const SRC = "/ambient.mp3";
const TARGET_VOLUME = 0.35;
const FADE_STEP = 0.03;
const STORAGE_KEY = "kc-ambient-off"; // only set when the visitor mutes

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState(false);

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
      setHint(false);
      window.localStorage.removeItem(STORAGE_KEY);
      fadeTo(TARGET_VOLUME);
    } catch {
      // Still blocked (no gesture yet) — leave the hint up; a tap will work.
      setPlaying(false);
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, () => audio.pause());
    setPlaying(false);
    window.localStorage.setItem(STORAGE_KEY, "1");
  };

  const toggle = () => (playing ? stop() : void start());

  // Auto-start on the visitor's first interaction (unless they previously
  // muted). This is the closest thing to autoplay the browser allows.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mutedByChoice = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (mutedByChoice) return;

    // show a gentle nudge until sound begins
    const hintTimer = window.setTimeout(() => setHint(true), 1200);

    const kickoff = () => {
      void start();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", kickoff);
      window.removeEventListener("keydown", kickoff);
      window.removeEventListener("scroll", kickoff);
      window.removeEventListener("touchstart", kickoff);
    };

    window.addEventListener("pointerdown", kickoff, { once: true });
    window.addEventListener("keydown", kickoff, { once: true });
    window.addEventListener("scroll", kickoff, { once: true, passive: true });
    window.addEventListener("touchstart", kickoff, { once: true, passive: true });

    // also attempt immediately (deferred so we don't call setState
    // synchronously inside the effect), in case the browser allows autoplay
    const eager = window.setTimeout(() => void start(), 0);

    return () => {
      window.clearTimeout(hintTimer);
      window.clearTimeout(eager);
      cleanup();
      clearFade();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* preload="none" so the ~5MB file only downloads when sound is started,
          keeping initial mobile page loads fast */}
      <audio ref={audioRef} src={SRC} loop preload="none" />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* gentle one-time nudge */}
        {hint && !playing && (
          <span className="select-none rounded-full border border-gold/30 bg-void/70 px-3 py-1.5 text-xs tracking-wide text-gold-bright backdrop-blur-md animate-shimmer">
            tap for sound
          </span>
        )}

        <button
          onClick={toggle}
          aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
          aria-pressed={playing}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-void/60 text-gold-bright backdrop-blur-md transition-all hover:border-gold hover:bg-gold/10"
          style={{
            boxShadow: playing
              ? "0 0 24px rgba(212,175,106,0.45)"
              : "0 0 12px rgba(212,175,106,0.2)",
          }}
        >
          <span className="relative flex items-center justify-center">
            <span
              className="block h-2.5 w-2.5 rounded-full bg-gold-bright"
              style={{ animation: playing ? "haloPulse 3s ease-in-out infinite" : "none" }}
            />
            {playing ? (
              <>
                <span className="absolute h-5 w-5 rounded-full border border-gold/50" />
                <span className="absolute h-7 w-7 rounded-full border border-gold/25" />
              </>
            ) : (
              <span className="absolute h-px w-7 rotate-45 bg-gold/60" />
            )}
          </span>
        </button>
      </div>
    </>
  );
}
