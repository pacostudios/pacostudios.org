"use client";

import { useEffect, useState } from "react";

// True when scroll-driven motion should run. Starts false so server and client
// HTML match, and stays false for people who prefer reduced motion.
export function useScrollMotion(query = "(min-width: 0px)") {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`${query} and (prefers-reduced-motion: no-preference)`);
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return enabled;
}
