"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on small / coarse-pointer (phone-like) devices. Used to skip the
 * heavy continuous animations (canvas starfield, path light-steps, etc.) that
 * make low-end phones lag, while keeping the full experience on desktop.
 */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${breakpoint}px), (pointer: coarse)`
    );
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
