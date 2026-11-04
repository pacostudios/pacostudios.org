"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollMotion } from "@/lib/useScrollMotion";
import CountUp from "./CountUp";
import DepthLayers, { END_DEPTH, START_DEPTH } from "./DepthLayers";
import Fox from "./Fox";
import GridFloor from "./GridFloor";
import { WorkJumpLinks } from "./WorkIndex";

// [x, y, radius] of each droplet, thrown up and to the right
const SPRAY = [
  [62, 138, 7], [78, 118, 5], [52, 112, 3], [96, 104, 8], [86, 84, 3], [118, 90, 4],
  [112, 66, 6], [134, 112, 3], [140, 74, 3], [132, 44, 4], [160, 58, 5], [152, 26, 2.5],
  [178, 36, 3], [172, 84, 2], [188, 14, 2], [104, 40, 2], [70, 76, 2], [122, 18, 1.5],
];

function Title() {
  return (
    <>
      <span className="block">OUR</span>
      <span className="block">WORK</span>
    </>
  );
}

export default function WorkOpening({ stats, sections }) {
  const ref = useRef(null);
  const moving = useScrollMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const depth = useTransform(scrollYProgress, [0, 1], [START_DEPTH, END_DEPTH]);
  const foxY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const foxRotate = useTransform(scrollYProgress, [0, 1], [-6, 10]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const splatterScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section ref={ref} className="relative lg:h-[160vh]">
      <div className="relative flex min-h-svh flex-col justify-center gap-10 overflow-hidden px-4 py-16 lg:sticky lg:top-0 lg:h-svh lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-0">
        <GridFloor />

        <div className="relative z-10 w-fit">
          {/* One spray of paint behind the title */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            style={{ scale: moving ? splatterScale : 1 }}
            className="absolute -right-[10%] -top-[10%] w-[34%] fill-[#EB6E00]"
          >
            {SPRAY.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </motion.svg>

          <div className="relative text-[25vw] font-black leading-[0.86] tracking-tight lg:text-[15.5vw]">
            <DepthLayers depth={depth} moving={moving}>
              <Title />
            </DepthLayers>
            <h1 className="relative text-[#F4F1EA]">
              <span className="sr-only">Our work</span>
              <span aria-hidden="true">
                <Title />
              </span>
            </h1>
          </div>
        </div>

        <motion.div
          style={{ y: moving ? cardY : 0 }}
          className="relative z-10 mt-16 w-full max-w-md rounded-2xl border border-white/20 bg-[#1E1745]/90 p-6 text-[#F4F1EA] shadow-[8px_8px_0px_#EB6E00] lg:mt-0 lg:w-[32vw] lg:p-6 xl:w-[26vw] xl:p-8"
        >
          <motion.div
            style={{ y: moving ? foxY : 0, rotate: moving ? foxRotate : -6 }}
            className="absolute -top-20 right-5 size-28 lg:-top-24 lg:size-32"
          >
            <Fox className="size-full" />
          </motion.div>

          <p className="max-w-[70%] text-lg font-semibold leading-tight lg:text-xl">The work so far</p>
          <dl className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-3xl font-black tabular-nums text-[#EB6E00] lg:text-4xl">
                  <CountUp value={stat.value} pad={2} />
                </dd>
                <dt className="mt-1 text-xs uppercase tracking-[0.1em] text-white/75 lg:text-[10px] xl:text-xs">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-5 border-t border-white/15 pt-4 font-[Public_Sans] text-base text-white/85 text-pretty">
            Websites designed and built for nonprofits, logistics, health and retail businesses.
          </p>
          <WorkJumpLinks sections={sections} />
        </motion.div>
      </div>
    </section>
  );
}
