import BreathOrb from "./BreathOrb";
import { brand, contact } from "@/content/site";

export default function Hero() {
  return (
    <section
      id="breath"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      {/* two soft orbs drifting on either side */}
      <div
        className="pointer-events-none absolute left-[6%] top-1/3 h-40 w-40 rounded-full blur-2xl animate-floatSlow sm:h-56 sm:w-56"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(236,207,138,0.35), rgba(106,82,196,0.18) 55%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-[6%] top-1/2 h-32 w-32 rounded-full blur-2xl animate-floatY sm:h-48 sm:w-48"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, rgba(106,82,196,0.32), rgba(212,175,106,0.16) 55%, transparent 72%)",
          animationDelay: "1.5s",
        }}
      />

      <p className="mb-10 text-xs font-medium uppercase tracking-[0.18em] text-gold/70 sm:text-sm">
        {brand.subtitle}
      </p>

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

      {/* scroll hint — in normal flow so it can never overlap the text */}
      <div className="mt-16 flex flex-col items-center gap-2 text-text-faint">
        <span className="text-xs uppercase tracking-[0.3em]">Scroll to drift</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
