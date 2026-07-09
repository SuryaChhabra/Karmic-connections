import ScrollReveal from "./ScrollReveal";
import ConceptCard from "./ConceptCard";
import { therapies } from "@/content/site";

export default function Therapies() {
  return (
    <section id="therapies" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
            The Modalities
          </p>
          <h2 className="mt-4 font-serif text-4xl text-text sm:text-5xl">
            Our Therapies
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-text-dim">
            Gentle, guided approaches — each a doorway to understanding and
            release.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
          {therapies.map((t, i) => (
            <ScrollReveal key={t.title} delay={(i % 3) * 120}>
              <ConceptCard concept={t} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
