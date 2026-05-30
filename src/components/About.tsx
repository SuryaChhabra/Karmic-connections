import ScrollReveal from "./ScrollReveal";
import { about } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
            {about.greeting}
          </p>
          <h2 className="mt-4 font-serif text-4xl text-text sm:text-5xl">
            Guided by <span className="text-gradient-gold">{about.name}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal
          delay={120}
          className="mx-auto mt-10 max-w-2xl space-y-6 text-center text-lg leading-relaxed text-text-dim"
        >
          <p>{about.intro}</p>
          <p>{about.mission}</p>
        </ScrollReveal>

        {/* approach as a floating quote on a "cloud" */}
        <ScrollReveal delay={200} className="mx-auto mt-14 max-w-3xl">
          <div className="glass rounded-3xl p-8 text-center sm:p-12">
            <span className="font-serif text-5xl leading-none text-gold/40">“</span>
            <p className="-mt-4 font-serif text-2xl leading-relaxed text-text sm:text-3xl">
              {about.approach}
            </p>
          </div>
        </ScrollReveal>

        {/* credentials */}
        <ScrollReveal delay={120} className="mt-16">
          <div className="hairline-gold mx-auto mb-8 max-w-xs" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {about.credentials.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-2xl border border-gold/10 bg-indigo/20 p-5 text-text-dim"
              >
                <span className="mt-0.5 text-gold">✦</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
