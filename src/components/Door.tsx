"use client";

import { useState } from "react";

/**
 * Scene 3 — the threshold. A door floating in space that the visitor chooses to
 * open. On open, light spills and the page glides into the Room of Memories — a
 * deliberate moment of intention before going inward.
 */
export default function Door() {
  const [opening, setOpening] = useState(false);

  const enter = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  return (
    <section
      id="door"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-3 text-sm uppercase tracking-[0.4em] text-gold/70">
        The Threshold
      </p>
      <h2 className="mb-12 font-serif text-3xl text-text sm:text-4xl">
        Enter with an open mind
      </h2>

      <button
        onClick={enter}
        aria-label="Open the door"
        className="group relative cursor-pointer"
        style={{ perspective: "1200px" }}
      >
        {/* light spilling from behind the door */}
        <div
          className={`absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${
            opening ? "scale-150 opacity-100" : "scale-100 opacity-70"
          }`}
          style={{
            width: 320,
            height: 480,
            background:
              "radial-gradient(circle, rgba(236,207,138,0.55) 0%, rgba(106,82,196,0.25) 45%, transparent 72%)",
            filter: "blur(20px)",
          }}
        />

        {/* the door */}
        <div
          className="relative origin-left transition-transform duration-700 ease-in-out"
          style={{
            width: 200,
            height: 360,
            transform: opening ? "rotateY(-78deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className="h-full w-full rounded-t-[100px] border border-gold/40"
            style={{
              background:
                "linear-gradient(160deg, #221c52 0%, #15123d 60%, #0b0a2b 100%)",
              animation: opening ? "none" : "doorGlow 6s ease-in-out infinite",
            }}
          >
            {/* carved panels */}
            <div className="mx-auto mt-8 h-32 w-28 rounded-t-[60px] border border-gold/20" />
            <div className="mx-auto mt-4 h-24 w-28 rounded-lg border border-gold/20" />
            {/* handle */}
            <div className="absolute right-5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,106,0.8)]" />
          </div>
        </div>

        <span className="mt-8 block text-sm tracking-[0.25em] text-text-faint transition-colors group-hover:text-gold-bright">
          {opening ? "ENTERING…" : "TOUCH TO ENTER"}
        </span>
      </button>
    </section>
  );
}
