import BreathOrb from "./BreathOrb";
import { brand, contact } from "@/content/site";

export default function Hero() {
  return (
    <section
      id="breath"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-2 text-sm uppercase tracking-[0.4em] text-gold/70 animate-shimmer">
        {brand.subtitle}
      </p>
      <p className="mb-10 font-serif text-lg text-text-dim">{brand.tagline}</p>

      <BreathOrb size={340} />

      <h1 className="mt-12 max-w-3xl whitespace-pre-line font-serif text-4xl leading-tight text-text sm:text-5xl md:text-6xl">
        {brand.heroHeadline}
      </h1>

      <p className="mt-6 max-w-xl text-base text-text-dim sm:text-lg">
        {brand.heroSubtext}
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gradient-to-r from-gold-bright to-gold px-8 py-3 font-medium text-void shadow-[0_0_30px_rgba(212,175,106,0.4)] transition-transform hover:scale-105"
        >
          Write to Us Now
        </a>
        <a
          href="#memories"
          className="rounded-full border border-violet-glow/40 px-8 py-3 text-text-dim transition-colors hover:border-gold/50 hover:text-gold-bright"
        >
          Explore the Path
        </a>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-text-faint">
        <span className="text-xs uppercase tracking-[0.3em]">Scroll to drift</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
