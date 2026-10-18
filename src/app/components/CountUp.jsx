"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const formatNumber = (n, pad) => String(Math.round(n)).padStart(pad, "0");

// Counts from 0 to `value` the first time it scrolls into view. The final
// number is rendered on the server so it's correct without JavaScript.
export default function CountUp({ value, pad = 0, duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (latest) => {
        node.textContent = formatNumber(latest, pad);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration, pad]);

  return <span ref={ref}>{formatNumber(value, pad)}</span>;
}
