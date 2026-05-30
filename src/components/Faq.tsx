"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { faqs, contact } from "@/content/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
            Gentle Answers
          </p>
          <h2 className="mt-4 font-serif text-4xl text-text sm:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-text-dim">
            Can&apos;t find your answer? Write to us at{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-gold-bright hover:underline"
            >
              {contact.email}
            </a>
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={item.q} delay={i * 80}>
                <div className="overflow-hidden rounded-2xl border border-gold/10 bg-indigo/20">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg text-text">{item.q}</span>
                    <span
                      className={`shrink-0 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-text-dim">{item.a}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
