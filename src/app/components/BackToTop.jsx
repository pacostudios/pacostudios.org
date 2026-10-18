"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 600;

// Floating button, bottom-right, that appears once the visitor has scrolled
// down and takes them back to the top of the page.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    // Also check once after mount, for pages restored mid-scroll
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: reduceMotion });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-[5rem] right-5 md:bottom-[7rem] md:right-8 z-50 grid place-items-center size-12 md:size-14 rounded-md bg-[#EB6E00] text-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] cursor-pointer transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] dark:hover:shadow-[6px_6px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EB6E00]"
        >
          <ArrowUp className="size-6 md:size-7" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
