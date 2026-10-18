"use client";

import { useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const springConfig = { stiffness: 150, damping: 15, mass: 0.4 };

// 3D tilt that follows the mouse across an area. Spread `handlers` on the area
// and put `style` on the element to tilt. Mouse only; off with reduced motion.
export function useCursorTilt(maxDeg = 18) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-maxDeg, maxDeg]), springConfig);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [maxDeg, -maxDeg]), springConfig);

  const onPointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return {
    handlers: { onPointerMove, onPointerLeave },
    style: { rotateX, rotateY, transformPerspective: 900 },
  };
}
