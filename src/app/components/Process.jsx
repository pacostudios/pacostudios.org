"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import ProjectButton from "./ProjectButton";

// "How we work": numbered steps with an orange line that draws itself as you
// scroll, and step markers that fill in as the line reaches them.
export default function Process({ steps, cta }) {
  const listRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="process" className="px-4 lg:px-16 py-[5rem] lg:py-[8rem] bg-[#FFE9D1] dark:bg-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start flex flex-col gap-6">
          <div className="bg-[#EB6E00] w-fit px-6 py-3 font-bold text-3xl lg:text-[42px] text-black">
            <TextAnimate animation="slideLeft" by="character">
              • HOW WE WORK
            </TextAnimate>
          </div>
          <p className="text-2xl md:text-4xl font-medium tracking-tight leading-tight text-black dark:text-white text-balance">
            A clear process, so you always know what&apos;s next.
          </p>
          <ProjectButton title={cta.label} href={cta.href} className="bg-[#EB6E00]" />
        </div>

        <ol ref={listRef} className="relative">
          {/* Track and animated line */}
          <span
            aria-hidden="true"
            className="absolute left-[1.4rem] md:left-[1.9rem] top-2 bottom-2 w-1 bg-black/10 dark:bg-white/15"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : lineScale }}
            className="absolute left-[1.4rem] md:left-[1.9rem] top-2 bottom-2 w-1 bg-[#EB6E00] origin-top"
          />

          {steps.map((step, index) => (
            <Step
              key={step.title}
              step={step}
              index={index}
              total={steps.length}
              progress={scrollYProgress}
              still={reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ step, index, total, progress, still }) {
  const ref = useRef(null);
  const threshold = index / total;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative flex gap-6 md:gap-10 pb-12 md:pb-16 last:pb-0"
    >
      <StepMarker number={index + 1} progress={progress} threshold={threshold} still={still} />
      <div className="pt-1 md:pt-2">
        <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-black dark:text-white transition-colors duration-300 group-hover:text-[#EB6E00]">
          {step.title}
        </h3>
        <p className="mt-2 md:mt-3 text-base md:text-xl font-[Public_Sans] text-black/80 dark:text-white/80 max-w-xl text-pretty">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}

function StepMarker({ number, progress, threshold, still }) {
  const ref = useRef(null);

  // Fill the marker once the line passes it; written to the DOM directly
  // so scrolling doesn't re-render React.
  useMotionValueEvent(progress, "change", (value) => {
    if (!still) ref.current?.toggleAttribute("data-reached", value >= threshold);
  });

  return (
    <span
      ref={ref}
      data-reached={still ? "" : undefined}
      className="relative z-10 grid place-items-center shrink-0 size-12 md:size-16 rounded-full border-4 border-black dark:border-white bg-white dark:bg-black text-lg md:text-2xl font-semibold tabular-nums text-black dark:text-white transition-[background-color,color,transform] duration-300 data-[reached]:bg-[#EB6E00] data-[reached]:text-black data-[reached]:border-black group-hover:scale-110"
    >
      {String(number).padStart(2, "0")}
    </span>
  );
}
