import ScrollReveal from "./ScrollReveal";
import { testimonials } from "@/content/site";

export default function Testimonials() {
  return (
    <section id="voices" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
            Voices from the Journey
          </p>
          <h2 className="mt-4 font-serif text-4xl text-text sm:text-5xl">
            Testimonials
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 140}>
              <figure className="flex h-full flex-col rounded-3xl glass p-8">
                <span className="font-serif text-5xl leading-none text-gold/40">“</span>
                <blockquote className="-mt-3 flex-1 font-serif text-xl leading-relaxed text-text">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-gold/10 pt-4 text-sm">
                  <span className="text-gold-bright">{t.author}</span>
                  <span className="text-text-faint"> · {t.place}</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
