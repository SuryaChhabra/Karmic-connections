"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { testimonials as placeholders } from "@/content/site";

type Review = {
  quote: string;
  author: string;
  place?: string;
  rating?: number;
  when?: string;
};

export default function Testimonials() {
  // Start with the built-in placeholders; swap in live Google reviews if the
  // /api/reviews route is configured with a key + place id.
  const [reviews, setReviews] = useState<Review[]>(placeholders);
  const [fromGoogle, setFromGoogle] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        if (data.configured && Array.isArray(data.reviews) && data.reviews.length) {
          setReviews(data.reviews.slice(0, 6));
          setFromGoogle(true);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

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
          {fromGoogle && (
            <p className="mt-3 text-sm text-text-faint">Reviews from Google</p>
          )}
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((t, i) => (
            <ScrollReveal key={`${t.author}-${i}`} delay={(i % 3) * 140}>
              <figure className="flex h-full flex-col rounded-3xl glass p-8">
                {typeof t.rating === "number" && (
                  <div className="mb-2 text-gold" aria-label={`${t.rating} star rating`}>
                    {"★".repeat(Math.round(t.rating))}
                    <span className="text-gold/25">
                      {"★".repeat(Math.max(0, 5 - Math.round(t.rating)))}
                    </span>
                  </div>
                )}
                <span className="font-serif text-5xl leading-none text-gold/40">“</span>
                <blockquote className="-mt-3 flex-1 font-serif text-xl leading-relaxed text-text">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-gold/10 pt-4 text-sm">
                  <span className="text-gold-bright">{t.author}</span>
                  <span className="text-text-faint">
                    {t.place ? ` · ${t.place}` : t.when ? ` · ${t.when}` : ""}
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
