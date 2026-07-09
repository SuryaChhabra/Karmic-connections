"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { testimonials, contact } from "@/content/site";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="mb-2 text-gold" aria-label={`${n} star rating`}>
      {"★".repeat(Math.round(n))}
      <span className="text-gold/25">{"★".repeat(Math.max(0, 5 - Math.round(n)))}</span>
    </div>
  );
}

export default function Testimonials() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const rating = String(data.get("rating") || "5");
    const review = String(data.get("review") || "");
    const body = [`Name: ${name}`, `Rating: ${rating}/5`, "", review].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Review from ${name}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-gold/15 bg-void/40 px-4 py-3 text-text placeholder:text-text-faint transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

  return (
    <section id="voices" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
            Voices from the Journey
          </p>
          <h2 className="mt-4 font-serif text-4xl text-text sm:text-5xl">
            Testimonials
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={(i % 3) * 140}>
              <figure className="flex h-full flex-col rounded-3xl glass p-8">
                <Stars n={t.rating ?? 5} />
                <blockquote className="flex-1 text-base leading-relaxed text-text-dim">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-gold/10 pt-4">
                  <span className="font-serif text-xl text-gold-bright">
                    {t.author}
                  </span>
                  {t.place && (
                    <span className="ml-1 text-sm text-text-faint">· {t.place}</span>
                  )}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        {/* Leave a review */}
        <ScrollReveal className="mt-12 text-center">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="rounded-full border border-gold/40 px-7 py-3 text-base text-gold-bright transition-all hover:border-gold hover:bg-gold/10"
            >
              Share Your Experience
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-2 max-w-xl rounded-3xl glass p-8 text-left"
            >
              <h3 className="text-center font-serif text-2xl text-gold-bright">
                Share your experience
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Your name" className={inputClass} />
                <select name="rating" defaultValue="5" className={inputClass}>
                  <option value="5" className="bg-indigo">★★★★★ — 5</option>
                  <option value="4" className="bg-indigo">★★★★ — 4</option>
                  <option value="3" className="bg-indigo">★★★ — 3</option>
                  <option value="2" className="bg-indigo">★★ — 2</option>
                  <option value="1" className="bg-indigo">★ — 1</option>
                </select>
              </div>
              <textarea
                name="review"
                required
                rows={4}
                placeholder="Tell us about your session…"
                className={`${inputClass} mt-4 resize-none`}
              />
              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-gradient-to-r from-gold-bright to-gold px-8 py-3 font-medium text-void transition-transform hover:scale-[1.02]"
              >
                {sent ? "Opening your message…" : "Send Review"}
              </button>
              <p className="mt-3 text-center text-xs text-text-faint">
                Your email app opens with the review ready to send to us.
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
