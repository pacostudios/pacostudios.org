"use client";

import { motion, useTransform } from "framer-motion";

// Back to front. Each copy of the text sits a little further out, and the
// spacing grows with scroll, so the type comes forward in solid 3D.
const LAYER_COLORS = [
  "#2A1F5C", "#2D2162", "#2F2366", "#352872", "#39297A", "#3C2D80", "#B8540A", "#D06000", "#EB6E00", "#EB6E00",
];

export const START_DEPTH = 0.006; // em per layer
export const END_DEPTH = 0.014;

// Copies of `children` stacked behind the real text. Render the text itself
// after this, inside a relatively positioned parent.
export default function DepthLayers({ depth, moving, children }) {
  return LAYER_COLORS.map((color, index) => (
    <DepthLayer
      key={index}
      depth={depth}
      distance={LAYER_COLORS.length - index}
      color={color}
      moving={moving}
    >
      {children}
    </DepthLayer>
  ));
}

function DepthLayer({ depth, distance, color, moving, children }) {
  const offset = useTransform(depth, (value) => `${value * distance}em`);
  const position = moving ? offset : `${START_DEPTH * distance}em`;
  return (
    <motion.div
      aria-hidden="true"
      style={{ x: position, y: position, color }}
      className="absolute inset-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}
