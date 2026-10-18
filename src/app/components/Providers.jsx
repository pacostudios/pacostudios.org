"use client";

import { useEffect, useMemo, useState } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import SectionSnap from "./SectionSnap";

// Smooth scrolling and animation settings for the whole app. Both back off
// when the visitor's system asks for reduced motion.
export default function Providers({ children }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Keep Lenis mounted and only change its options: swapping the wrapper out
  // would remount the whole page.
  const lenisOptions = useMemo(() => ({ smoothWheel: !reduceMotion }), [reduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={lenisOptions}>
        <SectionSnap />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
