"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import InfinityLoop from "./InfinityLoop";
import { contact, newsletter } from "@/content/site";

export default function Begin() {
  const [signedUp, setSignedUp] = useState(false);

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    // Compose an email to subscribe (no backend on this static base).
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      "Newsletter sign-up"
    )}&body=${encodeURIComponent(`Please add me to the newsletter: ${email}`)}`;
    setSignedUp(true);
  };

  const inputClass =
    "w-full rounded-xl border border-gold/15 bg-void/40 px-4 py-3 text-text placeholder:text-text-faint transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

  return (
    <section id="begin" className="relative px-6 py-20">
      {/* grounding glow — like returning from the journey */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-64 w-64 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,106,0.18), transparent 70%)",
          filter: "blur(30px)",
          animation: "haloPulse 12s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* the journey comes full circle, just above the heading */}
        <InfinityLoop />
        <ScrollReveal className="mt-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
            Come Back, Grounded
          </p>
          <h2 className="mt-4 font-serif text-4xl text-text sm:text-5xl">
            {contact.heading}
          </h2>
          <p className="mt-4 text-lg text-text-dim">{contact.subheading}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* contact details */}
          <ScrollReveal>
            <div className="flex h-full flex-col gap-5">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-gold/20 bg-indigo/20 p-6 transition-all hover:-translate-y-0.5 hover:border-gold/40"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                    Message us
                  </p>
                  <p className="mt-1 font-serif text-xl text-text">
                    on WhatsApp
                  </p>
                </div>
                <span className="text-2xl text-gold-bright transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

              {[
                { label: "Phone", value: contact.phone, href: `tel:${contact.phoneRaw}` },
                { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                { label: "Where", value: contact.location, href: "" },
              ].map((row) => (
                <div key={row.label} className="border-b border-gold/10 pb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                    {row.label}
                  </p>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="mt-1 block font-serif text-xl text-text transition-colors hover:text-gold-bright"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-serif text-xl text-text">{row.value}</p>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* newsletter */}
          <ScrollReveal delay={150}>
            <div className="flex h-full flex-col justify-center rounded-3xl glass p-8">
              <h3 className="font-serif text-2xl text-gold-bright">
                {newsletter.heading}
              </h3>
              <p className="mt-3 text-text-dim">{newsletter.body}</p>
              <form onSubmit={handleNewsletter} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className={inputClass}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gradient-to-r from-gold-bright to-gold px-7 py-3 font-medium text-void transition-transform hover:scale-105"
                >
                  {signedUp ? "Thank you" : "Sign up"}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
