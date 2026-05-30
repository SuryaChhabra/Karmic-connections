"use client";

import { useEffect, useState } from "react";
import { contact, nav } from "@/content/site";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/10 bg-void/70 py-3 backdrop-blur-md"
          : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Karmic Connections home">
          <Logo />
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-base text-text-dim transition-colors hover:text-gold-bright"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-gold/40 px-7 py-2.5 text-base text-gold-bright transition-all hover:border-gold hover:bg-gold/10 md:inline-block"
        >
          Write to Us
        </a>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-text-dim md:hidden"
          aria-label="Toggle menu"
        >
          <span className="mb-1.5 block h-0.5 w-6 bg-current" />
          <span className="mb-1.5 block h-0.5 w-6 bg-current" />
          <span className="block h-0.5 w-6 bg-current" />
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="glass mx-6 mt-3 rounded-2xl p-5 md:hidden">
          <ul className="flex flex-col gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-text-dim transition-colors hover:text-gold-bright"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-gold/40 px-7 py-2.5 text-base text-gold-bright"
              >
                Write to Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
