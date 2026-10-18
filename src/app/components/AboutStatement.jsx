"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";

// A big statement that "fills in" word by word as you scroll past it.
// Words wrapped in *asterisks* are highlighted in orange.
export default function AboutStatement({ statement, mission }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = statement.split(" ");

  return (
    <section
      id="about"
      data-snap
      className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 py-[5rem] lg:py-[9rem] px-4 lg:px-16"
    >
      <div>
        <div className="bg-[#EB6E00] w-fit px-5 py-2.5 md:px-6 md:py-3 font-bold text-2xl sm:text-3xl lg:text-[42px] text-black whitespace-nowrap lg:sticky lg:top-28">
          <TextAnimate animation="slideLeft" by="character">
            • ABOUT PACO
          </TextAnimate>
        </div>
      </div>

      <div>
        <p
          ref={ref}
          className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight text-balance"
        >
          {words.map((word, i) => {
            const highlight = word.startsWith("*");
            const text = word.replace(/\*/g, "");
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                highlight={highlight}
                still={reduceMotion}
              >
                {text}
              </Word>
            );
          })}
        </p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-3 md:gap-10 items-baseline border-t-2 border-black dark:border-white pt-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#EB6E00] font-semibold">
            Our mission
          </h2>
          <p className="text-lg md:text-2xl font-[Public_Sans] text-black dark:text-white text-pretty max-w-3xl">
            {mission}
          </p>
        </div>
      </div>
    </section>
  );
}

function Word({ children, progress, range, highlight, still }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span
        style={{ opacity: still ? 1 : opacity }}
        className={highlight ? "text-[#EB6E00]" : "text-black dark:text-white"}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}
