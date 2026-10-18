"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const spring = { stiffness: 250, damping: 18, mass: 0.4 };

// Pulls its child slightly toward the cursor while hovered. Mouse only;
// does nothing with reduced motion.
export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className={`w-fit ${className}`}
    >
      {children}
    </motion.div>
  );
}
