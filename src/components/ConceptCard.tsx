"use client";

import { useState } from "react";
import Image from "next/image";
import type { Concept } from "@/content/site";

/**
 * A single "memory-wisp" concept card. If the concept has extra text (`more`),
 * a gentle "Show more" toggle reveals it inline. An optional `image` renders as
 * a tinted banner at the top of the card, blended into the cosmic theme.
 */
export default function ConceptCard({ concept, index }: { concept: Concept; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/10 bg-indigo/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35"
      style={{ animation: `floatSlow ${10 + index * 2}s ease-in-out infinite` }}
    >
      {/* glow that wakes on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 z-10 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/20" />

      {/* optional banner image, tinted to blend with the dark cosmic theme */}
      {concept.image && (
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src={concept.image}
            alt={concept.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          {/* tint + fade so the bright photo melts into the card */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,43,0.35) 0%, rgba(21,18,61,0.55) 60%, rgba(21,18,61,0.98) 100%), radial-gradient(120% 80% at 50% 0%, rgba(212,175,106,0.18), transparent 60%)",
              mixBlendMode: "normal",
            }}
          />
        </div>
      )}

      <div className="p-8">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full text-2xl text-gold-bright"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(236,207,138,0.25), rgba(106,82,196,0.15) 70%, transparent)",
            boxShadow: "0 0 24px rgba(212,175,106,0.25)",
          }}
        >
          {concept.glyph}
        </div>

        <h3 className="mt-6 font-serif text-2xl text-text">{concept.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-text-dim">{concept.blurb}</p>

      {concept.more && (
        <>
          <div
            className="grid transition-all duration-500 ease-in-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="mt-3 text-sm leading-relaxed text-text-dim">
                {concept.more}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-gold-bright transition-colors hover:text-gold"
            aria-expanded={open}
          >
            {open ? "Show less" : "Show more"}
            <span
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        </>
      )}
      </div>
    </article>
  );
}
