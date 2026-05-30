import ScrollReveal from "./ScrollReveal";
import { concepts, plr } from "@/content/site";

export default function MemoryRoom() {
  return (
    <section id="memories" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
            The Room of Memories
          </p>
          <h2 className="mt-4 font-serif text-4xl text-text sm:text-5xl">
            The concepts that guide the journey
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-text-dim">
            Drift among the teachings at the heart of this work. Reach toward the
            one that calls to you.
          </p>
        </ScrollReveal>

        {/* concepts as floating memory-wisps */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {concepts.map((c, i) => (
            <ScrollReveal key={c.title} delay={(i % 3) * 120}>
              <article
                className="group relative h-full overflow-hidden rounded-3xl border border-gold/10 bg-indigo/20 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35"
                style={{ animation: `floatSlow ${10 + i * 2}s ease-in-out infinite` }}
              >
                {/* glow that wakes on hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/20" />

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-2xl text-gold-bright"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, rgba(236,207,138,0.25), rgba(106,82,196,0.15) 70%, transparent)",
                    boxShadow: "0 0 24px rgba(212,175,106,0.25)",
                  }}
                >
                  {c.glyph}
                </div>

                <h3 className="mt-6 font-serif text-2xl text-text">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">
                  {c.blurb}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* The session — the deepest memory */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <h3 className="font-serif text-3xl text-gradient-gold sm:text-4xl">
              {plr.title}
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-text-dim">{plr.body}</p>
            <ul className="mt-8 space-y-3">
              {plr.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-text">
                  <span className="mt-1 text-gold">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* the 5-step descent */}
          <ScrollReveal delay={150}>
            <div className="relative pl-8">
              <span className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gold/60 via-violet-glow/40 to-transparent" />
              <ol className="space-y-8">
                {plr.process.map((step) => (
                  <li key={step.step} className="relative">
                    <span className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-gold/50 bg-void">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>
                    <p className="text-xs tracking-[0.3em] text-gold/70">
                      STEP {step.step}
                    </p>
                    <h4 className="mt-1 font-serif text-xl text-text">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm text-text-dim">{step.body}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm italic text-text-faint">{plr.duration}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
