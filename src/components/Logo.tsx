import Image from "next/image";
import { brand } from "@/content/site";

/**
 * Brand mark. If `brand.logoSrc` is set (e.g. "/logo.png") it renders the gold
 * K-and-path emblem next to the wordmark; otherwise a glowing gold orb.
 */
export default function Logo() {
  if (brand.logoSrc) {
    return (
      <span className="flex items-center gap-2.5">
        <Image
          src={brand.logoSrc}
          alt={`${brand.name} emblem`}
          width={120}
          height={135}
          className="h-9 w-auto drop-shadow-[0_0_10px_rgba(212,175,106,0.35)]"
          priority
        />
        <span className="font-serif text-lg tracking-wide text-text">
          {brand.name}
        </span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-3">
      <span
        className="inline-block h-6 w-6 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #eccf8a, #d4af6a 45%, #6a52c4 100%)",
          boxShadow: "0 0 12px rgba(212,175,106,0.6)",
        }}
      />
      <span className="font-serif text-lg tracking-wide text-text">
        {brand.name}
      </span>
    </span>
  );
}
