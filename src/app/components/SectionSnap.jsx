"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";

// Gently snaps to the start of each section marked `data-snap` when you stop
// scrolling near it. "Proximity" means tall sections still scroll freely in
// the middle; it only settles when you're close to a section's top.
export default function SectionSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "30%",
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      debounce: 350,
    });
    // Wait a frame so the new page's sections are in the DOM
    const frame = requestAnimationFrame(() => {
      document
        .querySelectorAll("[data-snap]")
        .forEach((element) => snap.addElement(element, { align: ["start"] }));
    });

    return () => {
      cancelAnimationFrame(frame);
      snap.destroy();
    };
  }, [lenis, pathname]);

  return null;
}
