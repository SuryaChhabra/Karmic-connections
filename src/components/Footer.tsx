import { brand, nav, socials, disclaimer } from "@/content/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gold/70">
            {brand.tagline}
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-text-faint">
            {disclaimer}
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base text-text">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-text-dim transition-colors hover:text-gold-bright">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-text">Connect</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-dim transition-colors hover:text-gold-bright"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-gold/10 pt-6 text-center text-xs text-text-faint">
        © {new Date().getFullYear()} {brand.name} — All Rights Reserved.
      </div>
    </footer>
  );
}
