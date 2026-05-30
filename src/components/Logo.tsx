import Image from "next/image";
import { brand } from "@/content/site";

/**
 * Brand mark. If `brand.logoSrc` is set (e.g. "/logo.png") it renders that
 * image; otherwise a glowing gold orb + wordmark.
 */
export default function Logo({ size = 24 }: { size?: number }) {
  if (brand.logoSrc) {
    return (
      <span className="flex items-center gap-3">
        <Image
          src={brand.logoSrc}
          alt={brand.name}
          width={size * 5}
          height={size}
          className="h-7 w-auto"
          priority
        />
        <span className="sr-only">{brand.name}</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-3">
      <span
        className="inline-block rounded-full"
        style={{
          width: size,
          height: size,
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
